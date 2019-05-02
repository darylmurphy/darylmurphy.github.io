(function($) {
	//plugin name: scrollForever
	//plugin author: caibaojian
	//plugin url: http://caibaojian.com/scrollForever
	//plugin demo: http://caibaojian.com/demo/scrollForever/
	//license: MIT
	$.fn.scrollForever = function(options) {
		var defaults = {
			placeholder: 0,//éžè¿žç»­æ»šåŠ¨æ—¶æ¯æ¬¡çš„æ»‘åŠ¨è·ç¦»ï¼Œå¯ä»¥è‡ªå®šä¹‰ï¼Œå¦‚æžœæ²¡æœ‰è‡ªå®šä¹‰åˆ™æ ¹
			dir: 'left',//æ»šåŠ¨æ–¹å‘ï¼Œleft & top
			container: 'ul',//å¤–å±‚å¯¹è±¡
			inner: 'li',//å†…éƒ¨å…ƒç´ 
			speed: 1000,//éžè¿žç»­æ»šåŠ¨é€Ÿåº¦
			delayTime: 0,//æ»šåŠ¨é—´éš”
			continuous: true,//æ˜¯å¦è¿žç»­
			num: 1//éžè¿žç»­ä¸€æ¬¡æ»šåŠ¨çš„æ•°é‡
		};
		var opts = $.extend({}, defaults, options);
		var placeHolder = opts.placeholder;
		var dir = opts.dir;
		var speed = opts.speed;
		var Time = opts.Time;
		var num = opts.num;
		var delayTime = opts.delayTime;
		return this.each(function() {
			var obj = $(this);
			var container = obj.find(opts.container);
			var inner = container.find(opts.inner);
			var len = inner.length;
			var distance, scrollDistance, scrollTime;
			//æ»šåŠ¨å‰çš„å‡†å¤‡å·¥ä½œ
			function setScroll() {
				if (opts.continuous) {
					if (dir == 'left') {
						distance = inner.outerWidth() * len;
						container.css('width', 2 * distance);
						inner.clone().appendTo(container);
					} else if (dir == 'top') {
						distance = inner.outerHeight() * len;
						container.css('height', 2 * distance);
						inner.clone().appendTo(container);
					}
				} else {
					if (dir == 'left') {
						placeHolder = placeHolder != 0 ? placeHolder : inner.outerWidth() * num;
						distance = inner.outerWidth() * (len + 1);
						container.css('width', distance);
					} else if (dir == 'top') {
						placeHolder = placeHolder != 0 ? placeHolder : inner.outerHeight() * num;
						distance = inner.outerHeight() * (len + 1);
						container.css('height', distance);
					}
				}
			}
			setScroll();
			function autoScroll() {

				if (opts.continuous) {
					//æ— ç¼ä¸é—´æ­‡æ»šåŠ¨
					if (dir == 'left') {
						scrollDistance = obj.scrollLeft();
						if (scrollDistance >= distance) {
							obj.scrollLeft(0);
						} else {
							obj.scrollLeft(scrollDistance + 1);
						}
					} else if (dir == 'top') {
						scrollDistance = obj.scrollTop();
						if (scrollDistance >= distance) {
							obj.scrollTop(0);
						} else {
							obj.scrollTop(scrollDistance + 1);
						}
					}
				} else {	
					//éžè¿žç»­æ»šåŠ¨ï¼Œé—´æ–­æ— ç¼æ»šåŠ¨
					if (dir == 'left') {
						container.animate({
							marginLeft: '-' + placeHolder
						}, speed, function() {
							container.css({
								marginLeft: 0
							}).find(opts.inner + ":lt(" + num + ")").appendTo(container);
						});
					} else if (dir == 'top') {
						container.animate({
							marginTop: "-" + placeHolder
						}, speed, function() {
							container.css({
								marginTop: 0
							}).find(opts.inner + ":lt(" + num + ")").appendTo(container);
						});
					}
				}

			}
			
			//æ»šåŠ¨å‡½æ•°
			var aTime = opts.continuous == true ? 20 : 2000;
			delayTime = delayTime == 0 ? aTime : delayTime;
			scrollTime = setInterval(autoScroll, delayTime);
			obj.hover(function() {
				clearInterval(scrollTime);
			}, function() {
				scrollTime = setInterval(autoScroll, delayTime);
			});
		})
	}
})(jQuery);