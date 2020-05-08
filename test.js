var config = {
  apiKey: "AIzaSyB1ZbKz_5jUtKaJtga8QzwmS0geABoqIeA",
  authDomain: "is445-course-project-2d084.firebaseapp.com",
  databaseURL: "https://is445-course-project-2d084.firebaseio.com",
  projectId: "is445-course-project-2d084",
  storageBucket: "is445-course-project-2d084.appspot.com",
  messagingSenderId: "123316226579",
  appId: "1:123316226579:web:10940c95a97bc347b98de6",
  measurementId: "G-KH22XVDB7M"
};

firebase.initializeApp(config);
//initialize firebase

//firestorage
var database = firebase.database();
var ref = database.ref('contactData');
ref.on ('value', getData, errorData);
var firestore = firebase.firestore();

var contactData



// Firebase Database Reference and the child
const dbRef = firebase.database().ref();

const usersRef = dbRef.child('contactData');


readUserData();

$('form').submit(function(event){
event.preventDefault()
    alert('form was submitted!');
    inputData(userFName,userEmail,userPNumber)
});

function inputData(){
  var userNameInput = document.getElementById('userFName').value;
  var userEmailInput = document.getElementById('userEmail').value;
  var userPNumberInput = document.getElementById('userPNumber').value;

console.log("it works???")
console.log("is it working");
const db = firestore.collection("contactData");
  db.doc().set({
      name: userNameInput,
      email: userEmailInput,
      phone: userPNumberInput
    }).then(function() {
      console.log("info saved to db");
    })
    .catch(function(error) {
      console.log(error);
    });

    var data = {
      name: userNameInput,
      email: userEmailInput,
      phone: userPNumberInput
    }
    ref.push(data);
};


function getData(data) {
  console.log(data.val());
  var contactData= data.val();
  var keys = Object.keys(contactData);
  console.log(keys);
  for (var i = 0; i < keys.length; i++){
    var k = keys[i];
    var name = contactData[k].name;
    var email = contactData[k].email;
    var phone = contactData[k].phone;

  }

}

function errorData(err){
  console.log("Error!")
  console.log(err)
}

// --------------------------
// READ
// --------------------------
function readUserData() {

  const userListUI = document.getElementById("user-list");

  usersRef.on("value", snap => {

    userListUI.innerHTML = ""

    snap.forEach(childSnap => {

      let key = childSnap.key,
        value = childSnap.val()

      let $li = document.createElement("li");

      // edit icon
      let editIconUI = document.createElement("span");
      editIconUI.class = "edit-user";
      editIconUI.innerHTML = " ✎";
      editIconUI.setAttribute("userid", key);
      editIconUI.addEventListener("click", editButtonClicked)

      // delete icon
      let deleteIconUI = document.createElement("span");
      deleteIconUI.class = "delete-user";
      deleteIconUI.innerHTML = " ☓";
      deleteIconUI.setAttribute("userid", key);
      deleteIconUI.addEventListener("click", deleteButtonClicked)

      $li.innerHTML = value.name;
      $li.append(editIconUI);
      $li.append(deleteIconUI);

      $li.setAttribute("user-key", key);
      $li.addEventListener("click", userClicked)
      userListUI.append($li);

    });


  })

}



function userClicked(e) {


  var userID = e.target.getAttribute("user-key");

  const userRef = dbRef.child('users/' + userID);
  const userDetailUI = document.getElementById("user-detail");

  userRef.on("value", snap => {

    userDetailUI.innerHTML = ""

    snap.forEach(childSnap => {
      var $p = document.createElement("p");
      $p.innerHTML = childSnap.key + " - " + childSnap.val();
      userDetailUI.append($p);
    })

  });


}





// --------------------------
// ADD
// --------------------------
$('form').submit(function(event){
event.preventDefault()
    alert('form was submitted!');
    const addUserBtnUI = document.getElementById("add-user-btn");
    addUserBtnClicked();
});

const addUserBtnUI = document.getElementById("add-user-btn");



function addUserBtnClicked() {

  const usersRef = dbRef.child('users');

  const addUserInputsUI = document.getElementsByClassName("user-input");

  // this object will hold the new user information
  let newUser = {};

  // loop through View to get the data for the model
  for (let i = 0, len = addUserInputsUI.length; i < len; i++) {

    let key = addUserInputsUI[i].getAttribute('id');
    let value = addUserInputsUI[i].value;
    newUser[key] = value;
  }

  usersRef.push(newUser)
console.log(newUser);




}


// --------------------------
// DELETE
// --------------------------
function deleteButtonClicked(e) {

  e.stopPropagation();

  var userID = e.target.getAttribute("userid");

  const userRef = dbRef.child('users/' + userID);

  userRef.remove();

}


// --------------------------
// EDIT
// --------------------------
function editButtonClicked(e) {

  document.getElementById('edit-user-module').style.display = "block";

  //set user id to the hidden input field
  document.querySelector(".edit-userid").value = e.target.getAttribute("userid");

  const userRef = dbRef.child('users/' + e.target.getAttribute("userid"));

  // set data to the user field
  const editUserInputsUI = document.querySelectorAll(".edit-user-input");


  userRef.on("value", snap => {

    for (var i = 0, len = editUserInputsUI.length; i < len; i++) {

      var key = editUserInputsUI[i].getAttribute("id");
      editUserInputsUI[i].value = snap.val()[key];
    }

  });




  const saveBtn = document.querySelector("#edit-user-btn");
  saveBtn.addEventListener("click", saveUserBtnClicked)
}


function saveUserBtnClicked(e) {

  const userID = document.querySelector(".edit-userid").value;
  const userRef = dbRef.child('users/' + userID);

  var editedUserObject = {}

  const editUserInputsUI = document.querySelectorAll(".edit-user-input");

  editUserInputsUI.forEach(function(textField) {
    let key = textField.getAttribute("id");
    let value = textField.value;
    editedUserObject[textField.getAttribute("id")] = textField.value
  });



  userRef.update(editedUserObject);

  document.getElementById('edit-user-module').style.display = "none";


}
