import addRuleElement from "./options/addRuleElement";
import { store } from "./options/Storage";
import changeSetting from "./options/changeSetting";
import allChecked from "./options/allChecked";
import removeRule from "./options/removeRule";
import { popup, createPopup } from "./options/popup";
import { loadi18n, gM } from "./options/loadi18n";

function loadOptions() {
  chrome.storage.sync.get( {
    "rules": [
      {
        "active": true,
        "name": "Facebook",
        "regexp": "^http[s]?://www.facebook.com(/)?$",
        "position": 0,
      },
    ],
    "settings": {
      "close": true,
      "confirm": true,
      "move": true,
    },
  }, ( items ) => {
    if ( items.rules.length > 0 ) {
      store.options = items;
      items.rules.forEach( ( v, i ) => {
        if ( v !== null ) {
          addRuleElement( v, i );
        }
      } );
    } else {
      addRuleElement();
    }

    allChecked();

    $( "#close" ).attr( "checked", items.settings.close );
    $( "#confirm" ).attr( "checked", items.settings.confirm );
    $( "#move" ).attr( "checked", items.settings.move );
  } );
}

loadi18n();
loadOptions();
createPopup();

$( "#add" ).click( () => {
  addRuleElement( null, store.options.rules.length );
} );

$( "input#close, input#confirm, input#move" ).change( function() {
  changeSetting( "settings", $( this ).attr( "id" ), $( this ).prop( "checked" ) );
} );

$( document ).on( "input change", "tr p[contenteditable='true'], tr input", function() {
  const $parent = $( this ).parents( "tr" );
  const value = {
    "active": $parent.find( "input[id^=row-]" ).prop( "checked" ),
    "name": $parent.find( "p[id^=name-]" ).text(),
    "regexp": $parent.find( "p[id^=regexp-]" ).text(),
    "position": $parent.find( "input[id^=index-]" ).val(),
  };

  const id = $( this ).attr( "id" );
  const index = id.substring( id.indexOf( "-" ) + 1 );

  if ( value.name !== "" && value.regexp !== "" ) {
    changeSetting( "rules", index, value );
  }
} );

// Remove

$( "#remove-toggle" ).click( function() {
  $( "table" ).toggleClass( "remove" );
  $( this ).toggleClass( "toggled" );
} );

$( document ).on( "click", "td i[id^='remove-']", function() {
  popup( { "text": gM( "delete_rule_confirm" ), "cancel": gM( "cancel_button" ), "accept": gM( "delete_button" ) }, () => {
    if ( $( this ).parents( "tbody" ).children( "tr" ).length <= 1 ) {
      addRuleElement();
    }

    $( this ).parents( "tr" ).remove();

    const id = $( this ).attr( "id" );
    const index = id.substring( id.indexOf( "-" ) + 1 );

    removeRule( index );
  } );
} );

$( document ).on( "click", "th i#remove-master", function() {
  popup( { "text": gM( "delete_all_rules_confirm" ), "cancel": gM( "cancel_button" ), "accept": gM( "delete_button" ) }, () => {
    $( this ).parents( "table" ).children( "tbody" ).children( "tr" ).remove();
    addRuleElement();
  } );
} );

// Master checkbox
$( "input#row-master" ).change( function() {
  $( "tbody input[type='checkbox']" ).prop( "checked", $( this ).is( ":checked" ) ).trigger( "change" );
} );

$( document ).on( "change", "tbody input[type='checkbox']", allChecked );

$( "#changeKeys" ).click( ( e ) => {
  e.preventDefault();
  popup( { "header": gM( "change_shrt" ), "text": gM( "change_shrt_popup" ), "cancel": gM( "i_understand" ) } );
} );
