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
  
  $('#signup-close-modal').click(function(){
    $('#signup-modal').fadeOut();
  });
});

$(function(){
  $('.login-show').click(function(){
    $('#login-modal').fadeIn();
  });
  
  $('#login-close-modal').click(function(){
    $('#login-modal').fadeOut();
  });
});