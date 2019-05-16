
  
// Preloader 
    jQuery(window).on('load', function() {
        jQuery("#status").fadeOut();
        jQuery("#preloader").delay(200).fadeOut("slow");
    });
	
	
// on ready function
    $(document).ready(function() {
		"use strict";

//----------------------- BASIC SLIDER 6 & 7 & 8 MENU FIXED JS -----------------------//
	
	$(window).scroll(function(){
		var window_top = $(window).scrollTop() + 1; 
		if (window_top > 50) {
			$('.main_menu_wrapper').addClass('menu_fixed animated fadeInDown');
		} else {
			$('.main_menu_wrapper').removeClass('menu_fixed animated fadeInDown');
		}
	});

//----------------------- BASIC SLIDER 6 & 7 & 8 MOBILE MENU FIXED JS -----------------------//
	
	$(window).scroll(function(){
		var window_top = $(window).scrollTop() + 1; 
		if (window_top > 50) {
			$('.mobail_menu_main').addClass('menu_fixed animated fadeInDown');
		} else {
			$('.mobail_menu_main').removeClass('menu_fixed animated fadeInDown');
		}
	});
	
/*--- BASIC SLIDER 6 & 7 & 8  RESPONSIVE MENU START ----*/

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

/*--- BASIC SLIDER 6 & 7 & 8 RESPONSIVE MENU END ----*/


//----------------------- BASIC SLIDER 1 MENU FIXED JS -----------------------//
	
	$(window).scroll(function(){
		var window_top = $(window).scrollTop() + 1; 
		if (window_top > 50) {
			$('.section1_menu_wrapper').addClass('menu_fixed animated fadeInDown');
		} else {
			$('.section1_menu_wrapper').removeClass('menu_fixed animated fadeInDown');
		}
	});
//----------------------- BASIC SLIDER 3 MENU FIXED JS -----------------------//
	
	$(window).scroll(function(){
		var window_top = $(window).scrollTop() + 1; 
		if (window_top > 50) {
			$('.section3_menu_wrapper').addClass('menu_fixed animated fadeInDown');
		} else {
			$('.section3_menu_wrapper').removeClass('menu_fixed animated fadeInDown');
		}
	});
//----------------------- BASIC SLIDER 4 MENU FIXED JS  -----------------------//
	
	$(window).scroll(function(){
		var window_top = $(window).scrollTop() + 1; 
		if (window_top > 50) {
			$('.section4_menu_wrapper').addClass('menu_fixed animated fadeInDown');
		} else {
			$('.section4_menu_wrapper').removeClass('menu_fixed animated fadeInDown');
		}
	});

	
//BASIC SLIDER 1 SINGLE PAGE SCROLL JS

	$('.section1_bottom_scroll a').on('click' , function(e){
	  $('.section1_bottom_scroll').removeClass('active');
	  $(this).parent().addClass('active');
	  var target = $('[section-scroll='+$(this).attr('href')+']');
	  e.preventDefault();
	  var targetHeight = target.offset().top-parseInt('85');
	  $('html, body').animate({
	   scrollTop: targetHeight
	  }, 1000);
	});
	
	$(window).scroll(function() {
	  var windscroll = $(window).scrollTop();
	  var target = $('.section1_bottom_scroll');
	  if (windscroll >= 0) {
	   $('[section-scroll]').each(function(i) {
		if ($(this).position().top <= windscroll + 95) {
		 target.removeClass('active');
		 target.eq(i).addClass('active');
		}
	   });
	  }else{
	   target.removeClass('active');
	   $('.section1_bottom_scroll').addClass('active');
	  }

	});

	
/*--- SHOW HIDE SEARCH FORM JS ----*/
	
	$('#search_button').on("click", function(e) {
		$('#search_open').slideToggle();
		e.stopPropagation(); 
	});

	$(document).on("click", function(e){
		if(!(e.target.closest('#search_open'))){	
			$("#search_open").slideUp();   		
		}
   });
 
 
/*--- BASIC SLIDER 4 JS START ----*/

$(document).ready(function (){
	var owl = $('.section4_slider_wrapper .owl-carousel');
		owl.owlCarousel({
		loop:true,
		margin:0,
		autoplay:false,
		navText : ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>'],
		items:1
				  
});


			  function setAnimation ( _elem, _InOut ) {
				var animationEndEvent = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

				_elem.each ( function () {
				  var $elem = $(this);
				  var $animationType = 'animated ' + $elem.data( 'animation-' + _InOut );

				  $elem.addClass($animationType).one(animationEndEvent, function () {
					$elem.removeClass($animationType);
				  });
				});
			  }

			  owl.on('change.owl.carousel', function(event) {
				  var $currentItem = $('.owl-item', owl).eq(event.item.index);
				  var $elemsToanim = $currentItem.find("[data-animation-out]");
				  setAnimation ($elemsToanim, 'out');
			  });

			  owl.on('changed.owl.carousel', function(event) {

				  var $currentItem = $('.owl-item', owl).eq(event.item.index);
				  var $elemsToanim = $currentItem.find("[data-animation-in]");
				  setAnimation ($elemsToanim, 'in');
			  })

			});
/*--- BASIC SLIDER 4 JS END ----*/	

		
/*--- BASIC SLIDER 6 & 7 JS START ----*/
  
  (function( $ ) {

	//Function to animate slider captions 
	function doAnimations( elems ) {
		//Cache the animationend event in a variable
		var animEndEv = 'webkitAnimationEnd animationend';
		
		elems.each(function () {
			var $this = $(this),
				$animationType = $this.data('animation');
			$this.addClass($animationType).one(animEndEv, function () {
				$this.removeClass($animationType);
			});
		});
	}
	
	//Variables on page load 
	var $myCarousel = $('#carousel-example-generic'),
		$firstAnimatingElems = $myCarousel.find('.item:first').find("[data-animation ^= 'animated']");
		
	//Initialize carousel 
	$myCarousel.carousel();
	
	//Animate captions in first slide on page load 
	doAnimations($firstAnimatingElems);
	
	//Pause carousel  
	$myCarousel.carousel('pause');
	
	
	//Other slides to be animated on carousel slide event 
	$myCarousel.on('slide.bs.carousel', function (e) {
		var $animatingElems = $(e.relatedTarget).find("[data-animation ^= 'animated']");
		doAnimations($animatingElems);
	});  

	
})(jQuery);	

/*--- BASIC SLIDER 6 & 7 JS END ----*/


/*--- BASIC SLIDER 8 JS START ----*/

// toggle menu for mobile

function mobileDropdown () {
  if($('.main-menu').length) {
    $('.main-menu nav ul li.dropdown-holder').append(function () {
      return '<i class="fa fa-bars" aria-hidden="true"></i>';
    });
    $('.main-menu nav ul li.dropdown-holder .fa').on('click', function () {
      $(this).parent('li').children('ul').slideToggle();
    }); 
  }
}

// Theme Search Box 

function searchBox () {
  var search = $("#search-button"),
      mainSearch = $("#searchWrapper"),
      close = $("#close-button");
  if(search.length) {
    search.on('click', function(){
      mainSearch.addClass('show-box');
    });
    close.on('click', function() {
      mainSearch.removeClass('show-box');
    });
  }
}

// Theme-banner slider 

function BannerSlider () {
  var banner = $("#theme-main-banner");
  if (banner.length) {
      banner.camera({ //here I declared some settings, the height and the presence of the thumbnails 
        height: '750px',
        navigation: true,
        pagination: true,
        thumbnails: false,
        playPause: false,
        autoplay:true,
        pauseOnClick: false,
        hover: false,
        overlayer: true,
        loader: 'none',
        time: 5000,
        minHeight: '600px',
      });
  };
}

// Theme-banner slider 

function BannerSliderTwo () {
  var banner = $("#theme-main-banner-two");
  if (banner.length) {
      banner.camera({ //here I declared some settings, the height and the presence of the thumbnails 
        height: '1050px',
        navigation: true,
        pagination: true,
        thumbnails: false,
        playPause: false,
        autoplay:true,
        pauseOnClick: false,
        hover: false,
        overlayer: true,
        loader: 'none',
        time: 5000,
        minHeight: '900px',
      });
  };
}

// DOM ready function

jQuery(document).on('ready', function(){
	(function($){
		mobileDropdown ();
    searchBox ();
		BannerSlider ();
    BannerSliderTwo ();
	})(jQuery);
});

/*--- BASIC SLIDER 8 JS END ----*/


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
$('#return-to-top').click(function() {     
    $('body,html').animate({
        scrollTop : 0                
    }, 500);
});

});



