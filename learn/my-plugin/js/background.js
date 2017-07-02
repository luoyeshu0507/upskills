const store = {
  optionsTabId: -1
};

const utils = {
  openOptionsTab: function() {
    if(store.optionsTabId === -1){
      chrome.tabs.create({url:'view/options.html'}, function(tab){
        store.optionsTabId = tab.id;
      });
    }else{
      chrome.tabs.get(store.optionsTabId, function(tab){
        if(tab){
          chrome.tabs.update(store.optionsTabId, {selected:true});
        }else{
          chrome.tabs.create({url:'view/options.html'}, function(tab){
            store.optionsTabId = tab.id;
          });
        }
      })
    }
  }
};

// Context Menus
chrome.contextMenus.create({
  type: 'normal',  // optional enumerated string ["normal", "checkbox", "radio", "separator"] 
  title: 'Luoyeshu Plugin',
  contexts: ['page'],  // optional array of string ["all", "page", "frame", "selection", "link", "editable", "image", "video", "audio"]  default: page
  onclick: (info, tab) => {
    console.log(info, tab);
    utils.openOptionsTab();
  }
}, id => {
  console.log("ContextMenu created, menu id: " + id)
});

// bind events
chrome.browserAction.onClicked.addListener(utils.openOptionsTab);

chrome.runtime.onMessage.addListener((req,sender,callback) => {//消息监听器
  console.log('One message recieved -------- ');
  console.log('Message data: ', req);
  console.log('Message sender: ', sender);
  callback();
});

chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {//页面被关闭时的事件监听
  console.log('Tab removed: ', tabId, removeInfo);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {//页面刷新事件监听
  console.log('Tab updated: ', tabId, changeInfo, tab);
});

chrome.tabs.onCreated.addListener(function(tab) {//页面创建监听
  console.log('Tab created: ', tab);
});

chrome.tabs.onActivated.addListener(function(tab) {//页面获得焦点监听
  console.log('Tab activated: ', tab);
});






