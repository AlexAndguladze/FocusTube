//get checkboxes
const contentCheckbox = document.querySelector("#contentCheckbox");
const sidebarCheckbox = document.querySelector("#sidebarCheckbox");
//listen to checkbox clicks
//content checkbox
contentCheckbox.addEventListener("click", ()=>{
    browser.storage.local.set({"contentCheckboxVal": contentCheckbox.checked}, ()=>{
    reloadPage();
    });
});
//sidebar checkbox
sidebarCheckbox.addEventListener("click",()=>{
    browser.storage.local.set({"sidebarCheckboxVal": sidebarCheckbox.checked},()=>{
    reloadPage();
    });
});
//listen to DOM loading and apply saved checkbox values from local storage
document.addEventListener("DOMContentLoaded", ()=>{
    browser.storage.local.get("contentCheckboxVal", (result)=>{
        contentCheckbox.checked=result.contentCheckboxVal || false;
    });
    browser.storage.local.get("sidebarCheckboxVal", (result)=>{
        sidebarCheckbox.checked=result.sidebarCheckboxVal||false;
    });
});

function reloadPage(){
    browser.tabs.query({active: true, currentWindow: true}).then(function(tabs) {
        var currentTab = tabs[0];
        
        // Execute the script to reload the page
        browser.tabs.executeScript(currentTab.id, {
          code: 'window.location.reload();'
        });
      });
}