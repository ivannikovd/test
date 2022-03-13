$(document).ready(function() {
	$('.jsTrainerItem').on('click', function() {
		var src = $(this).find('.jsLazyTrainer').attr('src');
		var id = '#' + $(this).find('.jsLInkOpen').attr('data-open');
		//console.log(src);
		$(id).find('.jsLazyTrainerDesc').attr('src', src);
	});
	
	$('.jsStepClubBtn').on('click', function() {
		var	 $this = $(this),
				tabContainer = $this.closest('.ab-steps'),
				tabContentItem = tabContainer.find('.ab-steps-slider__item'),
				ndx = $this.index(),
				reqItem = tabContentItem.eq(ndx);			   

		$('.jsStepClubBtn').removeClass('active');
		$(this).addClass('active');

		tabContentItem.removeClass('active');
		reqItem.addClass('active');
		tabContentItem.find('.jsSliderSteps').slick('refresh');
	});
	
	function setApiUserName(el) {
		// console.log('RUN setApiUserName()');
		// console.log('el = ');
		// console.log(el);
		var apiUserName = $(el).data('api');
		// console.log('apiUserName = ');
		// console.log(apiUserName);
		if (apiUserName) {
			$('#apiUserName').val(apiUserName);
		}
		// console.log('STOP setApiUserName()');
	}

	$('.jsSelectAbon').on('click', function() {
		setApiUserName($(this).closest('form').find('.jsGoods'));
		yaCounter44500534.reachGoal('2_step_abon');
		ga('send', 'event', 'button', 'click', '2_step');
	});

	$('.jsStepsBtn').on('click', function() {
		yaCounter44500534.reachGoal('1_step_abon');
		ga('send', 'event', 'button', 'click', '1_step');

		var dataId = $(this).data('id');
		$(this).closest('.ab-steps-item').removeClass('active');
		$(this).closest('.ab-steps__list').find('#'+dataId).addClass('active');
		if($('#'+dataId).find('.jsAbonSlider').hasClass('slick-slider')) {
			$('#'+dataId).find('.jsAbonSlider').slick('setPosition');
		}
		
		var tar_wrap = $('#'+dataId);
		var targetSlider = $('#'+dataId).find('.jsAbonSlider');	 
		if(!targetSlider.hasClass('slick-slider')) {				 
			tar_wrap.find('.ajax-snippet').animate({opacity:'0'},1);
			tar_wrap.find('.preloader_abon_wrap').addClass('preloader_abon_wrap_show');		 
			initAbonSlider(dataId);
		}	   

		$('html, body').stop().animate({scrollTop: $('.ab-steps__list').offset().top}, 450);

	})

	$('.jsStepsBtnPrev').on('click', function() {
		$(this).closest('.ab-steps-item').removeClass('active');
		$('.ab-steps-item:first').addClass('active');
		//$('.carusel_g').slick('setPosition');
		// $('.jsStepClubBtn').removeClass('active');
		// $('.jsStepClubBtn:first').addClass('active');
		$('html, body').stop().animate({scrollTop: $('.ab-steps__list').offset().top}, 450);
	})

	$(".jsAbonSlider").slick({
		dots: !1,
		infinite: !1,
		slidesToShow: 1,
		slidesToScroll: 1,
		lazyLoad: true,
		adaptiveHeight: true
	})

	$('.jsAbonConsult').on('click', function() {
		$('#form_ab_name').val($(this).attr('data-title'));
	});

	$('.jsAccordItem > span').on('click', function() {
		$('.jsAccordItem > span').addClass('disable');
		var thisPar = $(this).closest('.jsAccordItem');

		if (!thisPar.hasClass('active') ) {

			thisPar.siblings().removeClass('active');
			thisPar.addClass('active');

			thisPar.siblings().find('.jsAccordBody').fadeOut(200,function() {
				thisPar.find('.jsAccordBody').fadeIn(200,function() {
					$('.jsAccordItem > span').removeClass('disable');
				});
			});
		}
		else {
			thisPar.removeClass('active');
			thisPar.find('.jsAccordBody').fadeOut(200, function() {
				$('.jsAccordItem > span').removeClass('disable');
			});
		}
	});

	$('.jsAccordBody').on('click',function() {
		$(this).fadeOut(200);
		$(this).closest('.jsAccordItem').removeClass('active');
	});
	//console.log($('.jsDaysSlider'));
	var daysClone = $('.jsDaysSlider').first().clone(true);
	//console.log(daysClone);
	
	$('.jsScheduleSelect').on('change', function() {
		var daysClone_pre = $(daysClone).first().clone();

		var value   = $(this).val();
		var type	= $(this).data('type');
		if (value){
			$('#schedule').data(type, value);
			var data = $('#schedule').data();
			$('.jsScheduleItem').each(function() {
				$(this).hide();
				var showClub = (data.club == 'all') || ($(this).data('club') == data.club);
				var showService = (data.service == 'all') || ($(this).data('service') == data.service);
				var showTrainer = (data.trainer == 'all') || ($(this).data('trainer') == data.trainer);
				var showDirect  = (data.direct == 'all') || ($(this).data('direct') == data.direct);
				if (showClub && showService && showTrainer && showDirect) {
					$(this).show();
				}
			});
			
			//показ активных дней недели в слайдере
			var arrDayItems = [];
			$('.jsScheduleItem:visible').each(function(i) {
				arrDayItems[i] = $(this).data('time');
			});
			var final_array = array_unique(arrDayItems);
			
			// $('.jsScheduleDay').each(function() {
			//  $(this).addClass('hidden_day');
			// });
			//console.log(daysClone);		   
			//var daysClone_pre = daysClone.clone(true);
			//console.log(daysClone_pre);
		//  $(daysClone_pre).each(function() {
		//	 $(this).addClass('hidden_day');
		//  });


			// final_array.forEach(
		 //	 function showActive(currentValue) {
		 //		 $('.jsScheduleDay').each(function() {
		 //			 if($(this).attr('data-time') == currentValue) {
		 //					 $(this).removeClass('hidden_day');
		 //					 //console.log($(this).attr('data-time'));
		 //			 }
		 //		 });
		 //	 }
		 // );		  
		   /* final_array.forEach(
				function(currentValue) {
					var rem = 0;
					// console.log(typeof(currentValue) + ' сравниваем');
					var $items_day = $(daysClone_pre).find('.jsScheduleDay');
					$items_day.each(function(i, e) {			
						if($(e).data('time') == currentValue) {
							console.log($(e), 'yes');
							rem = 0;
						} else {
						   $(this).remove();
						   console.log($(e), 'no');
						}					  
					});
					if(rem == 1) {
							$(this).remove();						   
						}
				}
			);*/
			
			$(daysClone_pre).find('.jsScheduleDay').each(function(i, e) {		   
				 if(final_array.indexOf($(e).data('time')) == -1) {
					  $(e).remove();
				 }			   
			});
			
			//$('.schedule-days__item.active').removeClass('active');
			initDaysSlider(daysClone_pre);
			nothingScheduleItems();
			setHeightScheduleBoxTitle();
		}
	});
	$("#selectClub option.current_club").prop('selected', 'selected');
	$("#selectClub").trigger('change');

	$('body').on('click', '.jsScheduleDay', function() {
		$('.jsScheduleDay').removeClass('active');
		$(this).addClass('active');
		
		var time = $(this).attr('data-time');
		var value = $(this).attr('data-time');
		var data = $('#schedule').data();
		$('.jsTimes').hide();
		$('.jsScheduleItem').each(function() {
			$(this).hide();
			var showClub = (data.club == 'all') || ($(this).data('club') == data.club);
			var showService = (data.service == 'all') || ($(this).data('service') == data.service);
			var showTrainer = (data.trainer == 'all') || ($(this).data('trainer') == data.trainer);
			var showDirect  = (data.direct == 'all') || ($(this).data('direct') == data.direct);
			if (showClub && showService && showTrainer && showDirect && ($(this).attr('data-time') == time)) {
				$(this).show();
				var unpub = $(this).data('unpub');
				$('.jsTimes_' + unpub).show();
			}
		});
		setHeightScheduleBoxTitle();
	})

	$('.jsScheduleCloseBtn').on('click',function(e) {
		e.stopPropagation();
		$(this).closest('.jsScheduleDropdown').removeClass('active');
	})

	$(document).on('click', '.jq-selectbox__dropdown ul li', function() {
		checkSelected();
	});

	function checkSelected() {
		$('.jq-selectbox__dropdown ul li.first_option_color').each(function() {
			if($(this).hasClass('selected')) {
				$(this).closest('.schedule-filter__item').find('.jq-selectbox__select').addClass('disable');
			} else {
				$(this).closest('.schedule-filter__item').find('.jq-selectbox__select').removeClass('disable');
			}
		})
	}
	checkSelected();
	

	$('.jsScheduleBox').on('click', function(e) {
		e.stopPropagation();
		$('.jsScheduleDropdown').removeClass('active');
		$(this).siblings('.jsScheduleDropdown').addClass('active');
	})

	$(document).on('click', function(e) {
		if ($('.jsScheduleDropdown').find(e.target).length == 0 && !$(e.target).hasClass('jsScheduleDropdown')){				
				$('.jsScheduleDropdown').removeClass('active'); 
			} 
	})

	$('.schedule-filter__item_direction ul li').on('mouseenter', function() {
		var dataColor = $(this).data('color');
		$(this).css({"background-color":dataColor});
	})

	$('.schedule-filter__item_direction ul li').on('mouseleave', function() {
		$(this).css({"background-color":"#fff"});
		
	})


	function setHeightScheduleBoxTitle() {
		var winWidth = $(window).width(),
			itemCounts = 0;

		$('.jsScheduleBox').find('.schedule__box__title').css({height: 'auto'})

		if (winWidth > 1023 ) {
			itemCounts = 4;
		} else if (winWidth > 639) {
			itemCounts = 2;
		}
		if (itemCounts) {

			for (var i = 0; i < $('.jsScheduleBox').length; i+= itemCounts) {
				$('.jsScheduleBox').slice(i, i + itemCounts).find('.schedule__box__title').equalHeights();
			}
		}
	}

	setHeightScheduleBoxTitle();
	
	$(window).on('resize', function() {
		setHeightScheduleBoxTitle();
	})
		
	$('.jsStepClubBtn.active').trigger('click');
	
	setTimeout(30, clickFirstDayItem());

	sliderTrainersTask();

	//setTimeout(cardSlidersInit,1500);
	
});

