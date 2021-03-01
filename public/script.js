$(function() {
  $('#top-title-id').hover(function(){
    $('.description').fadeIn();
  },
  function(){
    $('.description').fadeOut();
  });
  
});

$(function(){
  $('.signup-show').click(function(){
    $('#signup-modal').fadeIn();
  });
  
  $('#close-modal').click(function(){
    $('#signup-modal').fadeOut();
  });
});