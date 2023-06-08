$(function() {

//------------------------------гамбургер-----------------------------
$('.hamburger').click(function() {
  $(this).toggleClass('hamburger-active');
  $('nav').toggleClass('nav-active');
  $('header').toggleClass('header-menu');
});

//-------------------------------попандер---------------------------------------
  $('.modal').popup({transition: 'all 0.3s'});

//------------------------------------form-------------------------------------------
	$('input[type="tel"]').mask('+0 (000) 000-00-00');

	jQuery.validator.addMethod("phoneno", function(phone_number, element) {
	   return this.optional(element) || phone_number.match(/\+[0-9]{1}\s\([0-9]{3}\)\s[0-9]{3}-[0-9]{2}-[0-9]{2}/);
	}, "Введите Ваш телефон");

  $(".order-form").validate({
    messages: {
      name: "Введите ваше Имя",
      phone: "Введите ваш телефон",
    },
    rules: {
      "phone": {
        required: true,
        phoneno: true
      }
    },
    submitHandler: function(form) {
      var t = {
        name: jQuery(".order-form").find("input[name=name]").val(),
        phone: jQuery(".order-form").find("input[name=phone]").val(),
        number: jQuery(".order-form").find("input[name=number]").val(),
        product: jQuery(".order-form").find("input[name=product]").val(),
        subject: jQuery(".order-form").find("input[name=subject]").val()
      };
      ajaxSend('.order-form', t);
    }
  });

   $(".order-two-form").validate({
    messages: {
      name: "Введите ваше Имя",
      phone: "Введите ваш телефон",
    },
    rules: {
      "phone": {
        required: true,
        phoneno: true
      }
    },
    submitHandler: function(form) {
      var t = {
        name: jQuery(".order-two-form").find("input[name=name]").val(),
        phone: jQuery(".order-two-form").find("input[name=phone]").val(),
        number: jQuery(".order-two-form").find("input[name=number]").val(),
        product: jQuery(".order-two-form").find("input[name=product]").val(),
        subject: jQuery(".order-two-form").find("input[name=subject]").val()
      };
      ajaxSend('.order-two-form', t);
    }
  });



  $(".consultation-form").validate({
    messages: {
      name: "Введите ваше Имя",
      phone: "Введите ваш телефон",
    },
    rules: {
      "phone": {
        required: true,
        phoneno: true
      }
    },
    submitHandler: function(form) {
      var t = {
        name: jQuery(".consultation-form").find("input[name=name]").val(),
        phone: jQuery(".consultation-form").find("input[name=phone]").val(),
        subject: jQuery(".consultation-form").find("input[name=subject]").val()
      };
      ajaxSend('.consultation-form', t);
    }
  });

  function ajaxSend(formName, data) {
    jQuery.ajax({
      type: "POST",
      url: "sendmail.php",
      data: data,
      success: function() {
        $(".modal").popup("hide");
        $("#thanks").popup("show");
        setTimeout(function() {
          $(formName).trigger('reset');
        }, 2000);
      }
    });
  }

//----------------------------------------fixed----------------------------------
  $(window).scroll(function(){
      if($(this).scrollTop()>20){
          $('.header').addClass('header-active');
      }
      else if ($(this).scrollTop()<20){
          $('.header').removeClass('header-active');
      }
  });

    var msnry = new Masonry( '.grid', {
   itemSelector: '.grid-item',
   columnWidth: '.grid-sizer',
   gutter: 30,
   percentPosition: true
  });

});

//----------------------------------------preloader----------------------------------

$(window).on('load', function(){
  $('.preloader').delay(1000).fadeOut('slow');
});



//---card
// $('.grid').masonry({

//   itemSelector: '.grid-item',
//   columnWidth: 270
// });



// var $mediaSelector = '.media';
//  if($($mediaSelector).length) {

 // }

 //-------acordion//
 var acc = $('.calc__title');
var accContent = $('.calc__content');
$('.calc__title.calc__active').next().slideDown(500);
acc.on('click', function(e) {
  if ($(this).hasClass('calc__active')) {
    $(this).removeClass('calc__active');
    $(this).next().slideUp(500);
  }
  else {
    $(this).addClass('calc__active');
    accContent.not($(this).next()).slideUp(500);
    acc.not($(this)).removeClass('calc__active');
    $(this).next().slideDown(500);
  }
});



//-/// slider

 $('.slider-for').slick({
   slidesToShow: 1,
   slidesToScroll: 1,
   arrows: false,
    arrows: true,
    speed: 1200,
    adaptiveHeight: false,
   fade: true,
   asNavFor: '.slider-nav'
 });
 $('.slider-nav').slick({

   slidesToShow: 8,
   slidesToScroll: 4,
   asNavFor: '.slider-for',
   dots: true,
   focusOnSelect: true
 });

 $('a[data-slide]').click(function(e) {
   e.preventDefault();
   var slideno = $(this).data('slide');
   $('.slider-nav').slick('slickGoTo', slideno - 1);
 });



