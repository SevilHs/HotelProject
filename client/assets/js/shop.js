var a = 0;
$(window).scroll(function() {
  var oTop = $('#per-counter').offset().top - window.innerHeight;
  if (a == 0 && $(window).scrollTop() > oTop) {
    // console.log($('.num'));
    $('.num').each(function() {
        var $this = $(this);
        jQuery({ Counter: 0 }).animate({ Counter: $this.text() }, {
            duration: 2000,
            easing: 'swing',
            step: function () {
                $this.text(`${Math.ceil(this.Counter)}%`);
            }
        });
    });
    a = 1;
  }
});

var b = 0;
$(window).scroll(function() {
  var oTop = $('#per-counter').offset().top - window.innerHeight;
  if (b == 0 && $(window).scrollTop() > oTop) {
    //   console.log($('.underline'));
    $('.underline').each(function() {
        var $this = $(this);
        // console.log($this.width());
        jQuery({ Counter: 0 }).animate({ Counter: $this.width() }, {
            duration: 2000,
            easing: 'swing',
            step: function () {
                $this.width(Math.ceil(this.Counter));
            }
        });
    });
    b = 1;
  }
});