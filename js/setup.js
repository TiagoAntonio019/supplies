$("#btn_clear_report").click(() => {

    let resut = confirm("Você realmente deseja zerar a lista de produtos lançados?");
    if (resut){
        send_request(null, "post", "php/user/clear_reports.php", null);
        alert("Lista de produtos zerada!");
    }

});