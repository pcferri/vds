(function ($) {
    "use strict";
	
	
	function filtrarOpcoes() {
	  return new Promise(resolve => {
		setTimeout(() => {	
		  if ($(".filter-box").children().length > 0) {
				$(".filter-box").isotope({ itemSelector: ".filter-item", masonry: { columnWidth: 1 } });
				$(".filter-btns").on("click", "li", function () {
					var filterValue = $(this).attr("data-filter");
					$(".filter-box").isotope({ filter: filterValue });
				});
				$(".filter-btns li").each(function () {
					$(this).on("click", function () {
						$(this).siblings("li.active").removeClass("active");
						$(this).addClass("active");
					});
				});
			}
		}, 2000);
	  });
	}

	
    function processar_inicio_tela() {
		
		
		$(".dropdown-menu a.dropdown-toggle").on("click", function (e) {
			if (!$(this).next().hasClass("show")) {
				$(this).parents(".dropdown-menu").first().find(".show").removeClass("show");
			}
			var $subMenu = $(this).next(".dropdown-menu");
			$subMenu.toggleClass("show");
			$(this)
				.parents("li.nav-item.dropdown.show")
				.on("hidden.bs.dropdown", function (e) {
					$(".dropdown-submenu .show").removeClass("show");
				});
			return false;
		});
		if ($(".search-box-outer").length) {
			$(".search-box-outer").on("click", function () {
				$("body").addClass("search-active");
			});
			$(".close-search").on("click", function () {
				$("body").removeClass("search-active");
			});
		}		
		
		$(".preloader").fadeOut("slow");
		
		$("[data-src]").each(function () {
			$(this).attr("src", $(this).attr("data-src"));
        });
		
        $("[data-background]").each(function () {
            $(this).css("background-image", "url(" + $(this).attr("data-background") + ")");
        });
		
		
		new WOW().init();
		$(".category-slider").owlCarousel({
			loop: true,
			margin: 20,
			autoplayHoverPause: true,
			nav: false,
			navText: ["<i class='icofont-long-arrow-left'></i>", "<i class='icofont-long-arrow-right'></i>"],
			dots: false,
			autoplay: true,
			responsive: { 0: { items: 1 }, 600: { items: 2 }, 1000: { items: 4 } },
		});
		$(".partner-slider").owlCarousel({
			loop: true,
			margin: 50,
			nav: false,
			navText: ["<i class='icofont-long-arrow-left'></i>", "<i class='icofont-long-arrow-right'></i>"],
			dots: false,
			autoplay: true,
			responsive: { 0: { items: 2 }, 600: { items: 3 }, 1000: { items: 6 } },
		});
		$(".testimonial-slider").owlCarousel({
			loop: true,
			margin: 0,
			nav: false,
			navText: ["<i class='icofont-long-arrow-left'></i>", "<i class='icofont-long-arrow-right'></i>"],
			dots: true,
			autoplay: true,
			responsive: { 0: { items: 1 }, 600: { items: 3 }, 1000: { items: 3 } },
		});


		$(".counter").countTo();
		$(".counter-box").appear(
			function () {
				$(".counter").countTo();
			},
			{ accY: -100 }
		);
		$(".popup-gallery").magnificPopup({ delegate: ".popup-img", type: "image", gallery: { enabled: true } });
		$(".popup-youtube, .popup-vimeo, .popup-gmaps").magnificPopup({ type: "iframe", mainClass: "mfp-fade", removalDelay: 160, preloader: false, fixedContentPos: false });
		$(window).scroll(function () {
			if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
				$("#scroll-top").fadeIn("slow");
			} else {
				$("#scroll-top").fadeOut("slow");
			}
		});
		$("#scroll-top").click(function () {
			$("html, body").animate({ scrollTop: 0 }, 1500);
			return false;
		});
		$(window).scroll(function () {
			if ($(this).scrollTop() > 50) {
				$(".navbar").addClass("fixed-top");
			} else {
				$(".navbar").removeClass("fixed-top");
			}
		});
		if ($("#countdown").length) {
			$("#countdown").countdown("2022/12/05 06:00:00", function (event) {
				$(this).html(
					event.strftime(
						"" +
							'<div class="row">' +
							'<div class="col countdown-single">' +
							'<h2 class="mb-0">%-D</h2>' +
							'<h5 class="mb-0">Dia%!d</h5>' +
							"</div>" +
							'<div class="col countdown-single">' +
							'<h2 class="mb-0">%H</h2>' +
							'<h5 class="mb-0">Horas</h5>' +
							"</div>" +
							'<div class="col countdown-single">' +
							'<h2 class="mb-0">%M</h2>' +
							'<h5 class="mb-0">Min</h5>' +
							"</div>" +
							'<div class="col countdown-single">' +
							'<h2 class="mb-0">%S</h2>' +
							'<h5 class="mb-0">Seg</h5>' +
							"</div>" +
							"</div>"
					)
				);
			});
		}
		
		filtrarOpcoes();
		
		let date = new Date().getFullYear();
		$("#date").html(date);
		if ($(".price-range").length) {
			$(".price-range").slider({
				range: true,
				min: 0,
				max: 999,
				values: [100, 500],
				slide: function (event, ui) {
					$("#price-amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
				},
			});
			$("#price-amount").val("$" + $(".price-range").slider("values", 0) + " - $" + $(".price-range").slider("values", 1));
		}
		$(".plus-btn").on("click", function () {
			var i = $(this).closest(".cart-qty").children(".quantity").get(0).value++,
				c = $(this).closest(".cart-qty").children(".minus-btn");
			i > 0 && c.removeAttr("disabled");
		}),
			$(".minus-btn").on("click", function () {
				2 == $(this).closest(".cart-qty").children(".quantity").get(0).value-- && $(this).attr("disabled", "disabled");
			});
		$(".profile-setting-btn").click(function () {
			$(".profile-img-file").click();
		});

		var url = new URL(window.location.href);
		var msg = url.searchParams.get("msg");
		if(msg != undefined){
			$(".form-messege").text(msg);
			$([document.documentElement, document.body]).animate({
				scrollTop: $(".form-messege").offset().top - 400
			}, 200);
		}
    }
	
	 $(window).on("load", function () {
		processar_inicio_tela()
	 });
	
	
	
})(jQuery);