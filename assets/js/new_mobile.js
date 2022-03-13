/*Новый js-файл для мобильной версии сайта*/
$(document).ready(function() {
	$('.jsClubsChoise').on('click', function(e) {
		e.preventDefault();
	});

	$('.jsFooterTitle').on('click', function() {
		$(this).next('.jsFooterList').slideToggle();
	});

	$('.jsClubItem').on('click', function(e) {
		e.preventDefault();
		var id = $(this).attr('data-id');
		var url = $(this).attr('data-url');
		$(this).css('background', '#7fffef');
		$.ajax({
	    	url: '/ajax.php',
	    	data: {
	    		coo_id: id
			},
			type: "POST",
            cache: false,
            success: function(data) {
				if(data == 0) {
					var res = 'Выбрать клуб';
					window.location.replace(url);				
				} else {
					var res = data;
					window.location.replace(url);
				}
				$('.header_club_title').html(res);
			},
            error: function() {
                console.log('ошибка ajax-запроса');
            }
        });
	});

	if ($(window).width() < 641) {
		serv_item();
		clubs_items();
	}
	$(window).resize(function() {
		if ($(window).width() < 641) {
			if($('.jsServicesItems').hasClass('slick-slider')) {
				//
				//console.log('Уже есть slick');
			} else {
				serv_item();
				clubs_items();
			}
			
		} else {
			if($('.jsServicesItems').hasClass('slick-slider')) {
				$(".jsServicesItems").slick('unslick');
			}
			if($('.jsMobileClubsMainWrap').hasClass('slick-slider')) {
				$(".jsMobileClubsMainWrap").slick('unslick');
			}
		}
	});		
	

});

function clubs_items() { 
	$(".jsMobileClubsMainWrap").slick({
        dots: 0,
        loop: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        lazyLoad: false,
        adaptiveHeight: true		  
    });
}

function serv_item() { 
	$(".jsServicesItems").slick({
        dots: 0,
        loop: false,
        slidesToShow: 2,
        slidesToScroll: 2,
        adaptiveHeight: true,
		  responsive: [		    
		    {
		      breakpoint: 641,
		      settings: {
		        slidesToShow: 2,
		        slidesToScroll: 2
		      }
		    },
		    {
		      breakpoint: 560,
		      settings: {
		        slidesToShow: 1,
		        slidesToScroll: 1
		      }
		    }		    
		  ]
    });
}