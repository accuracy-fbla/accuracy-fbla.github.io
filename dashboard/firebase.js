
var uid = sessionStorage.getItem("uid");
if (uid == "" || uid == null) {
    window.location.href = "../Login-Signup/index.html";
}

firebase.database().ref('users/' + uid + '/graphs/').child("assets").once("value").then(function(snapshot) {

    if (snapshot.numChildren() < 1) {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();

        var full_date = mm + "-" + dd + "-" + yyyy
        firebase.database().ref('users/' + uid + '/graphs/assets/' + "entry" + (snapshot.numChildren() + 1)).set({
            value: 0,
            date: full_date
        });
        refreshGraphs("assets");
    }
});

firebase.database().ref('users/' + uid + '/graphs/').child("expenses").once("value").then(function(snapshot) {

    if (snapshot.numChildren() < 1) {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();

        var full_date = mm + "-" + dd + "-" + yyyy
        firebase.database().ref('users/' + uid + '/graphs/expenses/' + "entry" + (snapshot.numChildren() + 1)).set({
            value: 0,
            date: full_date
        });

        refreshGraphs("expenses");
    }
});

firebase.database().ref('users/' + uid + '/graphs/').child("liabilities").once("value").then(function(snapshot) {
    if (snapshot.numChildren() < 1) {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();

        var full_date = mm + "-" + dd + "-" + yyyy

        firebase.database().ref('users/' + uid + '/graphs/liabilities/' + "entry" + (snapshot.numChildren() + 1)).set({
            value: 0,
            date: full_date
        });

        refreshGraphs("liabilities");
    }
});



function logout() {
    sessionStorage.setItem("uid", "");
    window.location.href = "../Login-Signup/index.html";
}


function download(file) {
    var fileRef = firebase.storage().ref().child(file+".PDF");
    fileRef.getDownloadURL().then(function(url) {
        console.log(url);
        //document.getElementById("download_frame").src = url;
        var link = document.createElement('a');
        link.href = url;
        link.target="_blank";
        link.download = file+'.pdf';
        link.dispatchEvent(new MouseEvent('click'));
    }).catch(function(error) {
        console.log(error);
    });
}

document.getElementById("button_asset").onclick = function() {
    var asset_value = document.getElementById("asset_input").value
    if (asset_value=="") return;
    //get the current date
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    var full_date = mm + "-" + dd + "-" + yyyy
    var userId = uid;
    //push to firebase
    
    new Promise(resolve => {
        firebase.database().ref('users/' + userId + '/graphs/').child("assets").once("value").then(function(snapshot) {
            //console.log("there are " + snapshot.numChildren() + " children")
            //push to firebase
            firebase.database().ref('users/' + userId + '/graphs/assets/' + "entry" + (snapshot.numChildren() + 1)).set({
                value: asset_value,
                date: full_date
            });
            resolve();
        });
    }).then((res)=>{
        document.getElementById("asset_input").value="";
        refreshGraphs("assets");
    });

}

document.getElementById("button_expense").onclick = function() {
    var asset_value = document.getElementById("expense_input").value
    if (asset_value=="") return;
    //get the current date
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    var full_date = mm + "-" + dd + "-" + yyyy
    var userId = uid;
    //push to firebase

    new Promise(resolve => {
        firebase.database().ref('users/' + userId + '/graphs/').child("expenses").once("value").then(function(snapshot) {
            //console.log("there are " + snapshot.numChildren() + " children")
            //push to firebase
            firebase.database().ref('users/' + userId + '/graphs/expenses/' + "entry" + (snapshot.numChildren() + 1)).set({
                value: asset_value,
                date: full_date
            });
            resolve();
        });
    }).then((res)=>{
        document.getElementById("expense_input").value="";
        refreshGraphs("expenses");
    });

}

document.getElementById("button_liability").onclick = function() {
    var asset_value = document.getElementById("liability_input").value
    if (asset_value=="") return;
    //get the current date
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    var full_date = mm + "-" + dd + "-" + yyyy
    var userId = uid

    //push to firebase


    new Promise(resolve => {
        firebase.database().ref('users/' + userId + '/graphs/').child("liabilities").once("value").then(function(snapshot) {
            //console.log("there are " + snapshot.numChildren() + " children")
            //push to firebase
            firebase.database().ref('users/' + userId + '/graphs/liabilities/' + "entry" + (snapshot.numChildren() + 1)).set({
                value: asset_value,
                date: full_date
            });
            resolve();
        });
    }).then((res)=>{
        document.getElementById("liability_input").value="";
        refreshGraphs("liabilities");
    });

}

