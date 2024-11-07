chrome.webNavigation.onCompleted.addListener(async (details) => {
    try {
      // Get the tab information
      const tab = await chrome.tabs.get(details.tabId);
      
      // Check if the page is a 404
      const response = await fetch(tab.url);
      if (response.status === 404) {
        // Execute content script on 404 pages
        await chrome.scripting.executeScript({
          target: { tabId: details.tabId },
          function: modify404Page
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  });

  // Function to modify the 404 page
  function modify404Page() {
    let urlList = [
      "https://i.imgur.com/oQNcZSt.gif",
      "https://i.imgur.com/uteHtn8.gif",
      "https://i.imgur.com/vSeETGL.gif",
      "https://i.imgur.com/xFYEAyM.gif",
      "https://i.imgur.com/ER62w16.gif",
      "https://i.imgur.com/0CrQLU6.gif",
      "https://i.imgur.com/ifbKyJT.gif",
      "https://i.imgur.com/YeElCB5.gif",
      "https://i.imgur.com/Ldh33gf.gif",
      "https://i.imgur.com/Gcga7SF.gif",
      "https://i.imgur.com/tzWCBtN.gif",
      "https://i.imgur.com/q8ucqAQ.gif",
      "https://i.imgur.com/WlW3kaq.gif",
      "https://i.imgur.com/60n5D9n.gif",
      "https://i.imgur.com/0sTZXQx.gif",
      "https://i.imgur.com/G5ypjTL.gif",
      "https://i.imgur.com/kYBZmiG.gif",
      "https://i.imgur.com/a8k7zQT.gif",
      "https://i.imgur.com/WK8qyTg.gif",
      "https://i.imgur.com/EU5Bdfm.gif",
      "https://i.imgur.com/4mKoZMy.gif",
      "https://i.imgur.com/Mlg8PGh.gif",
      "https://i.imgur.com/Jgf3X1r.gif",
      "https://i.imgur.com/hZqCGN7.gif",
      "https://i.imgur.com/INbgWRX.gif",
      "https://i.imgur.com/kppkItA.gif",
      "https://i.imgur.com/czNrMCD.gif",
      "https://i.imgur.com/osZxWjt.gif",
      "https://i.imgur.com/6v45DTx.gif",
      "https://i.imgur.com/JqWBwhJ.gif",
      "https://i.imgur.com/2vDe3Jw.gif",
      "https://i.imgur.com/W8H9IbF.gif",
      "https://i.imgur.com/4DsHTbj.gif",
      "https://i.imgur.com/EuVyHMZ.gif",
      "https://i.imgur.com/JZ4C99P.gif",
      "https://i.imgur.com/CENq9zu.gif",
      "https://i.imgur.com/pxsp9sK.gif",
      "https://i.imgur.com/hJYm491.gif",
      "https://i.imgur.com/Q9olBVG.gif",
      "https://i.imgur.com/7pyNyoC.gif",
      "https://i.imgur.com/n8z463y.gif",
      "https://i.imgur.com/cpaVZp7.gif",
      "https://i.imgur.com/nSK8lBd.gif",
      "https://i.imgur.com/pvRAiTe.gif",
      "https://i.imgur.com/GAtcv9W.gif",
      "https://i.imgur.com/HN7oMJS.gif",
      "https://i.imgur.com/OcPmQuC.gif",
      "https://i.imgur.com/i5iBxQv.gif"
    ];
    // Clear the existing content
    document.body.innerHTML = '';
    
    // Set the background to black
    document.body.style.backgroundColor = 'black';
    
    // Create container for the GIF
    const container = document.createElement('div');
    container.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: black;
    `;
    
    // Create and style the GIF
    const gif = document.createElement('img');
    // Replace this URL with your IPFS GIF URL
    gif.src = urlList[Math.floor(Math.random() * urlList.length)];
    gif.style.cssText = `
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
      cursor: pointer; // Add cursor pointer to indicate clickability
    `;
    
    // Add click event listener to the GIF
    gif.addEventListener('click', () => {
      window.location.href = 'https://www.errormessages.xyz/404';
    });

    // Add error handling for the GIF
    gif.onerror = () => {
      gif.style.display = 'none';
      const errorText = document.createElement('div');
      errorText.textContent = '404';
      errorText.style.cssText = `
        font-size: 72px;
        font-weight: bold;
        font-family: Arial, sans-serif;
        color: white;
      `;
      container.appendChild(errorText);
    };
    
    // Add the elements to the page
    container.appendChild(gif);
    document.body.appendChild(container);
  }