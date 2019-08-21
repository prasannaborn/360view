(function($) {
  var defaults = {
    frames: 10,
    cursor: "move",
    speed: 0,
    entrance: true,
    preloadImages: true,
    touchSupport: true,
    loading: "Loading..",
    autoPlay: true
  };

  function touchHandler(event) {
    var touch = event.changedTouches[0];

    var simulatedEvent = document.createEvent("MouseEvent");
    simulatedEvent.initMouseEvent(
      {
        touchstart: "mousedown",
        touchmove: "mousemove",
        touchend: "mouseup"
      }[event.type],
      true,
      true,
      window,
      1,
      touch.screenX,
      touch.screenY,
      touch.clientX,
      touch.clientY,
      false,
      false,
      false,
      false,
      0,
      null
    );

    touch.target.dispatchEvent(simulatedEvent);
  }

  $.fn.preload = function(el) {
    $("<div class='images_cache'></div>")
      .hide()
      .appendTo(el);
    this.each(function() {
      $("<img/>")
        .attr("src", this)
        .appendTo(".images_cache");
    });
  };

  $.fn.drags = function(settings) {
    var $el = this;

    return $el
      .css("cursor", settings.cursor)
      .on("mousedown", function(e) {
        var $drag = $(this).addClass("draggable"),
          cur_pos = e.pageX,
          last_position = {};

        $drag.parents().on("mousemove", function(e) {
          //  $(".check").css("background-image", url("../ad/hotspot.png"));
          if ($(".draggable").length > 0) {
            var src = $el.find("img.main-frame").attr("src"),
              img_name = src.split("/")[src.split("/").length - 1],
              cur_frame = img_name.split("_")[1].split(".")[0];

            if (typeof last_position.x != "undefined") {
              //get the change from last position to this position
              var deltaX = last_position.x - e.clientX,
                deltaY = last_position.y - e.clientY;

              if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX > 0) {
                if (cur_frame > 1) {
                  setTimeout(function() {
                    var img_name = src.split("/")[src.split("/").length - 1];
                    var directory = src
                      .split("/")
                      .slice(0, -1)
                      .join("/");
                    var new_frame =
                      directory +
                      "/" +
                      img_name.split("_")[0] +
                      "_" +
                      (parseInt(cur_frame) - 1) +
                      "." +
                      img_name.split(".")[1];
                    //  console.log(img_name.split("_")[1] + "aa");
                    $el
                      .find("img.main-frame")
                      .attr("id", img_name.split("_")[1].split(".")[0]);
                    $el.find("img.main-frame").attr("src", new_frame);
                  }, settings.speed);
                } else {
                  setTimeout(function() {
                    var img_name = src.split("/")[src.split("/").length - 1];
                    var directory = src
                      .split("/")
                      .slice(0, -1)
                      .join("/");
                    var new_frame =
                      directory +
                      "/" +
                      img_name.split("_")[0] +
                      "_" +
                      parseInt(settings.frames) +
                      "." +
                      img_name.split(".")[1];
                    $el
                      .find("img.main-frame")
                      .attr("id", img_name.split("_")[1].split(".")[0]);
                    $el.find("img.main-frame").attr("src", new_frame);
                  }, settings.speed);
                }
              } else if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX < 0) {
                if (cur_frame < settings.frames) {
                  setTimeout(function() {
                    var img_name = src.split("/")[src.split("/").length - 1];
                    var directory = src
                      .split("/")
                      .slice(0, -1)
                      .join("/");
                    var new_frame =
                      directory +
                      "/" +
                      img_name.split("_")[0] +
                      "_" +
                      (parseInt(cur_frame) + 1) +
                      "." +
                      img_name.split(".")[1];
                    $el
                      .find("img.main-frame")
                      .attr("id", img_name.split("_")[1].split(".")[0]);
                    $el.find("img.main-frame").attr("src", new_frame);
                  }, settings.speed);
                } else {
                  setTimeout(function() {
                    var img_name = src.split("/")[src.split("/").length - 1];
                    var directory = src
                      .split("/")
                      .slice(0, -1)
                      .join("/");
                    var new_frame =
                      directory +
                      "/" +
                      img_name.split("_")[0] +
                      "_" +
                      1 +
                      "." +
                      img_name.split(".")[1];
                    $el
                      .find("img.main-frame")
                      .attr("id", img_name.split("_")[1].split(".")[0]);
                    $el.find("img.main-frame").attr("src", new_frame);
                  }, settings.speed);
                }
              }
            }
            last_position = {
              x: e.clientX,
              y: e.clientY
            };
          }
          $(".draggable").on("mouseup", function() {
            $(this).removeClass("draggable");
            $(".check").css("background-image", "");
          });
        });
        e.preventDefault(); // disable selection
      })
      .on("mouseup", function() {
        $(this).removeClass("draggable");
        $(".check").css("background-image", "");
      });
  };

  $.fn.interactive_3d = function(options) {
    var settings = $.extend({}, defaults, options),
      el = $(this);
    el.find(" > img").addClass("main-frame");
    el.drags(settings),
      (x = 0),
      (step = 100 / parseInt(settings.frames)),
      (cur_frame = el
        .find("img.main-frame")
        .attr("src")
        .split("_")[1]
        .split(".")[0]);
    /*  console.log(
      el
        .find("img.main-frame")
        .attr("src")
        .split("_")[1]
    );
    console.log(
      el
        .find("img.main-frame")
        .attr("src")
        .split(".")[0]
    ); */

    function animate_3d() {
      var src = el.find("img.main-frame").attr("src");
      el.find("img.main-frame").css("opacity", x / 100); // x * step
      if (cur_frame < settings.frames) {
        setTimeout(function() {
          var img_name = src.split("/")[src.split("/").length - 1];
          var directory = src
            .split("/")
            .slice(0, -1)
            .join("/");
          var new_frame =
            directory +
            "/" +
            img_name.split("_")[0] +
            "_" +
            (parseInt(cur_frame) + 1) +
            "." +
            img_name.split(".")[1];
          //console.log(parseInt(img_name.split("_")[1].split(".")[0]));
          el
            .find("img.main-frame")
            .attr("id", parseInt(img_name.split("_")[1].split(".")[0]));
          el.find("img.main-frame").attr("src", new_frame);
          cur_frame = parseInt(cur_frame) + 1;
        }, settings.speed);
      } else {
        setTimeout(function() {
          var img_name = src.split("/")[src.split("/").length - 1];
          var directory = src
            .split("/")
            .slice(0, -1)
            .join("/");
          var new_frame =
            directory +
            "/" +
            img_name.split("_")[0] +
            "_" +
            1 +
            "." +
            img_name.split(".")[1];
          el.find("img.main-frame").attr("src", new_frame);
          cur_frame = 1;
        }, settings.speed);
      }

      if (x++ < settings.frames - 1) {
        if (settings.autoPlay != false) {
          setTimeout(animate_3d, 25);
        } else {
          setTimeout(animate_3d, 25); // x * 1.5
        }
      }
    }

    if (settings.entrance == true && settings.autoPlay == false) {
      if (settings.loading == false && settings.autoPlay == false) animate_3d();
    }

    if (settings.touchSupport == true) {
      document.addEventListener("touchstart", touchHandler, true);
      document.addEventListener("touchmove", touchHandler, true);
      document.addEventListener("touchend", touchHandler, true);
      document.addEventListener("touchcancel", touchHandler, true);
    }

    if (settings.preloadImages == true) {
      var src = el.find("img.main-frame").attr("src");
      arr = [];
      for (var i = 1; i < settings.frames + 1; i++) {
        var img_name = src.split("/")[src.split("/").length - 1];
        var directory = src
          .split("/")
          .slice(0, -1)
          .join("/");
        arr.push(
          directory +
            "/" +
            img_name.split("_")[0] +
            "_" +
            i +
            "." +
            img_name.split(".")[1]
        );
      }
      $(arr).preload(el);

      if (settings.loading != false) {
        var imgs = $(".images_cache > img").not(function() {
          return this.complete;
        });
        var count = imgs.length;
        el.append("<div class='loading_3d'>" + settings.loading + "</div>");
        el.find(".main-frame").css("visibility", "hidden");
        if (count) {
          imgs.load(function() {
            count--;
            if (!count) {
              el.find(".main-frame").css("visibility", "visible");
              el.find(".loading_3d").remove();
              if (settings.autoPlay == false) animate_3d();
            }
          });
        } else {
          el.find(".main-frame").css("visibility", "visible");
          el.find(".loading_3d").remove();
          if (settings.autoPlay == false) animate_3d();
        }
      }
    }

    if (settings.autoPlay != false) {
      function intervalTrigger() {
        return window.setInterval(function() {
          animate_3d();
          var image = $("img.main-frame").attr(src);
          var z = parseInt(
            $("img.main-frame")
              .attr("src")
              .split("_")[1]
              .split(".")[0]
          );
          /*   console.log(
            $("img.main-frame")
              .attr("src")
              .split("_")[1]
              .split(".")[0]
          ); */
          switch (z) {
            case 1:
              $(".check").show();
              $(".logo").show();
              $(".check").css({
                right: "342px",
                top: "234px",
                height: "63px",
                width: "236px",
                transform: "rotate(35deg)"
              });
              $(".logo").css({
                left: "344px",
                top: "307px",
                width: "146px",
                height: "105px"
              });
              $(".check-in").removeClass("case80");
              $(".check-in").addClass("case1");

              $(".check-in").css({
                transform: "rotate(-35deg)",
                "margin-top": "-35px",
                "margin-left": "-88px",
                height: "181px"
              });
              $(".check-in span").css({
                top: "-14px",
                left: "-84px",
                "margin-left": "0px"
              });
              $(".logo-in").css({
                "margin-left": "58px",
                "margin-top": "-143px"
              });
              $(".logo-in span").css({
                left: "30x"
              });
              break;
            case 12:
              $(".check").css({
                right: "342px",
                top: "234px",
                height: "63px",
                width: "236px",
                transform: "rotate(35deg)"
              });
              /*  $(".check-in").css({
                transform: "rotate(-35deg)",
                "margin-top": "-67px",
                "margin-left": "101px"
              }); */
              break;
            case 15:
              $(".check-in").css({
                transform: "rotate(-35deg)",
                "margin-top": "-40px",
                "margin-left": "-90px"
              });
              break;
            case 25:
              $(".logo").css({
                left: "300px",
                top: "302px",
                width: "104px",
                height: "105px"
              });
              $(".logo-in").css({
                "margin-left": "38px"
              });
              $(".check-in").css({
                transform: "rotate(-35deg)",
                "margin-top": "-35px",
                "margin-left": "-120px",
                height: "50px"
              });
              break;
            case 30:
              $(".logo").css({
                left: "300px",
                top: "302px",
                width: "104px",
                height: "105px"
              });
              $(".logo-in:after").css({
                content: "' '",
                position: "absolute",
                left: "-27%",
                top: "120%"
              });
              $(".check-in").css({
                "margin-left": "-130px"
              });
              break;
            case 40:
              $(".check").css({
                transform: "rotate(90deg)",
                right: "369px",
                top: "209px",
                height: "157px",
                width: "204px"
              });
              $(".check-in").css({
                transform: "rotate(-90deg)",
                "margin-top": "135px",
                "margin-left": "-68px",
                height: "111px",
                width: "80%"
              });
              $(".logo").hide();
              break;
            case 55:
              $(".check-in").css({
                transform: "rotate(-90deg)",
                "margin-top": "135px",
                "margin-left": "-70px",
                height: "111px",
                width: "80%"
              });
              $(".logo").hide();
              break;
            case 75:
              $(".check").css({
                transform: "rotate(145deg)",
                right: "424px",
                top: "261px",
                height: "67px",
                width: "287px"
              });
              $(".check-in").removeClass("case1");
              $(".check-in").addClass("case80");
              $(".check-in").css({
                transform: "rotate(-145deg)",
                "margin-top": "85px",
                "margin-left": "52px",
                height: "178px;"
              });
              $(".check-in span").css({
                top: "-14px",
                left: "-57px",
                "margin-left": "0px",
                height: "178px;"
              });
              break;
            case 95:
              $(".check").css({
                transform: "rotate(140deg)",
                right: "459px",
                top: "253px",
                height: "58px",
                width: "287px"
              });
              $(".check-in").css({
                transform: "rotate(-140deg)",
                "margin-top": "83px",
                "margin-left": "40px",
                height: "111px;"
              });
              $(".check-in span").css({
                top: "-14px",
                left: "-57px",
                "margin-left": "0px"
              });
              break;
            case 105:
              $(".check").hide();
              break;
            case 110:
              $(".check").hide();
              break;
            case 130:
              $(".logo").show();
              $(".logo").css({
                left: "485px",
                width: "120px"
              });
              $(".logo-in").css({
                "margin-left": "58px"
              });
              $(".logo-in:after").css({
                left: "-26%",
                top: "115%"
              });
              break;
            case 135:
              $(".logo").css({
                left: "440px"
              });
              $(".logo-in").css({
                "margin-left": "52px"
              });
              $(".logo-in:after").css({
                content: "' '",
                position: "absolute",
                left: "-27%",
                top: "100%"
              });
              break;
            case 140:
              $(".logo").css({
                left: "400px"
              });
              $(".logo-in").css({
                "margin-left": "52px",
                "margin-top": "-145px"
              });
              $(".logo-in:after").css({
                content: "' '",
                position: "absolute",
                left: "-27%",
                top: "90%"
              });
              $(".check").css({
                height: "62px"
              });
              break;
            case 152:
              // z = 0;
              $(".logo-in").css({
                "margin-left": "35px",
                "margin-top": "-134px"
              });
              $(".check").hide();
              break;
          }
        }, 25); //settings.autoPlay ==> 40
      }

      var id = intervalTrigger();

      el
        .mouseenter(function() {
          window.clearInterval(id);
        })
        .mouseleave(function() {
          id = intervalTrigger();
        });
    }
  };
})(window.jQuery);
