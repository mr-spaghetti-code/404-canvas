function saveSettings() {
    const modify404Pages = document.getElementById('modify404Pages').checked;
    const modifyNewTabs = document.getElementById('modifyNewTabs').checked;
    const settings = { modify404Pages, modifyNewTabs };
  
    chrome.storage.sync.set({ settings }, () => {
      console.log(`Settings saved: ${JSON.stringify(settings)}`);
    });
  }
  
function restoreSettings() {
    chrome.storage.sync.get('settings', ({ settings }) => {
        if (settings) {
        const { modify404Pages, modifyNewTabs } = settings;
        document.getElementById('modify404Pages').checked = modify404Pages;
        document.getElementById('modifyNewTabs').checked = modifyNewTabs;
        } else {
        document.getElementById('modify404Pages').checked = true;
        document.getElementById('modifyNewTabs').checked = false;
        }
    });
}

document.addEventListener('DOMContentLoaded', restoreSettings);
document.getElementById('modify404Pages').addEventListener('change', saveSettings);
document.getElementById('modifyNewTabs').addEventListener('change', saveSettings);