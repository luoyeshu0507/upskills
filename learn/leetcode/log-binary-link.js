function logBinaryLink (head) {
  if (head === null) return
  logBinaryLink(head.left)
  logBinaryLink(head.right)
  console.log(head.val)
}

function logBinaryLinkPreOrder(head) {
  if (head === null) return
  let stack = [head]
  while (stack.length) {
    const head = stack.shift()
    console.log(head.val)
    if (head.right) stack.unshift(head.right)
    if (head.left) stack.unshift(head.left)
  }
}

function logBinaryLinkMidOrder(head) {
  let stack = []
  while (head || stack.length) {
    if (head) {
      while(head) {
        stack.unshift(head)
        head = head.left
      }
    } else {
      head = stack.shift()
      console.log(head.val)
      head = head.right
    }
  }
}

function logBinaryLinkPostOrder(head) {
  let stack = []
  let lastVisited = null
  while (head || stack.length) {
    while (head) {
      stack.push(head)
      head = head.left
    }

    const cur = stack[stack.length - 1]
    if (!cur.right || cur.right === lastVisited) {
      console.log(cur.val)
      stack.pop()
      lastVisited = cur
    } else {
      head = cur.right
    }
  }
}

const head = {
  val: 1,
  left: {
    val: 2,
    left: {
      val: 4,
      left: null,
      right: null,
    },
    right: {
      val: 5,
      left: null,
      right: {
        val: 8,
        left: null,
        right: null,
      },
    }
  },
  right: {
    val: 3,
    left: {
      val: 6,
      left: null,
      right: null,
    },
    right: {
      val: 7,
      left: null,
      right: null,
    },
  }
}
//        1
//   2         3
// 4   5     6   7
//       8

logBinaryLinkPostOrder(head)

function a(num) {
  if (num === 0 || num === 1) return 1
  else return a(num - 1) + a(num - 2)
}

console.log(a(4))