import { onActivated } from './listeners/onActivated';
import { onCreated } from './listeners/onCreated';
import { onIconClick } from './listeners/onIconClick';
import { onUpdate } from './listeners/onUpdate';

chrome.tabs.onUpdated.addListener(onUpdate);

chrome.tabs.onCreated.addListener(onCreated);

chrome.tabs.onActivated.addListener(onActivated);

chrome.action.onClicked.addListener(onIconClick);
