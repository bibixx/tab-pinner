import {
  onUpdate, onCreated, onActivated, onIconClick,
} from './background/listeners';

chrome.tabs.onUpdated.addListener(onUpdate);

chrome.tabs.onCreated.addListener(onCreated);

chrome.tabs.onActivated.addListener(onActivated);

chrome.browserAction.onClicked.addListener(onIconClick);
