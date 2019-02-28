
function toggleDisplay(statID, b) {
    //statID is the id of the div, used to toggle between graph and table
    document.getElementById(statID+b).classList.add("buttonActive");
    document.getElementById(statID+((b=='t')?'g':'t')).classList.remove("buttonActive");

    if (b=='t') {
        document.getElementById(statID+"graph").style.display="none";
        document.getElementById(statID+"table").style.display="block";
    } else {
        document.getElementById(statID+"table").style.display="none";
        document.getElementById(statID+"graph").style.display="block";
    }
}



function showAddEmployee() {
    const element = document.getElementById("addEmployeeSection");
    document.getElementById("addE").style.visibility="visible";
    element.style.visibility = "visible";
    element.classList.remove('bounceOutDown');
    element.classList.add('bounceInUp');
}

function a() {}

function hideAddEmployee() {
    const element = document.getElementById("addEmployeeSection");
    document.getElementById("addemployeeB").onclick = a();

    function handleAnimationEnd() {
        document.getElementById("addE").style.visibility="collapse";
        element.style.visibility="collapse";
        document.getElementById("emailE").value = "";
        document.getElementById("phoneE").value = "";
        document.getElementById("nameE").value = "";

        element.removeEventListener('animationend', handleAnimationEnd);
        document.getElementById("addemployeeB").onclick = showAddEmployee();
    }
    element.addEventListener('animationend', handleAnimationEnd);

    element.classList.remove('bounceInUp');
    element.classList.add('bounceOutDown');

}

function addEmployee() {
    var email = document.getElementById("emailE").value;
    var phone = document.getElementById("phoneE").value;
    var name = document.getElementById("nameE").value;


    if (email == "" || phone == "" || name == "") {
        document.getElementById("addEButton").style.color = "white";
        document.getElementById("addEButton").innerHTML = "<strong>Incomplete</strong>";
        setTimeout(function() {
            document.getElementById("addEButton").style.color = "black";
            document.getElementById("addEButton").innerHTML = "<strong>Add</strong>";
        }, 1000);
    } else {
        var userId = sessionStorage.getItem("uid");

        new Promise(resolve => {
            firebase.database().ref('users/' + userId + '/list/').child("employees").once("value").then(function(snapshot) {
                //console.log("there are " + snapshot.numChildren() + " children")
                //push to firebase
                firebase.database().ref('users/' + userId + '/list/employees/' + "em" + (snapshot.numChildren() + 1)).set({
                    email: email,
                    name: name,
                    phone: phone
                });
                resolve();
            });
        }).then((res)=>{refreshEmployees()});
        document.getElementById("emailE").value = "";
        document.getElementById("phoneE").value = "";
        document.getElementById("nameE").value = "";
        document.getElementById("addEButton").style.backgroundColor = "#26e804";
        document.getElementById("addEButton").innerHTML = "<strong>Added</strong>";
        setTimeout(function() {
            document.getElementById("addEButton").style.backgroundColor = "#d01d33";
            document.getElementById("addEButton").innerHTML = "<strong>Add</strong>";
        }, 1000);


    }
    
    


    
    
}