console.log("is it getting read")

var firebaseConfig = {
  apiKey: "AIzaSyB1ZbKz_5jUtKaJtga8QzwmS0geABoqIeA",
  authDomain: "is445-course-project-2d084.firebaseapp.com",
  databaseURL: "https://is445-course-project-2d084.firebaseio.com",
  projectId: "is445-course-project-2d084",
  storageBucket: "is445-course-project-2d084.appspot.com",
  messagingSenderId: "123316226579",
  appId: "1:123316226579:web:10940c95a97bc347b98de6",
  measurementId: "G-KH22XVDB7M"
};

//initialize firebase
firebase.initializeApp(firebaseConfig);

//firestorage
var firestore = firebase.firestore();
var database = firebase.database();
var ref = database.ref('contactData');
ref.on ('value', getData, errorData);
var contactData
//get DOM elements

console.log("test")

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
    document.createElement("contacts").innerHTML = ( name + ': ' + " " + email+"," + phone );
    var li = createElement('li',name + ': ' + " " + email+"," + phone );
    li.parent('contacts')
  }

}

function errorData(err){
  console.log("Error!")
  console.log(err)
}
