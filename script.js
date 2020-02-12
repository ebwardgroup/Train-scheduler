$( document ).ready(function() {


// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBBUWxeIp5OuljzRzFNab8d8fq5Zfogb84",
    authDomain: "hw7-train-tracker-a813d.firebaseapp.com",
    databaseURL: "https://hw7-train-tracker-a813d.firebaseio.com",
    projectId: "hw7-train-tracker-a813d",
    storageBucket: "hw7-train-tracker-a813d.appspot.com",
    messagingSenderId: "124085603186",
    appId: "1:124085603186:web:69f29bae2dab8be62febeb",
    measurementId: "G-K1PYBVCMTK"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var dataRef = firebase.database();

//on submit save values the user entered//
var name = "";
var dest = "";
var firstTime = 0;
var freq = "";
    //upload values to firebase//

// Capture Button Click
$("#trainInfoBtn").on("click", function(event) {
    event.preventDefault();

    // YOUR TASK!!!
    // Code in the logic for storing and retrieving the most recent user.
    // Don't forget to provide initial data to your Firebase database.
    name = $("#name-input").val().trim();

    dest = $("#dest-input").val().trim();

    firstTime = moment($("#firstTime-input").val().trim(),"hh:mm").
    subtract(1, "hours").format("X");

    freq = $("#freq-input").val().trim();

    	//current time 
	var currentTime = moment();
    console.log("CURRENT TIME: " +  moment(currentTime).format("hh:mm"));
    

    // Code for the push
    dataRef.ref().push({

      name: name,  // json name of key then : data from 128-131 above//
      dest: dest,
      firstTime: firstTime,
      freq: freq,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
  });    

  // Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
  dataRef.ref().on("child_added", function(childSnapshot) {

    // Log everything that's coming out of snapshot
    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().dest);
    console.log(childSnapshot.val().firstTime);
    console.log(childSnapshot.val().freq);


    // full list of items...chg div to table like tr//
    $("#addTrain").append("<div class='form-control'><span class='name'> " +
      childSnapshot.val().name +
      " </span><span class='dest'> " + childSnapshot.val().dest +
      " </span><span class='firstTime'> " + childSnapshot.val().firstTime +
      " </span><span class='freq'> " + childSnapshot.val().freq +
      " </span></div>");

    // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
  // Change the HTML to reflect
  $("#name-display").text(snapshot.val().name);
  $("#dest-display").text(snapshot.val().dest);
  $("#firstTime-display").text(snapshot.val().firstTime);
  $("#freq-display").text(snapshot.val().freq);
});
}

