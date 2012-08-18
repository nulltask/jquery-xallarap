
/*!
 * jQuery Xallarap 0.0.1
 *
 * @dependency jQuery 1.7+
 * @author Uniba Inc.
 * @license MIT License
 */

(function(window, document, $) {

  var $window = $(window)
    , scrollTop = 0
    , windowHeight = 0;

  $.fn.xallarap = function(options, callback) {
    var options = options || {}
      , callback = options.callback || callback || defaultCallback;

    return this.each(function() {
      var $this = $(this);

      /**
       * Store original position and offset.
       */

      $this
        .data('xap-position', $this.position())
        .data('xap-offset', $this.offset())
        .data('xap-easing', $this.data('xap-easing') || options.easing || 'swing')
        .data('xap-duration', $this.data('xap-duration') || options.duration || 400)
        .data('xap-value', $this.data('xap-value') || options.value || 400);
      
      /**
       * Scroll handler.
       */

      $window.on('scroll', function(e) {
        var position = $this.data('xap-position')
          , offset = $this.data('xap-offset')
          , value = $this.data('xap-value')
          , percent = (scrollTop - offset.top - $this.height() / 2 + windowHeight / 2) / offset.top;

        callback.call($this, position, offset, value, percent);
      });
    });
  };

  /**
   * Cache window states.
   */

  $(function() {
    $(window).on('resize scroll', function(e) {
      scrollTop = $window.scrollTop();
      windowHeight = $window.height();
    }).trigger('resize');
  });

  /**
   * Default callback function.
   */

  function defaultCallback(position, offset, value, percent) {
    var $this = $(this);

    $this
      .stop()
      .animate({ top: position.top - (value * percent) }, $this.data('duration'), $this.data('easing'));
  }

}).call(this, window, document, jQuery);
