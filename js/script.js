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

  function showGroup(el) {
    el.addClass('is-triggering');

    // Get the groups that match this field's data-shows value
    var groups = $("div").find("[data-group='" + el.attr('data-shows') + "']");
    // Then, show them
    groups.addClass('is-conditionally-visible');
  }

  function hideGroup(el, attr = 'data-shows') {
    el.removeClass('is-triggering');

    // For text fields
    if (attr === 'data-shows') {
      // See how many other fields are conditionally showing this group
      var activeTriggers = $("input[data-shows='" + el.attr(attr) + "']").filter("[class~='is-triggering']").length;
      console.log(activeTriggers);

      // If no other fields are triggering this conditional...
      if (activeTriggers === 0) {
        // Get the groups that match this field's data-shows value
        var groups = $("div").find("[data-group='" + el.attr(attr) + "']");
        // Then, hide them
        groups.removeClass('is-conditionally-visible');
      }

    // For radio buttons
    } else {
      // Get the groups that match this field's data-shows value
      var groups = $("div").find("[data-group='" + el.attr(attr) + "']");
      // Then, hide them
      groups.removeClass('is-conditionally-visible');
    }
  }

  // For toggling checkboxes
  function toggleGroup(el) {
    el.toggleClass('is-triggering');

    // Get the groups that match this field's data-shows value
    var groups = $("div").find("[data-group='" + el.attr('data-shows') + "']");
    // Then, toggle their visiblity
    groups.toggleClass('is-conditionally-visible');
  }

  // Checking radio buttons
  $("input[type='radio'][data-shows]").change(function() {
    showGroup($(this));
  });

  // Unchecking radio buttons
  $("input[data-hides]").change(function() {
    hideGroup($(this), 'data-hides');
  });

  // Toggling checkboxes
  $("input[type='checkbox'][data-shows]").change(function() {
    toggleGroup($(this));
  });

  // Match text field values
  $("input[data-if]").keyup(function() {

    var trigger = $(this).attr('data-if');
    var value = $(this).val();

    function showIf(el, equation) {
      if (value === '') {
        // If the field's blank
        hideGroup(el);
      } else if (equation) {
        // If the condition is met
        showGroup(el);
      } else {
        // If the condition isn't met
        hideGroup(el);
      }
    }

    // If the trigger begins with
    // an "<" or ">" symbol...
    if (trigger.match("^[<>]")) {

      // Separate the number from the "<" or ">" symbol
      var condition = parseInt(trigger.substr(1));
      var operator = trigger.charAt(0);

      if (operator === '<') {
        // "Less than" conditionals
        showIf($(this), value < condition);
      } else {
        // "Greater than" conditionals
        showIf($(this), value > condition);
      }
    // Otherwise, match the value exactly
    } else {
      showIf($(this), value === trigger);
    }
  });
});