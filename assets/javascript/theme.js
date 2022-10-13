;(function ($, w) {
	'use strict';
	if (!w.jQuery) {
		throw 'Theme: jQuery not found';
	}
	w.Theme = {

		init: function () {
			this.eventListener();
			this.afterInit();
			this.createOverlay();
		},

		afterInit: function () {
			this.entrySlider('#entry-slider > .entry-slider-wrapper');
			this.accordionMenu();
			this.Tab('.company-tab');
		},

		entrySlider: function (element) {
			if ($(element).length == 0) {
				return;
			}
			$(element).not('.slick-initialized').slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				infinite: false,
				autoplay : true,
				autoplaySpeed : 3000,
				arrows : false,
				dots: true,
				swipe: true,
				speed : 300,
				fade : true,
				prevArrow: `
					<button type="button" class="slick-prev" aria-label="Previous">
						<svg width="36" height="36" viewBox="0 0 36 36" fill="none">
							<path d="M22.2848 7L12 18L22.2848 29L24 27.1669L15.4279 18L24 8.83312L22.2848 7Z" fill="#2E3A59"/>
						</svg>
					</button>
				`,
				nextArrow: `
					<button type="button" class="slick-next" aria-label="Next">
						<svg width="36" height="36" viewBox="0 0 36 36" fill="none">
							<path d="M13.7152 29L24 18L13.7152 7L12 8.83312L20.5721 18L12 27.1669L13.7152 29Z" fill="#2E3A59"/>
						</svg>
					</button>
				`
			});
			$(element).on('afterChange', function(event, slick, currentSlide){
				if((slick.$slides.length - slick.options.slidesToShow) <= currentSlide){
					$(element).slick('slickPause');
					setTimeout(function(){
						$(element).slick('slickGoTo',0);
						$(element).slick('slickPlay');
					}, $(element).slick('slickGetOption', 'autoplaySpeed'));
				}
			});
		},

		Tab: function(element) {
			$(element).each(function () {
				if (typeof onstart == 'function') {
					onstart.call(this);
				}
				$(this).find('[data-tab-index]').on('click tap', function () {
					if (typeof beforeclick == 'function') {
						beforeclick.call(this);
					}
					var self = $(this),
						currentIndex = self.attr('data-tab-index'),
						parents = self.parents(element);
					parents.find('[data-tab-index]').removeClass('active');
					parents.find('[data-tab-index="' + currentIndex + '"]').addClass('active');
					parents.find('[data-tab-content]').removeClass('active');
					parents.find('[data-tab-content="' + currentIndex + '"]').addClass('active');
					if (typeof onclick == 'function') {
						onclick.call(this);
					}
				});
			});
		},

		accordionMenu: function(){
            $('.accordion [data-tab-index]').on('click', function(event) {
                if($(this).parent().attr('class').indexOf('active') > -1) {
                    $(this).next().slideUp();
                    $(this).parent().removeClass('active');
                } else {
                    $(this).next().slideDown().parent().siblings().find('[data-tab-content]').slideUp();
                    $('.accordion').removeClass('active');
                    $(this).parent().addClass('active');
                }
            });
        },

		createOverlay: function () {
			$('body').append('<div class="navigation-menu-overlay" />');
		},

		eventListener: function () {
			var self = this;
		
			$(document).on('click tap', '[data-selector="openbox-close"]', function() {
                openBox.reset()
            });
		}
	}
})(jQuery, window);

$(function () {
    Theme.init();
});