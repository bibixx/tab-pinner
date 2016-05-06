var saved = chrome.i18n.getMessage( "refresh_confirm" )

document.title = chrome.i18n.getMessage( "options_title" )

function wb(){
	$(window).bind("beforeunload", function(){
		return saved;
	})
}

function wub(){
	$(window).unbind("beforeunload")
}

function input(){
	$("input").on("keyup change", function(){
		wb()
	})

	$("label").on("click", function(){
		wb()
	})
}

function save_options(el) {
	wub()
	var arr;
	arr = []
	$('#inp_cont div').each(function(){
		var name = $(this).children('p').children('input#name').first().val()
		var regexp = $(this).children('p').children('input#regexp').first().val()
		var enabled = $(this).children('p').children('input#enabled').prop('checked')
		var index = $(this).children('p').children('input#index').val()
		if(index==''){
			index = -1
		}

		var v = [name, regexp, enabled, index]
		arr.push( v )
	})

	var arro = {}
	$("#options input").each(function(){
		arro[ $(this).attr("id") ] = $(this).prop("checked")
	})

	arr.push( arro )

	if( $('#inp_cont div').length == 0){
		arr = false
	}

	console.log(arr[arr.length-1])

  chrome.storage.sync.set({
    regexp: arr,
  }, function() {
    textContent = chrome.i18n.getMessage( "options_saved" );
    alert( textContent );
		el.blur();
  });
}

function remove(){
	$('#inp_cont div #remove').bind('click', function(){
		$(this).parent().remove()
	})
}

function label(){
	$('label').bind('click', function(){
		var input = $(this).parent().children( "input#"+$(this).attr('id') )
		input.prop( "checked", !input.prop("checked") )
	})
}

function res(){
	if( $("body").width()>995 ){
		$("#main").css({'margin-left': ( Math.floor( $("#main").innerWidth()/2 ) )*-1, 'left': '50%' })
	} else {
		$("#main").css({'margin-left': 0, 'left': 0})
	}
}

function popup(element){
	var txt = {
		"change_shrt": chrome.i18n.getMessage( "change_shrt_popup" ),
		"rn": chrome.i18n.getMessage( "rule_name_popup" ),
		"ti": chrome.i18n.getMessage( "tab_index_popup" ),
		"re": chrome.i18n.getMessage( "regular_expression_popup" ),
		"enabled": chrome.i18n.getMessage( "enabled_popup" ),
	}
	$(element).bind('mouseenter', function(e){
		var $t = $(this)
		if(txt[$t.attr('id')] != undefined){
			$t.css({ "cursor": "help", "z-index": "3000000"})
			$("body").append('<div id="popup"><div id="car" style="margin-left: '+0/*$t.innerWidth()*/+'px"><div id="arr"></div><div id="arr_border"></div><div id="contanier"><div id="content"><span>'+txt[$t.attr('id')]+'</span></div></div></div></div>')
			$("#popup").css({'left': $t.offset().left+$t.innerWidth(), 'top': $t.offset().top-3 })
			$("#popup").show()
			$("#popup a").bind('click', function(){
				var href;
				href = $(this).attr('href')
				chrome.tabs.getCurrent(function(tab){
					chrome.tabs.create({
						'url': href,
						'index': tab.index+1,
						'active': false,
					})
				})
			})
		}

		$(element+", #popup").bind("mouseleave", function(e){
			if( !($("#"+e.toElement.id).parent().attr("id") == "car") ){
				$("#popup").remove()
				$(element+", #popup").unbind("mouseleave")
			}
		})

	})
}

function close_conf(t){
	if(t){
		$("#options input#close_conf").removeAttr("disabled")
		$("#options label#close_conf").show()
		$("#options span.disabled").remove()
	} else {
		$("#options #close_conf").attr("disabled", true);
		$("#options label#close_conf").hide()
		$("#options label#close_conf").after( "<span class='disabled'>"+$("#options label#close_conf").html()+"</span>" )
	}
}

$("#options input#close").bind("change", function(){
	close_conf( $(this).prop("checked") )
})

$("#options label#close").bind("click", function(){
	setTimeout( function(){ close_conf( $("#options input#close").prop("checked") ) }, 1 )
})

$(window).resize(function(){
	//res()
})

