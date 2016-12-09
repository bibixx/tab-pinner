export function gM(msg) {
  return chrome.i18n.getMessage( msg );
}


export function loadi18n() {
  document.title = gM( "options_title" );
  $("header h1").html( gM( "options_title" ) );
  $("main > h2#howto").html( gM( "how_to_header" ) );
  $("main > p").html( gM( "how_to" ) );
  $("a#changeKeys").html( gM( "change_shrt" ) );
  $("#card header h2").html( gM( "rules" ) );
  $("#rule_name").html( gM( "rule_name" ) );
  $("#regular_expression").html( gM( "regular_expression" ) );
  $("#tab_index").html( gM( "tab_index" ) );
  $("#settings_header").html( gM( "settings_header" ) );
  $("label[for='close'].text").html( gM( "close" ) );
  $("label[for='confirm'].text").html( gM( "close_conf" ) );
  $("label[for='move'].text").html( gM( "back_index" ) );
  $("footer").html( gM( "author" ) );
}