$(window).load(function() {
	var daysClone = $('.jsDaysSlider').first().clone(true);
	var ww = $(window).width();
	$(window).resize(function() {
		if($(window).width() != ww) {
			var daysClone_pre = $(daysClone).first().clone();
			initDaysSlider(daysClone_pre);
		}
	});
   
});

function sliderTrainersTask() {
		$(".carusel_task").slick({
			dots: !1,
			infinite: !0,
			slidesToShow: 3,
			slidesToScroll: 3,
			adaptiveHeight: true,
			responsive: [ {
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3
				}
			}, {
				breakpoint: 650,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,			  
				}
			}, {
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			} ]
		});
	}

function clickFirstDayItem() {
	var visibleDayItemFirst = $(".jsScheduleDay:not('.hidden_day')").first();
	visibleDayItemFirst.trigger('click').addClass('active');
}

function nothingScheduleItems() {
	var countItems = $('.jsScheduleItem:visible');  
	if(countItems.length) {	 
		$('.schedule-items__hothing').addClass('hidden_day');
	} else {
		$('.schedule-items__hothing').removeClass('hidden_day');
		$('.jsTimes').hide();
	}
}

function array_unique(arr) {
	var tmp_arr = new Array();
	for (i = 0; i < arr.length; i++) {
		if (tmp_arr.indexOf(arr[i]) == "-1") {
			tmp_arr.push(arr[i]);
		}
	}
	return tmp_arr;
}

