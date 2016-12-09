export function createPopup() {
  if ( $(".popup").length <= 0 ) {
    $("body").append(
      $("<div></div>").addClass("popup")
        .append($("<div></div>").addClass("popup-container")
          .append($("<div></div>").addClass("popup-text-area")
            .append($("<h2></h2>"))
            .append($("<p></p>")),
          )
          .append($("<div></div>").addClass("popup-button-area")
            .append($("<button></button>").addClass("blink-big blink-black").attr("id", "popup-cancel").html("Anuluj"))
            .append($("<button></button>").addClass("blink-big blink-black").attr("id", "popup-accept").html("Usuń")),
          ),
        ),
    );
  }
}

export function popup(text, callback = () => {}) {
  $(".popup").addClass("visible");
  $(".popup").find(".popup-text-area p").html(text.text);
  if ( text.header ) {
    $(".popup").find("h2").html(text.header).show();
  } else {
    $(".popup").find("h2").hide();
  }

  if ( text.cancel ) {
    $(".popup").find("#popup-cancel").html(text.cancel).show().focus();
  } else {
    $(".popup").find("#popup-cancel").hide();
  }

  if ( text.accept ) {
    $(".popup").find("#popup-accept").html(text.accept).show().focus();
  } else {
    $(".popup").find("#popup-accept").hide();
  }

  $(".popup #popup-accept").bind("click", () => {
    $(".popup").removeClass("visible");
    callback();
  });


  $(".popup #popup-cancel").bind("click", () => {
    $(".popup #popup-accept").unbind("click");
    $(".popup").removeClass("visible");
  });
}
