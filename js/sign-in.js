$("#btn_sign-in").click(() =>{
  let user = $("#user_name").val();
  let pass = $("#user_pass").val();

  if ((user.length < 3) && (pass.length < 3)){
    alert("Por favor, informe seu usuário e senha!");
    return false;
  }

  sign_in(user, pass, check_result);
});

$("body").keydown((e) => {
  if (e.keyCode == 13){
    let user = $("#user_name").val();
    let pass = $("#user_pass").val();

    if ((user.length < 3) && (pass.length < 3)){
      alert("Por favor, informe seu usuário e senha!");
      return false;
    }

    sign_in(user, pass, check_result);
    }
});

function sign_in(user, pass, f_callback){
  $.ajax({
    url: "php/user/sign-in.php",
    method: "POST",
    data: {
      user_name: user,
      user_pass: pass
    },
    success: (response) =>{
      let result = JSON.parse(response);
      f_callback(response);
    }
  });
}

function check_result (result){
  if(result == '"access_ok"'){
    window.document.location = "home.html";
  } else{
    alert("Acesso negado, verifique seu usuário e senha!");
  }
}