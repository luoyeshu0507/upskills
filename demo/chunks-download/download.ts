// import { IMaterialDownloadImage } from '@interface/common'
// @ts-nocheck
import { Ref } from 'vue'
import axios from 'axios'
import { getLocalStorage } from './localstorage'

export interface IMaterialDownloadImage {
  url: string
  width: number
  height: number
  downloadName: string
}

export function getBlob(url, needAuth = false) {
  return new Promise(resolve => {
    const xhr = new XMLHttpRequest()

    xhr.open('GET', url, true)
    xhr.responseType = 'blob'
    if (needAuth) {
      const token = getLocalStorage('authToken', Infinity)
      const userId = getLocalStorage('userId', Infinity)
      xhr.setRequestHeader('X-Auth-Token', token)
      xhr.setRequestHeader('X-User-Id', userId)
    }
    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(xhr.response)
      }
    }

    xhr.send()
  })
}

export function saveAs(blob, filename) {
  const link = document.createElement('a')

  link.href = window.URL.createObjectURL(blob)
  link.download = filename

  // fix Firefox
  link.style.display = 'none'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  window.URL.revokeObjectURL(link.href)
}
export function saveAsAttname(url, name) {
  // 七牛云重命名下载,url里加attname参数实现下载重命名。
  // https://developer.qiniu.com/kodo/1659/download-setting
  const downloadUrl = `${url}?attname=${encodeURI(name)}`
  const elemIF = document.createElement('iframe')// a标签存在批量下载数量限制，此处用iframe实现下载
  elemIF.src = downloadUrl
  elemIF.style.display = 'none'
  document.body.appendChild(elemIF)
  setTimeout(() => {
    elemIF.remove()
  }, 5 * 60 * 1000)
}

export async function downloadImg(img: IMaterialDownloadImage, forceOriginal?: boolean):any {
  let { url: finalUrl } = img
  const domainRegex = /(([\w-]+\.)+\w+(:\d{1,5})?)/g
  try {
    if (finalUrl.includes('ci.xiaohongshu.com') && !forceOriginal) {
      // 直接使用原始图地址可能会出现图片被裁剪的现象
      finalUrl += `?imageView2/2/w/${img.width}/format/jpg/`
    }
  } catch {
    // do nothing
  }
  finalUrl = finalUrl.includes('file.myqcloud')
    ? finalUrl.replace(domainRegex, 'growth-img.xhscdn.com')
    : finalUrl
  finalUrl = finalUrl.replace('http://', 'https://')

  const blobUrl = await getBlob(finalUrl)
  saveAs(blobUrl, img.downloadName)
}

// https://juejin.im/post/6844903699496566792
export function downloadImgs(imgs: IMaterialDownloadImage[], forceOriginal?: boolean):any {
  const imgsPromise = imgs.map(img => downloadImg(img, forceOriginal))

  Promise.all(imgsPromise).catch(err => console.log(2222, err))
}

export function downloadImgByBase64(base64: string, fileName: string) :any {
  // base64 会比原图大 33% 左右, 用实际下载的大小算了一下是 1319
  console.log(`文件大小: ${base64.length / 1319} kb`)

  const alink = document.createElement('a')
  alink.download = fileName
  alink.style.display = 'none'
  alink.href = base64
  document.body.appendChild(alink)
  document.body.appendChild(alink)
  alink.click()
  document.body.removeChild(alink)
}

function downloadChunk(url: string, start: number, end: number) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.setRequestHeader('Range', `bytes=${start}-${end}`)
    xhr.responseType = 'blob'
    xhr.onload = function () {
      if (xhr.status === 206) {
        resolve(xhr.response)
      } else {
        reject(`Range request failed with status: ${xhr.status}`)
      }
    }
    xhr.onerror = function () {
      reject('Range request failed')
    }
    xhr.send()
  })
}

function tryTask(fn: any, retry: number = 3, ...rest) {
  return fn(...rest).catch(e => {
    if (retry > 0) {
      return tryTask(fn, retry - 1, ...rest)
    }
    throw e
  })
}

function downloadFileInChunks(url, chunkSize, totalSize) {
  const promises = []
  let start = 0
  let end = chunkSize - 1

  while (start < totalSize) {
    if (end >= totalSize - 1) {
      end = totalSize - 1
    }
    promises.push(tryTask(downloadChunk, 4, url, start, end))
    start = end + 1
    end += chunkSize
  }

  return Promise.all(promises)
}

function mergeChunks(chunks) {
  return new Promise(resolve => {
    const blobs = chunks.map(chunk => new Blob([chunk]))
    const blob = new Blob(blobs)
    resolve(blob)
  })
}

export const downloadVideoInChunks = async (url: string, name: string, chunkSize: number = 2 * 1024 * 1024) => {
  const src = url.replace(/^https?:/, '')
  let { headers: { 'content-length': size } } = await axios.head(src)
  size = Number(size)
  const chunks = await downloadFileInChunks(src, chunkSize, size)
  const blob = await mergeChunks(chunks)
  saveAs(blob, name)
}

