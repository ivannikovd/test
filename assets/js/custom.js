(function(){
	var originalAddClassMethod = jQuery.fn.addClass;
	var originalRemoveClassMethod = jQuery.fn.removeClass;
	$.fn.addClass = function() {
		var result = originalAddClassMethod.apply(this, arguments);
		$(this).trigger('classChanged');
		return result;
	}
	$.fn.removeClass = function() {
		var result = originalRemoveClassMethod.apply(this, arguments);
		$(this).trigger('classChanged');
		return result;
	}
})();

function scrollShowHide() {
	if ($(window).scrollTop() > 90) { 
		$('.page_up').addClass('active'); 
	} else { 
		$('.page_up').removeClass('active'); 
	}
}
scrollShowHide();
var windowScroll_t;
$(window).scroll(function() {
	clearTimeout(windowScroll_t);
	windowScroll_t = setTimeout(function() {
		scrollShowHide();
	}, 1);
});
$('.page_up').click(function() {
	$('html, body').animate({scrollTop: 0}, 500);
	return false;
});

function incline (words, number) {
	// words	=> 3-и варианта склонения существительного по правилу 1, 2, 5;
	// number   => само число
	return words[(((number % 100) > 4) && ((number % 100) < 20)) ? 2 : [2, 0, 1, 1, 1, 2][Math.min((number % 10), 5)]];
}

function stockTimer($el_timer) {
	if ($el_timer && $el_timer.is(':visible')) {
		var now = new Date();
		var stock = parseInt($el_timer.data('stock'));
		var cycleDays = parseInt($el_timer.data('cycle'));
		if (!stock) {
			$el_timer.css({display: 'none'});
			return false;
		}

		var remainsSeconds = parseInt(stock - (now / 1000));
		if (remainsSeconds > 0) {
			var remainsDays = parseInt(remainsSeconds / 86400);
			if (parseInt($el_timer.find('.jsTimerDaysCount').html()) != remainsDays) {
				$el_timer.find('.jsTimerDaysCount').parent('div').animate({top: -62}, 100, function() {
					$el_timer.find('.jsTimerDaysCount').html(remainsDays);
					$el_timer.find('.jsTimerDaysText').html(incline(['день', 'дня', 'дней'], remainsDays));
					$el_timer.find('.jsTimerDaysCount').parent('div').css({top: 62});
					$el_timer.find('.jsTimerDaysCount').parent('div').animate({top: 0}, 100);
				});
			}

			remainsSeconds -= remainsDays * 86400;
			var addHours = parseInt(remainsDays / 24);
			var remainsHours = parseInt(remainsSeconds / 3600);
			if (parseInt($el_timer.find('.jsTimerHoursCount').html()) != (remainsHours + addHours)) {
				$el_timer.find('.jsTimerHoursCount').parent('div').animate({top: -62}, 100, function() {
					$el_timer.find('.jsTimerHoursCount').html(((remainsHours + addHours) < 10) ? ("0" + parseInt(remainsHours + addHours)) : parseInt(remainsHours + addHours));
					$el_timer.find('.jsTimerHoursText').html(incline(['час', 'часа', 'часов'], remainsHours + addHours));
					$el_timer.find('.jsTimerHoursCount').parent('div').css({top: 62});
					$el_timer.find('.jsTimerHoursCount').parent('div').animate({top: 0}, 100);
				});
			}

			remainsSeconds -= remainsHours * 3600;
			var remainsMinutes = parseInt(remainsSeconds / 60);
			if (parseInt($el_timer.find('.jsTimerMinutesCount').html()) != remainsMinutes) {
				$el_timer.find('.jsTimerMinutesCount').parent('div').animate({top: -62}, 100, function() {
					$el_timer.find('.jsTimerMinutesCount').html((remainsMinutes < 10) ? ("0"+remainsMinutes) : remainsMinutes);
					$el_timer.find('.jsTimerMinutesText').html(incline(['минута', 'минуты', 'минут'], remainsMinutes));
					$el_timer.find('.jsTimerMinutesCount').parent('div').css({top: 62});
					$el_timer.find('.jsTimerMinutesCount').parent('div').animate({top: 0}, 100);
				});
			}

			remainsSeconds -= remainsMinutes * 60;
			if (parseInt($el_timer.find('.jsTimerSecondsCount').html()) != remainsSeconds) {
				$el_timer.find('.jsTimerSecondsCount').parent('div').animate({top: -62}, 100, function() {
					$el_timer.find('.jsTimerSecondsCount').html((remainsSeconds < 10) ? ("0"+remainsSeconds) : remainsSeconds);
					$el_timer.find('.jsTimerSecondsText').html(incline(['секунда', 'секунды', 'секунд'], remainsSeconds));
					$el_timer.find('.jsTimerSecondsCount').parent('div').css({top: 62});
					$el_timer.find('.jsTimerSecondsCount').parent('div').animate({top: 0}, 100);
				});
			}

			setTimeout(stockTimer, ((remainsDays > 0) ? 60000 : 1000), $el_timer);
		} else if (cycleDays > 0) {
			stock += cycleDays * 24 * 60 * 60; 
			$el_timer.data('stock', stock);
			stockTimer($el_timer);
		} else {
			$el_timer.css({display: 'none'});
			return false;
		}
	} else {
		return false;
	}
}

