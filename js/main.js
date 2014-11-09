/*****************************************************************************/
/* Utility Functions */
/*****************************************************************************/

var intro_animation = function() {
    $('.background-overlay').velocity({opacity: 0.6}, {duration: 700});
    $('.headline').velocity({color: '#FFFFFF'}, {duration: 300});
    setTimeout(function() {$('.headline').removeClass('is-intro');}, 700);
    if ($(window).width() > 550) {
      $('.background').velocity(
        {top: 45, left: 45, right: 45, bottom: 45},
        { delay: 700,
          duration: 700,
          complete: function(){
            $('.headline').removeClass('is-intro');
            $('.logo').velocity({opacity: 1}, {display: 'block'});
            $('.landing-actions').velocity({opacity: 1}, {display: 'block',
              complete: function(){
                $(document.body).removeClass('is-intro');
                $('.background').removeAttr('style');
              }
          });
        }
      });
    } else {
      $('.headline').removeClass('is-intro');
      $('.logo').velocity({opacity: 1}, {display: 'block'});
      $('.landing-actions').velocity({opacity: 1}, {display: 'block',
        complete: function(){
          $(document.body).removeClass('is-intro');
        }
      });
    }
  };

var menu_is_visible = function() {
  return $(document.body).hasClass('visible-menu');
};

var about_is_visible = function() {
  return $(document.body).hasClass('visible-about');
};

var contact_is_visible = function() {
  return $(document.body).hasClass('visible-contact');
};

var open_menu = function() {
  $('.main-menu').velocity({translateX: 0, translateZ: 0}, {duration: 300});
  $('.main-menu li').velocity("transition.perspectiveRightIn", {stagger: 100, drag: true});
  $('.menu-icon').removeClass('open-menu').addClass('close-menu');
  $(document.body).addClass('visible-menu');
};

var close_menu = function() {
  $('.main-menu').velocity({translateX: "100%", translateZ: 0}, {duration: 300});
  $('.main-menu li').velocity("transition.slideRightBigOut");
  $('.menu-icon').removeClass('close-menu').addClass('open-menu');
  $(document.body).removeClass('visible-menu');
};

var close_about_page = function() {
  $('.page-about').velocity({translateX: "-110%"}, {display: 'none'});
  $('.main-content').velocity('fadeIn', {duration: 800});
  $(document.body).removeClass('visible-about');
};

var open_contact_page = function() {
  if (menu_is_visible()) {close_menu();}
  if (about_is_visible()) {close_about_page();}
  $('.main-content').velocity("fadeOut", {duration: 700});
  $('.page-contact').velocity({translateX: 0, translateZ: 0}, {delay: 300, display: "auto"});
  $(document.body).addClass("visible-contact");
};

var close_contact_page = function() {
  $('.page-contact').velocity({translateX: "110%", translateZ: 0}, {display: "none"});
  $('.main-content').velocity('fadeIn', {duration: 700});
  $(document.body).removeClass('visible-contact');
};

var open_about_page = function() {
  if (menu_is_visible()) {close_menu();}
  if (contact_is_visible()) {close_contact_page();}
  $('.main-content').velocity("fadeOut", {duration: 700});
  $('.page-about').velocity({translateX: 0}, {delay: 300, display: 'auto'});
  $(document.body).addClass('visible-about');
};


var open_home_page = function() {
  if (menu_is_visible()) {close_menu();}
  if (about_is_visible()) {close_about_page();}
  if (contact_is_visible()) {close_contact_page();}
  $('.page-work').velocity({translateY: '110%', translateZ: 0}, {display: 'none', duration: 700});
  $('.headline').velocity({translateY: 0, translateZ: 0, color: '#FFFFFF'}, {duration: 200, delay: 200});
  $('.background').velocity({translateY: 0, translateZ: 0}, {duration: 700, delay: 100});
  $('.page').css('position', 'fixed');
};

var open_work_page = function() {
  if (menu_is_visible()) {close_menu();}
  if (about_is_visible()) {close_about_page();}
  if (contact_is_visible()) {close_contact_page();}
  $('.background').velocity({translateY: '-110%', translateZ: 0}, {duration: 700});
  $('.headline').velocity({translateY: '65px', translateZ: 0, color: '#98999B'}, {duration: 150});
  $('.page-work').velocity({translateY: 0, translateZ: 0}, {delay: 100, duration: 700, display: 'auto'});
  $('.page').css('position', 'absolute');
};


// jQuery ready function
$(document).ready(function() {


 /*****************************************************************************/
/* On-load */
/*****************************************************************************/


// move UI off-canvas with velocity **if this is done with CSS, then the transitions don't work properly**
$('.main-menu').velocity({translateX: '100%', translateZ: 0});
$('.page-work').velocity({translateY: '110%', translateZ: 0});
$('.page-about').velocity({translateX: '-110%', translateZ: 0});
$('.page-contact').velocity({translateX: '110%', translateZ: 0});


// mark in session that user has visted to prevent animation from playing again
  // var hasVisited = localStorage.visited;
    
    // if (!hasVisited) {

        // utilize is-intro class to establish starting state
        $(document.body).addClass('is-intro');
        $('.headline').addClass('is-intro');
        $('.logo').velocity({opacity: 0});

        // wait 2s and execute the intro animation
        setTimeout(function() {
          intro_animation();
        }, 2000);

        // localStorage.visited = true;
    // }

/*****************************************************************************/
/* Event Handlers */
/*****************************************************************************/

// when clicking on hamburger menu, open menu with velocity and add active state to icon
$(document.body).on('click', '.open-menu', function() {
  open_menu();
});

// when clicking on X, close menu with velocity and remove active state on icon
$(document.body).on('click', '.close-menu', function() {
  close_menu();
});

$(document.body).on('click', '.js-activate-work', function() {
  open_work_page();
});

$(document.body).on('click', '.js-activate-home', function() {
  open_home_page();
});

$(document.body).on('click', '.js-activate-contact', function() {
  open_contact_page();
});

$(document.body).on('click', '.js-activate-about', function() {
  open_about_page();
});

$('.page-work').on('click', '.js-open-overlay', function() {
  var overlay_class = '.' + $(this).attr('data');
  var overlay = $(overlay_class);
  $('.main-content').velocity("fadeOut", {duration: 400,
    complete: function(){
      $(document.body).scrollTop(0);
      $('.nifty-wordmark').velocity("fadeIn", {duration: 400});
      $('.nifty-wordmark').velocity("fadeOut", {duration: 400, delay: 400});
      overlay.velocity("fadeIn", {duration: 800, delay: 1200});
    }
  });
  $('.menu-icon').velocity("fadeOut", {duration: 400});
});

$('.overlay').on('click', '.js-close-overlay', function() {
  var overlay = $(this).parent();
  overlay.velocity("fadeOut", {duration: 700,
    complete: function(){
      $(document.body).scrollTop(0);
      $('.nifty-wordmark').velocity("fadeIn", {duration: 400});
      $('.nifty-wordmark').velocity("fadeOut", {duration: 400, delay: 400});
      $('.main-content').velocity("fadeIn", {duration: 800, delay: 1200});
      $('.menu-icon').velocity("fadeIn", {duration: 800, delay: 1200});
    }
  });
});


// jQuery ready function closing
});


// // clear the local storage variable once the window is closed
// window.onbeforeunload = function() {
//   localStorage.removeItem('visited');
//   return '';
// };
