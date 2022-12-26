function send_request(request_data, request_method, request_url, f_callback){
    $.ajax({
        url: request_url,
        method: request_method,
        data: request_data,
        success: (response) =>{
            if(f_callback != null){
                let result = JSON.parse(response);
                f_callback(result);
            }
            
        },
        error: () => {
            alert("The request failed!");
        }
    });
}