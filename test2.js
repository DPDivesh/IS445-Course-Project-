

// Initialize Firebase
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

// Firebase Database Reference and the child
const dbRef = firebase.database().ref();
const usersRef = dbRef.child('users');

myFunction();
	readUserData();
  document.getElementById('edit-user-module').style.display = "none";


function cancelBtn() {
  var x = document.getElementById("myBtn");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function myFunction() {
  var x = document.getElementById("myDIV");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function readUserData() {

	const userListUI = document.getElementById("user-list");

	usersRef.on("value", snap => {

		userListUI.innerHTML = ""

		snap.forEach(childSnap => {

			let key = childSnap.key,
				value = childSnap.val()

			let $li = document.createElement("li");
      $li.className="testClass";

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
				$p.innerHTML = childSnap.key  + " - " +  childSnap.val();
				userDetailUI.append($p);
			})

		});


}





const addUserBtnUI = document.getElementById("add-user-btn");
addUserBtnUI.addEventListener("click", addUserBtnClicked)



function addUserBtnClicked() {

  var x=document.forms["myForm"]["name"].value;
   if(x=="")
   {
     alert("must input info");
    return false;
  }else {
      const usersRef = dbRef.child('users');

    	const addUserInputsUI = document.getElementsByClassName("form-control");

        let newUser = {};


        for (let i = 0, len = addUserInputsUI.length; i < len; i++) {

            let key = addUserInputsUI[i].getAttribute('id');
            let value = addUserInputsUI[i].value;
            newUser[key] = value;
        }

    	usersRef.push(newUser)


       console.log(myPro)

    }




}

function myValidation()
{
  var x=document.forms["myForm"]["name"].value;
   if(x="")
   {
     alert("must input info");
    return false;
   }
   {
      alert("Oops! Validation failed!");
      returnToPreviousPage();
      return false;
   }
   alert("Validations successful!");
   return true;
}

function deleteButtonClicked(e) {

		e.stopPropagation();

		var userID = e.target.getAttribute("userid");

		const userRef = dbRef.child('users/' + userID);

		userRef.remove();

}



function editButtonClicked(e) {

	document.getElementById('edit-user-module').style.display = "block";

	document.querySelector(".edit-userid").value = e.target.getAttribute("userid");

	const userRef = dbRef.child('users/' + e.target.getAttribute("userid"));

	const editUserInputsUI = document.querySelectorAll(".edit-user-input");


	userRef.on("value", snap => {

		for(var i = 0, len = editUserInputsUI.length; i < len; i++) {

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