$(document).ready(function() {
	$('.jsTimer').each(function() {
		stockTimer($(this));
	});	

	$('.jsVkLink').on('click', function() {
		$('.jsVkPopup').fadeToggle(100);
	});
	
	$(document).mouseup(function (e) {
	    var container = $(".jsVkCont");
	    if (container.has(e.target).length === 0){
	        container.find('.jsVkPopup').hide();
	    }
	});
	
	if ($('.banner--top .orbit-slide').length <= 1) {
		$('.banner--top .orbit-previous, .banner--top .orbit-next').hide();
	}

	$('#clubBanner .jsClubBannerContactHide').on('click', function() {
		if ($('.jsClubBannerCaption').css('position') == 'absolute') {
			$('.jsClubBannerContact').slideUp(300);
			$('.jsClubBannerShow').slideDown(300);
		}
	});
	$('#clubBanner .jsClubBannerContactShow').on('click', function(){
		$('.jsClubBannerContact').slideDown(300);
		$('.jsClubBannerShow').slideUp(300);
		return false;
	});

	$('.jsPhoneMask').mask('+7 (999) 999-99-99', {autoclear: 0});
	$('.jsOs_phone').mask('+7 (999) 999-99-99', {autoclear: 0});

	$('.jsGoTo').on('click', function(event) {
		event.preventDefault();
		var id  = $(this).attr('href');
		var top = $(id).offset().top;
		$('body,html').animate({scrollTop: top}, 500);
	});

	function setApiUserName(el) {
		var apiUserName = $(el).data('api');
		if (apiUserName) {
			$('#apiUserName').val(apiUserName);
		}
	}

	function addCartDefaultGoods() {
		var elem = $('.price__panel.is-active input[name="id"]:checked');
		var id = elem.val();
		if (id) {
			$.ajax({
				type:			"POST",
				url:			"/assets/components/minishop2/action.php",
				data:			"id="+id+"&count=1&options=%5B%5D&ms2_action=cart%2Fadd&ctx=web",
				success:	function(msg) {
					console.log("товар №"+id+" добавлен в корзину автоматически");
					setApiUserName(elem);
				}
			});
		}
	}
	
	function addCartDefaultGoodsMain(el) {
		var elem = el;
		var id = elem.val();
		if (id) {
			$.ajax({
				type:			"POST",
				url:			"/assets/components/minishop2/action.php",
				data:			"id="+id+"&count=1&options=%5B%5D&ms2_action=cart%2Fadd&ctx=web",
				success:	function(msg) {
					console.log("товар №" + id + " добавлен в корзину автоматически");
					setApiUserName(elem);
				}
			});
		}
	}
	
	if ($('.add_cart')) {
		addCartDefaultGoods();
	}

	$('.row_card_wrap').on('click', function(event) {
		el = $(this).find('input[name="id"]');
		var abon_title = $(this).find('.row_link_about_price').data('title');
		$('#cb_abon').val(abon_title);
		addCartDefaultGoodsMain(el);
	});

	$('.button_add_card').on('click', function(event) {
		event.preventDefault();
		el = $(this).closest('form').find('input[name="id"]');
		addCartDefaultGoodsMain(el);		
	});
	
	$('.price__panel').bind('classChanged', function() {
		addCartDefaultGoods();
	});
	$('.price__panel input[name="id"]').change(function(){
		addCartDefaultGoods();
	});

	function allServicesToggle(container) {
		if ($(container).length < 1) {
			return;
		}
		var data			= $(container).data();
		var items			= $(container).find(container+'Items > *');
		var title			= $(container).find(container+'Title');
		var moreLink	= $(container).find(container+'More');
		if (items.length > data.count) {
			moreLink.html(data.textShow);
			items.each(function(index) {
				if (index >= data.count) {
					$(this).hide();
				}
			});
			moreLink.on('click', function() {
				if (items.filter(':hidden').length) {
					moreLink.html(data.textHide);
					moreLink.addClass('show');
					items.filter(':hidden').slideDown(200);
				} else {
					moreLink.html(data.textShow);
					moreLink.removeClass('show');
					items.each(function(index){
						if (index >= data.count) {
							$(this).slideUp(200);
						}
					});
				}
				return false;
			});
		} else {
			moreLink.hide();
		}
	}
	allServicesToggle('.jsServices');
	allServicesToggle('.jsServicesKids');

	$('.carusel_g a[href$=".jpg"], .carusel_g a[href$=".jpeg"], .carusel_g a[href$=".png"]').magnificPopup({
		type:			'image',
		zoom:			{
			enabled:	true,
			duration:	200
		},
		gallery:	{
			enabled:	true,
			tCounter:	'<span class="mfp-counter">%curr% из %total%</span>'
		}
  });

	$('.desctop_hidden .club_gallery_wrap a').magnificPopup({
		type:			'image',
		zoom:			{
			enabled:	true,
			duration:	200
		},
		gallery:	{
			enabled:	true,
			tCounter:	'<span class="mfp-counter1">%curr% из %total%</span>'
		}
  });

	$('.jsSliderSteps a').magnificPopup({
		  type:			'image',
		  zoom:			{
			  enabled:	true,
			  duration:	200
		  },
		  gallery:	{
			  enabled:	true,
			  tCounter:	'<span class="mfp-counter1">%curr% из %total%</span>'
		  }
    });


	$('.jsScheduleSelect').on('change', function() {
		var value	= $(this).val();
		var type	= $(this).data('type');
		if (value) {
			$('#schedule').data(type, value);
			var data = $('#schedule').data();
			
			$('.jsScheduleItem').each(function() {
				$(this).hide();				

				var showClub = (data.club == 'all') || ($(this).data('club') == data.club);
				var showService	= (data.service == 'all') || ($(this).data('service') == data.service);
				var showTrainer	= (data.trainer == 'all') || ($(this).data('trainer') == data.trainer);
				var showDirect	= (data.direct == 'all') || ($(this).data('direct') == data.direct);
				if (showClub && showService && showTrainer && showDirect) {
					$(this).show();
					
				}
			});
			//initDaysSlider();
			$('.schedule-days__item.active').removeClass('active');
			$('.jsScheduleWrap').each(function() {
				$(this).show();
				if ($(this).find('.jsScheduleItem:visible').length == 0) {
					$(this).hide();
				}
			});
		}
	});
	$('.jsScheduleSelect').trigger('change');
	
	//скрытие блока с пустым расписанием
	var i = 0;
	$('.timing_content .jsScheduleItem').each(function() {
		if($(this).is(":visible")) {
			i++;
		}
	});
	if(i < 1) {
		$('.single_club_timing').hide();
	}
	//console.log(i);

	// function scrollPane() {
	// 	var pane = $('.jsScrollPane');
	// 	pane.jScrollPane({
	// 		autoReinitialise:	true,
	// 		animateScroll:		false
	// 	});
	// }
	// scrollPane();
	
	$('.jsShowTrainerForm').on('click', function() {
		var content	= $(this).parent('.jsTrainerContent');
		var form		= content.next('.jsTrainerForm');
		content.slideUp(250);
		form.slideDown(250);
		return false;
	});
	$('.jsShowTrainerContent').on('click', function() {
		var form		= $(this).parent('.jsTrainerForm');
		var content	= form.prev('.jsTrainerContent');
		form.slideUp(250);
		content.slideDown(250);
		return false;
	});
	$('.close-button').on('click', function() {
		$('.jsTrainerForm').hide();
		$('.jsTrainerContent').show();
	});
	//добавление класса для отслеживания заказа с мобильной версии блока абонементов
	$('.jsSelectAbon').on('click', function() {
		$('#msOrder').addClass('jsMobileCardForm');
	});
	//удаление класса для отслеживания заказа с десктопной версии блока абонементов
	$('.main_card_block_items button[type="submit"]').on('click', function() {
		$('#msOrder').removeClass('jsMobileCardForm');
	});

	if (typeof miniShop2 != "undefined") {	

		miniShop2.Callbacks.Order.submit.response.success = function(response) {

			var orderId = miniShop2.Order.order;
			//проверка наличия класса для подключения нужной метрики (десктоп или мобилка)
			if($(orderId).hasClass('jsMobileCardForm')) {
				yaCounter44500534.reachGoal('3_step_abon');
				ga('send', 'event', 'form', 'send', '3_step');
			} else {
				yaCounter44500534.reachGoal('buy_aboniment');
				ga('send', 'event', 'form', 'send', 'buy_abonement');
			}

			/*yaCounter44500534.reachGoal('buy_aboniment');
			ga('send', 'event', 'form', 'send', 'buy_abonement');*/
		}		
	}

	

	$('.jsButtonBuy').on('click', function() {
		yaCounter44500534.reachGoal('button_buy');
		//ga('send', 'event', 'subscription', 'click');
	});
	
	$('.button_review a').on('click', function() {
		var id = $(this).attr('title_id');
		$('#id_page').attr('value', id);
	});
	
	
	$('#js_file_vacance').on('change', function(e) {
		//console.log(e.target.files[0].name);
		$('#resume_input_value').text(e.target.files[0].name);
		//$('#js_success_file').fadeIn(200);
	});
	$('.trainers_cat li').each(function() {
		if ($(this).hasClass('is-active')) {
			var data_link = $(this).find('a').attr('aria-controls');
			// console.log(data_link);
			// $('#' + data_link).addClass('is-active');
		}
	});
	
	$('.trainers_cat li a').on('click', function() {
			var data_link = $(this).attr('aria-controls');
			$('#' + data_link).addClass('is-active');
			//console.log(data_link);
	});
	
});

