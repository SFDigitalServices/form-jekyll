$(document).ready(function(){

  // Initial state
  $('.form-section:first-child').addClass('active');
  $(".form").validator();

  // Set state of Settings checkboxes
  // (Firefox doesn't clear page classes on reload)
  if ($('body').hasClass('all-pages')) {
    $('#settings-all-pages').prop('checked', true);
  } else {
    $('#settings-all-pages').prop('checked', false);
  }

  if ($('body').hasClass('all-conditionals')) {
    $('#settings-all-conditionals').prop('checked', true);
  } else {
    $('#settings-all-conditionals').prop('checked', false);
  }


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
        checkPage();
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

  // Conditionals
  $("input[type='radio'][data-shows]").change(function () {
    var group = $(this).attr('data-shows');
    $("div").find("[data-group='" + group + "']").addClass('is-conditionally-visible');
  });

  $("input[type='checkbox'][data-shows]").change(function () {
    var group = $(this).attr('data-shows');
    $("div").find("[data-group='" + group + "']").toggleClass('is-conditionally-visible');
  });

  $("input[data-hides]").change(function () {
    var group = $(this).attr('data-hides');
    $("div").find("[data-group='" + group + "']").removeClass('is-conditionally-visible');
  });

  // Settings
  $('#settings-all-pages').change(function() {
    $('body').toggleClass('all-pages');
  });

  $('#settings-all-conditionals').change(function() {
    $('body').toggleClass('all-conditionals');
  });
});