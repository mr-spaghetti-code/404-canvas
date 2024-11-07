document.addEventListener('DOMContentLoaded', function() {
    const twitterShareBtn = document.getElementById('twitter-share-btn');
    const followBtn = document.getElementById('follow-btn');
  
    twitterShareBtn.addEventListener('click', function(event) {
      event.preventDefault();
      const url = 'https://x.com/intent/tweet?text=Hello%20world';
      chrome.tabs.create({ url });
    });

    followBtn.addEventListener('click', function(event) {
      event.preventDefault();
      const url = 'https://x.com/m0dest___';
      chrome.tabs.create({ url });
    });
  });