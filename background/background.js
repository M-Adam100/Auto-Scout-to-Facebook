chrome.runtime.onInstalled.addListener(async () => {
  console.log("Extension Installed")
});


chrome.runtime.onMessage.addListener(
  function (arg, sender, sendResponse) {
    if (arg.images.length) {
      arg.images.forEach(element => {
        chrome.downloads.download({ url: element.url, filename: `./${arg.folderName}/${element.filename}.jpg`, saveAs: false }, () => {
          console.log('DOWNLOADED')
        })
      });
    }

  });





