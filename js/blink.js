$(document).on((document.ontouchstart !== null) ? "mousedown" : "touchstart", ".blink", function() {
  const size = Math.min( $(this).width(), $(this).height() );
  const $blink = $("<div></div>").addClass("blink-blink").css({
    "width": size,
    "height": size,
  });

  $(this).append( $blink ).addClass("blink-parent");

  $(this).one((document.ontouchstart !== null) ? "mouseup" : "touchend", function() {
    const $this = $(this);
    $blink.addClass("blink-remove");
    $blink.on("transitionend", function() {
      $(this).remove();
      $this.removeClass("blink-parent");
    });
  });
});

$(document).on("click", ".blink-big", function(e) {
  const coordX = e.pageX - $(this).offset().left;
  const coordY = e.pageY - $(this).offset().top;

  const size = Math.max( $(this).width(), $(this).height() ) / 2;
  const $blink = $("<div></div>").addClass("blink-big-blink").css({
    "width": size,
    "height": size,
    "top": coordY - (size / 2),
    "left": coordX - (size / 2),
  });

  $(this).append( $blink ).addClass("blink-parent-big");

  const $this = $(this);

  $blink.one("animationend", function() {
    $(this).remove();
    $this.removeClass("blink-parent-big");
  });
});
