export async function closeTab(tab: chrome.tabs.Tab) {
  if (tab.id === undefined) {
    return;
  }

  chrome.tabs.remove(tab.id);
}
