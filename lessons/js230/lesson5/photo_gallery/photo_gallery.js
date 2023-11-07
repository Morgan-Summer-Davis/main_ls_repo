$(function() {
  $('ul').on('click', event => {
    if ($(event.target).prop('tagName') !== 'IMG') return;

    $(event.currentTarget).find('img').removeClass('highlighted');
    $(event.target).addClass('highlighted');

    console.log($('img'));
    $('#mainPhoto').fadeOut(400, () => $('#mainPhoto').attr('src', $(event.target).attr('src')));
    $('#mainPhoto').fadeIn();
  });

});