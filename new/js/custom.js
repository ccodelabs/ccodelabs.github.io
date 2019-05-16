(function ($) {
  $(window).load(function () {
    $(".loading").fadeOut(700);
  });

  tippy('div#teamIMG', {
    a11y: false,
    theme: 'ccode',
    placement: 'top',
    arrow: true,
    animation: 'perspective',
    trigger: 'click',
    interactive: true,
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
      /* REMOVE/COMMENT THIS TO DELETE HIRING */
      $('.fixedHiring').show();
    } else {
      $('.back-to-top').fadeOut('slow');
      /* REMOVE/COMMENT THIS TO DELETE HIRING */
      $('.fixedHiring').hide();
    }
  });

  $('.back-to-top').click(function () {
    $('html, body').animate({
      scrollTop: 0
    }, 800);
    return false;
  });

  //navigation
  $('.navigation').onePageNav({
    scrollOffset: 0
  });

  $(".navbar-collapse a").on('click', function () {
    $(".navbar-collapse.collapse").removeClass('in');
  });

  // Smooth scroll for the get started button
  $('.btn-get-started').on('click', function (e) {
    e.preventDefault();
    var target = $(this.hash);
    if (target.length) {
      $('html, body').animate({
        scrollTop: target.offset().top
      }, 700);
    }
  });

  var about = $('#about').offset().top;
  var services = $('#services').offset().top;
  var team = $('#team').offset().top;
  var bottomWidget = $('#bottom-widget').offset().top;

  // Fixed navbar
  $(window).scroll(function () {
    var scrollTop = $(window).scrollTop();
    if (scrollTop > 200) {
      $('.navbar-default').css('display', 'block');
      $('.navbar-default').addClass('fixed-to-top');
    } else if (scrollTop == 0) {
      $('.navbar-default').removeClass('fixed-to-top');
    }
    var scrollPos = $(document).scrollTop();
    if (scrollPos >= about && scrollPos < services) {
      $('#aboutNav').css('color', '#424242');
      $('#servicesNav').css('color', '#f5f5f5');
      $('#teamNav').css('color', '#f5f5f5');
      $('#bottomWidgetNav').css('color', '#f5f5f5');
    } else if (scrollPos >= services && scrollPos < team) {
      $('#aboutNav').css('color', '#f5f5f5');
      $('#servicesNav').css('color', '#424242');
      $('#teamNav').css('color', '#f5f5f5');
      $('#bottomWidgetNav').css('color', '#f5f5f5');
    } else if (scrollPos >= team && scrollPos < bottomWidget) {
      $('#aboutNav').css('color', '#f5f5f5');
      $('#servicesNav').css('color', '#f5f5f5');
      $('#teamNav').css('color', '#424242');
      $('#bottomWidgetNav').css('color', '#f5f5f5');
    } else if (scrollPos >= bottomWidget) {
      $('#aboutNav').css('color', '#f5f5f5');
      $('#servicesNav').css('color', '#f5f5f5');
      $('#teamNav').css('color', '#f5f5f5');
      $('#bottomWidgetNav').css('color', '#424242');
    }
  });

  // Intro carousel
  var introCarousel = $("#introCarousel");
  var introCarouselIndicators = $("#intro-carousel-indicators");
  introCarousel.find(".carousel-inner").children(".item").each(function (index) {
    (index === 0) ?
    introCarouselIndicators.append("<li data-target='#introCarousel' data-slide-to='" + index + "' class='active'></li>"):
      introCarouselIndicators.append("<li data-target='#introCarousel' data-slide-to='" + index + "'></li>");

    $(this).css("background-image", "url('" + $(this).children('.carousel-background').children('img').attr('src') + "')");
    $(this).children('.carousel-background').remove();
  });

  // introCarousel.on('slid.bs.carousel', function (e) {
  //   $(this).find('h2').addClass('animated fadeInDown');
  //   $(this).find('p').addClass('animated fadeInUp');
  //   $(this).find('.btn-get-started').addClass('animated fadeInUp');
  // });

  //parallax
  if ($('#parallax1').length || $('#parallax2').length) {

    $(window).stellar({
      responsive: true,
      scrollProperty: 'scroll',
      parallaxElements: false,
      horizontalScrolling: false,
      horizontalOffset: 0,
      verticalOffset: 0
    });

  }

  function navbar() {

    if ($(window).scrollTop() > 1) {
      $('#navigation').addClass('show-nav');
    } else {
      $('#navigation').removeClass('show-nav');
    }

  }

  $(document).ready(function () {

    var browserWidth = $(window).width();

    if (browserWidth > 560) {

      $(window).scroll(function () {
        navbar();
      });
    }

  });

  $(window).resize(function () {

    var browserWidth = $(window).width();

    if (browserWidth > 560) {

      $(window).scroll(function () {
        navbar();
      });
    }
  });

  // Carousel
  $('.service .carousel').carousel({
    interval: 4000
  })

  //works
  $(function () {
    Grid.init();
  });

  //animation
  wow = new WOW({
    boxClass: 'wow', // default
    animateClass: 'animated', // change this if you are not using animate.css
    offset: 0, // default
    mobile: true, // keep it on mobile
    live: true // track if element updates
  })
  wow.init();

})(jQuery);