function initDaysSlider(cloneD) {
	//console.log($(cloneD).find('.jsScheduleDay'));
	$('.jsDaysSliderWrap').empty().html(cloneD);

	$('.jsDaysSlider').removeClass('no_padding');
	var sliderWrap = $('.jsDaysSlider').width();
	var sliderItemWidth = 0;
	$(".jsScheduleDay:not('.hidden_day')").each(function() {
		sliderItemWidth += $(this).width();
	});
	if(sliderItemWidth > sliderWrap) {
		$('.jsDaysSlider').removeClass('add_left_border').removeClass('no_padding');
		$(".jsDaysSlider .jsScheduleDay:not('.hidden_day')").first().addClass('add_left_border');
		$('.jsDaysSlider').owlCarousel({
				loop: false,
				dots: false,
				//autoWidth: true,
				margin:0,
				onDrag: function(event) {
					$(event.target).addClass('dragged')
				},
				onTranslated: function(event) {
					$(event.target).removeClass('dragged')
				},
				nav:true,
				responsive:{
					0:{
						items:4
					},
					479:{
						items:4,
						autoWidth:true
					}
			   }
		 });
		 $('.owl-item').each(function(i) {
			 if($(this).find('.jsScheduleDay').hasClass('hidden_day')) {
				 $(this).addClass('hidden_day');
			 }
		 });
	} else {
		$('.jsDaysSlider').trigger('destroy.owl.carousel').addClass('add_left_border').addClass('no_padding');
	}
	setTimeout(clickFirstDayItem, 10);
	
 }

