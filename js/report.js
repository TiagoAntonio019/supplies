var report_itens;

$("#btn_show_report").click(() =>{

    let user = $("#technical").val();

    if(user.length > 0){
        let packge = {
            user_id: user
        }

        send_request(packge, "get", "php/user/get-report.php", receive_report);

    } else{
        alert("Selecione um técnico!");
    }

});

$("#btn_export").click(print_report);

$("#btn_clear").click(() =>{

    let user = $("#technical").val();
    let name = $("#technical option:selected").text();

    let erase = confirm("Você realmente deseja apagar o relatório do técnico " + name + " ?");

    if (erase) {
        clear_report(user);
    } else{
        alert("Operação cancelada pelo usuário!");
    }

});

$(document).ready(send_request(null, "get", "php/user/get-technical.php", receive_user_list));

function receive_user_list(list){
   
    if(list.length > 0){
        for(let i = 0; i <= (list.length - 1); i++){
            $("#technical").append("<option value='" + list[i][0] + "'>" + list[i][1] + "</option>");
        }
    }

    
}

function receive_report(report){

    $("#product_table1").empty();

    report_itens = report;
    
    for(let i = 0; i <= (report.length -1); i++){

        $("#product_table1").append("<tr><td>" + report[i][0] + "</td><td>" + report[i][1] + "</td></tr>");

    }
}

function print_report(){
    let doc = new jsPDF();

    let technical = $("#technical option:selected").text();

    technical = technical.trim();

    doc.setFontSize(20);
    doc.text("Relatório de Estoque", 10, 20);
    doc.line(10,25,200,25, 'S');
    doc.setFontSize(12);
    doc.text("Navelinknet", 10, 35);
    doc.text("Responsável: Lucas Santos | Estoquista | Ramal 301", 10, 40);
    doc.text("Data de emissão: " + print_date(), 10, 45);
    doc.text("Técnico: " + technical , 10, 50);
    doc.line(10,55,200,55, 'S');
    doc.setFontSize(14);
    doc.text("Lista de materiais utilizados", 10, 65);
    doc.setFontSize(12);

    let start = 75;

    for(let i = 0; i <= (report_itens.length -1); i++){
        doc.text("[ ] "+report_itens[i][0] + ": " + report_itens[i][1], 10, start);
        start += 10;
    }

    doc.text("Observações", 10, start);
    start += 10;
    doc.line(10,start,200,start, 'S');
    start += 10;
    doc.line(10,start,200,start, 'S');
    start += 10;
    doc.line(10,start,200,start, 'S');
    start += 20;
    doc.line(10,start,80,start, 'S');
    start += 5;
    doc.setFontSize(8);
    doc.text("Técnico: " + technical,10,start);

    doc.save("report1.pdf");

}

function print_date(){
    let now = new Date;

    let mon = ["Jan", "Fev", "Mar", "Abril", "Maio", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

    let datestring = "dia " + now.getDay() + " de " + mon[now.getMonth()] + " de " + now.getFullYear();

    return datestring;
}

function clear_report(index){
    let packge = {
        user_id: index
    }
    send_request(packge, "post", "php/user/clear-report.php", report_deleted);
}

function report_deleted(){
    alert("Relatório apagado com sucesso!");
}