$(document).on('af_complete', function(event, response) {
	var formId = response.form.attr('id');
	if (response.success === true) {
		if (response.form.attr('id') == "cb_form") {
			yaCounter44500534.reachGoal('call_me_back');
			ga('send', 'event', 'form', 'send', 'callback');
			$('#'+formId).next('.close-button').trigger('click');
		} else if (response.form.hasClass('tr_form')) {
			yaCounter44500534.reachGoal('send_trainer');
			ga('send', 'event', 'form', 'send', 'trainer');
			response.form.parent().parent().next('.close-button').trigger('click');
		} else if (response.form.hasClass('cof_form')) {
			response.form.next('.close-button').trigger('click');
		} else if (response.form.attr('id') == "form_abon_consult") {
			response.form.next('.close-button').trigger('click');
		} else if (response.form.attr('id') == "cb_form_spb") {
			response.form.next('.close-button').trigger('click');
		} else if (response.form.attr('id') == "vacance_form") {
			$('#'+formId).next('.close-button').trigger('click');
			var message='Заявка успешно отправлена';
			$.jGrowl(message, {theme: 'af-message-success'});
		} else if ($(response.form).hasClass("banner_main_form")) {
			yaCounter44500534.reachGoal('banner_form');
			ga('send', 'event', 'form', 'send', 'banner');
			$(response.form).find('input[type="submit"]').addClass('noclick').attr('value', 'Заявка отправлена')
		} else if (response.form.attr('id') == "main_os") {
			$('.main_form_wrapper').hide(200).html("<h3 class='success_main_os'>Ваша заявка успешно отправлена!</h3>").fadeIn(300);
			yaCounter44500534.reachGoal('podarok');
			ga('send', 'event', 'form', 'send', 'offer');
		} else if (response.form.attr('id') == "main_os_new") {
			$('#main_os_new').find('.fhn-form__inner').fadeOut(200);
			setTimeout(function() {
				$('#main_os_new').find('.fhn-form__inner').html("<div class='main_form_title' style='width:100%; text-align: center;'><h3 style='width:100%'>Ваша заявка успешно отправлена!</h3></div>").fadeIn(300);
			}, 210);
			yaCounter44500534.reachGoal('podarok');
			ga('send', 'event', 'form', 'send', 'offer');
		}
	}
	return true;
});

// function initDaysSlider() {
//  	    $('.jsDaysSlider').owlCarousel({
//         	    loop: false,
//         	    dots: false,
//         	    margin:0,
//         	    onDrag: function(event) {
//         	    	$(event.target).addClass('dragged')
//         	    },
//         	    onTranslated: function(event) {
//         	    	$(event.target).removeClass('dragged')
//         	    },
//         	    nav:true,
//         	    responsive:{
//         	        0:{
//         	            items:4
//         	        },
//         	        479:{
//         	            items:7,
//         	            autoWidth:true
//         	        }
//         	   }
//          })
//  	}
