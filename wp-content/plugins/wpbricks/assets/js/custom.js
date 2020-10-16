( function ($) {
	'use strict';
	
	var ajax_url = mdbp_javascript_obj.ajaxurl;
	
	$(window).load(function () {
		$('.wpbricks-counter-loop').each(function () {
			var data_endate = $(this).attr('data-enddate');
			var endDate = new Date(data_endate);
			var currentHtml = $(
				'#brick_timer[data-enddate=\'' + $(this).attr('data-enddate') + '\']'
			);
			var brickTimers = currentHtml.brickTimers;
			var currentSelector = currentHtml.selector;
			brickTimers = setInterval(function () {
				timeBetweenDates(endDate);
			}, 1000);
			
			function timeBetweenDates (toDate) {
				var dateEntered = toDate;
				var now = new Date();
				var difference = dateEntered.getTime() - now.getTime();
				if (0 >= difference) {
					clearInterval(brickTimers);
				} else {
					var seconds = Math.floor(difference / 1000);
					var minutes = Math.floor(seconds / 60);
					var hours = Math.floor(minutes / 60);
					var days = Math.floor(hours / 24);
					
					hours %= 24;
					minutes %= 60;
					seconds %= 60;
					if (isNaN(seconds)) {
						seconds = '00';
					}
					if (isNaN(minutes)) {
						minutes = '00';
					}
					if (isNaN(hours)) {
						hours = '00';
					}
					if (isNaN(days)) {
						days = 0;
					}
					$(currentSelector)
						.find('#days')
						.text(days);
					$(currentSelector)
						.find('#hours')
						.text(hours);
					$(currentSelector)
						.find('#minutes')
						.text(minutes);
					$(currentSelector)
						.find('#seconds')
						.text(seconds);
				}
			}
		});
	});
	
	/**
	 * jQuery Events
	 */
	jQuery(document).ready(function () {
		
		$(document).on('click', '.accordionParentWrapper .wp-block-bricks-accordion-item .accordionWrapper .accordionHeader .dashicons', function (e) {
			e.stopImmediatePropagation();
			$(this)
				.parent()
				.parent()
				.siblings()
				.find('.accordionBody')
				.slideUp();
			$(this)
				.parent()
				.next()
				.slideToggle();
			if (
				$(this)
					.parent()
					.parent('.accordionWrapper')
					.hasClass('tabClose')
			) {
				$(this)
					.parent()
					.parent('.accordionWrapper')
					.removeClass('tabClose')
					.addClass('tabOpen');
				$(this)
					.parent()
					.parent('.accordionWrapper')
					.siblings()
					.removeClass('tabOpen')
					.addClass('tabClose');
			} else {
				$(this)
					.parent()
					.parent('.accordionWrapper')
					.removeClass('tabOpen')
					.addClass('tabClose');
			}
		});
		// ranking js
		$(document).on('click', '.bricks_ranking tr td.toggle', function (e) {
			e.stopImmediatePropagation();
			if (
				$(this)
					.parent()
					.hasClass('Ranking-Active')
			) {
				$(this)
					.parent()
					.removeClass('Ranking-Active');
			} else {
				$(this)
					.parent()
					.addClass('Ranking-Active');
			}
		});
		
		/*Slider*/
		$('.wp-block-bricks-slider').each(function () {
			var $gallery = $(this);
			var slideCount = null;
			
			$gallery.on('init', function (event, slick) {
				slideCount = slick.slideCount;
				setSlideCount();
				setCurrentSlideNumber(slick.currentSlide);
			});
			
			$gallery.slick({
				// fade: $gallery.data('effect'),
				fade: 'fade' == $gallery.data('effect'),
				autoplay: $gallery.data('autoplay'),
				speed: $gallery.data('speed'),
				arrows: $gallery.data('arrows'),
				adaptiveHeight: true,
				
				// appendArrows: true,
				pauseOnFocus: true,
				cssEase: 'linear',
				lazyLoad: 'anticipated'
				
				// prevArrow: '.exhibit-navigation .prev',
				// nextArrow: '.exhibit-navigation .next, .slick-slide img, .slick-slide div'
			});
			
			$gallery.on('beforeChange', function (
				event,
				slick,
				currentSlide,
				nextSlide
			) {
				setCurrentSlideNumber(nextSlide);
			});
			
			function setSlideCount () {
				var $el = $('.exhibit-navigation .counter').find('.total');
				$el.text(slideCount);
			}
			
			function setCurrentSlideNumber (currentSlide) {
				var $el = $('.exhibit-navigation .counter').find('.current');
				$el.text(currentSlide + 1);
			}
		});
		
		$('.popup-gallery').magnificPopup({
			delegate: 'div',
			type: 'image',
			tLoading: 'Loading image #%curr%...',
			mainClass: 'mfp-img-mobile',
			gallery: {
				enabled: true,
				navigateByImgClick: true,
				preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
			},
			image: {
				tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
			}
		});
		
		$('.slider .gallery-item-list').slick({
			refresh: true,
			dots: true,
			infinite: true,
			speed: 300,
			slidesToShow: 1,
			adaptiveHeight: true
		})
			.magnificPopup({
				delegate: 'div.bricks-gallery-item:not(.slick-cloned)',
				type: 'image',
				tLoading: 'Loading image number: #%curr%...',
				mainClass: 'mfp-img-mobile',
				gallery: {
					enabled: true,
					navigateByImgClick: true,
					preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
				},
				image: {
					tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
					
					// titleSrc: function(item) {
					// 	return item.el.attr('title') + '<small>by Marsel Van Oosten</small>';
					// }
				}
			});
		
		/*Tabs*/
		$('.bricks-tabs').tabs();
		// counter js
		counter();
		fillCircleCount();
		// popup js
		$('.brick_popup_btn').on('click', function () {
			$(this)
				.siblings('.brick_model_main')
				.addClass('brick_model_open');
		});
		$('.brick_close_btn, .brick_bg_overlay').on('click touch', function () {
			$('.brick_model_main').removeClass('brick_model_open');
		});
		
		// -------------------------------------------------- Counter JS Start --------------------------------------------------
		function counter () {
			$('.bricks_count').each(function () {
				if ($(this).hasClass('start')) {
					var elementTop = $(this).offset().top;
					var elementBottom = elementTop + $(this).outerHeight();
					var viewportTop = $(window).scrollTop();
					var viewportBottom = viewportTop + $(window).height();
					if (elementBottom > viewportTop && elementTop < viewportBottom) {
						$(this).removeClass('start');
						$(this).animate(
							{
								Counter: $(this).text()
							},
							{
								duration: 3000,
								easing: 'swing',
								step: function (now) {
									$(this).text(Math.ceil(now).toLocaleString('en-IN'));
								}
							}
						);
						var barWidth = $(this)
							.closest('.Bricks_progress')
							.attr('data-value');
						$(this)
							.closest('.Bricks_progress')
							.css('width', barWidth + '%');
					}
				}
			});
		}
		
		function fillCircleCount () {
			$('.countervalue').each(function () {
				var currentClass = $(this).attr('class');
				if ('countervalue start' === currentClass) {
					var elementTop = $(this).offset().top;
					var elementBottom = elementTop + $(this).outerHeight();
					var viewportTop = $(window).scrollTop();
					var viewportBottom = viewportTop + $(window).height();
					if (elementBottom > viewportTop && elementTop < viewportBottom) {
						$(this).removeAttr('class');
						$(this).addClass('countervalue');
						var before = $(this).data('before');
						var after = $(this).data('after');
						$(this).animate(
							{
								Counter: $(this).text()
							},
							{
								duration: 1000,
								easing: 'linear',
								step: function (now) {
									$(this).text(before + Math.ceil(now) + after);
								}
							}
						);
						$(this)
							.parents('.circle_outer svg')
							.find('circle.progress-border')
							.removeAttr('style');
						var percent = $(this)
							.parents('.circle_outer svg')
							.data('countervalue');
						var radius = $(this)
							.parents('.circle_outer svg')
							.find('circle.progress-border')
							.attr('r');
						var circumference = 2 * Math.PI * radius;
						var strokeDashOffset = circumference - ( percent * circumference ) / 100;
						$(this)
							.parents('.circle_outer svg')
							.find('circle.progress-border')
							.animate(
								{
									'stroke-dashoffset': strokeDashOffset
								},
								{
									duration: 1000,
									easing: 'linear'
								}
							);
					}
				}
			});
		}
		
		// popup js
		
		jQuery('#preview_section').hide();
		jQuery('#myModal #chk_section_for_existing').hide();
		jQuery(document).on('click', '.detail-priview_btn', function () {
			jQuery(this).next().find('.priview_btn').trigger('click');
		});
		
		jQuery(document).on('click', '.priview_btn', function () {
			// jQuery(".priview_btn").click(function () {
			var live_url = jQuery(this).data('theme-url');
			if (live_url) {
				jQuery('#preview_section').show();
				var next_tt = jQuery(this).parent().parent().parent().parent().next().find('.priview_btn').attr('data-theme-token');
				var next_ta = jQuery(this).parent().parent().parent().parent().next().find('.priview_btn').attr('data-theme-attr');
				var next_tu = jQuery(this).parent().parent().parent().parent().next().find('.priview_btn').attr('data-theme-url');
				if (next_tt) {
					jQuery('.iframe-sidebar .prev-next .next').attr({
						'data-theme-token': next_tt,
						'data-theme-attr': next_ta,
						'data-theme-url': next_tu
					});
					jQuery('.iframe-sidebar .prev-next .next').attr('src', next_tu);
					jQuery('.iframe-sidebar .prev-next .next').attr('attr', next_ta);
				} else {
					jQuery('.iframe-sidebar .prev-next .next').addClass('btn-disabled');
					jQuery('.iframe-sidebar .prev-next .next').attr('disabled', 'disabled');
				}
				var prev_tt = jQuery(this).parent().parent().parent().parent().prev().find('.priview_btn').attr('data-theme-token');
				var prev_ta = jQuery(this).parent().parent().parent().parent().prev().find('.priview_btn').attr('data-theme-attr');
				var prev_tu = jQuery(this).parent().parent().parent().parent().prev().find('.priview_btn').attr('data-theme-url');
				if (prev_tt) {
					jQuery('.iframe-sidebar .prev-next .back').attr({
						'data-theme-token': prev_tt,
						'data-theme-attr': prev_ta,
						'data-theme-url': prev_tu
					});
					jQuery('.iframe-sidebar .prev-next .back').attr('src', prev_tu);
					jQuery('.iframe-sidebar .prev-next .back').attr('attr', prev_ta);
				} else {
					jQuery('.iframe-sidebar .prev-next .back').addClass('btn-disabled');
					jQuery('.iframe-sidebar .prev-next .back').attr('disabled', 'disabled');
				}
				jQuery('.site-title').text(jQuery(this).data('theme-attr'));
				// jQuery("#preview_frame").attr("src", '');
				jQuery('#preview_frame').attr('src', live_url);
				jQuery('.iframe-sidebar .iframe-sidebar-container .buttons-wrap a').attr('data-theme-token', jQuery(this).data('theme-token'));
				jQuery('.iframe-sidebar .iframe-sidebar-container .buttons-wrap button').attr('data-theme-token', jQuery(this).data('theme-token'));
				jQuery('.iframe-sidebar').attr('id', 'unique-' + jQuery(this).data('theme-token'));
				
			} else {
				alert('No Preview URL Found');
			}
		});
		jQuery(document).on('click', '.iframe-sidebar .back', function () {
			jQuery('#preview_frame').attr('src', '');
			jQuery('#preview_section').hide();
		});
		
		jQuery(document).on('click', '.iframe-sidebar .prev-next .back', function () {
			var live_url = jQuery(this).attr('src');
			jQuery('#preview_frame').attr('src', live_url);
			jQuery('.site-title').text(jQuery(this).attr('attr'));
			var current_id = jQuery(this).attr('data-theme-token');
			console.log('current_id in prev ' + current_id)
			jQuery('.iframe-sidebar').attr('id', 'unique-' + current_id);
			if (live_url) {
				jQuery('#preview_section').show();
				var next_tt = jQuery('#' + 'unique-' + current_id).next().find('.priview_btn').attr('data-theme-token');
				var next_ta = jQuery('#' + 'unique-' + current_id).next().find('.priview_btn').attr('data-theme-attr');
				var next_tu = jQuery('#' + 'unique-' + current_id).next().find('.priview_btn').attr('data-theme-url');
				if (next_tt) {
					jQuery('.iframe-sidebar .prev-next .next').removeClass('btn-disabled');
					jQuery('.iframe-sidebar .prev-next .next').removeAttr('disabled');
					jQuery('.iframe-sidebar .prev-next .next').attr({
						'data-theme-token': next_tt,
						'data-theme-attr': next_ta,
						'data-theme-url': next_tu
					});
					jQuery('.iframe-sidebar .prev-next .next').attr('src', next_tu);
					jQuery('.iframe-sidebar .prev-next .next').attr('attr', next_ta);
					jQuery('.iframe-sidebar .iframe-sidebar-container .buttons-wrap a').attr('data-theme-token', current_id);
					jQuery('.iframe-sidebar .iframe-sidebar-container .buttons-wrap button').attr('data-theme-token', current_id);
				} else {
					jQuery('.iframe-sidebar .prev-next .next').addClass('btn-disabled');
					jQuery('.iframe-sidebar .prev-next .next').attr('disabled', 'disabled');
				}
				
				var prev_tt = jQuery('#' + 'unique-' + current_id).prev().find('.priview_btn').attr('data-theme-token');
				var prev_ta = jQuery('#' + 'unique-' + current_id).prev().find('.priview_btn').attr('data-theme-attr');
				var prev_tu = jQuery('#' + 'unique-' + current_id).prev().find('.priview_btn').attr('data-theme-url');
				if (prev_tt) {
					jQuery('.iframe-sidebar .prev-next .back').removeClass('btn-disabled');
					jQuery('.iframe-sidebar .prev-next .back').removeAttr('disabled');
					jQuery('.iframe-sidebar .prev-next .back').attr({
						'data-theme-token': prev_tt,
						'data-theme-attr': prev_ta,
						'data-theme-url': prev_tu
					});
					jQuery('.iframe-sidebar .prev-next .back').attr('src', prev_tu);
					jQuery('.iframe-sidebar .prev-next .back').attr('attr', prev_ta);
					jQuery('.iframe-sidebar .iframe-sidebar-container .buttons-wrap a').attr('data-theme-token', current_id);
					jQuery('.iframe-sidebar .iframe-sidebar-container .buttons-wrap button').attr('data-theme-token', current_id);
				} else {
					jQuery('.iframe-sidebar .prev-next .back').addClass('btn-disabled');
					jQuery('.iframe-sidebar .prev-next .back').attr('disabled', 'disabled');
				}
			} else {
				alert('No Preview URL Found');
			}
		});
		jQuery(document).on('click', '.iframe-sidebar .prev-next .next', function () {
			var live_url = jQuery(this).attr('src');
			jQuery('#preview_frame').attr('src', live_url);
			jQuery('.site-title').text(jQuery(this).attr('attr'));
			var current_id = jQuery(this).attr('data-theme-token');
			console.log('current_id in next ' + current_id)
			jQuery('.iframe-sidebar').attr('id', 'unique-' + current_id);
			if (live_url) {
				jQuery('#preview_section').show();
				var next_tt = jQuery('.block_data #' + 'unique-' + current_id).next().find('.priview_btn').attr('data-theme-token');
				var next_ta = jQuery('.block_data #' + 'unique-' + current_id).next().find('.priview_btn').attr('data-theme-attr');
				var next_tu = jQuery('.block_data #' + 'unique-' + current_id).next().find('.priview_btn').attr('data-theme-url');
				if (next_tt) {
					jQuery('.iframe-sidebar .prev-next .next').removeClass('btn-disabled');
					jQuery('.iframe-sidebar .prev-next .next').removeAttr('disabled');
					jQuery('.iframe-sidebar .prev-next .next').attr({
						'data-theme-token': next_tt,
						'data-theme-attr': next_ta,
						'data-theme-url': next_tu
					});
					jQuery('.iframe-sidebar .prev-next .next').attr('src', next_tu);
					jQuery('.iframe-sidebar .prev-next .next').attr('attr', next_ta);
					jQuery('.iframe-sidebar .iframe-sidebar-container .buttons-wrap a').attr('data-theme-token', current_id);
					jQuery('.iframe-sidebar .iframe-sidebar-container .buttons-wrap button').attr('data-theme-token', current_id);
				} else {
					jQuery('.iframe-sidebar .prev-next .next').addClass('btn-disabled');
					jQuery('.iframe-sidebar .prev-next .next').attr('disabled', 'disabled');
				}
				var prev_tt = jQuery('.block_data #' + 'unique-' + current_id).prev().find('.priview_btn').attr('data-theme-token');
				var prev_ta = jQuery('.block_data #' + 'unique-' + current_id).prev().find('.priview_btn').attr('data-theme-attr');
				var prev_tu = jQuery('.block_data #' + 'unique-' + current_id).prev().find('.priview_btn').attr('data-theme-url');
				if (prev_tt) {
					jQuery('.iframe-sidebar .prev-next .back').removeClass('btn-disabled');
					jQuery('.iframe-sidebar .prev-next .back').removeAttr('disabled');
					jQuery('.iframe-sidebar .prev-next .back').attr({
						'data-theme-token': prev_tt,
						'data-theme-attr': prev_ta,
						'data-theme-url': prev_tu
					});
					jQuery('.iframe-sidebar .prev-next .back').attr('src', prev_tu);
					jQuery('.iframe-sidebar .prev-next .back').attr('attr', prev_ta);
					jQuery('.iframe-sidebar .iframe-sidebar-container .buttons-wrap a').attr('data-theme-token', current_id);
					jQuery('.iframe-sidebar .iframe-sidebar-container .buttons-wrap button').attr('data-theme-token', current_id);
				} else {
					jQuery('.iframe-sidebar .prev-next .back').addClass('btn-disabled');
					jQuery('.iframe-sidebar .prev-next .back').attr('disabled', 'disabled');
				}
			} else {
				alert('No Preview URL Found');
			}
		});
		jQuery(document).on('click', '.iframe-sidebar .wpbricks-theme-import', function () {
			var token_id_unique = jQuery(this).parents('.iframe-sidebar').attr('id');
			var token_id = '';
			if (token_id_unique) {
				token_id = token_id_unique.split("unique-");
			}
			var get_token_id = '';
			if (token_id) {
				get_token_id = $.trim(token_id[1]);
			}
			if (jQuery('#preview_section').is(':visible')) {
				jQuery('#myModal').css({ 'z-index': '222221', 'background': 'rgba(49,57,68,.85)' });
			}
			var theme_token = get_token_id; //jQuery(this).data('theme-token');
			changeClassProccess('#unique-' + theme_token + ' .wpbricks-theme-import', 'add', 'updating-message');
			mdbp_change_text('#unique-' + theme_token + ' .wpbricks-theme-import', 'Importing');
			mdbp_theme_detail_popup(theme_token, jQuery(this).data('install-type'));
		});
		jQuery(document).on('click', '.block-detail-btn .wpbricks-theme-import', function () {
			var token_id_unique = jQuery(this).parents('li.tmpl_li').attr('id');
			var token_id = '';
			if (token_id_unique) {
				token_id = token_id_unique.split("unique-");
			}
			var get_token_id = '';
			if (token_id) {
				get_token_id = $.trim(token_id[1]);
			}
			if (jQuery('#preview_section').is(':visible')) {
				jQuery('#myModal').css({ 'z-index': '222221', 'background': 'rgba(49,57,68,.85)' });
			}
			var theme_token = get_token_id; //jQuery(this).data('theme-token');
			changeClassProccess('#unique-' + theme_token + ' .wpbricks-theme-import', 'add', 'updating-message');
			mdbp_change_text('#unique-' + theme_token + ' .wpbricks-theme-import', 'Importing');
			mdbp_theme_detail_popup(theme_token, jQuery(this).data('install-type'));
		});
		jQuery(document).on('click', '.wpbricks_parent_active', function () {
			mdbp_import_parent_theme_ajax();
		});
		jQuery(document).on('click', '.wpbricks-theme-import-process', function () {
			jQuery('#myModal #chk_section_for_existing').hide();
			if (!jQuery(this).data('parent-theme')) {
				jQuery('.mdbp-error-msg').css('box-shadow', '0 0 12px 0px #af2b2b');
			} else {
				jQuery('.wpbricks-theme .popup-content-last').addClass('left-popup-not-load');
				jQuery('.wpbricks-theme .popup-content-right').removeClass('right-popup-not-load');
				jQuery('#myModal').addClass('mdbp-process-popup');
				
				var process_array = mdbp_get_checked_process_content();
				var content_installation = false;
				var widget_installation = false;
				var customizer_installation = false;
				jQuery.each(process_array, function (index) {
					if ('content_process' == index) {
						// jQuery('.mdbp_import_process_sec .round_icon').addClass('process_not');
					}
					if ('widget_process' == index) {
						widget_installation = true;
					}
					if ('customizer_process' == index) {
						customizer_installation = true;
					}
				});
				jQuery('.mdbp_import_process_sec .round_icon').addClass('process_waiting');
				jQuery('.mdbp_import_process_sec').addClass('mdbp_waiting_process');
				mdbp_theme_import_options(jQuery(this).data('theme-token'), process_array);
			}
		});
		jQuery(document).on('click', '#mdbp_delete_demo_content_process', function () {
			jQuery('.demo_content_delete_warning').toggleClass('show_warning');
		});
		jQuery(document).on('click', '.wpbricks_close_span', function () {
			console.log('wpbricks_close_span ');
			$('#myModal .modal-content .wpbricks-theme.theme-popup-main.theme-info').remove();
			changeClassProccess('.theme-info-main.modal', 'remove', 'mdbp-show-class');
			changeClassProccess('.wpbricks-theme-import', 'remove', 'updating-message');
			mdbp_change_text('.wpbricks-theme-import', 'Import');
		});
		var modal = document.getElementById('myModal');
		window.onclick = function (event) {
			if (event.target == modal) {
				if (jQuery('#myModal').is('.mdbp-process-popup')) {
				} else {
					changeClassProccess('.theme-info-main.modal', 'remove', 'mdbp-show-class');
					changeClassProccess('.wpbricks-theme-import', 'remove', 'updating-message');
					mdbp_change_text('.wpbricks-theme-import', 'Import');
				}
			}
		};
		
		/*Template code*/
		jQuery('body').on('click', '.wpbricks-template-import', function () {
			var theme_token = jQuery(this).data('theme-token');
			changeClassProccess('#unique-' + theme_token + ' .wpbricks-template-import', 'add', 'updating-message');
			mdbp_change_text('#unique-' + theme_token + ' .wpbricks-template-import', 'Importing');
			var radioValue = jQuery('input[name=\'template_imp_page_otion\']:checked').val();
			var page_id, page_title, page_content;
			if (radioValue == 'existing_page') {
				jQuery('#myModal #chk_section_for_existing').show();
				page_id = jQuery('.template_imp_select').val();
				page_content = jQuery('input[name="mdbp_delete_page_content"]:checked').val();
				page_title = '';
			} else {
				page_id = '';
				page_title = jQuery('input[name="insert_new_page"]').val();
				page_content = '';
				jQuery('#myModal #chk_section_for_existing').hide();
			}
			var install_type = jQuery(this).data('install-type');
			mdbp_template_import_popup(theme_token, install_type, page_title, page_id, page_content);
		});
		
		/*Addons code*/
		
		jQuery('body').on('click', '.wpbricks-addons-import', function () {
			
			var theme_token = jQuery(this).data('theme-token');
			var active_status = jQuery(this).data('active-type');
			changeClassProccess('#unique-' + theme_token + ' .wpbricks-addons-import', 'add', 'updating-message');
			mdbp_change_text('#unique-' + theme_token + ' .wpbricks-addons-import', 'Processing...');
			var install_type = jQuery(this).data('install-type');
			mdbp_addons_import_popup(theme_token, install_type, active_status);
		});
		/*jQuery('body').on("click", ".wpbricks-addons-import", function () {
				var theme_token = jQuery(this).data('theme-token');
				changeClassProccess('#unique-' + theme_token + ' .wpbricks-template-import', 'add', 'updating-message');
				mdbp_change_text('#unique-' + theme_token + ' .wpbricks-template-import', 'Importing');
				var install_type = jQuery(this).data('install-type');
				mdbp_addons_import_popup(theme_token, install_type);
		});*/
		
		jQuery('body').on('click', '.template-imp-setting input[type=\'radio\']', function () {
			var radioValue = jQuery('input[name=\'template_imp_page_otion\']:checked').val();
			if (radioValue == 'existing_page') {
				if (jQuery('#template_radio_result').length) {
					jQuery('#template_radio_result').show();
				} else {
					mdbp_import_template_option(radioValue);
				}
				jQuery('#template_radio_result_new_page').hide();
				jQuery('#myModal #chk_section_for_existing').show();
			} else {
				jQuery('#template_radio_result_new_page').show();
				jQuery('#template_radio_result').hide();
				jQuery('#myModal #chk_section_for_existing').hide();
			}
		});
		
		/**
		 * Function for compvarion of all import process
		 */
		function mdbp_installation_complete () {
			mdbp_change_text('.wpbricks-theme-import-process', 'Installed');
			mdbp_create_status_res('All Done!!!! Enjoy your new theme..!');
			changeClassProccess('.theme-info button.wpbricks-theme-import-process', 'add', 'mdbp-pointer-events-all');
			changeClassProccess('.wpbricks_close_span', 'remove', 'mdbp-pointer-events-none');
			changeClassProccess('.wpbricks_close_span', 'add', 'mdbp-pointer-events-all');
			var mdbp_view_the_site = document.createElement('a');
			var href = window.location.href;
			var index = href.indexOf('/wp-admin');
			var homeUrl = href.substring(0, index);
			mdbp_view_the_site.setAttribute('href', homeUrl);
			//mdbp_view_the_site.setAttribute('href', 'http://' + location.host);
			mdbp_view_the_site.setAttribute('target', '_blank');
			mdbp_view_the_site.classList.add('mdbp_view_the_site');
			
			var mmdbp_view_the_site_textnode = document.createTextNode('Visit Site');
			mdbp_view_the_site.appendChild(mmdbp_view_the_site_textnode);
			
			mdbp_replace_content('.wpbricks-theme-import-process', mdbp_view_the_site);
		}
		
		/**
		 *
		 * @param classes string (class for add another class)
		 * @param string (class which you want to add)
		 */
		function mdbp_add_class (classes, addclass) {
			jQuery(classes).addClass(addclass);
		}
		
		/**
		 *
		 * @param string removeclassfrom (Remove all class from)
		 */
		function mdbp_remove_class (removeclassfrom, removeclass) {
			jQuery(removeclassfrom).removeClass(removeclass);
		}
		
		/**
		 *
		 * @param string classes (class hierarchy for change the taxt)
		 * @param string text  (New text)
		 */
		function mdbp_change_text (classes, text) {
			jQuery(classes).text(text);
		}
		
		/**
		 *
		 * @param string classes (class hierarchy for add the content)
		 * @param string content (New Content)
		 */
		function mdbp_add_content (classes, content) {
			jQuery(classes).html(content);
		}
		
		/**
		 * @param string message (Response status message) for theme
		 */
		function mdbp_create_status_res (message) {
			var mdbp_info_msg = document.createElement('div');
			mdbp_info_msg.classList.add('mdbp-info-msg');
			var mdbp_info_msg_child1 = document.createElement('p');
			var mdbp_info_msg_child1_text = document.createTextNode('We are importing your website. The process can take anywhere between 2 to 10 minutes depending on the size of the website and speed of connection.');
			mdbp_info_msg_child1.appendChild(mdbp_info_msg_child1_text);
			var mdbp_info_msg_child2 = document.createElement('p');
			var mdbp_info_msg_child2_text = document.createTextNode('Please do not close this browser window until the site is imported completely.');
			mdbp_info_msg_child2.appendChild(mdbp_info_msg_child2_text);
			var mdbp_info_msg_child3 = document.createElement('p');
			mdbp_info_msg_child3.innerHTML = message;
			mdbp_info_msg.appendChild(mdbp_info_msg_child1);
			mdbp_info_msg.appendChild(mdbp_info_msg_child2);
			mdbp_info_msg.appendChild(mdbp_info_msg_child3);
			jQuery('.import_ajax_status_content').html(mdbp_info_msg);
		}
		
		/**
		 * @param string message (Response status message) for theme
		 */
		function mdbp_create_status_addons_res (message) {
			var mdbp_info_msg = document.createElement('div');
			mdbp_info_msg.classList.add('mdbp-info-msg');
			var mdbp_info_msg_child1 = document.createElement('p');
			var mdbp_info_msg_child1_text = document.createTextNode('The process can take anywhere between 2 to 5 minutes depending on the size of the addons and speed of connection.');
			mdbp_info_msg_child1.appendChild(mdbp_info_msg_child1_text);
			var mdbp_info_msg_child2 = document.createElement('p');
			var mdbp_info_msg_child2_text = document.createTextNode('Please do not close this browser window until the addons is imported completely.');
			mdbp_info_msg_child2.appendChild(mdbp_info_msg_child2_text);
			var mdbp_info_msg_child3 = document.createElement('p');
			mdbp_info_msg_child3.innerHTML = message;
			mdbp_info_msg.appendChild(mdbp_info_msg_child1);
			mdbp_info_msg.appendChild(mdbp_info_msg_child2);
			mdbp_info_msg.appendChild(mdbp_info_msg_child3);
			jQuery('.import_ajax_status_content').html(mdbp_info_msg);
		}
		
		/**
		 * @param string message (Response status message) for template
		 */
		function mdbp_create_status_res_for_template (message) {
			var mdbp_info_msg = document.createElement('div');
			mdbp_info_msg.classList.add('mdbp-info-msg');
			var mdbp_info_msg_child3 = document.createElement('p');
			mdbp_info_msg_child3.innerHTML = message;
			mdbp_info_msg.appendChild(mdbp_info_msg_child3);
			jQuery('.import_ajax_status_content').html(mdbp_info_msg);
		}
		
		/**
		 *
		 * @param classes (class hierarchy for replave the content)
		 * @param content (New Content)
		 */
		function mdbp_replace_content (classes, content) {
			jQuery(classes).replaceWith(content);
		}
		
		/**
		 * @param int themetoken (Theme Id)
		 */
		function mdbp_theme_import_options (themetoken, process_array) {
			var data = {
				'action': 'mdbp_theme_import_options_ajax',
				'themetoken': themetoken,
			};
			jQuery.ajax({
				type: 'POST',
				data: data,
				url: ajax_url,
				beforeSend: function () {
					changeClassProccess('.theme-info .popup-content-last.popup-sections .import_options', 'add', 'mdbp-pointer-events-none');
					changeClassProccess('.theme-info button.wpbricks-theme-import-process', 'add', 'mdbp-pointer-events-none');
					mdbp_change_text('.wpbricks-theme-import-process', 'Installing..');
					changeClassProccess('.wpbricks_close_span', 'add', 'mdbp-pointer-events-none');
				},
				success: function (response) {
					var response = JSON.parse(response);
					if (response.status) {
						if (response.res_arr.theme_file.theme_is_independent == 'yes') {
							mdbp_import_new_theme_ajax(process_array, response.res_arr);
						} else if (response.res_arr.theme_file.theme_is_independent == 'no') {
							mdbp_import_child_theme_ajax(process_array, response.res_arr,);
						}
					}
				},
				complete: function () {
				},
				error: function () {
					mdbp_create_status_res('Error occurred, Please Try Again..!');
				}
			});
		}
		
		function mdbp_get_checked_process_content () {
			var content_process = jQuery('input[name="mdbp_demo_content_import_process"]:checked').val();
			var widget_process = jQuery('input[name="mdbp_widget_import_process"]:checked').val();
			var customizer_process = jQuery('input[name="mdbp_customizer_import_process"]:checked').val();
			var process_array = {};
			if (content_process) {
				process_array['content_process'] = content_process;
			} else {
				jQuery('.mdbp_content_imported .round_icon').removeClass('process_waiting').addClass('process_skip');
				jQuery('.mdbp_content_imported').removeClass('mdbp_waiting_process').addClass('mdbp_skip_process');
				jQuery('.mdbp_content_imported  i').removeClass('dashicons-clock').addClass('dashicons-redo');
			}
			if (widget_process) {
				process_array['widget_process'] = widget_process;
			} else {
				jQuery('.mdbp_widget_imported .round_icon').removeClass('process_waiting').addClass('process_skip');
				jQuery('.mdbp_widget_imported').removeClass('mdbp_waiting_process').addClass('mdbp_skip_process');
				jQuery('.mdbp_widget_imported i').removeClass('dashicons-clock').addClass('dashicons-redo');
			}
			if (customizer_process) {
				process_array['customizer_process'] = customizer_process;
			} else {
				jQuery('.mdbp_setting_imported .round_icon').removeClass('process_waiting').addClass('process_skip');
				jQuery('.mdbp_setting_imported').removeClass('mdbp_waiting_process').addClass('mdbp_skip_process');
				jQuery('.mdbp_setting_imported i').removeClass('dashicons-clock').addClass('dashicons-redo');
			}
			return process_array;
		}
		
		/**
		 * Funtion check if Demo Content, Wideg Demo, Customizer demo Need to check for import
		 *
		 * @param boolean dcs (if need to import Demo content pass it true)
		 * @param boolean wdcs (if need to import Widget Demo pass it true)
		 * @param boolean cdcs (if need to import Customizer Demo pass it true)
		 */
		function mdbp_import_data_enable_check (dcs, wdcs, cdcs, extoption, process_array, res_array) {
			process_array = mdbp_get_checked_process_content();
			var content_installation = false;
			var widget_installation = false;
			var customizer_installation = false;
			jQuery.each(process_array, function (index) {
				if ('content_process' == index) {
					content_installation = true;
				}
				if ('widget_process' == index) {
					widget_installation = true;
				}
				if ('customizer_process' == index) {
					customizer_installation = true;
				}
			});
			if (dcs && true == content_installation) {
				jQuery('.mdbp_content_imported .round_icon').removeClass('process_waiting').addClass('process_running');
				jQuery('.mdbp_content_imported i').removeClass('dashicons-clock').addClass('dashicons-update');
				jQuery('.mdbp_content_imported ').removeClass('mdbp_waiting_process').addClass('mdbp_running_process');
				mdbp_import_demo_content(process_array, res_array);
			} else if (wdcs && true == widget_installation) {
				jQuery('.mdbp_widget_imported .round_icon').removeClass('process_waiting').addClass('process_running');
				jQuery('.mdbp_widget_imported i').removeClass('dashicons-clock').addClass('dashicons-update');
				jQuery('.mdbp_widget_imported ').removeClass('mdbp_waiting_process').addClass('mdbp_running_process');
				mdbp_import_demo_widget(process_array, res_array);
			} else if (cdcs && true == customizer_installation) {
				jQuery('.mdbp_setting_imported .round_icon').removeClass('process_waiting').addClass('process_running');
				jQuery('.mdbp_setting_imported i').removeClass('dashicons-clock').addClass('dashicons-update');
				jQuery('.mdbp_setting_imported ').removeClass('mdbp_waiting_process').addClass('mdbp_running_process');
				mdbp_import_demo_customizer(process_array, res_array);
			} else if (extoption) {
				mdp_import_general_options(process_array, res_array);
			} else {
				mdbp_installation_complete(process_array);
			}
		}
		
		/**
		 * function for  import new theme (Independent)
		 * @param array res_array (All import options)
		 */
		function mdbp_import_new_theme_ajax (process_array, res_array) {
			var data = {
				'action': 'mdbp_import_new_theme',
				'theme': res_array.theme_file.theme_zip_file,
				'theme_name': res_array.theme_file.theme_name
			};
			var num_of_plugin = res_array.plugin_files.length;
			jQuery.ajax({
				type: 'POST',
				data: data,
				url: ajax_url,
				beforeSend: function () {
					mdbp_create_status_res(res_array.theme_file.theme_name + ' Installing..!');
				},
				success: function (response) {
					mdbp_create_status_res(response);
					var plugin_files = res_array.plugin_files;
					if (plugin_files.length == 0) {
						changeClassProccess('.mdbp_plugin_imported', 'add', 'mdbp-process-green');
						mdbp_import_data_enable_check(true, true, true, true, process_array, res_array);
					} else {
						jQuery('.mdbp_plugin_imported .round_icon').removeClass('process_waiting').addClass('process_running');
						jQuery('.mdbp_plugin_imported i').removeClass('dashicons-clock').addClass('dashicons-update');
						jQuery('.mdbp_plugin_imported ').removeClass('mdbp_waiting_process').addClass('mdbp_running_process');
						mdbp_pugin_installation(plugin_files, num_of_plugin, process_array, res_array);
					}
				},
				complete: function () {
				},
				error: function () {
					mdbp_create_status_res('Error occurred, Please Try Again..!');
				}
			});
		}
		
		/**
		 *
		 * @param  int themetoken (Theme Id)
		 */
		function mdbp_theme_detail_popup (themetoken, installation_type) {
			var data = {
				'action': 'mdbp_theme_details',
				'themetoken': themetoken,
				'installation_type': installation_type
			};
			jQuery.ajax({
				type: 'POST',
				data: data,
				url: ajax_url,
				beforeSend: function () {
					changeClassProccess('a.wpbricks-theme-import i', 'remove', 'fa fa-edit');
					changeClassProccess('a.wpbricks-theme-import i', 'add', 'fa fa-spinner fa-spin');
				},
				success: function (response) {
					mdbp_add_content('#myModal .modal-content', response);
					jQuery('#myModal #chk_section_for_existing').hide();
					changeClassProccess('.theme-info-main.modal', 'add', 'mdbp-show-class');
					changeClassProccess('a.wpbricks-theme-import i', 'remove', 'fa fa-spinner fa-spin');
					changeClassProccess('a.wpbricks-theme-import i', 'add', 'fa fa-edit');
					jQuery('.modal .wpbricks-theme .popup-content-right').addClass('right-popup-not-load');
				},
				complete: function () {
				
				},
				error: function () {
					alert('error');
				}
			});
		}
		
		/**
		 * function for import theme (dependent)
		 * @param array res_array (All import options)
		 */
		function mdbp_import_child_theme_ajax (process_array, res_array) {
			var data = {
				'action': 'mdbp_import_child_theme',
				'theme': res_array.theme_file.theme_zip_file,
				'theme_name': res_array.theme_file.theme_name
			};
			var num_of_plugin = res_array.plugin_files.length;
			jQuery.ajax({
				type: 'POST',
				data: data,
				url: ajax_url,
				beforeSend: function () {
					// var delete_demo_ins_status = jQuery("#myModal input#mdbp_delete_demo_content_process:checked").length;
					// if (delete_demo_ins_status >= 1) {
					//     mdbp_delete_demo_content(res_array);
					// }
					mdbp_create_status_res(res_array.theme_file.theme_name + ' Installing..!');
				},
				success: function (response) {
					mdbp_create_status_res(response);
					mdbp_import_content_zip(num_of_plugin, process_array, res_array);
				},
				complete: function () {
				},
				error: function () {
					mdbp_create_status_res('Error occurred, Please Try Again..!');
				}
			});
			
		}
		
		function mdbp_import_content_zip (num_of_plugin, process_array, res_array) {
			var data = {
				'action': 'mdbp_import_content_zip_ajax',
				'theme_required_content_file': res_array.theme_file.theme_required_content_file
			};
			jQuery.ajax({
				type: 'POST',
				data: data,
				url: ajax_url,
				beforeSend: function () {
					mdbp_create_status_res('Fetching demo content zip data');
				}, success: function (response) {
				}, complete: function () {
					mdbp_create_status_res('Unzip succeessfully demo content data');
					var plugin_files = res_array.plugin_files;
					if (plugin_files.length == 0) {
						changeClassProccess('.mdbp_plugin_imported', 'add', 'mdbp-process-green', process_array);
						var delete_demo_ins_status = jQuery('#myModal input#mdbp_delete_demo_content_process:checked').length;
						if (delete_demo_ins_status >= 1) {
							mdbp_delete_demo_content(process_array, res_array);
						} else {
							mdbp_import_data_enable_check(true, true, true, true, process_array, res_array);
						}
						//mdbp_import_data_enable_check(true, true, true, true, process_array, res_array);
					} else {
						mdbp_create_status_res('Installing Plugin');
						jQuery('.mdbp_plugin_imported .round_icon').removeClass('process_waiting').addClass('process_running');
						jQuery('.mdbp_plugin_imported i').removeClass('dashicons-clock').addClass('dashicons-update');
						jQuery('.mdbp_plugin_imported ').removeClass('mdbp_waiting_process').addClass('mdbp_running_process');
						mdbp_pugin_installation(plugin_files, num_of_plugin, process_array, res_array);
					}
				},
				error: function () {
					mdbp_create_status_res('Error occurred, Please Try Again..!');
				}
			});
		}
		
		function mdbp_pugin_installation (plugin_files, num_of_plugin, process_array, res_array) {
			jQuery.ajax({
				type: 'POST',
				data: {
					'action': 'mdbp_pugin_install_ajax',
					'plugin': plugin_files,
				},
				url: ajax_url,
				beforeSend: function () {
					mdbp_create_status_res('Please wait a moment process is running for plugin installation..!');
				},
				success: function (response) {
					var response_split = response.split('===');
					if (response_split[1] == num_of_plugin) {
						mdbp_create_status_res('All plugins are installed successfully..!!');
						mdbp_activate_plugins(plugin_files, num_of_plugin, process_array, res_array);
					} else {
						var response_2 = JSON.stringify(response_split[2]);
						if (response_2.length > 1) {
							jQuery.each(response_split[2], function (index, value) {
								mdbp_create_status_res('Some issue with ' + index + ' installation. So, Please install manually');
							});
						} else {
							mdbp_create_status_res('Some issue with ' + response_2[0] + ' installation. So, Please install manually');
						}
						//mdbp_pugin_installation(plugin_files, num_of_plugin);
					}
				},
				error: function () {
					mdbp_create_status_res('Error occurred, Please Try Again..!');
				}
			});
			
		}
		
		function mdbp_activate_plugins (plugin_files, num_of_plugin, process_array, res_array) {
			jQuery.ajax({
				type: 'POST',
				data: {
					'action': 'mdbp_activate_plugins_ajax',
					'plugin': plugin_files,
				},
				url: ajax_url,
				beforeSend: function () {
					mdbp_create_status_res('Plugin Activation process is running..!');
				},
				success: function (response) {
					jQuery('.mdbp_plugin_imported').addClass('mdbp_plugin_imported_running');
					var response_split = response.split('===');
					if (response_split[0] == num_of_plugin) {
						mdbp_create_status_res('All plugin activated successfully.');
						jQuery('.mdbp_plugin_imported .round_icon').removeClass('process_running').addClass('process_done');
						jQuery('.mdbp_plugin_imported i').removeClass('dashicons-update').addClass('dashicons-yes');
						jQuery('.mdbp_plugin_imported ').removeClass('mdbp_running_process').addClass('mdbp_done_process');
						changeClassProccess('.mdbp_plugin_imported', 'add', 'mdbp-process-green');
					} else {
						var response_2 = JSON.stringify(response_split[1]);
						if (response_2) {
							jQuery.each(response_2, function (index, value) {
								mdbp_create_status_res('Some issue with ' + index + ' activation. So, Please activate manually');
							});
						}
					}
					
					var delete_demo_ins_status = jQuery('#myModal input#mdbp_delete_demo_content_process:checked').length;
					if (delete_demo_ins_status >= 1) {
						mdbp_delete_demo_content(process_array, res_array);
					} else {
						mdbp_import_data_enable_check(true, true, true, true, process_array, res_array);
					}
				},
				error: function () {
					mdbp_create_status_res('Error occurred, Please Try Again..!');
				}
			});
		}
		
		/**
		 * Delete Demo content
		 */
		function mdbp_delete_demo_content (process_array, res_array) {
			var data = {
				'action': 'mdbp_delete_pre_demo_content_ajax',
				'ddc': 'true'
			};
			jQuery.ajax({
				type: 'POST',
				data: data,
				url: ajax_url,
				beforeSend: function () {
					mdbp_create_status_res('Please Wait, Deleting Demo content..!');
				},
				success: function (response) {
				},
				complete: function () {
					mdbp_import_data_enable_check(true, true, true, true, process_array, res_array);
					// mdbp_import_demo_content(process_array, res_array)
				},
				error: function () {
				
				}
			});
		}
		
		/**
		 * Import Demo content
		 */
		
		function mdbp_import_demo_content (process_array, res_array) {
			var data = {
				'action': 'mdbp_demo_content_import_ajax',
			};
			jQuery.ajax({
				type: 'POST',
				data: data,
				url: ajax_url,
				beforeSend: function () {
					mdbp_create_status_res('Please Wait,Fetching demo content');
				},
				success: function (response) {
					var stringify_response = JSON.parse(response);
					var no_of_files = stringify_response.num_files;
					var files_detail = stringify_response.files_detail;
					if (no_of_files > 1) {
						mdbp_import_demo_content_new(process_array, res_array, files_detail, no_of_files);
					} else {
						changeClassProccess('.mdbp_content_imported', 'add', 'mdbp-process-green');
						jQuery('.mdbp_content_imported .round_icon').removeClass('process_running').addClass('process_done');
						jQuery('.mdbp_content_imported i').removeClass('dashicons-update').addClass('dashicons-yes');
						jQuery('.mdbp_content_imported').removeClass('mdbp_running_process').addClass('mdbp_done_process');
						mdbp_import_data_enable_check(false, true, true, true, process_array, res_array);
					}
				},
				complete: function () {
				
				},
				error: function (jqXHR, textStatus, errorMessage) {
					mdbp_create_status_res('Error occurred, Please Try Again..!');
				},
			});
		}
		
		function mdbp_import_demo_content_new (process_array, res_array, files_detail, no_of_files) {
			var check_response = [];
			jQuery.each(files_detail, function (index, val) {
				var data = {
					'action': 'mdbp_demo_content_import_stepping',
					'file_name': val,
					'no_of_files': no_of_files,
					'index': index
				};
				jQuery.ajax({
					type: 'POST',
					data: data,
					url: ajax_url,
					beforeSend: function () {
						mdbp_create_status_res('Please Wait, Importing Demo content..! ');
					},
					success: function (response) {
						if (response.indexOf('===true') != -1) {
							var response_split = response.split('===true');
							check_response.push(index);
							mdbp_create_status_res(response_split);
						}
						if (check_response.length === no_of_files) {
							changeClassProccess('.mdbp_content_imported', 'add', 'mdbp-process-green');
							jQuery('.mdbp_content_imported .round_icon').removeClass('process_running').addClass('process_done');
							jQuery('.mdbp_content_imported i').removeClass('dashicons-update').addClass('dashicons-yes');
							jQuery('.mdbp_content_imported').removeClass('mdbp_running_process').addClass('mdbp_done_process');
							mdbp_import_data_enable_check(false, true, true, true, process_array, res_array);
						}
					},
					complete: function () {
					},
					error: function () {
						mdbp_create_status_res('Error occurred, Please Try Again..!');
					},
				});
			});
		}
		
		/**
		 * Import Demo widget
		 */
		function mdbp_import_demo_widget (process_array, res_array) {
			var data = {
				'action': 'mdbp_demo_widget_import_ajax',
				'theme_demo_url': res_array.theme_file.theme_demo_url
			};
			
			jQuery.ajax({
				type: 'POST',
				data: data,
				url: ajax_url,
				beforeSend: function () {
					mdbp_create_status_res('Please Wait, Importing Demo Widget..!');
				},
				success: function (response) {
					mdbp_create_status_res(response);
				},
				complete: function () {
					changeClassProccess('.mdbp_widget_imported', 'add', 'mdbp-process-green');
					jQuery('.mdbp_widget_imported .round_icon').removeClass('process_running').addClass('process_done');
					jQuery('.mdbp_widget_imported i').removeClass('dashicons-update').addClass('dashicons-yes');
					jQuery('.mdbp_widget_imported ').removeClass('mdbp_running_process').addClass('mdbp_done_process');
					mdbp_import_data_enable_check(false, false, true, true, process_array, res_array);
				},
				error: function () {
					mdbp_create_status_res('Error occurred, Please Try Again..!');
				}
			});
		}
		
		/**
		 * Import Demo Customizer Options
		 */
		function mdbp_import_demo_customizer (process_array, res_array) {
			var data = {
				'action': 'mdbp_demo_customizer_import_ajax',
			};
			jQuery.ajax({
				type: 'POST',
				data: data,
				url: ajax_url,
				beforeSend: function () {
					mdbp_create_status_res('Please Wait, Importing Demo Customizer..!');
				},
				success: function (response) {
					mdbp_create_status_res(response);
				},
				complete: function () {
					jQuery('.mdbp_setting_imported .round_icon').removeClass('process_running').addClass('process_done');
					jQuery('.mdbp_setting_imported i').removeClass('dashicons-update').addClass('dashicons-yes');
					jQuery('.mdbp_setting_imported ').removeClass('mdbp_running_process').addClass('mdbp_done_process');
					changeClassProccess('.mdbp_setting_imported', 'add', 'mdbp-process-green');
					mdbp_import_data_enable_check(false, false, false, true, process_array, res_array);
				},
				error: function () {
					mdbp_create_status_res('Error occurred, Please Try Again..!');
				}
			});
		}
		
		/**
		 * Import General Options.
		 */
		function mdp_import_general_options (process_array, res_array) {
			var data = {
				'action': 'mdbp_import_general_options_ajax',
			};
			jQuery.ajax({
				type: 'POST',
				data: data,
				url: ajax_url,
				beforeSend: function () {
					mdbp_create_status_res('Please Wait, Importing Demo General Options..!');
				},
				success: function (response) {
					mdbp_create_status_res(response);
				},
				complete: function () {
					mdbp_import_data_enable_check(false, false, false, false, process_array, res_array);
				},
				error: function () {
					mdbp_create_status_res('Error occurred, Please Try Again..!');
				}
			});
		}
		
		/**
		 *
		 * @param string classes (Hierarchy of class to navigate div)
		 * @param string attr (Data Attribute of div)
		 * @param string val (Attribute value)
		 */
		function mdbp_get_data_attr (classes, attr, val) {
			jQuery(classes).data(attr, val);
		}
		
		/**
		 * Import Parent Bricks theme
		 */
		function mdbp_import_parent_theme_ajax () {
			var data = {
				'action': 'mdbp_import_parent_theme',
			};
			
			jQuery.ajax({
				type: 'POST',
				data: data,
				url: ajax_url,
				beforeSend: function () {
					changeClassProccess('.wpbricks_parent_active', 'add', 'processing');
					mdbp_change_text('.wpbricks_parent_active', 'Installing');
				},
				success: function (response) {
					var response = JSON.parse(response);
					var mdbp_success_msg = document.createElement('div');
					mdbp_success_msg.classList.add('mdbp-success-msg');
					var child_dev_check = document.createElement('i');
					child_dev_check.classList.add('fa', 'fa-check');
					mdbp_success_msg.appendChild(child_dev_check);
					var mdbp_success_msg_textnode = document.createTextNode(response.message);
					mdbp_success_msg.appendChild(mdbp_success_msg_textnode);
					mdbp_replace_content('.mdbp-error-msg', mdbp_success_msg);
					mdbp_get_data_attr('.wpbricks-theme-import-process', 'parent-theme', 'true');
				},
				complete: function () {
				
				},
				error: function () {
					var mdbp_success_msg = document.createElement('div');
					mdbp_success_msg.classList.add('mdbp-success-msg');
					var child_dev_check = document.createElement('i');
					child_dev_check.classList.add('fa', 'fa-check');
					mdbp_success_msg.appendChild(child_dev_check);
					var mdbp_success_msg_textnode = document.createTextNode('Error occurred, Please Try Again..!');
					mdbp_success_msg.appendChild(mdbp_success_msg_textnode);
					mdbp_replace_content('.mdbp-error-msg', mdbp_success_msg);
				}
			});
		}
		
		function changeClassProccess (currentClassName, ClassAction, ChangeClassName) {
			if ('add' == ClassAction) {
				jQuery(currentClassName).addClass(ChangeClassName);
			} else {
				jQuery(currentClassName).removeClass(ChangeClassName);
			}
		}
		
		function mdbp_template_import_popup (themetoken, install_type, page_title, page_id, page_content) {
			var data = {
				'action': 'mdbp_template_details',
				'themetoken': themetoken,
				'install_type': install_type,
				'page_title': page_title,
				'page_id': page_id,
				'page_content': page_content,
			};
			jQuery.ajax({
				type: 'POST',
				data: data,
				url: ajax_url,
				beforeSend: function () {
				},
				success: function (response) {
					changeClassProccess('#unique-' + themetoken + ' .wpbricks-template-import', 'remove', 'updating-message');
					mdbp_change_text('#unique-' + themetoken + ' .wpbricks-template-import', 'Imported');
					jQuery('#myModal #unique-' + themetoken).hide();
					mdbp_create_status_res_for_template(response);
				},
				complete: function () {
				},
				error: function () {
					alert('error');
				}
			});
		}
		
		function mdbp_addons_import_popup (themetoken, install_type, active_status) {
			var data = {
				'action': 'mdbp_addons_details',
				'themetoken': themetoken,
				'install_type': install_type,
				'active_status': active_status,
			};
			jQuery.ajax({
				type: 'POST',
				data: data,
				url: ajax_url,
				beforeSend: function () {
				
				},
				success: function (response) {
					var data = JSON.parse(response);
					
					if (1 == data.status) {
						var status = 'Activate';
						jQuery('#unique-' + themetoken + ' .addons-detail-btn .setting').remove();
						
					} else {
						var status = 'Deactivate';
						jQuery('#unique-' + themetoken + ' .addons-detail-btn .learn-more').remove();
						if (data.setting_url) {
							jQuery('#unique-' + themetoken + ' .addons-detail-btn').append('<a href="' + data.setting_url + '" class="button button-primary setting">Setting</a>');
						}
						if (data.learn_more) {
							jQuery('#unique-' + themetoken + ' .addons-detail-btn').append('<a href="' + data.learn_more + '" class="button button-primary learn-more" target="_blank">Learn More</a>');
						}
					}
					changeClassProccess('#unique-' + themetoken + ' .wpbricks-addons-import', 'remove', 'updating-message');
					mdbp_change_text('#unique-' + themetoken + ' .wpbricks-addons-import', status);
					jQuery('#unique-' + themetoken + ' .wpbricks-addons-import').attr('data-active-type', status);
				},
				complete: function () {
				},
				error: function () {
					alert('error');
				}
			});
		}
		
		function allowSpeicalCharacter (str) {
			return str.replace('&#8211;', '–').replace('&gt;', '>').replace('&lt;', '<').replace('&#197;', 'Å');
		}
		
		function mdbp_import_template_option (radiovalue) {
			var data = {
				'action': 'mdbp_import_template_action',
				'radiovalue': radiovalue,
			};
			jQuery.ajax({
				type: 'POST',
				data: data,
				url: ajax_url,
				beforeSend: function () {
				
				},
				success: function (response) {
					var select_box = document.createElement('select');
					select_box.setAttribute('class', 'template_imp_select');
					select_box.setAttribute('name', 'import_pages');
					var response_decode = JSON.parse(response);
					jQuery.each(response_decode, function (index, value) {
						var option = document.createElement('option');
						option.value = index;
						option.text = allowSpeicalCharacter(value);
						select_box.appendChild(option);
					});
					var div_section = document.createElement('div');
					div_section.setAttribute('class', 'template_radio_result');
					div_section.setAttribute('id', 'template_radio_result');
					div_section.appendChild(select_box);
					jQuery('.template-imp-setting').after(div_section);
				},
				complete: function () {
				
				},
				error: function () {
					alert('error');
				}
			});
		}
		
		$(window).on('scroll', function () {
			counter();
			fillCircleCount();
		});
	});
} )(jQuery);

// -------------------------------------------------- Setting Themes JS End --------------------------------------------------
