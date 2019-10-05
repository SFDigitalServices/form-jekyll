$(document).ready(function(){

  //  ---- Initial state  ----

  window.hypothesisConfig = function () {
    return {
      "theme": "clean"
    };
  };

  // Make the first page visible
  $('.form-section:first-child').addClass('active');

  // Initialize bootstrap-validator
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
  settingInit('all-annotations');
  settingInit('show-hidden');
  settingInit('top-nav');

  // Show / hide settings modal
  $('.form-settings-toggle').click(function() {
    $('.form-settings').toggleClass('active');
  });

  // ---- File inputs ---

  $("input[type='file']").change(function() {
    var file = $(this).val().replace(/C:\\fakepath\\/i, '');

    $(this).next('.file-custom').attr('data-filename', file);
  });

  // ---- Pagination ----

  // Track the current page number
  // (The first page is always shown on page load)
  var activePageNum = 0;
  var activePage = $('.form-section').eq(activePageNum);

  function paginate(count) {
    // Hide the current page
    $('.form-section').eq(activePageNum).removeClass('active');

    // Go to the previous / next page
    activePageNum = activePageNum + count;

    function checkPage(number) {
      var activePage = $('.form-section').eq(activePageNum);
      var isHidden = activePage.attr('data-group') && !activePage.hasClass('is-conditionally-visible');

      // If we're conditionally hiding the activePage,
      // go to the previous / next one
      if (isHidden) {
        activePageNum = activePageNum + number;
        checkPage(number);
      } else {
        // If the page is visible, show it
        activePage.addClass('active');

        // Scroll to the top of the page
        document.getElementById("sfgov-header").scrollIntoView();
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

  function showGroup(el) {
    el.addClass('is-triggering');
    var shows = el.attr('data-shows');

    // Show the groups tied to this conditional
    var groups = $("div").find("[data-group='" + shows + "']");
    groups.addClass('is-conditionally-visible');
  }

  function hideGroup(el) {
    el.removeClass('is-triggering');
    var shows = el.attr('data-shows');
    // Get the groups tied to this conditional
    var groups = $("div").find("[data-group='" + shows + "']");

    if (shows) {
      // Get the number of inputs currently
      // triggering this conditional
      var activeTriggers = $("input[data-shows='" + shows + "']").filter("[class~='is-triggering']").length;

      // If there are no other triggers,
      // hide the conditional
      if (activeTriggers === 0) {
        groups.removeClass('is-conditionally-visible');
      }
    } else {
      groups.removeClass('is-conditionally-visible');
    }
  }

  // Toggling radio buttons
  $("input[type='radio']").change(function() {
    var name = $(this).attr('name');
    var shows = $(this).attr('data-shows');

    // If the button triggers a conditional,
    // show the group
    if (shows) {
      showGroup($(this));
    }

    // If the interaction deselects another radio button,
    // make sure its conditional is hidden
    var otherRadios = $("input[name=" + name + "]:not(this, [data-shows=" + shows + "])");
    otherRadios.each(function(){
        hideGroup($(this));
    })
  });

  // Toggling checkboxes
  $("input[type='checkbox'][data-shows]").change(function() {
    if ($(this).is(':checked')) {
      showGroup($(this));
    } else {
      hideGroup($(this));
    }
  });

  // Match text field values
  $("input[data-if]").keyup(function() {
    var fullTrigger = $(this).attr('data-if');
    var currentValue = $(this).val();

    function showIf(el, equation) {
      if (currentValue === '' || equation === false) {
        hideGroup(el);
      } else {
        showGroup(el);
      }
    }

    // If the trigger begins with
    // an "<" or ">" symbol...
    if (fullTrigger.match("^[<>]")) {

      // Separate the number from the "<" or ">" symbol
      var triggerNumber = parseInt(fullTrigger.substr(1));
      var triggerOperator = fullTrigger.charAt(0);

      if (triggerOperator === '<') {
        // "Less than" conditionals
        showIf($(this), currentValue < triggerNumber);
      } else {
        // "Greater than" conditionals
        showIf($(this), currentValue > triggerNumber);
      }
    // Otherwise, match the value exactly
    } else {
      showIf($(this), currentValue === fullTrigger);
    }
  });
});