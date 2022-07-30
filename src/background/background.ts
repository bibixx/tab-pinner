import { onActivated } from './listeners/onActivated';
import { onCreated } from './listeners/onCreated';
import { onIconClick } from './listeners/onIconClick';
import { onUpdate } from './listeners/onUpdate';

function bindListeners() {
  chrome.tabs.onUpdated.addListener(onUpdate);

  chrome.tabs.onCreated.addListener(onCreated);

  chrome.tabs.onActivated.addListener(onActivated);

  chrome.action.onClicked.addListener(onIconClick);
}

chrome.runtime.onInstalled.addListener(bindListeners);
chrome.runtime.onStartup.addListener(bindListeners);
