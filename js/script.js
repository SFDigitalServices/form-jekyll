$(document).ready(function(){
  $(".form").validator();

  $("input[data-shows]").change(function () {
    var group = $(this).attr('data-shows');
    $("div").find("[data-group='" + group + "']").show();
  });

  $("input[data-hides]").change(function () {
    var group = $(this).attr('data-hides');
    $("div").find("[data-group='" + group + "']").hide();
  });
});