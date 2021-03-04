$(function() {
  $('#sign_up-form').submit(function(){
    var usernameValue = $('#sign_up-username').val();
    var emailValue = $('#sign_up-email').val();
    var passwordValue = $('#sign_up-password').val();
    var errorCount = 0;

    if(usernameValue === ""){
      $('#sign_up-username-error-message').text('ニックネームを入力してください');
      errorCount += 1;
    } else {
      $('#sign_up-username-error-message').text('');
    }

    if(emailValue === ""){
      $('#sign_up-email-error-message').text('メールアドレスを入力してください');
      errorCount += 1;
    } else if(!emailValue.match(/^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/)){
      $('#sign_up-email-error-message').text('メールアドレスが正しくありません');
      errorCount += 1;
    } else {
      $('#sign_up-email-error-message').text('');
    }

    if(passwordValue === ""){
      $('#sign_up-password-error-message').text('パスワードを入力してください');
      errorCount += 1;
    } else if(!passwordValue.match(/^(?=.*[a-zA-Z])(?=.*[0-9])[0-9a-zA-Z]{6,}$/) ){
      $('#sign_up-password-error-message').text('パスワードは半角英数字６文字以上が必要です');
      errorCount += 1;
    } else {
      $('#sign_up-password-error-message').text('');
    }

    if(errorCount !== 0){
      return false;
    }
  });
});