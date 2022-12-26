var product_list = [];
var product_cart = [];
  
$(document).ready(send_request(null, "get", "php/user/get-products.php", receive_products));
  
$("#btn_add_product").click(() =>{

    let product_name = $("#product").val();

    if(product_name.length > 2){

        let result = check_product_name(product_name);

        if (result){
            $("#product").removeClass("is-invalid");
            $("#product").addClass("is-valid");

            add_product_to_cart(product_name);

        } else{
            $("#product").addClass("is-invalid");
            $("#product").removeClass("is-valid");

        }

    }

});

$("#btn_cancel_cart").click(() => {
    if(product_cart.length > 0){
        if(confirm("Você tem certeza que deseja limpar a lista de produtos?")){
            clear_product_cart();
        }
    }
});

$("#btn_send_cart").click(() => {
    if(product_cart.length > 0){
        if(confirm("Você tem certeza disso?")){
            $("#Modal1").modal("show");
            send_request(null, "get", "php/user/get-technical.php", receive_user_list);
        }
    }
});

$("#btn_finish").click(() =>{
    let obj_json = JSON.stringify(product_cart);

    let tec = $("#technical").val();

    let packge = {
        obj: obj_json,
        technical: tec
    }

    send_request(packge, "post", "php/user/insert-cart.php", null);

    $("#Modal1").modal("hide");

    clear_product_cart();

    $("#product").val("");

});

$("#product").click(() =>{
    $("#product").removeClass("is-valid");
    $("#product").removeClass("is-invalid");
});

function receive_user_list(list){
    $("#technical").empty();
    if(list.length > 0){
        for(let i = 0; i <= (list.length - 1); i++){
            $("#technical").append("<option value='" + list[i][0] + "'>" + list[i][1] + "</option>");
        }
    }
}

function receive_products(products){

    let product;

    for(let i = 0; i <= (products.length -1); i++){

      product_list.push(products[i][1]);
      
      product = build_product(products[i][1]);

      $("#product_list").append(product);
    }
}

function build_product(product){
    let template = '<option value="#product_name"></option>';
    let product_from_html = template.replace(/#product_name/g, product);
    return product_from_html;
}

function check_product_name(product_name){

    let contains = false;

    if(product_list.length > 0){

        contains = product_list.includes(product_name);

    }

    return contains;
}

function add_product_to_cart(product_name){

    let contains = product_cart_contains(product_name);

    if(contains == -1){

        let new_product = new Product(product_name, 1);
        product_cart.push(new_product);

    } else{
       
        update_product_cart(contains);

    }

    show_product_cart();
}

function product_cart_contains(product_name){
    let index = -1;

    for(let i = 0; i <= (product_cart.length -1); i++){
        if(product_cart[i]._Name == product_name){
            return i;
        }
    }

    return index;
}

function update_product_cart(index){
    let current_amount = product_cart[index].Amount;

    let new_amount = current_amount + 1;

    product_cart[index].Amount = new_amount;
}

function show_product_cart(){
    if(product_cart.length > 0){

        $("#product_table1").empty();

        for(let i = 0; i <= (product_cart.length - 1); i++){
            
            $("#product_table1").append(build_product_table(product_cart[i].Name, product_cart[i].Amount));

        }
    }
}

function build_product_table(product_name, product_amount){
    let template = "<tr><th scope='row'><button class='btn btn-outline-danger'><i class='bi bi-eraser'></i></button></th><td>#product_name</td><td>#product_amount</td></tr>";
    template = template.replace(/#product_name/g, product_name);
    template = template.replace(/#product_amount/g, product_amount);
    return template;
}

function clear_product_cart(){
    product_cart = [];
    $("#product_table1").empty();
}

class Product{
    constructor(name, amount){
        this._Name = name;
        this._Amount = amount;
    }
    set Amount(amount){
        this._Amount = amount;
    }

    get Amount(){
        return this._Amount;
    }
    get Name(){
        return this._Name;
    }

}