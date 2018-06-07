
/* #Shortcodes scroller
================================================== */
// setting width for scroller articles
	$.fn.scrollerSlideSize = function() {

		return this.each(function() {
			var $this = $(this),
				$img = $this.find("img").eq(0),
				imgW = parseInt($img.attr("width")),
				$container = $this.parents(".slider-wrapper"),
				$containerWidth = $container.width(),
				$maxWidth = $container.attr("data-max-width"),
				 sideSpace = parseInt($container.attr("data-padding-side"));
			
			

			var leftPadding = parseInt($img.parents(".wf-td").eq(0).css("paddingLeft")),
				rightPadding = parseInt($img.parents(".wf-td").eq(0).css("paddingRight")),
				addedW = 0;

			if (leftPadding > 0 && rightPadding > 0) addedW = leftPadding + rightPadding;

			
			//determine if max width has px or %
			if(typeof $maxWidth != "undefined"){
				var dataMaxWidth = ($containerWidth * parseFloat($maxWidth))/100 - addedW - sideSpace;
			}

			if(imgW > dataMaxWidth){
				var colmnW = dataMaxWidth;
			}else{
				var colmnW = parseInt($img.attr("width"));
				if (!$img.exists()) colmnW = 280;
			}

		
			$this.parents('.slider-wrapper').attr("data-width", colmnW + addedW);
			$this.css({
				width: colmnW + addedW
			});
		})
	}
	$(".slider-wrapper.description-under-image:not(.related-projects) article").scrollerSlideSize();

	//Scroller shortcode init

	var $sliderWrapper = $(".slider-wrapper:not(.related-projects)");

	$sliderWrapper.each(function(){
		var $this = $(this),
			$colGap = $this.attr("data-padding-side") ? parseInt($this.attr("data-padding-side")) : 0,
			$autoPlay = ( 'true' === $this.attr("data-autoslide")) ? true : false,
			$autoPlayTimeout = $this.attr("data-delay") ? parseInt($this.attr("data-delay")) : 6000,
			$enableArrows = ( 'true' === $this.attr("data-arrows")) ? true : false,
			$desktopCol =  $this.attr("data-width") ? $sliderWrapper.width() / parseInt($this.attr("data-width")) : $sliderWrapper.width()/$sliderWrapper.find('article img').attr('width'),
			$enableRtl = ( "rtl" == jQuery(document).attr( "dir" ) ) ? true : false,
			$nextIcon = $this.attr("data-next-icon") ? $this.attr("data-next-icon") : 'icon-ar-018-r',
			$prevIcon = $this.attr("data-prev-icon") ? $this.attr("data-prev-icon") : 'icon-ar-018-l',
			interceptClicksTimer;
			
		if($this.attr("data-width")) {
			$desktopCol =  $sliderWrapper.width() / parseInt($this.attr("data-width")) ;
		}else if ($this.attr("data-max-width")) {
			
			$desktopCol =   $sliderWrapper.width() / parseInt($this.attr("data-max-width"));
		}else {
			$desktopCol =   $sliderWrapper.width()/$sliderWrapper.find('article img').attr('width');
		}
		
		$this.owlCarousel({
			rtl: $enableRtl,
			items: $desktopCol,
			autoHeight: false,
		   	margin:$colGap,
		   	loadedClass: 'owl-loaded',
		   	slideBy: 'page',
		    loop:false,
		    smartSpeed: 600,
		    merge:true,
		    autoWidth:true,
		   // onInitialized: callback,
		    responsive:{
		        678:{
		            mergeFit:true
		        },
		        1000:{
		            mergeFit:false
		        }
		    },
		    autoplay: $autoPlay,
		    autoplayTimeout: $autoPlayTimeout,
		    autoplayHoverPause: true,
		    nav: $enableArrows,
		    navElement: "a",
		    navText: ['<i class=' + $prevIcon + ' ></i>', '<i class='+ $nextIcon +' ></i>'],
		    dots: false,
		    onInitialize: callbackHeight,
		    onInitialized: callback,
       		onRefreshed: callback
		}).trigger('refresh.owl.carousel');
		function callbackHeight(event) {
			var $maxWidth = parseInt($this.attr("data-max-width")),
				dataMaxWidth = ($sliderWrapper.width() * parseFloat($maxWidth))/100 - $colGap,
				imgW = parseInt($this.find('img').attr('width')),
				imgH = parseInt($this.find('img').attr('height'));
			if($maxWidth && dataMaxWidth < imgW) {
				$this.find('article').css({
					'max-width': dataMaxWidth + 'px'
				});
				$this.find('img').css({
					'max-width': dataMaxWidth + 'px',
					height: dataMaxWidth * imgH / imgW
				});
			}
		}
		function callback(event) {
	        var $stage = $this.find('.owl-stage'),
	            stageW = $stage.width(),
	            $el = $this.find('.dt-owl-item'),
	            elW = 0;
	        elW = ($el.width()+ parseInt($el.css("margin-right"))) * event.item.count 
	        if ( elW > stageW ) {
	           $stage.width( elW );
	        };
		}

		//add class for preventing click while dragging
		$this.on('drag.owl.carousel translate.owl.carousel', function(event) {
			$this.addClass('ts-interceptClicks');
		})
		$this.on('dragged.owl.carousel translated.owl.carousel', function(event) {
			clearTimeout( interceptClicksTimer );
          	interceptClicksTimer = setTimeout(function(){
				$this.removeClass('ts-interceptClicks');
			}, 400)
		});
		
		
		$this.on('changed.owl.carousel', function(event) {
			if($(".dt-owl-item.cloned .is-loaded", $this ).parents().hasClass("layzr-bg")){
		   		$(".dt-owl-item.cloned .is-loaded", $this ).parents().removeClass("layzr-bg");
			}
			$('.dt-owl-item.cloned .photoswipe-wrapper, .dt-owl-item.cloned .photoswipe-item .dt-gallery-container', $this).initPhotoswipe();
			$(".animate-element:not(.start-animation):in-viewport", $this).checkInViewport();
		})	

		//Stop autoplay on hover
		$this.find('.dt-owl-item').on('mouseenter',function(e){
			if($autoPlay){
		    	$this.trigger('stop.owl.autoplay');
		    }
		});
		//run autoplay on mouseleave
		$this.find('.dt-owl-item').on('mouseleave',function(e){
			if($autoPlay){
				$this.trigger('play.owl.autoplay',[$animSpeed]);
			}
		});

		//show hide arrows on hover
		$this.on("mouseenter", function(e) {
			$this.addClass("show-arrows");
		});
		$this.on("mouseleave", function(e) {
			$this.removeClass("show-arrows");
		});
		
	});

	
	//Slideshow
	$.fn.postTypeScroller = function() {

		var $this = $(this),
			$enableRtl = ( "rtl" == jQuery(document).attr( "dir" ) ) ? true : false,
			$nextIcon = $this.attr("data-next-icon") ? $this.attr("data-next-icon") : 'icon-ar-018-r',
			$prevIcon = $this.attr("data-prev-icon") ? $this.attr("data-prev-icon") : 'icon-ar-018-l',
			paddings = $this.attr("data-padding-side") ? parseInt($this.attr("data-padding-side")) : 0,
			$sliderAutoslideEnable = ( 'true' != $this.attr("data-paused") && typeof $this.attr("data-autoslide") != "undefined" ) ? true : false,
			$sliderAutoslide = ( 'true' === $this.attr("data-paused") ) ? false : true,
			$sliderAutoslideDelay = $this.attr("data-autoslide") && parseInt($this.attr("data-autoslide")) > 999 ? parseInt($this.attr("data-autoslide")) : 5000,
			$sliderLoop = (  typeof $this.attr("data-autoslide") != "undefined" ) ? true : false,
			$sliderWidth = $this.attr("data-width") ? parseInt($this.attr("data-width")) : 800,
			$sliderHight = $this.attr("data-height") ? parseInt($this.attr("data-height")) : 400,
			imgMode = $this.attr("data-img-mode") ? $this.attr("data-img-mode") : "fill";

		$this.owlCarousel({
			rtl: $enableRtl,
			items: 1,
			autoHeight: false,
			center: false,
		   	margin:0,
		   	loadedClass: 'owl-loaded',
		   	slideBy: 1,
		    loop:true,
		    smartSpeed: 600,
		    autoplay: true,
		    autoplayTimeout: $sliderAutoslideDelay,    
    		//autoplayHoverPause:true,
		    nav: true,
		    navElement: "a",
		    navText: ['<i class=' + $prevIcon + ' ></i>', '<i class='+ $nextIcon +' ></i>'],
		    dots: false
		});
		$this.find('.dt-owl-item').each(function(i) {
			var $slide = $(this),
				tempCSS = {};
			var img = $slide.find("img");
			var classToFind = 'rsMainSlideImage';
			var isVideo;
			var 
				
				tempEl;

			if(!img) {
				return;
			}
			var ratioS = 1;
			ratioS = $sliderHight < $sliderWidth ? $sliderHight/$sliderWidth : $sliderHight/$sliderWidth;
			$slide.css({
				height: ratioS * $slide.width()
			});

			var baseImageWidth = parseInt(img.attr("width")),
				baseImageHeight = parseInt(img.attr("height"));

			var containerWidth = $slide.width(),
				containerHeight = $slide.height(),
				hRatio,
				vRatio,
				ratio,
				nWidth,
				nHeight,
				cssObj = {};
				hRatio = containerWidth / baseImageWidth;
				vRatio = containerHeight / baseImageHeight;

				if ($this.attr("data-img-mode")  == "fill") {
					ratio = hRatio > vRatio ? hRatio : vRatio;                          
				} else if ($this.attr("data-img-mode")  == "fit") {
					ratio = hRatio < vRatio ? hRatio : vRatio;                    
				} else {
					ratio = hRatio > vRatio ? hRatio : vRatio;  
				}

				nWidth = Math.ceil(baseImageWidth * ratio, 10);
				nHeight = Math.ceil(baseImageHeight * ratio, 10);
				cssObj.width = nWidth;
				cssObj.height = nHeight;
			//}
			img.css(cssObj);
		});

		if(typeof $this.attr("data-autoslide") != "undefined"){
			$('<div class="psPlay"></div>').appendTo($this);
		}

		if( 'true' === $this.attr("data-paused") ){
			$(".psPlay", $this).addClass("paused");
			$this.trigger('stop.owl.autoplay');
		};
		$(".psPlay", $this).on("click", function(e){
			e.preventDefault();
			var $this = $(this);
			if( $this.hasClass("paused")){
				$this.removeClass("paused");
				$sliderAutoslideEnable = true;
				$this.trigger('play.owl.autoplay',[$sliderAutoslideDelay, 600])
			}else{
				$this.addClass("paused");
				$this.trigger('stop.owl.autoplay');
			}
		});
	};
	$(".slider-simple:not(.slider-masonry)").each(function(){
		$(this).postTypeScroller();
	});

	//Widgets
	var $widgetSlider = $(".slider-content");
	$widgetSlider.each(function(){
		var $this = $(this),
			$autoPlay = ( typeof $this.attr("data-autoslide") != 'undefined') ? true : false,
			$autoPlayTimeout = $this.attr("data-autoslide") ? parseInt($this.attr("data-autoslide")) : 6000,
			$enableRtl = ( "rtl" == jQuery(document).attr( "dir" ) ) ? true : false;
	
		$this.owlCarousel({
			rtl: $enableRtl,
			items: 1,
			autoHeight: true,
		   	margin: 0,
		   	loadedClass: 'owl-loaded',
		   	slideBy: 'page',
		    loop:true,
		    smartSpeed: 600,
		    autoplay: $autoPlay,
		    autoplayTimeout: $autoPlayTimeout,
		    autoplayHoverPause: true,
		    nav: false,
		    dots: true,
		    dotsEach:true
		});
	}).css("visibility", "visible");
	//Carousels

	$('.dt-owl-carousel-call, .related-projects').each(function(){
		var $this = $(this),
			$slideAll,
			$colGap = $this.attr("data-col-gap") ? parseInt($this.attr("data-col-gap")) : 0,
			$autoHeight = ( 'true' === $this.attr("data-auto-height")) ? true : false,
			$animSpeed =  $this.attr("data-speed") ? parseInt($this.attr("data-speed")) : 600,
			$autoPlay = ( 'true' === $this.attr("data-autoplay")) ? true : false,
			$autoPlayTimeout = $this.attr("data-autoplay_speed") ? parseInt($this.attr("data-autoplay_speed")) : 6000,
			$enableArrows = ( 'true' === $this.attr("data-arrows")) ? true : false,
			$enableDots = ( 'true' === $this.attr("data-bullet")) ? true : false,
			$desktopWideCol =  $this.attr("data-wide-col-num") ? parseInt($this.attr("data-wide-col-num")) : 3,
			$desktopCol =  $this.attr("data-col-num") ? parseInt($this.attr("data-col-num")) : 3,
			$laptopCol =  $this.attr("data-laptop-col") ? parseInt($this.attr("data-laptop-col")) : 3,
			$hTabletCol =  $this.attr("data-h-tablet-columns-num") ? parseInt($this.attr("data-h-tablet-columns-num")) : 3,
			$vTabletCol =  $this.attr("data-v-tablet-columns-num") ? parseInt($this.attr("data-v-tablet-columns-num")) : 2,
			$phoneCol =  $this.attr("data-phone-columns-num") ? parseInt($this.attr("data-phone-columns-num")) : 1,
			$enableRtl = ( "rtl" == jQuery(document).attr( "dir" ) ) ? true : false,
			$slideBy =  ('1' == $this.attr("data-scroll-mode")) ? parseInt($this.attr("data-scroll-mode")) : 'page',
			$nextIcon = $this.attr("data-next-icon") ? $this.attr("data-next-icon") : 'icon-ar-002-r',
			$prevIcon = $this.attr("data-prev-icon") ? $this.attr("data-prev-icon") : 'icon-ar-001-l',
			$dotsEach = ('1' == $this.attr("data-scroll-mode") && $enableDots) ? true : false,
			reloadAnimTimer,
			refreshCarousTimer;
	
			if($this.attr("data-col-gap")){
				$colGap = parseInt($this.attr("data-col-gap"));
			}else if($this.attr("data-padding-side")){
				$colGap = parseInt($this.attr("data-padding-side"));
			}else{
				$colGap = 0;
			}
		$this.owlCarousel({
			rtl: $enableRtl,
			items: $desktopWideCol,
			autoHeight: $autoHeight,
		   	margin:$colGap,
		   	loadedClass: 'owl-loaded',
		   	slideBy: $slideBy,
		    loop:true,
		    smartSpeed: $animSpeed,
		    responsive:{
		        0:{
		            items:$phoneCol,
		            loop:($this.children().length > $phoneCol) ? true : false,
		        },
		        481:{
		        	loop:($this.children().length > $vTabletCol) ? true : false,
		            items:$vTabletCol
		        },
		        751:{
		        	loop:($this.children().length > $hTabletCol) ? true : false,
		            items:$hTabletCol
		        },
		        1025:{
		        	loop:($this.children().length > $laptopCol) ? true : false,
		            items:$laptopCol
		        },
		        1100:{
		        	loop:($this.children().length > $desktopCol) ? true : false,
		            items:$desktopCol
		        },
		        1450:{
		        	loop:($this.children().length > $desktopWideCol) ? true : false,
		            items:$desktopWideCol
		        }
		    },
		    autoplay: $autoPlay,
		    autoplayTimeout: $autoPlayTimeout,
		    autoplayHoverPause: true,
		    nav: $enableArrows,
		    navElement: "a",
		    navText: ['<i class=' + $prevIcon + ' ></i>', '<i class='+ $nextIcon +' ></i>'],
		    dots: $enableDots,
		    dotsEach:$dotsEach
		});
		//Blog: layout text on image
		if($this.hasClass("content-rollover-layout-list") && ! $this.hasClass("disable-layout-hover")){
			$this.find(".post-entry-wrapper").each(function(){
				var $this = $(this),
					$thisOfTop = $this.find(".entry-excerpt").height() + $this.find(".post-details").innerHeight();
				$this.css(
					'transform', 'translateY(' + $thisOfTop + 'px)'
				);
				$this.parents(".post").first().on("mouseenter", function(e) {
					$this.css(
						'transform', 'translateY(0px)'
					);
				});
				$this.parents(".post").first().on("mouseleave", function(e) {
					$this.css(
						'transform', 'translateY(' + $thisOfTop + 'px)'
					);
				});
			})
		}
		clearTimeout( refreshCarousTimer );
        refreshCarousTimer = setTimeout(function(){
			$this.trigger('refresh.owl.carousel');

		}, $animSpeed);
		
		addOnloadEvent(function(){ 
			$this.trigger('refresh.owl.carousel');

			$(".dt-owl-item.cloned" ).layzrInitialisation();

			if($this.hasClass("content-rollover-layout-list") && ! $this.hasClass("disable-layout-hover")){
				$this.find(".post-entry-wrapper").each(function(){
					var $this = $(this),
						$thisOfTop = $this.find(".entry-excerpt").height() + $this.find(".post-details").innerHeight();
					$this.css(
						'transform', 'translateY(' + $thisOfTop + 'px)'
					);
					$this.parents(".post").first().on("mouseenter", function(e) {
						$this.css(
							'transform', 'translateY(0px)'
						);
					});
					$this.parents(".post").first().on("mouseleave", function(e) {
						$this.css(
							'transform', 'translateY(' + $thisOfTop + 'px)'
						);
					});
				})
			}
			clearTimeout( reloadAnimTimer );
          	reloadAnimTimer = setTimeout(function(){
				$(".dt-owl-item.cloned .animate-element.animation-triggered:not(.start-animation)").addClass("start-animation");
			},50);
			
		});
		$this.on('changed.owl.carousel', function(event) {
		   if($(".dt-owl-item.cloned .is-loaded", $this ).parents().hasClass("layzr-bg")){
		   		$(".dt-owl-item.cloned .is-loaded", $this ).parents().removeClass("layzr-bg");
		   }
		   $('.dt-owl-item.cloned .photoswipe-wrapper, .dt-owl-item.cloned .photoswipe-item .dt-gallery-container', $this).initPhotoswipe();
				$(".animate-element:not(.start-animation):in-viewport", $this).checkInViewport();
		})	

		
		$this.find('.dt-owl-item').on('mouseenter',function(e){
			if($autoPlay){
		    	$this.trigger('stop.owl.autoplay');
		    }
		})
		$this.find('.dt-owl-item').on('mouseleave',function(e){
			if($autoPlay){
				$this.trigger('play.owl.autoplay',[$animSpeed]);
			}
		})
		
	});
	
