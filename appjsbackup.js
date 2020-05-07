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

//get DOM elements
console.log("test")

const submitButton = docuement.getElementById('submit');

let userName = document.querySelector('#userFName');
let userEmail = document.querySelector('#userEmail');
let userPhone = document.querySelector('#userPNumber');

const db = firestore.collection("contactData");

submitButton.addEventListener('click', function() {
  let userNameInput = userFName.value
  let userEmailInput = userEmail.value
  let userPNumberInput = userPNumber.value
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
});
