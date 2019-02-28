if (firebase.auth().currentUser) {
  //console.log(firebase.auth().currentUser.email);
}

//console.log(sessionStorage.getItem("uid"));

function transferUser(user, callback) {
  console.log(user.uid);
  callback && callback();
  console.log(user.uid);
}
