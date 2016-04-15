var ac = false;
var timer;

// check if updated is active

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
	if(tab.active) {
		if( tab.pinned == true ){
			chrome.browserAction.setTitle({
				title: chrome.i18n.getMessage( "unpin" )
			})
			chrome.browserAction.setIcon({
				path: 'icon_in.png'
			});
		} else {
			chrome.browserAction.setTitle({
				title: chrome.i18n.getMessage( "pin" )
			})
			chrome.browserAction.setIcon({
				path: 'icon.png'
			});
	
			chrome.storage.sync.get({
				regexp: [['Facebook', '^http[s]?\:\/\/www\.facebook\.com', true], {"close": true, "close_conf": true, "back_index": true}]
			}, function(items) {
				if( changeInfo.url ){
					var reg;
					reg = []
					var index;
					index = []
					if(typeof(items.regexp)=='object'){
						for( x=0; x<items.regexp.length; x++ ){
							if(items.regexp[x][2]){
								reg[x] = new RegExp(String(items.regexp[x][1]))
								index[x] = items.regexp[x][3]
							}
						}
						for(x=0; x<reg.length; x++){
							if( (tab.url).match(reg[x]) ){
								chrome.tabs.update(tab.id, {
									pinned: !tab.pinned
								})
								chrome.tabs.move(tab.id, {
									index: index[x]*1
								})
								console.log( index[x] )
								x=reg.length
							}
						}
					}
				}
			});
		}
	}
})

chrome.tabs.onActivated.addListener(function(activeInfo){
	chrome.tabs.get(activeInfo.tabId, function(tab){
		if( tab.pinned == true ){
			chrome.browserAction.setTitle({
				title: chrome.i18n.getMessage( "unpin" )
			})
			chrome.browserAction.setIcon({
				path: 'icon_in.png'
			});
		} else {
			chrome.browserAction.setTitle({
				title: chrome.i18n.getMessage( "pin" )
			})
			chrome.browserAction.setIcon({
				path: 'icon.png'
			});
		}
	})
})

chrome.tabs.onCreated.addListener(function(tab){
	chrome.storage.sync.get({
		regexp: [['Facebook', '^http[s]?\:\/\/www\.facebook\.com', true], {"close": true, "close_conf": true, "back_index": true}]
	}, function(items) {
		var reg;
		reg = []
		var index;
		index = []
		if(typeof(items.regexp)=='object'){
			for( x=0; x<items.regexp.length; x++ ){
				if(items.regexp[x][2]){
					reg[x] = new RegExp(String(items.regexp[x][1]))
					index[x] = items.regexp[x][3]
				}
			}
			for(x=0; x<reg.length; x++){
				if( (tab.url).match(reg[x]) ){
					chrome.tabs.update(tab.id, {
						pinned: true
					})
					chrome.tabs.move(tab.id, {
						index: index[x]*1
					})
					console.log( index[x] )
					x=reg.length
				}
			}
		}
	});
})


chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.storage.sync.get({ regexp: [['Facebook', '^http[s]?\:\/\/www\.facebook\.com', true], {"close": true, "close_conf": true, "back_index": true}]
	}, function(items) {
		var ac_close = items.regexp[items.regexp.length-1].close;
		var ac_conf = items.regexp[items.regexp.length-1].close_conf;
		var back_index = items.regexp[items.regexp.length-1].back_index;
		
		if(ac){
			if(ac_close){
				clearTimeout(timer)
				if( ac_conf ){
					if( confirm( chrome.i18n.getMessage( "close_conf_msg" ) ) ){
						chrome.tabs.remove(tab.id)
					}
				} else {
					chrome.tabs.remove(tab.id)
				}
			
				ac = false;
			return;
			}
		}

		ac = true;

		timer = setTimeout(function(){
			var res;
			chrome.browserAction.getTitle( {}, function(result){ 
				if(result==chrome.i18n.getMessage( "pin" )){
					chrome.browserAction.setTitle({
						title: chrome.i18n.getMessage( "unpin" )
					})
					chrome.browserAction.setIcon({
						path: 'icon_in.png'
					});
				} else {
					chrome.browserAction.setTitle({
						title: chrome.i18n.getMessage( "pin" )
					})
					chrome.browserAction.setIcon({
						path: 'icon.png'
					});
					if( back_index ){
						chrome.tabs.move(tab.id, {
							index: -1
						})
					}
				}
		
			} )
		
			chrome.tabs.update(tab.id, {
				pinned: !tab.pinned,
			})
			
			ac = false;
			clearTimeout(timer)
		}, 200)
	});
});