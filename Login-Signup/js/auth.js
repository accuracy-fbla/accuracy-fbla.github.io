
firebase.auth().signOut().then(function() {
  console.log("signed out");
}).catch(function(error) {
  // An error happened.
});



if (firebase.auth().currentUser) {
  console.log(firebase.auth().currentUser.email);
}


if (document.getElementById("sign_in_button") != null) {
  document.getElementById("sign_in_button").onclick =  function(){
    var username = document.getElementById("username_input").value;
    var password = document.getElementById("password_input").value;

    if (username == "" || password == "") {
      document.getElementById("sign_in_button").innerText = "Incomplete";
      setTimeout(function() {
        document.getElementById("sign_in_button").innerText = "Log In";
      }, 1300);
      return;
    }
    login(username, password);
  };
}

if (document.getElementById("create_user_button") != null) {

  document.getElementById("create_user_button").onclick = function(){

    var username = document.getElementById("username_input_signup").value;
    var password = document.getElementById("password_input_signup").value;
    if (username == "" || password == "") {
      document.getElementById("create_user_button").innerText = "Incomplete";
      setTimeout(function() {
        document.getElementById("create_user_button").innerText = "Create Account";
      }, 1300);
      return;
    }
    signUp(username, password);
  };
}


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
      sessionStorage.setItem("uid", user.uid);
      window.location.href = "../dashboard/index.html";
  } else {

  }
});

function login(username, password){
  firebase.auth().signInWithEmailAndPassword(username, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);

    if (errorCode == "auth/wrong-password" || errorCode=="auth/user-not-found" || errorCode=="auth/invalid-email") {
      document.getElementById("sign_in_button").innerText = "Invalid";
      setTimeout(function() {
        document.getElementById("sign_in_button").innerText = "Log In";
      }, 1500);
    }
  });

}

function signUp(username, password) {
  firebase.auth().createUserWithEmailAndPassword(username, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode + " " + errorMessage);

    if (errorCode == "auth/email-already-in-use") {
      document.getElementById("create_user_button").innerText = "Email already in use";
      setTimeout(function() {
        document.getElementById("create_user_button").innerText = "Create Account";
      }, 1300);
    } else if (errorCode=="auth/weak-password") {
      document.getElementById("create_user_button").innerText = "Password is weak";
      setTimeout(function() {
        document.getElementById("create_user_button").innerText = "Create Account";
      }, 1300);
    } else if (errorCode=="auth/invalid-email") {
      document.getElementById("create_user_button").innerText = "Invalid email";
      setTimeout(function() {
        document.getElementById("create_user_button").innerText = "Create Account";
      }, 1500);
    }
  });
}
