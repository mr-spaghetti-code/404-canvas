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
    gif.src = 'https://ipfs.io/ipfs/QmUsWYSK8ChhBSELACEisC5vNWpyfBwhfKkUr5hZsMhKW1/media';
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