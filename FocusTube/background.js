const homePageUrl =  "https://www.youtube.com/";
const anyVideoUrl = "https://www.youtube.com/watch?v=";

var contentCheckbox = document.querySelector("contentCheckbox");
var sidebarCheckbox = document.querySelector("sidebarCheckbox");

function injectContentScript(tabId){
    //inject content script into a tab
browser.tabs.executeScript(tabId, {file:"contentScript.js"})
.then(()=>console.log("contnet script injected successfully"))
.catch(error=> console.assert( `Error injecting content script: ${error.message}`));
}
function injectSidebarScript(tabId){

 browser.tabs.executeScript(tabId, {file:"sidebarScript.js"})
 .then(()=>console.log("sidebar script injected successfully"))
 .catch(error=> console.assert( `Error injecting sidebar script: ${error.message}`));
}

browser.webNavigation.onDOMContentLoaded.addListener((details)=> {

   if(details.url.startsWith(homePageUrl)&& details.frameId===0){
        browser.storage.local.get("contentCheckboxVal", (result)=>{
            if(result.contentCheckboxVal){
                const tabId = details.tabId;
                injectContentScript(tabId);
            }
        });
    }
});

browser.tabs.onCreated.addListener((tab)=> {

    if(tab.url.startsWith(anyVideoUrl)){
        injectSidebarScript(tab.tabId);
    }
    else if(tab.url.startsWith(homePageUrl)){
        injectContentScript(tab.tabId);
    }
});

browser.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete') {
      if (tab.url.indexOf("youtube.com") != -1 && tab.url.includes(anyVideoUrl)) {
        console.log("Youtube load complete");

        if(browser.storage.local.get("sidebarCheckboxVal", (result)=>{
            if(result.sidebarCheckboxVal)
            {
                injectSidebarScript(tabId);
            }
        }));
      }
    }
  });

  //checkboxes
  contentCheckbox.addEventListener('change', function(){
    window.location.reload();
  });
  sidebarCheckbox.addEventListener('change', function(){
    window.location.reload();
  });