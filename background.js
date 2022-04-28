// background.js
let phrase = "phrase";
let data = [5,6,7];
let url = "";

chrome.runtime.onInstalled.addListener(() => {

  chrome.contextMenus.create({
      "title": 'Add selected text to this SiteSticky',
      "contexts": ["selection"],
      "id": "addnote"
  });
  
});

  
chrome.contextMenus.onClicked.addListener(function(info, tab) {
  const {menuItemId } = info
  if (menuItemId === 'addnote'){
    phrase = info.selectionText;
    chrome.storage.sync.set({ phrase });
  };
})

// chrome.runtime.onInstalled.addListener(function (object) {
//   chrome.tabs.create({  
//     url: "http://www.twitch.tv/"
//   });
// });