var woodmartThemeModule;

(function($) {
    "use strict";

    woodmartThemeModule = (function() {

        var woodmartTheme = {
            popupEffect: 'mfp-move-horizontal',
            supports_html5_storage: false,
            bootstrapTooltips: '.woodmart-tooltip, .product-actions-btns > a, .wrapp-buttons .woodmart-buttons > div:not(.woodmart-add-btn) a, .wrapp-buttons .woodmart-buttons .woodmart-add-btn, body:not(.catalog-mode-on):not(.login-see-prices) .woodmart-hover-base:not(.product-in-carousel) .woodmart-buttons > div:not(.woodmart-add-btn) a, body:not(.catalog-mode-on):not(.login-see-prices) .woodmart-hover-base.hover-width-small:not(.product-in-carousel) .woodmart-add-btn, body:not(.catalog-mode-on):not(.login-see-prices) .woodmart-hover-base.add-small-button:not(.product-in-carousel) .woodmart-add-btn, .woodmart-hover-base .product-compare-button a',
        };

        // .quick-view a, .product-grid-item .product-compare-button a, .product-grid-item .yith-wcwl-add-to-wishlist a

        /* Storage Handling */
        try {
            woodmartTheme.supports_html5_storage = ( 'sessionStorage' in window && window.sessionStorage !== null );

            window.sessionStorage.setItem( 'woodmart', 'test' );
            window.sessionStorage.removeItem( 'woodmart' );
        } catch( err ) {
            woodmartTheme.supports_html5_storage = false;
        }

        return {

            init: function() {
                
                this.headerBanner();

                this.fastClicker();

				if (woodmart_settings.header_builder == 'yes') {
					this.headerBuilder()
				} else {
					this.fixedHeaders()

					this.splitNavHeader()
				}

                this.visibleElements();

                this.bannersHover();

                this.portfolioEffects();

                this.parallax();

                this.googleMap();

                this.scrollTop();

                this.sidebarMenu();

                this.widgetsHidable();
                
                this.stickyColumn();

                this.mfpPopup();

                this.blogMasonry();

                this.blogLoadMore();

                this.portfolioLoadMore();

                this.equalizeColumns();

                this.menuSetUp();

                this.menuOffsets();

                this.onePageMenu();

                this.mobileNavigation();

                this.simpleDropdown();

                this.promoPopup();

                this.contentPopup();

                this.cookiesPopup();

                this.btnsToolTips();

                this.stickyFooter();

                this.countDownTimer();

                this.nanoScroller();
                
                this.RTL();
                
                this.gradientShift();

                this.videoPoster();

                this.mobileSearchIcon();

                this.fullScreenMenu();
                
                this.searchFullScreen();

                this.wooInit();

                this.lazyLoading();

                this.ajaxSearch();

                this.photoswipeImages();

                this.stickySocialButtons();

                this.animationsOffset();

                this.hiddenSidebar();
                
                $(window).resize();

            },
            
            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * WooCommerce init
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            
            wooInit: function() {
                if ( ! woodmart_settings.woo_installed ) return;
                
                this.loginDropdown();
                
                this.loginSidebar();
                
                this.productLoaderPosition();
                
                this.initZoom();

                this.woocommerceWrappTable();
                
                this.woocommerceComments();
                
                this.onRemoveFromCart();
                
                this.woocommerceNotices();

                this.woocommerceQuantity();
                                
                this.updateWishListNumberInit();

                this.cartWidget();

                this.ajaxFilters();

                this.shopPageInit();

                this.filtersArea();

                this.categoriesMenu();

                this.headerCategoriesMenu();

                this.loginTabs();
                
                this.productVideo();

                this.product360Button();
                
                this.wishList();

                this.compare();
                
                this.productsLoadMore();

                this.productsTabs();
                
                this.swatchesVariations();

                this.swatchesOnGrid();
                
                this.quickViewInit();

                this.quickShop();

                this.addToCart();

                this.productAccordion();

                this.productImagesGallery();

                this.productImages();

                this.stickyDetails();

                this.stickyAddToCart();

                this.stickySidebarBtn();
            },

            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Hidden sidebar button
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */

            hiddenSidebar: function () {
                $('body').on('click', '.woodmart-show-sidebar-btn, .woodmart-sticky-sidebar-opener', function (e) {
                    e.preventDefault();
                    if ($('.sidebar-container').hasClass('show-hidden-sidebar')) {
                        woodmartThemeModule.hideShopSidebar();
                    } else {
                        showSidebar();
                    }
                });

                $('body').on("click touchstart", ".woodmart-close-side, .close-side-widget", function () {
                    woodmartThemeModule.hideShopSidebar();
                });

                var showSidebar = function () {
                    $('.sidebar-container').addClass('show-hidden-sidebar');
                    $('.woodmart-close-side').addClass('woodmart-close-side-opened');
                    $('.woodmart-show-sidebar-btn').addClass('btn-clicked');

                    if ($(window).width() >= 1024) {
                        $(".sidebar-inner.woodmart-sidebar-scroll").nanoScroller({
                            paneClass: 'woodmart-scroll-pane',
                            sliderClass: 'woodmart-scroll-slider',
                            contentClass: 'woodmart-sidebar-content',
                            preventPageScrolling: false
                        });
                    }
                };
            },

            hideShopSidebar: function () {
                $('.woodmart-show-sidebar-btn').removeClass('btn-clicked');
                $('.sidebar-container').removeClass('show-hidden-sidebar');
                $('.woodmart-close-side').removeClass('woodmart-close-side-opened');
                $('.sidebar-inner.woodmart-scroll').nanoScroller({ destroy: true });
            },
            
            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Css animations offset
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */

            animationsOffset: function () {
                if (typeof ($.fn.waypoint) == 'undefined') return;

                $('.wpb_animate_when_almost_visible:not(.wpb_start_animation)').waypoint(function () {
                    $(this).addClass('wpb_start_animation animated')
                }, {
                        offset: '100%'
                    });
            },

            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Social buttons class on load
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */

            stickySocialButtons: function () {
                $('.woodmart-sticky-social').addClass('buttons-loaded');
            },

            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Photoswipe gallery
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */

            photoswipeImages: function () {
                $('.photoswipe-images').each(function () {
                    var $this = $(this);
                    $this.on('click', 'a', function (e) {
                        e.preventDefault();
                        var index = $(e.currentTarget).data('index') - 1;
                        var items = getGalleryItems($this, []);
                        woodmartThemeModule.callPhotoSwipe(index, items);
                    });
                });

                var getGalleryItems = function ($gallery, items) {
                    var src, width, height, title;

                    $gallery.find('a').each(function () {
                        src = $(this).attr('href');
                        width = $(this).data('width');
                        height = $(this).data('height');
                        title = $(this).attr('title');
                        if (!isItemInArray(items, src)) {
                            items.push({
                                src: src,
                                w: width,
                                h: height,
                                title: title
                            });
                        }
                    });

                    return items;
                };

                var isItemInArray = function (items, src) {
                    var i;
                    for (i = 0; i < items.length; i++) {
                        if (items[i].src == src) {
                            return true;
                        }
                    }

                    return false;
                };
            },
             
            callPhotoSwipe: function (index, items) {
                var pswpElement = document.querySelectorAll('.pswp')[0];

                if ($('body').hasClass('rtl')) {
                    index = items.length - index - 1;
                    items = items.reverse();
                }

                // define options (if needed)
                var options = {
                    // optionName: 'option value'
                    // for example:
                    index: index, // start at first slide
                    shareButtons: [
                        { id: 'facebook', label: woodmart_settings.share_fb, url: 'https://www.facebook.com/sharer/sharer.php?u={{url}}' },
                        { id: 'twitter', label: woodmart_settings.tweet, url: 'https://twitter.com/intent/tweet?text={{text}}&url={{url}}' },
                        {
                            id: 'pinterest', label: woodmart_settings.pin_it, url: 'http://www.pinterest.com/pin/create/button/' +
                                '?url={{url}}&media={{image_url}}&description={{text}}'
                        },
                        { id: 'download', label: woodmart_settings.download_image, url: '{{raw_image_url}}', download: true }
                    ],
                    // getThumbBoundsFn: function(index) {

                    //     // get window scroll Y
                    //     var pageYScroll = window.pageYOffset || document.documentElement.scrollTop; 
                    //     // optionally get horizontal scroll

                    //     // get position of element relative to viewport
                    //     var rect = $target.offset(); 

                    //     // w = width
                    //     return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};


                    // }
                };

                // Initializes and opens PhotoSwipe
                var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
                gallery.init();
            },
            
            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Header banner
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
             
            headerBanner: function() {
                var banner_version = woodmart_settings.header_banner_version,
                    banner_btn = woodmart_settings.header_banner_close_btn,
                    banner_enabled = woodmart_settings.header_banner_enabled;
                if( Cookies.get( 'woodmart_tb_banner_' + banner_version ) == 'closed' || banner_btn == false || banner_enabled == false ) return;
                var banner = $( '.header-banner' );
                
                $( 'body' ).addClass( 'header-banner-display' );
            
                banner.on( 'click', '.close-header-banner', function( e ) {
                    e.preventDefault();
                    closeBanner();
                })

                var closeBanner = function() {
                    $( 'body' ).removeClass( 'header-banner-display' ).addClass( 'header-banner-hide' );
                    Cookies.set( 'woodmart_tb_banner_' + banner_version, 'closed', { expires: 60, path: '/' } );
                };

            },

            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Full screen menu
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */

            fullScreenMenu : function(){
                $( '.full-screen-burger-icon' ).on( 'click', function() {
                    $( 'body' ).toggleClass( 'full-screen-menu-open' );
                });

                $( document ).keyup( function( e ) {
                    if ( e.keyCode === 27 ) $( '.full-screen-close-icon' ).click();
                });

                $( '.full-screen-close-icon' ).on( 'click', function() {
                    $( 'body' ).removeClass( 'full-screen-menu-open' );
                    setTimeout(function(){
                        $( '.full-screen-nav .menu-item-has-children' ).removeClass( 'sub-menu-open' );
                        $( '.full-screen-nav .menu-item-has-children .icon-sub-fs' ).removeClass( 'up-icon' );
                    }, 200)
                });

                $( '.full-screen-nav .menu > .menu-item.menu-item-has-children, .full-screen-nav .menu-item-design-default.menu-item-has-children .menu-item-has-children' ).append( '<span class="icon-sub-fs"></span>' );

                $( '.full-screen-nav' ).on( 'click', '.icon-sub-fs', function(e) {
                    var $icon = $( this ),
                        $parentItem = $icon.parent();

                    e.preventDefault();
                    if ( $parentItem.hasClass( 'sub-menu-open' ) ) {
                        $parentItem.removeClass( 'sub-menu-open' );
                        $icon.removeClass( 'up-icon' );
                    } else {
                        $parentItem.siblings( '.sub-menu-open' ).find( '.icon-sub-fs' ).removeClass( 'up-icon' );
                        $parentItem.siblings( '.sub-menu-open' ).removeClass( 'sub-menu-open' );
                        $parentItem.addClass( 'sub-menu-open' );
                        $icon.addClass( 'up-icon' );
                    }
                });
            },
            
        
            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Mobile search icon 
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            
            mobileSearchIcon : function(){
                $( '.mobile-search-icon.search-button' ).on('click', function(e) {
                    if ( $(window).width() > 1024 ) return;
                    
                    e.preventDefault();
                    if (!$('.mobile-nav').hasClass( 'act-mobile-menu' ) ) {
                        $('.mobile-nav').addClass( 'act-mobile-menu' );
                        $('.woodmart-close-side').addClass('woodmart-close-side-opened');
                        $('.mobile-nav .searchform').find('input[type="text"]').focus();
                    }
                });
                
            },

            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Fast Clicker
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
             
            fastClicker : function(){
                if ('addEventListener' in document) {
                    document.addEventListener('DOMContentLoaded', function() {
                        FastClick.attach(document.body);
                    }, false);
                }
            },
            
            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Video Poster
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */

            videoPoster: function() {
                $( '.woodmart-video-poster-wrapper' ).on( 'click', function() {
                    var videoWrapper = $( this ),
                        video = videoWrapper.parent().find( 'iframe' ),
                        videoScr =  video.attr( 'src' ),
                        videoNewSrc = videoScr + '&autoplay=1';

                    if  ( videoScr.indexOf( 'vimeo.com' ) + 1 ) {
                        videoNewSrc = videoScr + '?autoplay=1';
                    }
                    video.attr( 'src',videoNewSrc );
                    videoWrapper.addClass( 'hidden-poster' );
                })
            },

            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Header builder scripts for sticky header 
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */

			headerBuilder: function() {
				var $header = $('.whb-header'),
					$stickyElements = $('.whb-sticky-row'),
					$firstSticky = $stickyElements.first(),
					headerHeight = $header.find('.whb-main-header').outerHeight(),
					$window = $(window),
					isSticked = false,
					adminBarHeight = $('#wpadminbar').outerHeight(),
					stickAfter = 300,
					cloneHTML = ''


                // Real header sticky option
                if ($header.hasClass('whb-sticky-real')) {

                    // if no sticky rows
                    if ($firstSticky.length == 0) return;

                    $header.addClass('whb-sticky-prepared').css({
                        paddingTop: headerHeight
                    })

                    stickAfter = $firstSticky.offset().top - adminBarHeight
                }


                // Sticky header clone 

				if ($header.hasClass('whb-sticky-clone')) {
					var data = []
                    data['cloneClass'] = $header.find('.whb-general-header').attr('class')

                    cloneHTML = woodmart_settings.whb_header_clone

                    cloneHTML = cloneHTML.replace(/<%([^%>]+)?%>/g, function(replacement) {
                        var selector = replacement.slice(2,-2)

                        return $header.find(selector).length
                            ? $('<div>')
                                    .append($header.find(selector).first().clone())
                                    .html()
                            : ( data[selector] !== undefined ) ? data[selector] : ''
                    })

					$header.after(cloneHTML)
					$header = $header.parent().find('.whb-clone')

				}

                if ( $('.whb-header').hasClass('whb-scroll-slide') )
                    stickAfter = headerHeight + adminBarHeight

				$window.on('scroll', function() {
                    var after = stickAfter;

                    if( $( '.header-banner' ).length > 0 && $('body').hasClass( 'header-banner-display' ) ) {
                        after += $( '.header-banner' ).outerHeight();
                    }

                    if ( ! $('.close-header-banner').length && $header.hasClass('whb-scroll-stick') ) {
                        after = stickAfter
                    }

					if ($(this).scrollTop() > after) {
						stickHeader()
					} else {
						unstickHeader()
					}
				})

				function stickHeader() {
					if (isSticked) return
					isSticked = true
					$header.addClass('whb-sticked')
				}

				function unstickHeader() {
					if (!isSticked) return

					isSticked = false
					$header.removeClass('whb-sticked')
				}
			},

            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Fixed Headers
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            
            fixedHeaders: function(){

                var getHeaderHeight = function(includeMargin) {
                    var headerHeight = header.outerHeight(includeMargin);

                    if( body.hasClass( 'sticky-navigation-only' ) ) {
                        headerHeight = header.find( '.navigation-wrap' ).outerHeight(true);
                    }

                    return headerHeight;
                };

                var headerSpacer = function() {
                    if(stickyHeader.hasClass(headerStickedClass)) return;
                    $('.header-spacing').height(getHeaderHeight(true));
                };

                var body = $("body"),
                    header = $(".main-header"),
                    stickyHeader = header,
                    headerHeight = getHeaderHeight(false),
                    headerStickedClass = "act-scroll",
                    stickyClasses = '',
                    stickyStart = 0,
                    links = header.find('.main-nav .menu>li>a');

                if( ! body.hasClass('enable-sticky-header') || body.hasClass('global-header-vertical') || header.length == 0 ) return;

                var logo = header.find(".site-logo").clone().html(),
                    navigation = ( header.find(".main-nav").length ) ? header.find(".main-nav").clone().html() : '',
                    rightColumn = ( header.find(".right-column").length ) ? header.find(".right-column").clone().html() : '',
                    leftSide = header.find(".header-left-side").clone().html(),
                    extraClass = header.data('sticky-class');

                if ( header.hasClass( 'header-advanced' ) ) {
                    rightColumn = ( header.find(".secondary-header .right-column").length ) ? header.find(".secondary-header .right-column").clone().html() : '';
                }
                
                rightColumn = rightColumn.replace( /id="_wpnonce"/g, 'id="_wpnonce_2"' ).replace( /id="password"/g, 'id="password_2"' ).replace( /id="username"/g, 'id="username_2"' );
                
                var headerClone = [
                    '<div class="sticky-header header-clone ' + extraClass + '">',
                        '<div class="container">',
                            '<div class="wrapp-header">',
                                '<div class="header-left-side">' + leftSide + '</div>',
                                '<div class="site-logo">' + logo + '</div>',
                                '<div class="main-nav site-navigation woodmart-navigation">' + navigation + '</div>',
                                '<div class="right-column">' + rightColumn + '</div>',
                            '</div>',
                        '</div>',
                    '</div>',
                ].join('');
                
                if( $( '.topbar-wrapp' ).length > 0 ) {
                    stickyStart += $( '.topbar-wrapp' ).outerHeight();
                }
                
                if( $( '.header-banner' ).length > 0 && body.hasClass( 'header-banner-display' ) ) {
                    stickyStart += $( '.header-banner' ).outerHeight();
                }
                
                if( body.hasClass( 'sticky-header-real' ) || header.hasClass('header-menu-top') ) {
                    var headerSpace = $('<div/>').addClass('header-spacing');
                    header.before(headerSpace);
                    if( ! header.hasClass('header-menu-top') ) header.addClass('header-sticky-real');

                    $(window).on('resize', headerSpacer);
                    
                    $(window).on("scroll", function(e){
                        if ( body.hasClass( 'header-banner-hide' ) ) {
                            stickyStart = ( $( '.topbar-wrapp' ).length > 0 )? $( '.topbar-wrapp' ).outerHeight() : 0;
                        }
                        if($(this).scrollTop() > stickyStart){
                            stickyHeader.addClass(headerStickedClass);
                        }else {
                            stickyHeader.removeClass(headerStickedClass);
                        }    
                    });

                } else if( body.hasClass( 'sticky-header-clone' ) ) {
                    header.before( headerClone );
                    stickyHeader = $('.sticky-header');
                }

                // Change header height smooth on scroll
                if( body.hasClass( 'woodmart-header-smooth' ) ) {

                    $(window).on("scroll", function(e){
                        var space = ( 120 - $(this).scrollTop() ) / 2;

                        if(space >= 60 ){
                            space = 60;
                        } else if( space <= 30 ) {
                            space = 30;
                        }
                        links.css({
                            paddingTop: space,
                            paddingBottom: space
                        });
                    });

                }

                if(!body.hasClass("woodmart-header-overlap") && body.hasClass("sticky-header-clone")){
                    header.attr('class').split(' ').forEach(function(el) {
                        if( el.indexOf('main-header') == -1 && el.indexOf('header-') == -1) {
                            stickyClasses += ' ' + el;
                        }
                    });

                    stickyHeader.addClass(stickyClasses);
                    
                    stickyStart += headerHeight;
                    
                    $(window).on("scroll", function(e){
                        if ( body.hasClass( 'header-banner-hide' ) ) {
                            stickyStart = $( '.topbar-wrapp' ).outerHeight() + headerHeight;
                        }
                        if($(this).scrollTop() > stickyStart){
                            stickyHeader.addClass(headerStickedClass);
                        }else {
                            stickyHeader.removeClass(headerStickedClass);
                        }
                    });
                }
                
                if ( body.hasClass('sticky-navigation-only') ) {
                    header.addClass('header-sticky-navigation');
                }

            },

            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Vertical header
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */

             verticalHeader: function() {

                var $header = $('.header-vertical').first();

                if( $header.length < 1 ) return;

                var $body, $window, $sidebar, top = false,
                    bottom = false, windowWidth, adminOffset, windowHeight, lastWindowPos = 0,
                    topOffset = 0, bodyHeight, headerHeight, resizeTimer, Y = 0, delta,
                    headerBottom, viewportBottom, scrollStep;

                $body          = $( document.body );
                $window        = $( window );
                adminOffset    = $body.is( '.admin-bar' ) ? $( '#wpadminbar' ).height() : 0;

                $window
                    .on( 'scroll', scroll )
                    .on( 'resize', function() {
                        clearTimeout( resizeTimer );
                        resizeTimer = setTimeout( resizeAndScroll, 500 );
                    } );

                resizeAndScroll();

                for ( var i = 1; i < 6; i++ ) {
                    setTimeout( resizeAndScroll, 100 * i );
                }


                // Sidebar scrolling.
                function resize() {
                    windowWidth = $window.width();

                    if ( 1024 > windowWidth ) {
                        top = bottom = false;
                        $header.removeAttr( 'style' );
                    }
                }

                function scroll() {
                    var windowPos = $window.scrollTop();

                    if ( 1024 > windowWidth ) {
                        return;
                    }

                    headerHeight   = $header.height();
                    headerBottom   = headerHeight + $header.offset().top;
                    windowHeight   = $window.height();
                    bodyHeight     = $body.height();
                    viewportBottom = windowHeight + $window.scrollTop();
                    delta          = headerHeight - windowHeight;
                    scrollStep     = lastWindowPos - windowPos;

                    // If header height larger than window viewport
                    if ( delta > 0 ) {
                        // Scroll down
                        if ( windowPos > lastWindowPos ) {

                            // If bottom overflow

                            if( headerBottom > viewportBottom ) {
                                Y += scrollStep;
                            }

                            if( Y < -delta ) {
                                bottom = true;
                                Y = -delta;
                            }

                            top = false;

                        } else if ( windowPos < lastWindowPos )  { // Scroll up

                            // If top overflow

                            if( $header.offset().top < $window.scrollTop() ) {
                                Y += scrollStep;
                            }

                            if( Y >= 0 ) {
                                top = true;
                                Y = 0;
                            }

                            bottom = false;

                        } else {

                            if( headerBottom < viewportBottom ) {
                                Y = windowHeight - headerHeight;
                            }

                            if( Y >= 0 ) {
                                top = true;
                                Y = 0;
                            }
                        }
                    } else {
                        Y = 0;
                    }

                    // Change header Y coordinate
                    $header.css({
                        top: Y
                    });

                    lastWindowPos = windowPos;
                }

                function resizeAndScroll() {
                    resize();
                    scroll();
                }

             },


            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Split navigation header
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */

            splitNavHeader: function() {

                var header = $('.header-split');

                if( header.length <= 0 ) return;

                var navigation = header.find('.main-nav'),
                    navItems = navigation.find('.menu > li'),
                    itemsNumber = navItems.length,
                    rtl = $('body').hasClass('rtl'),
                    midIndex = parseInt( itemsNumber/2 + 0.5 * rtl - .5 ),
                    midItem = navItems.eq( midIndex ),
                    logo = header.find('.site-logo > .woodmart-logo-wrap'),
                    logoWidth,
                    leftWidth = 0,
                    rule = ( ! rtl ) ? 'marginRight' : 'marginLeft',
                    rightWidth = 0;

                var recalc = function() {
                    logoWidth = logo.outerWidth(),
                    leftWidth = 5,
                    rightWidth = 0;

                    for (var i = itemsNumber - 1; i >= 0; i--) {
                        var itemWidth = navItems.eq(i).outerWidth();
                        if( i > midIndex ) {
                            rightWidth += itemWidth;
                        } else {
                            leftWidth += itemWidth;
                        }
                    };

                    var diff = leftWidth - rightWidth;

                    if( rtl ) {
                        if( leftWidth > rightWidth ) {
                            navigation.find('.menu > li:first-child').css('marginRight', -diff);
                        } else {
                            navigation.find('.menu > li:last-child').css('marginLeft', diff + 5);
                        }
                    } else {
                        if( leftWidth > rightWidth ) {
                            navigation.find('.menu > li:last-child').css('marginRight', diff + 5);
                        } else {
                            navigation.find('.menu > li:first-child').css('marginLeft', -diff);
                        }
                    }

                    midItem.css(rule, logoWidth);

                };

                logo.imagesLoaded(function() {
                    recalc();
                    header.addClass('menu-calculated');
                });

                $(window).on('resize', recalc);
                
                if ( woodmart_settings.split_nav_fix ) {
                    $(window).on('scroll', function(){
                        if ( header.hasClass( 'act-scroll' ) && !header.hasClass( 'menu-sticky-calculated' ) ) {
                            recalc();
                            header.addClass( 'menu-sticky-calculated' );
                            header.removeClass( 'menu-calculated' );
                        }
                        if ( !header.hasClass( 'act-scroll' ) && !header.hasClass( 'menu-calculated' ) ) {
                            recalc();
                            header.addClass( 'menu-calculated' );
                            header.removeClass( 'menu-sticky-calculated' );
                        }
                    });
                }
                
            },

            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Counter shortcode method
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            counterShortcode: function(counter) {
                if( counter.attr('data-state') == 'done' || counter.text() != counter.data('final') ) {
                    return;
                }
                counter.prop('Counter',0).animate({
                    Counter: counter.text()
                }, {
                    duration: 3000,
                    easing: 'swing',
                    step: function (now) {
                        if( now >= counter.data('final')) {
                            counter.attr('data-state', 'done');
                        }
                        counter.text(Math.ceil(now));
                    }
                });
            },

            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Activate methods in viewport
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            visibleElements: function() {

                $('.woodmart-counter .counter-value').each(function(){
                    $(this).waypoint(function(){
                        woodmartThemeModule.counterShortcode($(this));
                    }, { offset: '100%' });
                });

            },


            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Banner hover effect with jquery panr
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            bannersHover: function() {
                if ( typeof( $.fn.panr ) == 'undefined' ) return;
                $( '.promo-banner.banner-hover-parallax' ).panr({
                    sensitivity: 20,
                    scale: false,
                    scaleOnHover: true,
                    scaleTo: 1.15,
                    scaleDuration: .34,
                    panY: true,
                    panX: true,
                    panDuration: 0.5,
                    resetPanOnMouseLeave: true
                });
            },


            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Portfolio hover effects
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            portfolioEffects: function() {
                if ( typeof( $.fn.panr ) == 'undefined' ) return;
                $( '.woodmart-portfolio-holder .portfolio-parallax' ).panr({
                    sensitivity: 15,
                    scale: false,
                    scaleOnHover: true,
                    scaleTo: 1.12,
                    scaleDuration: 0.45,
                    panY: true,
                    panX: true,
                    panDuration: 1.5,
                    resetPanOnMouseLeave: true
                });
            },

            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Promo popup
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */

            promoPopup: function() {
                var promo_version = woodmart_settings.promo_version;
                
                if( woodmart_settings.enable_popup != 'yes' || ( woodmart_settings.promo_popup_hide_mobile == 'yes' && $(window).width() < 768 ) ) return;
                var popup = $( '.woodmart-promo-popup' ),
                    shown = false,
                    pages = Cookies.get('woodmart_shown_pages');

                var showPopup = function() {
                    $.magnificPopup.open({
                        items: {
                            src: '.woodmart-promo-popup'
                        },
                        type: 'inline',       
                        removalDelay: 500, //delay removal by X to allow out-animation
                        callbacks: {
                            beforeOpen: function() {
                                this.st.mainClass = woodmartTheme.popupEffect + ' promo-popup-wrapper';
                            },
                            open: function() {
                            // Will fire when this exact popup is opened
                            // this - is Magnific Popup object
                            },
                            close: function() {
                                Cookies.set( 'woodmart_popup_' + promo_version, 'shown', { expires: 7, path: '/' } );
                            }
                            // e.t.c.
                        }
                    });
                    $(document).trigger('wood-images-loaded');
                };
                
                $('.woodmart-open-newsletter').on('click',function(e){
                    e.preventDefault();
                    showPopup();
                })
                
                if( ! pages ) pages = 0;

                if( pages < woodmart_settings.popup_pages) {
                    pages++;
                    Cookies.set('woodmart_shown_pages', pages, { expires: 7, path: '/' } );
                    return false;
                }
                
                if ( Cookies.get( 'woodmart_popup_' + promo_version ) != 'shown' ) {
                    if( woodmart_settings.popup_event == 'scroll' ) {
                        $(window).scroll(function() {
                            if( shown ) return false;
                            if( $(document).scrollTop() >= woodmart_settings.popup_scroll ) {
                                showPopup();
                                shown = true;
                            }
                        });
                    } else {
                        setTimeout(function() {
                            showPopup();
                        }, woodmart_settings.popup_delay );
                    }
                }


            },

            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Content in popup element
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */

            contentPopup: function() {
                var popup = $( '.woodmart-open-popup' );

				popup.magnificPopup({
					type: 'inline',      
					removalDelay: 500, //delay removal by X to allow out-animation
					callbacks: {
						beforeOpen: function() {
							this.st.mainClass = woodmartTheme.popupEffect + ' content-popup-wrapper';
						},

						open: function() {
							$(document).trigger('wood-images-loaded');
						}
					}
				});

            },

            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Cookies law
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */

            cookiesPopup: function() {
                var cookies_version = woodmart_settings.cookies_version;
                if( Cookies.get( 'woodmart_cookies_' + cookies_version ) == 'accepted' ) return;
                var popup = $( '.woodmart-cookies-popup' );

                setTimeout(function() {
                    popup.addClass('popup-display');
                    popup.on('click', '.cookies-accept-btn', function(e) {
                        e.preventDefault();
                        acceptCookies();
                    })
                }, 2500 );

                var acceptCookies = function() {
                    popup.removeClass('popup-display').addClass('popup-hide');
                    Cookies.set( 'woodmart_cookies_' + cookies_version, 'accepted', { expires: 60, path: '/' } );
                };
            },

            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Google map
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */

            googleMap: function() {
                var gmap = $(".google-map-container-with-content");

                $(window).resize(function() {
                    gmap.css({
                        'height': gmap.find('.woodmart-google-map.with-content').outerHeight()
                    })
                });

            },

            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Menu preparation
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */

            menuSetUp: function() {
                var hasChildClass = 'menu-item-has-children',
                    mainMenu = $('.woodmart-navigation').find('ul.menu'),
                    lis = mainMenu.find(' > li'),
                    openedClass = 'item-menu-opened';

                $('.mobile-nav').find('ul.site-mobile-menu').find(' > li').has('.sub-menu-dropdown').addClass(hasChildClass);

                mainMenu.on('click', ' > .item-event-click > a', function(e) {
                    e.preventDefault();
                    if(  ! $(this).parent().hasClass(openedClass) ) {
                        $('.' + openedClass).removeClass(openedClass);
                    }
                    $(this).parent().toggleClass(openedClass);
                });

                $(document).click(function(e) {
                    var target = e.target;
                    if ( $('.' + openedClass).length > 0 && ! $(target).is('.item-event-hover') && ! $(target).parents().is('.item-event-hover') && !$(target).parents().is('.' + openedClass + '')) {
                        mainMenu.find('.' + openedClass + '').removeClass(openedClass);
                        return false;
                    }
                });

                var menuForIPad = function() {
                    if( $(window).width() <= 1024 ) {
                        mainMenu.find(' > .menu-item-has-children.item-event-hover').each(function() {
                            $(this).data('original-event', 'hover').removeClass('item-event-hover').addClass('item-event-click');
                        });
                    } else {
                        mainMenu.find(' > .item-event-click').each(function() {
                            if( $(this).data('original-event') == 'hover' ) {
                                $(this).removeClass('item-event-click').addClass('item-event-hover');
                            }
                        });
                    }
                };

                $(window).on('resize', menuForIPad);
            },
            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Keep navigation dropdowns in the screen
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */

            menuOffsets: function() {

                var mainMenu = $('.main-nav, .whb-secondary-menu').find('ul.menu'),
                    lis = mainMenu.find(' > li.menu-item-design-sized, li.menu-item-design-full-width');


                mainMenu.on('hover', ' > li.menu-item-design-sized, li.menu-item-design-full-width', function(e) {
                    setOffset( $(this) );
                });

                var setOffset = function( li ) {

                    var dropdown = li.find(' > .sub-menu-dropdown'),
                        styleID = 'arrow-offset',
                        $header = $('.main-header'),
                        siteWrapper = $('.website-wrapper');

                    dropdown.attr('style', '');

                    var dropdownWidth = dropdown.outerWidth(),
                        dropdownOffset = dropdown.offset(),
                        screenWidth = $(window).width(),
                        bodyRight = siteWrapper.outerWidth() + siteWrapper.offset().left,
                        viewportWidth = ( $('body').hasClass('wrapper-boxed') ) ? bodyRight : screenWidth,
                        extraSpace = ( li.hasClass( 'menu-item-design-full-width' ) ) ? 0 : 10;

                        if( ! dropdownWidth || ! dropdownOffset ) return;
                        
                        var dropdownOffsetRight = screenWidth - dropdownOffset.left - dropdownWidth;
                        
                        if( $('body').hasClass('rtl') && dropdownOffsetRight + dropdownWidth >= viewportWidth && ( li.hasClass( 'menu-item-design-sized' ) || li.hasClass( 'menu-item-design-full-width' ) ) && ! $header.hasClass('header-vertical') ) {
                            // If right point is not in the viewport
                            var toLeft = dropdownOffsetRight + dropdownWidth - viewportWidth;

                            dropdown.css({
                                right: - toLeft - extraSpace
                            }); 

                        } else if( dropdownOffset.left + dropdownWidth >= viewportWidth && ( li.hasClass( 'menu-item-design-sized' ) || li.hasClass( 'menu-item-design-full-width' ) ) && ! $header.hasClass('header-vertical') ) {
                            // If right point is not in the viewport
                            var toRight = dropdownOffset.left + dropdownWidth - viewportWidth;

                            dropdown.css({
                                left: - toRight - extraSpace
                            }); 
                        }
                        
                };

                lis.each(function() {
                    setOffset( $(this) );
                    $(this).addClass('with-offsets');
                });
            },


            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * One page menu
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */

            onePageMenu: function() {

                var scrollToRow = function(hash) {
                    var row = $('.vc_row#' + hash);

                    if( row.length < 1 ) return;

                    var position = row.offset().top;

                    $('html, body').animate({
                        scrollTop: position - 150
                    }, 800);
                };

                var activeMenuItem = function(hash) {
                    var itemHash;
                    $('.onepage-link').each(function() {
                        itemHash = $(this).find('> a').attr('href').split('#')[1];

                        if( itemHash == hash ) {
                            $('.onepage-link').removeClass('current-menu-item');
                            $(this).addClass('current-menu-item');
                        }

                    });
                };

                $('body').on('click', '.onepage-link > a', function(e) {
                    var $this = $(this),
                        hash = $this.attr('href').split('#')[1];

                    if( $('.vc_row#' + hash).length < 1 ) return;

                    e.preventDefault();

                    scrollToRow(hash);

                    // close mobile menu
                    $('.woodmart-close-side').trigger('click');
                });

                if( $('.onepage-link').length > 0 ) {
                    $('.entry-content > .vc_row').waypoint(function() {
                        var hash = $(this).attr('id');
                        activeMenuItem(hash);
                    }, { offset: 150 });

                    $('.onepage-link').removeClass('current-menu-item');


                    // URL contains hash
                    var locationHash = window.location.hash.split('#')[1];

                    if(window.location.hash.length > 1) {
                        setTimeout(function(){
                            scrollToRow(locationHash);
                        }, 500);
                    }

                }
            },


            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * mobile responsive navigation
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */

            mobileNavigation: function() {

                var body = $("body"),
                    mobileNav = $(".mobile-nav"),
                    wrapperSite = $(".website-wrapper"),
                    dropDownCat = $(".mobile-nav .site-mobile-menu .menu-item-has-children"),
                    elementIcon = '<span class="icon-sub-menu"></span>',
                    butOpener = $(".icon-sub-menu");

                var closeSide = $('.woodmart-close-side');
                
                dropDownCat.append(elementIcon);

                mobileNav.on("click", ".icon-sub-menu", function(e) {
                    e.preventDefault();

                    if ($(this).parent().hasClass("opener-page")) {
                        $(this).parent().removeClass("opener-page").find("> ul").slideUp(200);
                        $(this).parent().removeClass("opener-page").find(".sub-menu-dropdown .container > ul, .sub-menu-dropdown > ul").slideUp(200);
                        $(this).parent().find('> .icon-sub-menu').removeClass("up-icon");
                    } else {
                        $(this).parent().addClass("opener-page").find("> ul").slideDown(200);
                        $(this).parent().addClass("opener-page").find(".sub-menu-dropdown .container > ul, .sub-menu-dropdown > ul").slideDown(200);
                        $(this).parent().find('> .icon-sub-menu').addClass("up-icon");
                    }
                });

                mobileNav.on('click', '.mobile-nav-tabs li', function() {
                    if( $(this).hasClass('active') ) return;
                    var menuName = $(this).data('menu');
                    $(this).parent().find('.active').removeClass('active');
                    $(this).addClass('active');
                    $('.mobile-menu-tab').removeClass('active');
                    $('.mobile-' + menuName + '-menu').addClass('active');
                });


                mobileNav.on('click', '.menu-item-register > a', function( e ) {
                    if( $('.menu-item-register').find('.sub-menu-dropdown').length < 1 || $('body').hasClass('whb-enabled') ) return;

                    e.preventDefault();
                    
                    $('body').toggleClass('login-form-popup');
                    closeMenu();
                });


                body.on("click", ".close-login-form", function() {

                    $('body').removeClass('login-form-popup');
                    openMenu();

                });

                body.on("click", ".mobile-nav-icon", function() {
                    
                    if (mobileNav.hasClass("act-mobile-menu")) {
                        closeMenu();
                    } else {
                        openMenu();
                    }

                });

                body.on("click touchstart", ".woodmart-close-side", function() {
                    closeMenu();
                });
                
                body.on( 'click', '.mobile-nav .login-side-opener', function() {
                    closeMenu();
                });

                function openMenu() {
                    mobileNav.addClass("act-mobile-menu");
                    closeSide.addClass('woodmart-close-side-opened');
                }

                function closeMenu() {
                    mobileNav.removeClass("act-mobile-menu");
                    closeSide.removeClass('woodmart-close-side-opened');
                    $( '.mobile-nav .searchform input[type=text]' ).blur();
                }
            },

            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Simple dropdown for category select on search form
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            simpleDropdown: function() {
                if ( typeof( $.fn.devbridgeAutocomplete ) == 'undefined' ) return;
                
                $('.input-dropdown-inner').each(function() {
                    var dd = $(this);
                    var btn = dd.find('> a');
                    var input = dd.find('> input');
                    var list = dd.find('> .list-wrapper');
                    
                    inputPadding();
                    
                    $(document).click(function(e) {
                        var target = e.target;
                        if (dd.hasClass('dd-shown') && !$(target).is('.input-dropdown-inner') && !$(target).parents().is('.input-dropdown-inner')) {
                            hideList();
                            return false;
                        }
                    });

                    btn.on('click', function(e) {
                        e.preventDefault();

                        if (dd.hasClass('dd-shown')) {
                            hideList();
                        } else {
                            showList();
                        }
                        return false;
                    });

                    list.on('click', 'a', function(e) {
                        e.preventDefault();
                        var value = $(this).data('val');
                        var label = $(this).text();
                        list.find('.current-item').removeClass('current-item');
                        $(this).parent().addClass('current-item');
                        if (value != 0) {
                            list.find('ul:not(.children) > li:first-child').show();
                        } else if (value == 0) {
                            list.find('ul:not(.children) > li:first-child').hide();
                        }
                        btn.text(label);
                        input.val(value).trigger('cat_selected');
                        hideList();
                        inputPadding();
                    });


                    function showList() {
                        dd.addClass('dd-shown');
                        list.slideDown(100);
                        dd.parent().siblings( '[type="text"]' ).devbridgeAutocomplete( 'hide' );
                        setTimeout(function() {
                            woodmartThemeModule.nanoScroller();
                        }, 300);
                    }

                    function hideList() {
                        dd.removeClass('dd-shown');
                        list.slideUp(100);
                    }
                    
                    function inputPadding() {
                        var paddingValue = dd.innerWidth() + dd.parent().siblings( '.searchsubmit' ).innerWidth() + 17,
                            padding = 'padding-right';
                        if( $( 'body' ).hasClass( 'rtl' ) ) padding = 'padding-left';
                        
                        dd.parent().parent().find( '.s' ).css( padding, paddingValue );
                    }
                });

            },

            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Function to make columns the same height
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            equalizeColumns: function() {

                $.fn.woodmart_equlize = function(options) {

                    var settings = $.extend({
                        child: "",
                    }, options);

                    var that = this;

                    if (settings.child != '') {
                        that = this.find(settings.child);
                    }

                    var resize = function() {

                        var maxHeight = 0;
                        var height;
                        that.each(function() {
                            $(this).attr('style', '');
                            if ($(window).width() > 767 && $(this).outerHeight() > maxHeight)
                                maxHeight = $(this).outerHeight();
                        });

                        that.each(function() {
                            $(this).css({
                                minHeight: maxHeight
                            });
                        });

                    }

                    $(window).bind('resize', function() {
                        resize();
                    });
                    setTimeout(function() {
                        resize();
                    }, 200);
                    setTimeout(function() {
                        resize();
                    }, 500);
                    setTimeout(function() {
                        resize();
                    }, 800);
                }

                $('.equal-columns').each(function() {
                    $(this).woodmart_equlize({
                        child: '> [class*=col-]'
                    });
                });
            },


            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Enable masonry grid for blog
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            blogMasonry: function() {
                if (typeof($.fn.isotope) == 'undefined' || typeof($.fn.imagesLoaded) == 'undefined') return;
                var $container = $('.masonry-container');

                // initialize Masonry after all images have loaded
                $container.imagesLoaded(function() {
                    $container.isotope({
                        gutter: 0,
                        isOriginLeft: ! $('body').hasClass('rtl'),
                        itemSelector: '.blog-design-masonry, .blog-design-mask, .masonry-item'
                    });
                });

                $('.masonry-filter').on('click', 'a', function(e) {
                    e.preventDefault();
                    $('.masonry-filter').find('.filter-active').removeClass('filter-active');
                    $(this).addClass('filter-active');
                    var filterValue = $(this).attr('data-filter');
                    $container.isotope({
                        filter: filterValue
                    });
                });

            },

            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Helper function that make btn click when you scroll page to it
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            clickOnScrollButton: function( btnClass, destroy, offset ) {
                if( typeof $.waypoints != 'function' ) return;
                
                var $btn = $(btnClass );
                if( destroy ) {
                    $btn.waypoint('destroy');
                }

                if( ! offset ) {
                    offset = 0;
                }

                $btn.waypoint(function(){
                    $btn.trigger('click');
                }, { offset: function() {
                    return $(window).outerHeight() + parseInt(offset);                    
                } });
            },

            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Load more button for blog shortcode
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            blogLoadMore: function() {
                var btnClass = '.woodmart-blog-load-more.load-on-scroll',
                    process = false;

                woodmartThemeModule.clickOnScrollButton( btnClass , false, false );

                $('.woodmart-blog-load-more').on('click', function(e) {
                    e.preventDefault();

                    if( process ) return;

                    process = true;

                    var $this = $(this),
                        holder = $this.parent().siblings('.woodmart-blog-holder'),
                        source = holder.data('source'),
                        action = 'woodmart_get_blog_' + source,
                        ajaxurl = woodmart_settings.ajaxurl,
                        dataType = 'json',
                        method = 'POST',
                        atts = holder.data('atts'),
                        paged = holder.data('paged');

                    $this.addClass('loading');

                    var data = {
                        atts: atts, 
                        paged: paged, 
                        action: action
                    };

                    if( source == 'main_loop' ) {
                        ajaxurl = $(this).attr('href');
                        method = 'GET';
                        data = {};
                    }

                    $.ajax({
                        url: ajaxurl,
                        data: data,
                        dataType: dataType,
                        method: method,
                        success: function(data) {

                            var items = $(data.items);

                            if( items ) {
                                if( holder.hasClass('masonry-container') ) {
                                    // initialize Masonry after all images have loaded  
                                    holder.append(items).isotope( 'appended', items );
                                    holder.imagesLoaded().progress(function() {
                                        holder.isotope('layout');
                                        woodmartThemeModule.clickOnScrollButton( btnClass , true, false );
                                    });
                                } else {
                                    holder.append(items);
                                    woodmartThemeModule.clickOnScrollButton( btnClass , true, false );
                                }

                                holder.data('paged', paged + 1);

                                if( source == 'main_loop' ) {
                                    $this.attr('href', data.nextPage);
                                    if( data.status == 'no-more-posts' ) {
                                        $this.hide().remove();
                                    }
                                }
                            }

                            if( data.status == 'no-more-posts' ) {
                                $this.hide();
                            }

                        },
                        error: function(data) {
                            console.log('ajax error');
                        },
                        complete: function() {
                            $this.removeClass('loading');
                            process = false;
                        },
                    });

                });

            },


            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Load more button for portfolio shortcode
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            portfolioLoadMore: function() {

                if( typeof $.waypoints != 'function' ) return;

                var waypoint = $('.woodmart-portfolio-load-more.load-on-scroll').waypoint(function(){
                        $('.woodmart-portfolio-load-more.load-on-scroll').trigger('click');
                    }, { offset: '100%' }),
                    process = false;

                $('.woodmart-portfolio-load-more').on('click', function(e) {
                    e.preventDefault();

                    if( process ) return;

                    process = true;

                    var $this = $(this),
                        holder = $this.parent().parent().find('.woodmart-portfolio-holder'),
                        source = holder.data('source'),
                        action = 'woodmart_get_portfolio_' + source,
                        ajaxurl = woodmart_settings.ajaxurl,
                        dataType = 'json',
                        method = 'POST',
                        timeout,
                        atts = holder.data('atts'),
                        paged = holder.data('paged');

                    $this.addClass('loading');

                    var data = {
                        atts: atts,
                        paged: paged,
                        action: action
                    };

                    if( source == 'main_loop' ) {
                        ajaxurl = $(this).attr('href');
                        method = 'GET';
                        data = {};
                    }


                    $.ajax({
                        url: ajaxurl,
                        data: data,
                        dataType: dataType,
                        method: method,
                        success: function(data) {

                            var items = $(data.items);

                            if( items ) {
                                if( holder.hasClass('masonry-container') ) {
                                    // initialize Masonry after all images have loaded
                                    holder.append(items).isotope( 'appended', items );
                                    holder.imagesLoaded().progress(function() {
                                        holder.isotope('layout');

                                        clearTimeout(timeout);

                                        timeout = setTimeout(function() {
                                            $('.woodmart-portfolio-load-more.load-on-scroll').waypoint('destroy');
                                            waypoint = $('.woodmart-portfolio-load-more.load-on-scroll').waypoint(function(){
                                                $('.woodmart-portfolio-load-more.load-on-scroll').trigger('click');
                                            }, { offset: '100%' });
                                        }, 1000);
                                    });
                                } else {
                                    holder.append(items);
                                }

                                holder.data('paged', paged + 1);

                                $this.attr('href', data.nextPage);
                            }

                            woodmartThemeModule.mfpPopup();
                            woodmartThemeModule.portfolioEffects();
                            
                            if( data.status == 'no-more-posts' ) {
                                $this.hide();
                            }

                        },
                        error: function(data) {
                            console.log('ajax error');
                        },
                        complete: function() {
                            $this.removeClass('loading');
                            process = false;
                        },
                    });

                });

            },

            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * MEGA MENU
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            sidebarMenu: function() {
                var heightMegaMenu = $(".widget_nav_mega_menu #menu-categories").height();
                var heightMegaNavigation = $(".categories-menu-dropdown").height();
                var subMenuHeight = $(".widget_nav_mega_menu ul > li.menu-item-design-sized > .sub-menu-dropdown, .widget_nav_mega_menu ul > li.menu-item-design-full-width > .sub-menu-dropdown");
                var megaNavigationHeight = $(".categories-menu-dropdown ul > li.menu-item-design-sized > .sub-menu-dropdown, .categories-menu-dropdown ul > li.menu-item-design-full-width > .sub-menu-dropdown");
                subMenuHeight.css(
                    "min-height", heightMegaMenu + "px"
                );

                megaNavigationHeight.css(
                    "min-height", heightMegaNavigation + "px"
                );
            },


            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Hide widget on title click
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            widgetsHidable: function() {
                
                $(document).on('click', '.widget-hidable .widget-title', function() {
                    var content = $(this).siblings('ul, div, form, label, select');
                    $(this).parent().toggleClass('widget-hidden');
                    content.stop().slideToggle(200);
                });

            },

            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Sticky column for portfolio items
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            stickyColumn: function() {
                var details = $('.woodmart-sticky-column');

                details.each(function() {
                    var $column = $(this),
                        offset = 0;
                        
                    if( $('body').hasClass('enable-sticky-header') || $('.whb-sticky-row').length > 0 || $('.whb-sticky-header').length > 0 ) {
                        offset = 150;
                    }

                    $column.find(' > .vc_column-inner > .wpb_wrapper').stick_in_parent({
                        offset_top: offset
                    });
                })

            },


            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Use magnific popup for images
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            mfpPopup: function() {
                
                $('.gallery').magnificPopup({
                    delegate: ' > a',
                    type: 'image',
                    removalDelay: 500, //delay removal by X to allow out-animation
                    callbacks: {
                        beforeOpen: function() {
                            this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                            this.st.mainClass = woodmartTheme.popupEffect;
                        }
                    },
                    image: {
                        verticalFit: true
                    },
                    gallery: {
                        enabled: true,
                        navigateByImgClick: true
                    },
                });

                $('[data-rel="mfp"]').magnificPopup({
                    type: 'image',
                    removalDelay: 500, //delay removal by X to allow out-animation
                    callbacks: {
                        beforeOpen: function() {
                            this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                            this.st.mainClass = woodmartTheme.popupEffect;
                        }
                    },
                    image: {
                        verticalFit: true
                    },
                    gallery: {
                        enabled: false,
                        navigateByImgClick: false
                    },
                });

                $('[data-rel="mfp[projects-gallery]"]').magnificPopup({
                    type: 'image',
                    removalDelay: 500, //delay removal by X to allow out-animation
                    callbacks: {
                        beforeOpen: function() {
                            this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                            this.st.mainClass = woodmartTheme.popupEffect;
                        }
                    },
                    image: {
                        verticalFit: true
                    },
                    gallery: {
                        enabled: true,
                        navigateByImgClick: false
                    },
                });


                $(document).on('click', '.mfp-img', function() {
                    var mfp = jQuery.magnificPopup.instance; // get instance
                    mfp.st.image.verticalFit = !mfp.st.image.verticalFit; // toggle verticalFit on and off
                    mfp.currItem.img.removeAttr('style'); // remove style attribute, to remove max-width if it was applied
                    mfp.updateSize(); // force update of size
                });
            },

            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Parallax effect
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            parallax: function() {
                if( $(window).width() <= 1024) return;
                
                $('.parallax-yes').each(function() {
                    var $bgobj = $(this);
                    $(window).scroll(function() {
                        var yPos = -($(window).scrollTop() / $bgobj.data('speed'));
                        var coords = 'center ' + yPos + 'px';
                        $bgobj.css({
                            backgroundPosition: coords
                        });
                    });
                });

                $('.woodmart-parallax').each(function(){
                    var $this = $(this);
                    if($this.hasClass('wpb_column')) {
                        $this.find('> .vc_column-inner').parallax("50%", 0.3);
                    } else {
                        $this.parallax("50%", 0.3);
                    }
                });

            },


            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Scroll top button
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            scrollTop: function() {
                //Check to see if the window is top if not then display button
                $(window).scroll(function() {
                    if ($(this).scrollTop() > 100) {
                        $('.scrollToTop').addClass('button-show');
                    } else {
                        $('.scrollToTop').removeClass('button-show');
                    }
                });

                //Click event to scroll to top
                $('.scrollToTop').click(function() {
                    $('html, body').animate({
                        scrollTop: 0
                    }, 800);
                    return false;
                });
            },
            
            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * ToolTips titles
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            btnsToolTips: function() {

                if ( $(window).width() <= 1024 ) return;

                var $tooltips = $('.woodmart-css-tooltip, .product-grid-item:not(.woodmart-hover-base):not(.woodmart-hover-icons) .woodmart-buttons > div a, .woodmart-hover-base.product-in-carousel .woodmart-buttons > div a'),
                    $bootstrapTooltips = $(woodmartTheme.bootstrapTooltips);

                    // .product-grid-item .add_to_cart_button


                $tooltips.each(function() {
                    $(this).find('.woodmart-tooltip-label').remove();
                    $(this).addClass('woodmart-tltp').prepend('<span class="woodmart-tooltip-label">' + $(this).text() +'</span>');
                    $(this).find('.woodmart-tooltip-label').trigger('mouseover');
                })

                .off('mouseover.tooltips')

                .on('mouseover.tooltips', function() {
                    var $label = $(this).find('.woodmart-tooltip-label'),
                        width = $label.outerWidth();

                    if ( $('body').hasClass('rtl') ) {
                        $label.css({
                            marginRight: - parseInt( width/2 )
                        })
                    }else{
                        $label.css({
                            marginLeft: - parseInt( width/2 )
                        })
                    }
                });

                // Bootstrap tooltips

                $bootstrapTooltips.tooltip({
                    animation: false,
                    container: 'body',
                    trigger : 'hover',
                    title: function() {
                        if( $(this).find('.added_to_cart').length > 0 ) return $(this).find('.add_to_cart_button').text();
                        return $(this).text();
                    }
                });

            },

            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Sticky footer: margin bottom for main wrapper
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            stickyFooter: function() {
                
                if( ! $('body').hasClass( 'sticky-footer-on' ) || $( window ).width() <= 1024 ) return;

                var $footer = $( '.footer-container' ),
                    $page = $( '.main-page-wrapper' ),
                    $window = $( window );

                if( $( '.woodmart-prefooter' ).length > 0 ) {
                    $page = $( '.woodmart-prefooter' );
                }

                var footerOffset = function() {
                    $page.css( {
                        marginBottom: $footer.outerHeight()
                    } )
                };

                $window.on( 'resize', footerOffset );

                $footer.imagesLoaded( function() {
                    footerOffset();
                } );

                //Safari fix
                var footerSafariFix = function () {
                    if (!$('html').hasClass('browser-Safari')) return;
                    var windowScroll = $window.scrollTop();
                    var footerOffsetTop = $(document).outerHeight() - $footer.outerHeight();

                    if (footerOffsetTop < windowScroll + $footer.outerHeight() + $window.outerHeight()) {
                        $footer.addClass('visible-footer');
                    } else {
                        $footer.removeClass('visible-footer');
                    }
                };

                footerSafariFix();
                $window.on('scroll', footerSafariFix);
                
            },

            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Back in history
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            backHistory: function() {
                history.go(-1);

                setTimeout(function(){
                    $('.filters-area').removeClass('filters-opened').stop().hide();
                    $('.open-filters').removeClass('btn-opened');
                    if( $(window).width() <= 1024 ) {
                        $('.woodmart-product-categories').removeClass('categories-opened').stop().hide();
                        $('.woodmart-show-categories').removeClass('button-open');
                    }
                
                    woodmartThemeModule.btnsToolTips();
                    woodmartThemeModule.categoriesAccordion();
                    woodmartThemeModule.woocommercePriceSlider();
                }, 20);


            },

            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Ajax Search for products
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            ajaxSearch: function() {
                if ( typeof( $.fn.devbridgeAutocomplete ) == 'undefined' ) return;
                
                var escapeRegExChars = function (value) {
                    return value.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
                };

                $('form.woodmart-ajax-search').each(function() {
                    var $this = $(this),
                        number = parseInt( $this.data('count') ),
                        thumbnail = parseInt( $this.data('thumbnail') ),
                        productCat = $this.find('[name="product_cat"]'),
                        $results = $this.parent().find('.woodmart-search-results'),
                        postType = $this.data('post_type'),
                        url = woodmart_settings.ajaxurl + '?action=woodmart_ajax_search',
                        price = parseInt( $this.data('price') );

                    if( number > 0 ) url += '&number=' + number;
                    url += '&post_type=' + postType;

                    $results.on('click', '.view-all-results', function() {
                        $this.submit();
                    });

                    if( productCat.length && productCat.val() !== '' ) {
                        url += '&product_cat=' + productCat.val();
                    }

                    $this.find('[type="text"]').devbridgeAutocomplete({
                        serviceUrl: url,
                        appendTo: $results,

                        onSelect: function (suggestion) {
                            if( suggestion.permalink.length > 0)
                                window.location.href = suggestion.permalink;
                        },
                        onSearchStart: function (query) {
                            $this.addClass('search-loading');
                        },
                        beforeRender: function (container) {

                            if( container[0].childElementCount > 2 )
                                $(container).append('<div class="view-all-results"><span>' + woodmart_settings.all_results + '</span></div>');

                        },
                        onSearchComplete: function(query, suggestions) {
                            $this.removeClass('search-loading');
                            if( $(window).width() >= 1024 ) {
                                $(".woodmart-scroll").nanoScroller({
                                    paneClass: 'woodmart-scroll-pane',
                                    sliderClass: 'woodmart-scroll-slider',
                                    contentClass: 'woodmart-scroll-content',
                                    preventPageScrolling: false
                                });                 
                            }

							$(document).trigger('wood-images-loaded');
               
                        },
                        formatResult: function( suggestion, currentValue ) {
                            if( currentValue == '&' ) currentValue = "&#038;";
                            var pattern = '(' + escapeRegExChars(currentValue) + ')',
                                returnValue = '';

                            if( thumbnail && suggestion.thumbnail ) {
                                returnValue += ' <div class="suggestion-thumb">' + suggestion.thumbnail + '</div>';
                            }
                            
                            returnValue += '<h4 class="suggestion-title result-title">' + suggestion.value
                                .replace(new RegExp(pattern, 'gi'), '<strong>$1<\/strong>')
                                // .replace(/&/g, '&amp;')
                                .replace(/</g, '&lt;')
                                .replace(/>/g, '&gt;')
                                .replace(/"/g, '&quot;')
                                .replace(/&lt;(\/?strong)&gt;/g, '<$1>') + '</h4>';

                            if ( suggestion.no_found ) returnValue = '<div class="suggestion-title no-found-msg">' + suggestion.value + '</div>';

                            if( price && suggestion.price ) {
                                returnValue += ' <div class="suggestion-price price">' + suggestion.price + '</div>';
                            }

                            return returnValue;
                        }
                    });

                    if( productCat.length ){
                        
                        var searchForm = $this.find( '[type="text"]' ).devbridgeAutocomplete(),
                            serviceUrl = woodmart_settings.ajaxurl + '?action=woodmart_ajax_search';
                            
                        if( number > 0 ) serviceUrl += '&number=' + number;
                        serviceUrl += '&post_type=' + postType;
    
                        productCat.on( 'cat_selected', function() {
                            if( productCat.val() != '' ) {
                                searchForm.setOptions({
                                    serviceUrl: serviceUrl + '&product_cat=' + productCat.val()
                                });
                            }else{
                                searchForm.setOptions({
                                    serviceUrl: serviceUrl
                                });
                            }

                            searchForm.hide();
                            searchForm.onValueChange();
                        });
                    }

                    $( 'body' ).click( function() { 
                        $this.find( '[type="text"]' ).devbridgeAutocomplete( 'hide' );
                    } );

                    $( '.woodmart-search-results' ).click( function( e ) { 
                        e.stopPropagation(); 
                    } );

                });

            },


            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Search full screen
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            searchFullScreen: function() {

                var body = $('body'),
                    searchWrapper = $('.woodmart-search-full-screen'),
                    offset = 0;


                body.on('click', '.search-button > a', function(e) {

                    e.preventDefault();

                    if( $(this).parent().find('.woodmart-search-dropdown').length > 0 ) return; // if dropdown search on header builder
                    
                    if( body.hasClass('global-search-dropdown') || $(window).width() < 1024 ) return;

                    if( isOpened() ) {
                        closeWidget();
                    } else {
                        setTimeout( function() {
                            openWidget();
                        }, 10);
                    }
                })


                body.on("click", ".woodmart-close-search, .main-header, .sticky-header, .topbar-wrapp, .main-page-wrapper, .header-banner", function(event) {

                    if ( ! $(event.target).is('.woodmart-close-search') && $(event.target).closest(".woodmart-search-full-screen").length ) return;

                    if( isOpened() ) {
                        closeWidget();
                    }
                });


                var closeByEsc = function( e ) {
                    if (e.keyCode === 27) {
                        closeWidget();
                        body.unbind('keyup', closeByEsc);
                    }
                };


                var closeWidget = function() {
                    $('body').removeClass('woodmart-search-opened');
                    searchWrapper.removeClass('search-overlap');
                };

                var openWidget = function() {
                    var bar = $('#wpadminbar').outerHeight();

                    var offset = $('.main-header').outerHeight() + bar;

                    if( ! $('.main-header').hasClass('act-scroll') ) {
                        offset += $('.topbar-wrapp').outerHeight();
                        if ( $('body').hasClass( 'header-banner-display' ) ) {
                            offset += $('.header-banner').outerHeight();
                        }
                    }

                    if( $('.sticky-header').hasClass('header-clone') && $('.sticky-header').hasClass('act-scroll') ) {
                        offset = $('.sticky-header').outerHeight() + bar;
                    }

                    if( $('.main-header').hasClass('header-menu-top') && $('.header-spacing') ) {
                        offset = $('.header-spacing').outerHeight() + bar;
                    }

                    if( $('body').hasClass('whb-enabled') ) {
                        if( $('.whb-sticked').length > 0 ) {
                            if( $('.whb-clone').length > 0 ) 
                                offset = $('.whb-sticked').outerHeight() + bar;
                            else
                                offset = $('.whb-main-header').outerHeight() + bar;
                        } else {
                            offset = $('.whb-main-header').outerHeight() + bar;
                            if ( $('body').hasClass( 'header-banner-display' ) ) {
                                offset += $('.header-banner').outerHeight();
                            }
                        }
                    }

                    searchWrapper.css('top', offset);
                        
                    // Close by esc
                    body.bind('keyup', closeByEsc);

                    $('body').addClass('woodmart-search-opened');
                    searchWrapper.addClass('search-overlap');
                    setTimeout(function() {
                        searchWrapper.find('input[type="text"]').focus();
                        $(window).one('scroll', function() {
                            if( isOpened() ) {
                                closeWidget();
                            }
                        });
                    }, 300);
                };

                var isOpened = function() {
                    return $('body').hasClass('woodmart-search-opened');
                };
            },


            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Sale final date countdown
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            countDownTimer: function() {

                $( '.woodmart-timer' ).each(function(){
                    var time = moment.tz( $(this).data('end-date'), $(this).data('timezone') );
                    $( this ).countdown( time.toDate(), function( event ) {
                        $( this ).html( event.strftime(''
                            + '<span class="countdown-days">%-D <span>' + woodmart_settings.countdown_days + '</span></span> '
                            + '<span class="countdown-hours">%H <span>' + woodmart_settings.countdown_hours + '</span></span> '
                            + '<span class="countdown-min">%M <span>' + woodmart_settings.countdown_mins + '</span></span> '
                            + '<span class="countdown-sec">%S <span>' + woodmart_settings.countdown_sec + '</span></span>'));
                    });
                });

            },


            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Init nanoscroller
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            nanoScroller: function() {

                if( $(window).width() < 1024 ) return;

                $(".woodmart-scroll").nanoScroller({
                    paneClass: 'woodmart-scroll-pane',
                    sliderClass: 'woodmart-scroll-slider',
                    contentClass: 'woodmart-scroll-content',
                    preventPageScrolling: false
                });

                $( 'body' ).bind( 'wc_fragments_refreshed wc_fragments_loaded added_to_cart', function() {
                    $(".widget_shopping_cart .woodmart-scroll").nanoScroller({
                        paneClass: 'woodmart-scroll-pane',
                        sliderClass: 'woodmart-scroll-slider',
                        contentClass: 'woodmart-scroll-content',
                        preventPageScrolling: false
                    });
                    $(".widget_shopping_cart .woodmart-scroll-content").scroll( function() {
                        $(document).trigger('wood-images-loaded');
                    })
                } );
            },

            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Fix RTL issues
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            RTL: function() {
                if( ! $('body').hasClass('rtl') ) return;

                $(document).on("vc-full-width-row", function(event, el) {
                    var $rows = $( '[data-vc-full-width="true"]' );
                    $rows.each(function() {
                        var $this = $(this),
                            $elFull = $this.next('.vc_row-full-width'),
                            elMarginRight = parseInt($this.css('margin-right'), 10),
                            windowWidth = $(window).width(),
                            offset = windowWidth - $elFull.offset().left - $elFull.width() - - elMarginRight;

                        $this.css({
                            left: offset
                        });

                        if( $('.main-header').hasClass('header-vertical') ) {
                            var paddingLeft = $this.css('padding-left'),
                                paddingRight = $this.css('padding-right');

                            $this.css({
                                paddingLeft: paddingRight,
                                paddingRight: paddingLeft
                            });

                        }
                    });
                })
            },


             /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * WoodMart gradient
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            gradientShift: function() {
                $( '.woodmart_gradient' ).each( function() {
                    var selector = $( this );
                    var parent = selector.prev();
                    parent.css( 'position','relative' );
                    parent.prepend( selector );
                });
            },

			 /**
			 *-------------------------------------------------------------------------------------------------------------------------------------------
			 * Lazy loading
			 *-------------------------------------------------------------------------------------------------------------------------------------------
			 */
			lazyLoading: function() {
				if ( ! window.addEventListener || ! window.requestAnimationFrame || ! document.getElementsByClassName) return;

				// start
				var pItem = document.getElementsByClassName('woodmart-lazy-load'), pCount, timer;

				$(document).on('wood-images-loaded added_to_cart', function() {
					inView();
				})

				$('.woodmart-scroll-content, .woodmart-sidebar-content').scroll( function() {
					$(document).trigger('wood-images-loaded');
				})
                // $(document).on( 'scroll', '.woodmart-scroll-content', function() {
                //     $(document).trigger('wood-images-loaded');
                // })

				// WooCommerce tabs fix
				$('.wc-tabs > li').click(function() {
					$(document).trigger('wood-images-loaded');
				});

				// scroll and resize events
				window.addEventListener('scroll', scroller, false);
				window.addEventListener('resize', scroller, false);

				// DOM mutation observer
				if (MutationObserver) {

					var observer = new MutationObserver(function() {
						// console.log('mutated', pItem.length, pCount)
						if (pItem.length !== pCount) inView();
					});

					observer.observe(document.body, { subtree: true, childList: true, attributes: true, characterData: true });

				}

				// initial check
				inView();

				// throttled scroll/resize
				function scroller() {

					timer = timer || setTimeout(function() {
						timer = null;
						inView();
					}, 100);

				}


				// image in view?
				function inView() {

					if (pItem.length) requestAnimationFrame(function() {

						var wT = window.pageYOffset, wB = wT + window.innerHeight, cRect, pT, pB, p = 0;

						while (p < pItem.length) {

							cRect = pItem[p].getBoundingClientRect();
							pT = wT + cRect.top;
							pB = pT + cRect.height;

							if (wT < pB && wB > pT && ! pItem[p].loaded ) {
								loadFullImage(pItem[p],p);
							}
							else p++;

						}

						pCount = pItem.length;

					});

				}


				// replace with full image
				function loadFullImage(item, i) {

					item.onload = addedImg;

                    item.src = item.dataset.src;
                    if (typeof (item.dataset.srcset) != 'undefined') {
                        item.srcset = item.dataset.srcset;
                    }

					item.loaded = true

					// replace image
					function addedImg() {

						requestAnimationFrame(function() {
							item.classList.add('woodmart-loaded')

                            var $masonry = jQuery(item).parents('.view-masonry .gallery-images, .grid-masonry, .masonry-container, .categories-masonry');
							if( $masonry.length > 0 ) {
								$masonry.isotope('layout');
							}

						});

					}

				}

			},
        }
    }());

})(jQuery);


jQuery(document).ready(function() {

    woodmartThemeModule.init();
    
});
