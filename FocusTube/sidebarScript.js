
  document.addEventListener('yt-navigate-finish', process);
  
  if (document.body) process();
  else document.addEventListener('DOMContentLoaded', process);

  function process(){

    if(browser.storage.local.get("sidebarCheckboxVal", (result)=>{
      if(result.sidebarCheckboxVal)
      {
          let sidebar = document.getElementById("secondary");
          sidebar.parentNode.removeChild(sidebar);
      }
  }));
  }