/*function initDescriptionCards(item) {
	if(item.find('.jsStepsBtnPrev').hasClass('new_click')) {
	
		var itemSpan = item.find('.jsAccordItem');

		if(!itemSpan.hasClass('initDesc')) {
			console.log('noClass');
			$(itemSpan).on('click', function() {
				$($(this)).addClass('disable');
				var thisPar = $(this).closest('.jsAccordItem');

				if (!thisPar.hasClass('active')) {
					thisPar.siblings().removeClass('active');
					thisPar.addClass('active');
					thisPar.siblings().find('.jsAccordBody').fadeOut(200,function() {
						thisPar.find('.jsAccordBody').fadeIn(200,function() {
							$('.jsAccordItem > span').removeClass('disable');
						});
					});
				} else {
					thisPar.removeClass('active');
					thisPar.find('.jsAccordBody').fadeOut(200, function() {
						$('.jsAccordItem > span').removeClass('disable');
					});
				}
			});
		}
		item.find('.jsAccordItem').addClass('initDesc');
	}
}*/

function initAbonSlider(dataId) {
	var tar = $('#'+dataId);
	var tarSlider = $('#' + dataId + ' .jsAbonSlider'); 
	if(tar.find('.as_trigger').length > 0) {
		tar.find('.as_trigger').trigger('click');
	}   

	var intervalStep = setInterval(function() {
		if(!$('#'+dataId).find('.as_trigger').length) {
			console.log($('#'+dataId).find('.as_trigger').length);  
			clearInterval(intervalStep);
			setTimeout(function() {
				!$('#'+dataId).find('.ajax-snippet').stop().animate({opacity:'1'},200);
				!$('#'+dataId).find('.preloader_abon_wrap').removeClass('preloader_abon_wrap_show');
			}, 800);	  

			setTimeout(function() {	 
				if(!$('#' + dataId + ' .jsAbonSlider').hasClass('slick-slider')) {
					$('#' + dataId + ' .jsAbonSlider').slick({
						dots: !1,
						infinite: !1,
						slidesToShow: 1,
						slidesToScroll: 1,
						adaptiveHeight: true
					});   

					$('#' + dataId + ' .jsAbonSlider').find('.jsAccordBody .close-button').on('click', function() {
						$(this).closest('.jsAccordItem').removeClass('active');
						$(this).closest('.jsAccordBody').fadeOut();
					});

					$('#' + dataId + ' .jsAbonSlider').find('.jsAccordItem > span').on('click', function() {		  
						var itemSpan = $(this).closest('.jsAccordItem');
						$(this).addClass('disable');
						var thisPar = $(this).closest('.jsAccordItem');
						if (!thisPar.hasClass('active') ) {
							thisPar.siblings().removeClass('active');
							thisPar.addClass('active');
							thisPar.siblings().find('.jsAccordBody').fadeOut(200,function() {
								thisPar.find('.jsAccordBody').fadeIn(200,function() {
									$('.jsAccordItem > span').removeClass('disable');
								});
							});
						} else {
							thisPar.removeClass('active');
							thisPar.find('.jsAccordBody').fadeOut(200, function() {
								$('.jsAccordItem > span').removeClass('disable');
							});
						}				  
					});	

					$('#' + dataId + ' .jsAbonSlider').find('.jsStepsBtnPrev').on('click', function() {		 
						$(this).closest('.ab-steps-item').removeClass('active');
						$('.ab-steps-item:first').addClass('active');		   
						$('html, body').stop().animate({scrollTop: $('.ab-steps__list').offset().top}, 450);
					}); 
				}
			}, 700);
		} 
	}, 100);
}