document.getElementById("addLedgerB").onclick = function() {
    var account_name = document.getElementById("accName").value
    var credit = document.getElementById("credit").value
    var debit = document.getElementById("debit").value

    if (account_name=="") return;
    if (credit=="") credit = "0";
    if (debit=="") debit="0";

    //get the current date
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    var full_date = mm + "-" + dd + "-" + yyyy
    var userId = uid
    
    new Promise(resolve => {
        firebase.database().ref('users/' + userId + '/table/').child("ledger").once("value").then(function(snapshot) {
            //console.log("there are " + snapshot.numChildren() + " children")
            //push to firebase
            firebase.database().ref('users/' + userId + '/table/ledger/' + "entry" + (snapshot.numChildren() + 1)).set({
                credit: credit,
                date: full_date,
                debit: debit,
                name: account_name
            });
            resolve();
        });
    }).then((res)=>{
        document.getElementById("accName").value = "";
        document.getElementById("credit").value = "";
        document.getElementById("debit").value = "";
        refreshLedger();
    });

}

class GraphData {
    constructor(date, value) {
        this.date = date;
        this.value = value;
    }
}

class Employee {
    constructor(email, name, phone) {
        this.email = email
        this.name = name
        this.phone = phone
    }
}

class Ledger_Item {
    constructor(name, date, credit, debit) {
        this.name = name
        this.date = date
        this.credit = credit
        this.debit = debit
    }
}


function retrieve_ledger() {
    var database = firebase.database();

    var userId = uid;

    var ledger_list = [];


    return new Promise(resolve => {
        var l = [];
        database.ref('/users/' + userId + '/table/ledger/').once('value', (snapshot) => {
            snapshot.forEach((child) => {
                l.push(new Ledger_Item(child.val()['name'], child.val()['date'], child.val()['credit'], child.val()['debit']))
            });
            resolve(l);
        });
    });

}


function retrieve_employees() {
    var database = firebase.database();

    var userId = uid;

    var employee_list = [];

    return new Promise(resolve => {
        var l = [];
        database.ref('/users/' + userId + '/list/employees/').on('value', (snapshot) => {

            snapshot.forEach((child) => {

                l.push(new Employee(child.val()['email'], child.val()['name'], child.val()['phone']))
            })
            resolve(l);
        });
    });
}

function retrieve_graph_data(data_to_retrieve) {
    var database = firebase.database();
    var userId = uid;



    return new Promise(resolve => {
        var l = [];
        firebase.database().ref('/users/' + userId + '/graphs/' + data_to_retrieve).on('value', (snapshot) => {

            snapshot.forEach((child) => {
                l.push(new GraphData(child.val()['date'], child.val()['value']));
            });
            resolve(l);
        });
    });
}




function displayEmployees(employees) {
    document.getElementById("numEmployees").innerText = employees.length;
    document.getElementById("memberSectionD").innerHTML = "";
    employees.forEach((em) =>  {
        var name = em.name;
        var email = em.email;
        var phone = "" + em.phone;
        phone = "("+phone.substring(0, 3)+") "+phone.substring(3,6)+"-"+phone.substring(6);
        document.getElementById("memberSectionD").innerHTML +=
            "<div class=\"memberSection\">\n" +
            "<p>" +
            "<span><strong>"+name+"&emsp;</strong></span>" +
            "<span><strong>" + phone + "</strong></span>" +
            "<br>" +
            email +
            "</p></div>";
    });
}

function refreshEmployees() {
    retrieve_employees().then((res) => {
        displayEmployees(res)
    });
}

