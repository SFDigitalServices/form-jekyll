$(document).ready(function(){
  $(".form").validator();

  $("input[data-shows]").change(function () {
    console.log("shit happened");
    var condition = $(this).attr('data-shows');
    $("div").find("[data-condition='" + condition + "']").show();
  });

  $("input[data-hides]").change(function () {
    var condition = $(this).attr('data-hides');
    $("div").find("[data-condition='" + condition + "']").hide();
  });
});