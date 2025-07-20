(function($) {
    "use strict";

	
    $(window).on("load", function() { // makes sure the whole site is loaded
        //preloader
        $("#status").fadeOut(); // will first fade out the loading animation
        $("#preloader").delay(450).fadeOut("slow"); // will fade out the white DIV that covers the website.

        //google map load
        $('#map_canvas').gmap({
            'center': '-6.94010,107.62575',
            'zoom': 15,
            scrollwheel: false,
            'disableDefaultUI': false,
            'styles': [{
                stylers: [{
                    lightness: 7
                }, {
                    saturation: -100
                }]
            }],
            'callback': function() {
                var self = this;
                self.addMarker({
                        'position': this.get('map').getCenter(),
                        icon: 'images/office-building.png',
                    })
                    .click(function() {
                        self.openInfoWindow({
                            'content': $('.map-content').html()
                        }, this);
                    });
            }
        });
		
		//slider homepage setting
		$(".home-slider").owlCarousel({
			navigation: false, // Hide next and prev buttons
			slideSpeed: 300,
			autoplay: true,
			autoHeight: true,
			pagination: true,
			paginationSpeed: 300,
			singleItem: true,
			transitionStyle: "fade"
		});
		
		//about ,team &services gallery  setting
		$(".gal-about,.gal-service,.team-gallery").owlCarousel({
			navigation: false, // Hide next and prev buttons
			slideSpeed: 300,
			autoplay: true,
			autoHeight: true,
			pagination: true,
			paginationSpeed: 300,
			singleItem: false,
			items : 4,
      		itemsDesktop : [1199,3],
      		itemsDesktopSmall : [979,3]
		});
		

        //move to hash after loading
        if (window.location.hash) {
            $('html, body').stop().animate({
                scrollTop: $(window.location.hash).offset().top - 54
            }, 300, 'linear');
        }
		
    });

	    //easing team tab scrolling
        $('.team-hover').on('click', function (event) {
            var $anchor = $('#teamtab');

            $('html, body').stop().animate({
                scrollTop: $($anchor).offset().top - 54
            }, 600, 'linear');
            event.preventDefault();
        });
	
    //Page scrolling
    $('.menu-box .navigation').onePageNav({
        filter: ':not(.external)',
        scrollThreshold: 0.25,
        scrollOffset: 54
    });
	
    //sticky navigation
    $(".for-sticky").sticky({
        topSpacing: 0,
        className: 'shrink'
    });

    //create menu for tablet/mobile
    $(".menu-box .navigation").clone(false).find("ul,li").removeAttr("id").remove(".sub-menu").appendTo($(".mobile-menu"));
    $(".mobile-menu .sub-menu").remove();
    $('.mobile-menu').on('show.bs.collapse', function() {
        $('body').on('click', function() {
            $('.mobile-menu').collapse('hide');
        })
    })

    //toggle menu
    $('.menu-btn').on('click', function() {
            $('.mobile-menu').collapse({
                toggle: false
            });
        })
		
    //menu for tablet/mobile,slider button, about button scrolling
    $('.mobile-menu a,.sl-btn,.ab-btn').on('click', function() {
        var $anchor = $(this);

        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 92
        }, 800, 'linear');
        event.preventDefault();
    });

    

    // script prettyphoto
    $("a[data-rel^='prettyPhoto']").prettyPhoto({
        hook: 'data-rel',
        deeplinking: false,
        social_tools: '<div class="instagram" style="text-align: center; margin: 5px 5px 0;"><a href="https://www.instagram.com/luciaferreyradesign" target="_blank" style="display: inline-block; background: linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%); color: white; padding: 10px 20px 10px 40px; text-decoration: none; border-radius: 25px; font-size: 13px; font-weight: bold; box-shadow: 0 3px 8px rgba(0,0,0,0.2); transition: all 0.3s ease; border: none;"><i class="fa fa-instagram" style="margin-right: 8px; font-size: 14px;"></i>Síguenos en Instagram</a></div>'
    });




    // Video responsive
    $("body").fitVids();



    //replace the data-background into background image
    $(".img-bg").each(function() {
        var imG = $(this).data('background');
        $(this).css('background-image', "url('" + imG + "') "

        );
    });




    //portfolio ajax & scroll on click
    $('.port-ajax').on('click', function() {
        //portfolio ajax setting
        var toLoad = $(this).attr('data-link') + ' .worksajax > *';
        $('.worksajax').slideUp('slow', loadContent);

        function loadContent() {
            $('.worksajax').load(toLoad, '', showNewContent)
        }

        function showNewContent() {
            $.getScript("js/portfolio.js");
            $('.worksajax').slideDown('slow');
        }
        var $anchor = $('#worksajax');

        //portfolio scrolling
        $('html, body').stop().animate({
            scrollTop: $($anchor).offset().top - 54
        }, 1000, 'linear');
        return false;
    });




    //isotope setting(portfolio)
    var $container = $('.port-body');
    $container.imagesLoaded(function() {
        $container.isotope();
    });

    // filter items when filter link is clicked
    $('.port-filter a').on('click', function() {
        var selector = $(this).attr('data-filter');
        $container.isotope({
            itemSelector: '.port-item',
            filter: selector
        });
        return false;
    });
	
    //adding active state to portfolio filtr
    $(".port-filter a").on('click', function() {
        $(".port-filter a").removeClass("active");
        $(this).addClass("active");
    });

    //background ticker (bg2/testimonial)
    $('.big-ticker:has(>div:eq(1))').list_ticker({
        speed: 5000,
        effect: 'fade'
    });

    //add class on touch device
    if (Modernizr.touch) {
        $('body').addClass('no-para');

    }

})(jQuery);