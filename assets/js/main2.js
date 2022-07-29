$(document).ready(function () {
  $(".accordion-collapse.show").each(function () {
    $(this)
      .prev(".accordion-header")
      .find(".plus")
      .addClass("d-none")
      .find(".minus")
      .addClass("d-block");
  });
});
