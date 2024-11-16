document.addEventListener('DOMContentLoaded', function() {
    const twitterShareBtn = document.getElementById('twitter-share-btn');
    const followBtn = document.getElementById('follow-btn');
    const modify404PagesCheckbox = document.getElementById('modify404Pages');
    const modifyNewTabsCheckbox = document.getElementById('modifyNewTabs');

    // Load settings from storage
    chrome.storage.sync.get('settings', ({ settings }) => {
        if (settings) {
            modify404PagesCheckbox.checked = settings.modify404Pages;
            modifyNewTabsCheckbox.checked = settings.modifyNewTabs;
        } else {
            modify404PagesCheckbox.checked = true;
            modifyNewTabsCheckbox.checked = false;
        }
    });

    // Save settings to storage
    function saveSettings() {
        const settings = {
            modify404Pages: modify404PagesCheckbox.checked,
            modifyNewTabs: modifyNewTabsCheckbox.checked
        };
        chrome.storage.sync.set({ settings }, () => {
            console.log(`Settings saved: ${JSON.stringify(settings)}`);
        });
    }

    // Event listeners for settings checkboxes
    modify404PagesCheckbox.addEventListener('change', saveSettings);
    modifyNewTabsCheckbox.addEventListener('change', saveSettings);
  
    twitterShareBtn.addEventListener('click', function(event) {
      event.preventDefault();
      const url = 'https://twitter.com/intent/tweet?text=Transform%20the%20internet%27s%20dead%20ends%20into%20living%20art.%0A%0AThis%20extension%2C%20part%20of%20%40m0dest___%27s%20experimental%20art%20series%20%3Cerror%20messages%3E%2C%20reimagines%20404%20pages%20as%20canvases%20for%20artistic%20expression%20rather%20than%20symbols%20of%20being%20lost.%0A%0AInstall%20now%20and%20share%20to%20receive%20$ERROR.%0A%0Ahttps%3A%2F%2Fchromewebstore.google.com%2Fdetail%2Ferror-messages%2Fkbglolfonhbbekjfbnkiokbgedjbghmo';
      chrome.tabs.create({ url });
    });

    followBtn.addEventListener('click', function(event) {
      event.preventDefault();
      const url = 'https://x.com/err0rmessages';
      chrome.tabs.create({ url });
    });
  });