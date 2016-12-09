import { gM } from "./loadi18n";

export default function addRuleElement(name, i) {
  let names = {};

  if ( typeof name === "undefined" || name === null ) {
    names = { active: true, name: "", regexp: "", position: "", isEmpty: true };
  } else {
    names = name;
  }
  const x = i;
  const $row = $("<tr></tr>");

  // Active checkbox
  $row.append(
    $("<td></td>")
    .append(
      $("<input />").attr({
        "type": "checkbox",
        "id": `row-${x}`,
        "checked": names.active,
      }),
    )
    .append(
      $("<label></label>").attr({
        "for": `row-${x}`,
      }).html("<i class=\"material-icons\"></i>"),
    )
    .append(
      $("<i></i>").attr({
        "class": "material-icons blink blink-black",
        "id": `remove-${x}`,
      }).html("delete"),
    ),
  );

  // Name
  const $nameP = $("<p></p>").attr({
    "contenteditable": "true",
    "id": `name-${x}`,
    "class": "placeholder",
  }).html(names.name);

  $row.append(
    $("<td></td>")
    .append( $nameP )
    .append(
      $("<span></span>").attr("class", "placeholder").html( gM( "rule_name" ) ),
    ),
  );

  // Regexp
  $row.append(
    $("<td></td>")
    .append(
      $("<p></p>").attr({
        "contenteditable": "true",
        "id": `regexp-${x}`,
      }).html(names.regexp),
    ).append(
      $("<span></span>").attr("class", "placeholder").html( gM( "regular_expression" ) ),
    ),
  );

  // Index
  $row.append(
    $("<td></td>")
    .append(
      $("<input />").attr({
        "type": "number",
        "id": `index-${x}`,
        "placeholder": gM( "tab_index" ),
        "min": 0,
      }).val(names.position),
    )
    .append(
      $("<div></div>").attr({
        "class": "input-border",
      }),
    ),
  );

  $("tbody").append( $row );
  if ( typeof names.isEmpty !== "undefined" ) {
    $nameP.focus();
  }
}
