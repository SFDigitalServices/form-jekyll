$(document).ready(function(){

  // Initial state
  $('.form-section:first-child').addClass('active');
  $(".form").validator();

  // Toggle form settings modal
  $('.form-settings-toggle').click(function() {
    $('.form-settings').toggleClass('active');
  })

  // Pagination
  $('.form-section-prev').click(function() {
    var currentSection = $(this).parent().parent('.form-section');
    currentSection.removeClass('active');
    currentSection.prev('.form-section').addClass('active');
    e.preventDefault();
  });

  $('.form-section-next').click(function() {
    var currentSection = $(this).parent().parent('.form-section');
    currentSection.removeClass('active');
    currentSection.next('.form-section').addClass('active');
    e.preventDefault();
  });

  // Conditionals
  $("input[type='radio'][data-shows]").change(function () {
    var group = $(this).attr('data-shows');
    $("div").find("[data-group='" + group + "']").show();
  });

  $("input[type='checkbox'][data-shows]").change(function () {
    var group = $(this).attr('data-shows');
    $("div").find("[data-group='" + group + "']").toggle();
  });

  $("input[data-hides]").change(function () {
    var group = $(this).attr('data-hides');
    $("div").find("[data-group='" + group + "']").hide();
  });

  // Settings
  $('#settings-all-pages').change(function() {
    $('body').toggleClass('all-pages');
  })

  $('#settings-all-conditionals').change(function() {
    $('body').toggleClass('all-conditionals');
  })
});