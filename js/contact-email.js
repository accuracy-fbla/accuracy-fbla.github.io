
function sendEmail() {

    var name = document.getElementById("name");
    var email = document.getElementById("email");
    var message = document.getElementById("message");
    if (name.value =="" || email.value=="" || message.value=="") {
        document.getElementById("buttonForm").innerHTML = "<i class=\"fa fa-times-circle\"></i>&nbsp;Incomplete";
        setTimeout(()=> {
            document.getElementById("buttonForm").innerHTML = "<i class=\"fa fa-paper-plane\"></i>&nbsp;Send";
        }, 1000);
        return;
    }
    var template_params = {
        "name": name.value,
        "email": "Email: " + email.value,
        "notes": message.value
    };

    var service_id = "default_service";
    var template_id = "contact";
    name.value = "";
    email.value = "";
    message.value = "";
    document.getElementById("buttonForm").innerHTML = "<i class=\"fa fa-paper-plane\"></i>&nbsp;Sent!";
    document.getElementById("buttonForm").style.backgroundColor = "#54d10c";
    emailjs.send(service_id, template_id, template_params).then((res) => {
        console.log("success");
         document.getElementById("buttonForm").innerHTML = "<i class=\"fa fa-paper-plane\"></i>&nbsp;Send";
         document.getElementById("buttonForm").style.backgroundColor = "#db2c49";
    });


}