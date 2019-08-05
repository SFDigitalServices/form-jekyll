$(document).ready(function(){

  //  ---- Initial state  ----

  $('.form-section:first-child').addClass('active');
  $(".form").validator();

  // --- Settings checkboxes ---

  function settingInit(setting) {
    // Set initial state
    // (Firefox doesn't clear page classes on reload)
    if ($('body').hasClass(setting)) {
      $('#settings-' + setting).prop('checked', true);
    } else {
      $('#settings-' + setting).prop('checked', false);
    }

    // Add / remove <body> classes
    $('#settings-' + setting).change(function() {
      $('body').toggleClass(setting);
    });
  }

  settingInit('all-pages');
  settingInit('all-conditionals');
  settingInit('top-nav');

  // Toggle form settings modal
  $('.form-settings-toggle').click(function() {
    $('.form-settings').toggleClass('active');
  });

  // ---- Pagination ----

  // Track the current page number
  // (The first page is always shown on page load)
  var activePageNum = 0;
  var activePage = $('.form-section').eq(activePageNum);

  function paginate(count) {
    // Hide the current page
    $('.form-section').eq(activePageNum).removeClass('active');

    // Evaluate the previous / next page
    activePageNum = activePageNum + count;

    function checkPage(number) {
      var activePage = $('.form-section').eq(activePageNum);
      // If we're conditionally hiding this page,
      // evaluate the previous / next one
      if (activePage.attr('data-group') && !activePage.hasClass('is-conditionally-visible')) {
        activePageNum = activePageNum + number;
        checkPage(number);
      } else {
        // If the page is visible, show it
        activePage.addClass('active');
      }
    }

    checkPage(count);

    event.preventDefault();
  }

  // Previous page
  $('.form-section-prev').click(function() {
    paginate(-1);
  });

  // Next page
  $('.form-section-next').click(function() {
    paginate(1);
  });

  //  ---- Conditionals  ----

  // Checking radio buttons
  $("input[type='radio'][data-shows]").change(function() {
    var group = $(this).attr('data-shows');
    var groups = $("div").find("[data-group='" + group + "']");

    $(this).addClass('is-triggering');
    groups.addClass('is-conditionally-visible');
  });

  // Unchecking radio buttons
  $("input[data-hides]").change(function() {
    var group = $(this).attr('data-hides');
    var groups = $("div").find("[data-group='" + group + "']");

    $(this).removeClass('is-triggering');
    groups.removeClass('is-conditionally-visible');
  });

  // Toggling checkboxes
  $("input[type='checkbox'][data-shows]").change(function() {
    var group = $(this).attr('data-shows');
    var groups = $("div").find("[data-group='" + group + "']");

    $(this).toggleClass('is-triggering');
    groups.toggleClass('is-conditionally-visible');
  });

  // Match text field values
  $("input[data-if]").keyup(function() {

    var trigger = $(this).attr('data-if');

    var group = $(this).attr('data-shows');
    var groups = $("div").find("[data-group='" + group + "']");

    function showIf(value, condition) {
      if (value === '') {
        $(this).removeClass('is-triggering');
        groups.removeClass('is-conditionally-visible');
      } else if (condition) {
        $(this).addClass('is-triggering');
        groups.addClass('is-conditionally-visible');
      } else {
        $(this).removeClass('is-triggering');
        groups.removeClass('is-conditionally-visible');
      }
    }

    // Check to see whether "data-if" begins with
    // an "<" or ">" symbol
    if (trigger.match("^[<>]")) {
      var number = parseInt(trigger.substr(1));
      var operator = trigger.charAt(0);
      if (operator === '<') {
        // "Less than" conditionals
        showIf(value, value < number);
      } else {
        // "Greater than" conditionals
        showIf(value, value > number);
      }

    } else {
      // Matching conditionals
      showIf(value, value === trigger);
    }
  });
});