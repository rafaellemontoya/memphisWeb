(function($) {

    var revapi24;
    var tpj = jQuery;
	
	
 // on ready function
    $(document).ready(function() {
		"use strict";
		
	
	// range js //
   
  $( "#range-price" ).slider({
		range: true,
		min: 0,
		max: 1200,
		values: [ 100, 875 ],
		slide: function( event, ui ) {
	$( "#price" ).val("$" + ui.values[ 0 ] + " - " +  " $" + ui.values[ 1 ]  );
	}
	});

	$( "#price" ).val( "$" + $( "#range-price" ).slider( "values", 0 ) +
	" - " + " $" + $( "#range-price" ).slider( "values", 1 )); 

	//* slider *//
	 $(document).ready(function() {
            $('.cc_ps_top_slider_section .owl-carousel').owlCarousel({
                loop: true,
                margin: 10,
                autoplay: false,
                responsiveClass: true,
                smartSpeed: 1200,
                navText: ['<i class="fa fa-angle-double-left" aria-hidden="true"></i>', '<i class="fa fa-angle-double-right" aria-hidden="true"></i>'],
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

		
		
			$(document).ready(function() {
              $('.cc_li_slider_wrapper .owl-carousel').owlCarousel({
                loop: true,
                margin: 10,
				autoplay:false,
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
                    items: 4,
                    nav: true,
                    loop: true,
                    margin: 20
                  }
                }
              })
            })
			
			$(document).ready(function() {
              $('.cc_li_slider_wrapper_2 .owl-carousel').owlCarousel({
                loop: true,
                margin: 10,
				autoplay:false,
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
              })
            })
			
	
	
    });

})(jQuery);

