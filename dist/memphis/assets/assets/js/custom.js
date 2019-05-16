(function($) {

    // Preloader 
    jQuery(window).on('load', function() {
        jQuery("#status").fadeOut();
        jQuery("#preloader").delay(200).fadeOut("slow");
    });


    // on ready function
    $(document).ready(function() {
		"use strict";

//----------------------- MENU FIXED JS -----------------------//
	
	$(window).scroll(function(){
		var window_top = $(window).scrollTop() + 1; 
		if (window_top > 50) {
			$('.main_menu_wrapper').addClass('menu_fixed animated fadeInDown');
		} else {
			$('.main_menu_wrapper').removeClass('menu_fixed animated fadeInDown');
		}
	});

//----------------------- mobail_menu_main FIXED JS -----------------------//
	
	$(window).scroll(function(){
		var window_top = $(window).scrollTop() + 1; 
		if (window_top > 50) {
			$('.mobail_menu_main').addClass('menu_fixed animated fadeInDown');
		} else {
			$('.mobail_menu_main').removeClass('menu_fixed animated fadeInDown');
		}
	});
	
/*--- Responsive Menu Start ----*/

	$(".navbar-toggle").on("click", function(){
	  var w = $('#sidebar').width();
	  var pos = $('#sidebar').offset().left;
	 
	  if(pos === 0){
	  $("#sidebar").animate({"left": -w}, "slow");
	  }
	  else
	  {
	  $("#sidebar").animate({"left": "0"}, "slow");
	  }
	  
	});

	$("#toggle_close").on("click", function(){
	  var w = $('#sidebar').width();
	  var pos = $('#sidebar').offset().left;
	 
	  if(pos === 0){
	  $("#sidebar").animate({"left": -w}, "slow");
	  }
	  else
	  {
	  $("#sidebar").animate({"left": "0"}, "slow");
	  }
	  
	});
	
(function($){
$(document).ready(function(){

$('#cssmenu li.active').addClass('open').children('ul').show();
	$('#cssmenu li.has-sub>a').on('click', function(){
		$(this).removeAttr('href');
		var element = $(this).parent('li');
		if (element.hasClass('open')) {
			element.removeClass('open');
			element.find('li').removeClass('open');
			element.find('ul').slideUp(200);
		}
		else {
			element.addClass('open');
			element.children('ul').slideDown(200);
			element.siblings('li').children('ul').slideUp(200);
			element.siblings('li').removeClass('open');
			element.siblings('li').find('li').removeClass('open');
			element.siblings('li').find('ul').slideUp(200);
		}
	});

});
})(jQuery);

/*--- Responsive Menu End ----*/


//Video Play
	$('.play-trigger').magnificPopup({
        type: 'iframe'
      });
      $.extend(true, $.magnificPopup.defaults, {
        iframe: {
          patterns: {
            youtube: {
              index: 'youtube.com/',
              id: 'v=',
              src: 'http://www.youtube.com/embed/%id%?autoplay=1'
            }
          }
        }
      });
	  
//Single page scroll js for button

	$('.home_banner_bottom_scroll a').on('click' , function(e){
	  $('.home_banner_bottom_scroll').removeClass('active');
	  $(this).parent().addClass('active');
	  var target = $('[data-scroll='+$(this).attr('href')+']');
	  e.preventDefault();
	  var targetHeight = target.offset().top-parseInt('85');
	  $('html, body').animate({
	   scrollTop: targetHeight
	  }, 1000);
	});
	
	$(window).scroll(function() {
	  var windscroll = $(window).scrollTop();
	  var target = $('.home_banner_bottom_scroll');
	  if (windscroll >= 0) {
	   $('[data-scroll]').each(function(i) {
		if ($(this).position().top <= windscroll + 95) {
		 target.removeClass('active');
		 target.eq(i).addClass('active');
		}
	   });
	  }else{
	   target.removeClass('active');
	   $('.home_banner_bottom_scroll').addClass('active');
	  }

	});

	
//show hide search form js
	
	$('#search_button').on("click", function(e) {
		$('#search_open').slideToggle();
		e.stopPropagation(); 
	});

	$(document).on("click", function(e){
		if(!(e.target.closest('#search_open'))){	
			$("#search_open").slideUp();   		
		}
   });

   
//Single page scroll js for button

	$('.home_banner_bottom_scroll a').on('click' , function(e){
	  $('.home_banner_bottom_scroll').removeClass('active');
	  $(this).parent().addClass('active');
	  var target = $('[section-scroll='+$(this).attr('href')+']');
	  e.preventDefault();
	  var targetHeight = target.offset().top-parseInt('75');
	  $('html, body').animate({
	   scrollTop: targetHeight
	  }, 1000);
	});
	
	$(window).scroll(function() {
	  var windscroll = $(window).scrollTop();
	  var target = $('.home_banner_bottom_scroll');
	  if (windscroll >= 0) {
	   $('[section-scroll]').each(function(i) {
		if ($(this).position().top <= windscroll + 75) {
		 target.removeClass('active');
		 target.eq(i).addClass('active');
		}
	   });
	  }else{
	   target.removeClass('active');
	   $('.home_banner_bottom_scroll').addClass('active');
	  }

	});	

/*--- Single page scroll js End ----*/

/*slider_images js */

	$('.slider_images .owl-carousel').owlCarousel({
                loop: true,
                margin: 10,
				autoplay:true,
                responsiveClass: true,
				navText : ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>'],
                responsive: {
                  0: {
                    items: 1,
                    nav: true
                  },
                  600: {
                    items: 2,
                    nav: true
                  },
                  1000: {
                    items: 3,
                    nav: true,
                    loop: true,
                    margin: 20
                  }
                }
              });
			  
/* testimonial_slider_wrapper js */

$(document).ready(function() {
              $('.testimonial_slider_wrapper .owl-carousel').owlCarousel({
                loop: true,
                margin: 10,
				autoplay:true,
                responsiveClass: true,
				smartSpeed: 1200,
				navText : ['<i class="flaticon-left-arrow" aria-hidden="true"></i>','<i class="flaticon-right-arrow" aria-hidden="true"></i>'],
                responsive: {
                  0: {
                    items: 1,
                    nav: true
                  },
                  600: {
                    items: 1,
                    nav: true
                  },
                  1000: {
                    items: 1,
                    nav: true,
                    loop: true,
                    margin: 20
                  }
                }
              })
            })

			
// -------------------------------------------------------------
// Shuffle
// -------------------------------------------------------------

$(window).on('load', function() {
    /** this is come when complete page is fully loaded, including all frames, objects and images **/

    if ($('#gridWrapper').length > 0) {
     
        /* initialize shuffle plugin */
        var $grid = $('#gridWrapper');

        $grid.shuffle({
            itemSelector: '.portfolio-wrapper' // the selector for the items in the grid
        });

        /* reshuffle when user clicks a filter item */
        $('#filter a').on('click', function (e) {
            e.preventDefault();

            // set active class
            $('#filter a').removeClass('active');
            $(this).addClass('active');

            // get group name from clicked item
            var groupName = $(this).attr('data-group');

            // reshuffle grid
            $grid.shuffle('shuffle', groupName );
        });
    }
});


/*typed heading js */

var TxtType = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

    TxtType.prototype.tick = function() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

        var that = this;
        var delta = 200 - Math.random() * 100;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
        }

        setTimeout(function() {
        that.tick();
        }, delta);
    };

    window.onload = function() {
        var elements = document.getElementsByClassName('typewrite');
        for (var i=0; i<elements.length; i++) {
            var toRotate = elements[i].getAttribute('data-type');
            var period = elements[i].getAttribute('data-period');
            if (toRotate) {
              new TxtType(elements[i], JSON.parse(toRotate), period);
            }
        }
        // INJECT CSS
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
        document.body.appendChild(css);
    };

	
// Wow js
		$(window).on("load", function() {
				var wow = new WOW({
					boxClass: 'wow',
					animateClass: 'animated',
					offset: 0,
					mobile: true,
					live: true
				});
				wow.init();
			});
			
/*testimonial_slider_wrapper js */

	$('.testimonial_slider_wrapper .owl-carousel').owlCarousel({
                loop: true,
                margin: 10,
				autoplay:true,
                responsiveClass: true,
				navText : ['<i class="fa fa-angle-double-left" aria-hidden="true"></i>','<i class="fa fa-angle-double-right" aria-hidden="true"></i>'],
                responsive: {
                  0: {
                    items: 1,
                    nav: true
                  },
                  600: {
                    items: 2,
                    nav: true
                  },
                  1000: {
                    items: 2,
                    nav: true,
                    loop: true,
                    margin: 20
                  }
                }
              });
			  
/*slider_section js */	
		  
			var owlslider = jQuery("div.owl-carousel");
 
           owlslider.each(function () {
              var $this = $(this),
                  $items = ($this.data('items')) ? $this.data('items') : 1,
                  $loop = ($this.attr('data-loop')) ? $this.data('loop') : true,
                  $navdots = ($this.data('nav-dots')) ? $this.data('nav-dots') : false,
                  $navarrow = ($this.data('nav-arrow')) ? $this.data('nav-arrow') : false,
                  $autoplay = ($this.attr('data-autoplay')) ? $this.data('autoplay') : true,
                  $autohgt = ($this.data('autoheight')) ? $this.data('autoheight') : false,
                  $space = ($this.attr('data-space')) ? $this.data('space') : 30;    
             
                  $(this).owlCarousel({
                      loop: $loop,
                      items: $items,
                      responsive: {
                        0:{items: $this.data('xx-items') ? $this.data('xx-items') : 1},
                        480:{items: $this.data('xs-items') ? $this.data('xs-items') : 1},
                        768:{items: $this.data('sm-items') ? $this.data('sm-items') : 2},
                        980:{items: $this.data('md-items') ? $this.data('md-items') : 3},
                        1200:{items: $items}
                      },
                      dots: $navdots,
                      autoHeight:$autohgt,
                      margin:$space,
                      nav: $navarrow,
                      navText:["<i class='fa fa-angle-left fa-2x'></i>","<i class='fa fa-angle-right fa-2x'></i>"],
                      autoplay: $autoplay,
                      autoplayHoverPause: true   
                  }); 
           }); 

/*shortcode_section js */
		   

/*--------------------------
scrollUp
---------------------------- */	
	// ===== Scroll to Top ==== 
$(window).scroll(function() {
    if ($(this).scrollTop() >= 100) {       
        $('#return-to-top').fadeIn(200);   
    } else {
        $('#return-to-top').fadeOut(200);  
    }
});
$('#return-to-top').on('click', function() {     
    $('body,html').animate({
        scrollTop : 0                
    }, 500);
});

		
		
});

})(jQuery);