$(document).ready(function() {
  var breakpoint = window.matchMedia( '(min-width: 576px)' );
  var projectlider;

  var breakpointChecker = function() {
     // if larger viewport and multi-row layout needed
     if ( breakpoint.matches === true ) {
        // clean up old instances and inline styles when available
        if ( projectlider !== undefined ) {
          $('.project__wrap').removeClass('swiper-container');
          $('.project__wrap-card').unwrap('.swiper-wrapper');
          $('.project__wrap-card').removeClass('swiper-slide');
          $('.project__wrap .swiper-pagination').remove();
          projectlider.destroy( true, true );
        }
        // or/and do nothing
        return;
     // else if a small viewport and single column layout needed
     } else if ( breakpoint.matches === false ) {
        // fire small viewport version of swiper
        return enableSwiper();
     }
  };

  var enableSwiper = function() {

    $('.project__wrap').addClass('swiper-container');
    if (! $('.project__wrap .swiper-wrapper').length ) {
      $('.project__wrap-card').wrapAll('<div class="swiper-wrapper"></div>');
    }
    $('.project__wrap-card').addClass('swiper-slide');
    $('.project__wrap').append('<div class="swiper-pagination"></div>');

    projectlider = new Swiper ('.project__wrap', {
      slidesPerView: 1,
  spaceBetween: 30,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },


      
    });
  }

  // keep an eye on viewport size changes
  breakpoint.addListener(breakpointChecker);
  // kickstart
  breakpointChecker();

  // $(window).scroll(function() {
  //   console.log('scroll');
  //   if($(this).scrollTop()>50){
  //     $('.header__top-line').addClass('active');
  //   }
  //   else {
  //     $('.header__top-line').removeClass('active');
  //   }
  // });

 

});



$(document).ready(function() {
  var breakpoint = window.matchMedia( '(min-width: 576px)' );
  var projectlider;

  var breakpointChecker = function() {
     // if larger viewport and multi-row layout needed
     if ( breakpoint.matches === true ) {
        // clean up old instances and inline styles when available
        if ( projectlider !== undefined ) {
          $('.project-two__wrap').removeClass('swiper-container');
          $('.project-two__wrap-card').unwrap('.swiper-wrapper');
          $('.project-two__wrap-card').removeClass('swiper-slide');
          $('.project-two__wrap .swiper-pagination').remove();
          projectlider.destroy( true, true );
        }
        // or/and do nothing
        return;
     // else if a small viewport and single column layout needed
     } else if ( breakpoint.matches === false ) {
        // fire small viewport version of swiper
        return enableSwiper();
     }
  };

  var enableSwiper = function() {

    $('.project-two__wrap').addClass('swiper-container');
    if (! $('.project-two__wrap .swiper-wrapper').length ) {
      $('.project-two__wrap-card').wrapAll('<div class="swiper-wrapper"></div>');
    }
    $('.project-two__wrap-card').addClass('swiper-slide');
    $('.project-two__wrap').append('<div class="swiper-pagination"></div>');

    projectlider = new Swiper ('.project-two__wrap', {
      slidesPerView: 1,
  spaceBetween: 30,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },


      
    });
  }

  // keep an eye on viewport size changes
  breakpoint.addListener(breakpointChecker);
  // kickstart
  breakpointChecker();

  // $(window).scroll(function() {
  //   console.log('scroll');
  //   if($(this).scrollTop()>50){
  //     $('.header__top-line').addClass('active');
  //   }
  //   else {
  //     $('.header__top-line').removeClass('active');
  //   }
  // });

 

});


$(document).ready(function() {
  var breakpoint = window.matchMedia( '(min-width: 576px)' );
  var projectlider;

  var breakpointChecker = function() {
     // if larger viewport and multi-row layout needed
     if ( breakpoint.matches === true ) {
        // clean up old instances and inline styles when available
        if ( projectlider !== undefined ) {
          $('.project-three__wrap').removeClass('swiper-container');
          $('.project-three__wrap-card').unwrap('.swiper-wrapper');
          $('.project-three__wrap-card').removeClass('swiper-slide');
          $('.project-three__wrap .swiper-pagination').remove();
          projectlider.destroy( true, true );
        }
        // or/and do nothing
        return;
     // else if a small viewport and single column layout needed
     } else if ( breakpoint.matches === false ) {
        // fire small viewport version of swiper
        return enableSwiper();
     }
  };

  var enableSwiper = function() {

    $('.project-three__wrap').addClass('swiper-container');
    if (! $('.project-three__wrap .swiper-wrapper').length ) {
      $('.project-three__wrap-card').wrapAll('<div class="swiper-wrapper"></div>');
    }
    $('.project-three__wrap-card').addClass('swiper-slide');
    $('.project-three__wrap').append('<div class="swiper-pagination"></div>');

    projectlider = new Swiper ('.project-three__wrap', {
      slidesPerView: 1,
  spaceBetween: 30,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },


      
    });
  }

  // keep an eye on viewport size changes
  breakpoint.addListener(breakpointChecker);
  // kickstart
  breakpointChecker();

  // $(window).scroll(function() {
  //   console.log('scroll');
  //   if($(this).scrollTop()>50){
  //     $('.header__top-line').addClass('active');
  //   }
  //   else {
  //     $('.header__top-line').removeClass('active');
  //   }
  // });

 

});