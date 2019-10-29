;(function ( $, window, undefined ) {

    // Create the defaults once
    var pluginName = 'instastream',
        document = window.document,
        defaults = {
            instaUser: '4090409456',
            instaResults: 12,
            instaMenu: 'false'
        };
    
    var $nbrResults;
    var $instaUrl;
    var $slideStatus =0;
    // Constructor
    function Plugin( element, options ) {
        this.element = element;
        
        this.options = $.extend( {}, defaults, options) ;      
        this._defaults = defaults;
        this._name = pluginName;        
        this.init();
    }
    
    // Date converter 
		String.prototype.timeconverter=function(){
		    var a = new Date(this*1000);
		    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
		    var year = a.getFullYear();
			  var month = months[a.getMonth()];
			  var date = a.getDate();
			  var time = date+' '+month+' '+year ;
				return time;
		};
		
		// Stream function
		$.fn.createStream = function(slide, target){
		var j = slide;
    	
    	
    	// stream constructor
		  $.ajax({
	    	type: "GET",
			dataType: "jsonp",
			cache: false,
			url: $instaUrl,
			success: function(data) {
				console.log(data);
				
				$(target).append("<div id='sync1' class='owl-carousel owl-theme'></div>");
		    	for (var i = 0; i < $nbrResults; i++) {
				  if (j<20){
					
					if(data.data[j].caption == null){var myCaption = '';} else{var myCaption = data.data[j].caption.text;}
					if (data.data[j].comments.count < 2){var commentLabel = 'commentaire'} else {var commentLabel = 'commentaires'}
					if(data.data[j].likes.count == null){var myCaption = '';} else{var likes = data.data[j].likes.count;}
					$('.owl-carousel').append("<div class='item'><a class='animation-container' target='_blank' href='" + data.data[j].link + "'><img class='instagram-img' src='" + data.data[j].images.standard_resolution.url + "' alt='" + myCaption + "'></a><div class=\"insta-overlay\"><div class=\"img-info\"><div class='likes'><img src=\"./files/img/icons/heart.svg\" class=\"icon-sml\"/><p>" + likes + "</p></div><p>" + myCaption + "</p></div></div></div>"); 
					j++;
					$slideStatus = j;
				}
			  };
				var sync1 = $("#sync1");
				var syncedSecondary = true;
					sync1.owlCarousel({
						navigation : false, // Show next and prev buttons
						dots: false,
						autoplaySpeed: 800,
						singleItem: true,
						items: 3,
						autoplay: true,
						autoplayHoverPause: true,
						animateOut: 'fadeOut',
						autoplayTimeout: 3000,
						loop: true,
						// rewind: true,
						responsiveRefreshRate: 500,
						autoWidth: true,
					}).on('changed.owl.carousel', syncPosition);

				  	$('.owl-carousel').on('touchstart',function(){
				  		console.log("swiped");
						var carousel = sync1.data('owl.carousel');
						carousel.settings.autoplayTimeout = 50000;
						carousel.options.autoplayTimeout = 50000;
						carousel.settings.autoplay = false;
						carousel.options.autoplay = false;
						sync1.trigger('refresh.owl.carousel');
					});
			}
			});		 
		     
    }
    
    Plugin.prototype.init = function () {
    	// Initial variables
    	$slideStatus =0;
    	$nbrResults =this.options.instaResults;
    	$instaMenu = this.options.instaMenu;
    	$instaUrl = 'https://api.instagram.com/v1/users/' + this.options.instaUser + '/media/recent/?access_token=' + this.options.instaToken;
	    var $myContainer = this.element;
		$().createStream($slideStatus,$myContainer);
    };

    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
            }
        });
    };
}(jQuery, window));
 
function syncPosition(el) {
    var count = el.item.count-1;
    var current = Math.round(el.item.index - (el.item.count/2) - .5);
    
    if(current < 0) {
      current = count;
    }
    if(current > count) {
      current = 0;
    }
}