function restore_options() {
	chrome.storage.sync.get({
		regexp: [['Facebook', '^http[s]?:\/\/www.facebook.com(\/)?$', true], {"close": true, "close_conf": true, "back_index": true}]
	}, function(items) {
		if(items.regexp){
			for(x=0; x<items.regexp.length-1; x++){
				if(items.regexp[x][0]!=''){
					var c = '';
					var i = items.regexp[x][3];
					if(items.regexp[x][2]){
						c = 'checked="checked"'
					}
					if(i<0){
						i = ''
					}
					var rule_name = chrome.i18n.getMessage( "rule_name" )
					var regular_expression = chrome.i18n.getMessage( "regular_expression" )
					var tab_index = chrome.i18n.getMessage( "tab_index" )
					var enabled = chrome.i18n.getMessage( "enabled" )
					var remove_b = chrome.i18n.getMessage( "remove_b" )
					$('#inp_cont').append('<div><p><span id="rn">'+rule_name+'</span><input type="text" id="name" value="'+items.regexp[x][0]+'"><span id="re">'+regular_expression+'</span><input type="text" id="regexp" value="'+items.regexp[x][1]+'"><span id="ti">'+tab_index+'</span><input type="number" id="index" min="0" value="'+i+'"><input type="checkbox" '+c+' id="enabled" /><label id="enabled">'+enabled+'</label></p><button id="remove">'+remove_b+'</button><hr></div>')
				}
			}
			var options = items.regexp[items.regexp.length-1]
			$("#options input").each(function(){
				$(this).prop("checked", options[$(this).attr("id")] )
				if( ( $(this).attr("id") == "close" ) &&  !options[$(this).attr("id")] ){
					close_conf(false)
				}
			})
		}
		remove()
		//res()
		label()
		input()
		popup('#inp_cont div p span, #inp_cont div p label')
	});
}

function add(){
	var rule_name = chrome.i18n.getMessage( "rule_name" )
	var regular_expression = chrome.i18n.getMessage( "regular_expression" )
	var tab_index = chrome.i18n.getMessage( "tab_index" )
	var enabled = chrome.i18n.getMessage( "enabled" )
	var remove_b = chrome.i18n.getMessage( "remove_b" )
	$('#inp_cont').append('<div><p><span id="rn">'+rule_name+'</span><input type="text" id="name"><span id="re">'+regular_expression+'</span><input type="text" id="regexp"><span id="ti">'+tab_index+'</span><input type="number" id="index" min="0" ><input type="checkbox" checked="checked" id="enabled" /><label id="enabled">'+enabled+'</label></p><button id="remove">'+remove_b+'</button><hr></div>')
	remove()
	label()
	input()
	popup('#inp_cont div p span, #inp_cont div p label')
}

function clear(el){
	if(confirm( chrome.i18n.getMessage( "clear_confirm" ) )){
		wub()
		el.blur();
		chrome.storage.sync.clear(function(){
			location.reload();
		})
	} else {
		el.blur();
	}
}

$('a#change_shrt').on('click', function(e){
	return false;
})

popup('span#change_shrt')

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', function(){
	save_options(this);
});
document.getElementById('add').addEventListener('click', function(){
	add();
	this.blur();
});
document.getElementById('clear').addEventListener('click', function(){
	clear(this);
});
//res();

$(".local").each(function(){
	$(this).html( chrome.i18n.getMessage( $(this).attr("id") ) )
	$(this).removeClass("local")
	if( $(this).attr("class")=="" ){
		$(this).removeAttr("class")
	}
})

$.getJSON("trans_arr.json", function(trans_arr) {
	$("#translators").each(function(){
		var trans = trans_arr[ chrome.i18n.getMessage("@@ui_locale") ].translators
		if( trans.length == 1 ){
			var translators = trans[0]
			$(this).html( "<p>"+chrome.i18n.getMessage("translators_msg_1", [translators] )+"</p>" );
		} else if (trans.length > 1){
			var translators = ""
			for(x=0; x<trans.length-2; x++){
				translators+=trans[x]+", "
			}
			translators += trans[trans.length-2]+" "+chrome.i18n.getMessage("translators_and")+" "+trans[trans.length-1]
			$(this).html( "<p>"+chrome.i18n.getMessage("translators_msg", [translators] )+"</p>" );
		}
	})
});