function displayLedger(ledgers) {
    function compareEm(a,b) {
        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        else if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        else {
            var aA = {
                m: parseInt(a.date.substring(0, a.date.indexOf("-"))),
                d: parseInt(a.date.substring(a.date.indexOf("-") + 1, a.date.indexOf("-", a.date.indexOf("-") + 1))),
                y: parseInt(a.date.substring(a.date.lastIndexOf("-") + 1))
            };
            var bB = {
                m: parseInt(b.date.substring(0, b.date.indexOf("-"))),
                d: parseInt(b.date.substring(b.date.indexOf("-") + 1, b.date.indexOf("-", b.date.indexOf("-") + 1))),
                y: parseInt(b.date.substring(b.date.lastIndexOf("-") + 1))
            };

            if (aA.y > bB.y) return 1;
            else if (bB.y > aA.y) return -1;
            else {
                if (aA.m > bB.m) return 1;
                else if (bB.m > aA.m) return -1;
                else {
                    if (aA.d > bB.d) return 1;
                    else if (bB.d > aA.d) return -1;
                    else return 0;
                }
            }
        }
    }

    ledgers.sort(compareEm);
    document.getElementById("ledgerDisplay").innerHTML = "";

    var cAcc = "";
    var totalC = 0;
    var totalD = 0;
    var sectionS = "";
    ledgers.forEach((le) =>{
        if (cAcc.toLowerCase() != le.name.toLowerCase()) {
            if (cAcc != "") {
                sectionS += "" +
                    "<div class=\"ledgerTotal\">\n" +
                    "<div class=\"row\">\n" +
                    "<div class=\"col-md-4 col-xs-4\">\n" +
                    "<p>"+totalC+"</p>\n" +
                    "</div>\n" +
                    "<div class=\"col-md-4 col-xs-4\">\n" +
                    "<p>"+totalD+"</p>\n" +
                    "</div>\n" +
                    "<div class=\"col-md-4 col-xs-4\">\n" +
                    "<p><strong>Total</strong></p>\n" +
                    "</div>\n" +
                    "</div>\n" +
                    "</div>" +
                    "</div>";
                totalC = 0; totalD = 0;
            }

            sectionS += "" +
                "<div class='ledgerSection'>"+
                "<div class='ledgerTitle'>"+
                "<h1>"+le.name+"</h1>"+
                "</div>"+
                "<div class='ledgerNum row'>" +
                "<div class=\"col-md-4 col-xs-4 text-center\">" +
                "<p>Credit</p>" +
                "</div>" +
                "<div class=\"col-md-4 col-xs-4 text-center\">" +
                "<p>Debit</p>" +
                "</div>"+
                "<div class=\"col-md-4 col-xs-4 text-center\">" +
                "<p>Date</p></div></div>";

            cAcc = le.name;
        }

        var ld = getDate(le);
        var leDate = ld.m + "-" + ld.d + "-"+ld.y;
        sectionS += "" +
            "<div class=\"ledgerData\">\n" +
            "<div class=\"ledgerValues row\">\n" +
            " <div class=\"col-md-4 col-xs-4\">\n" +
            "<p>"+le.credit+"</p>\n" +
            "</div>\n" +
            "<div class=\"col-md-4 col-xs-4\">\n" +
            "<p>"+le.debit+"</p>\n" +
            "</div>\n" +
            "<div class=\"col-md-4 col-xs-4\">\n" +
            "<p>"+leDate+"</p>\n" +
            "</div></div></div>";

    });
    document.getElementById("ledgerDisplay").innerHTML += sectionS;

}

function refreshLedger() {
    retrieve_ledger().then((res) => {
        displayLedger(res)
    });
}


function displayGraphs(type, values) {
    var table = document.getElementById(type+"Gvalues");
    table.innerHTML = "";

    values.sort(compareYears);
    rePlot(type, getGraphValues(values));
    var totalvalue= 0;
    values.forEach((val)=>{
        var d = getDate(val);
        var date = d.m+"-"+d.d+"-"+d.y;
        table.innerHTML += "<tr><td>"+val.value + "</td><td>"+date+"</td></tr>";
        totalvalue += parseInt(val.value);
    });
    document.getElementById(type+"TotalGD").innerText = ""+totalvalue;
}

function refreshGraphs(type) {
    retrieve_graph_data(type).then((res) => {
        displayGraphs(type, res);
    });
}

function getGraphValues(val) {
    var newVal =[];

    var c = 0;
    val.forEach((v)=>{
        newVal.push([c, v.value]);
        c++;
    });
    return newVal;
}


function getDate(dString) {
     return {
        m:parseInt(dString.date.substring(0, dString.date.indexOf("-"))),
        d: parseInt(dString.date.substring(dString.date.indexOf("-")+1,
            dString.date.indexOf("-",dString.date.indexOf("-")+1))),
        y:parseInt(dString.date.substring(dString.date.lastIndexOf("-")+1))
    };
}

function compareYears(a,b) {
    var aA = getDate(a);
    var bB = getDate(b);


    if (aA.y > bB.y) return 1;
    else if (bB.y > aA.y) return -1;
    else {
        if (aA.m > bB.m) return 1;
        else if (bB.m > aA.m) return -1;
        else {
            if (aA.d > bB.d) return 1;
            else if (bB.d > aA.d) return -1;
            else return 0;
        }
    }

}

function refreshAll() {
    refreshLedger();
    refreshEmployees();
    refreshGraphs("assets");
    refreshGraphs("expenses");
    refreshGraphs("liabilities");
}

refreshAll();
