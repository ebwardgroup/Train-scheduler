$(document).ready(function () {
  // initialize firebase
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBBUWxeIp5OuljzRzFNab8d8fq5Zfogb84",
    authDomain: "hw7-train-tracker-a813d.firebaseapp.com",
    databaseURL: "https://hw7-train-tracker-a813d.firebaseio.com",
    // projectId: "hw7-train-tracker-a813d",
    // storageBucket: "hw7-train-tracker-a813d.appspot.com",
    // messagingSenderId: "124085603186",
    // appId: "1:124085603186:web:69f29bae2dab8be62febeb",
    // measurementId: "G-K1PYBVCMTK"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  var database = firebase.database();

  $("#addTrainInfoBtn").on("click", function (event) {
    event.preventDefault();

    var trainName = $("#name").val().trim();
    console.log(name);

    var destination = $("#dest").val().trim();
    console.log(dest);

    var firstTime = moment($("#firstTime").val().trim(), "hh:mm").subtract(1, "years").format("X");

    var frequency = $("#freq").val().trim();

    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    var newTrain = {
      trainName: trainName,
      destination: destination,
      firstTime: firstTime,
      frequency: frequency
    };
    database.ref().push(newTrain);
console.log(newTrain.trainName);


    alert("New train successfully added");

    $("#name").val("");
    $("#dest").val("");
    $("#firstTime").val("");
    $("#freq").val("");
  });

  database.ref().on("child_added", function(childSnapshot) {

    console.log(childSnapshot.val());
    //store in variables
    var trainName = childSnapshot.val().trainName;
    var destination = childSnapshot.val().destination;
    var firstTime = childSnapshot.val().firstTime;
    var frequency = childSnapshot.val().frequency;

    var trainTime = moment.unix(firstTime).format("hh:mm");

    var difference = moment().diff(moment(trainTime), "minutes");

    var trainRemain = difference % frequency;

    //minutes until arrival
    var minAway = frequency - trainRemain;

    //next arrival time
    var nextArrival = moment().add(minUntil, "minutes").format('hh:mm');

    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName,
      $("<td>").text(destination),
      $("<td>").text(frequency),
      $("<td>").text(nextArrival),
      $("<td>").text(minAway)
    ));

    // Append the new row to the table
    $("#trainTable > tbody").append(newRow);
  });


  // //adding info to DOM table 
  // $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextArrival + "</td><td>" + minUntil + "</td></tr>");

});

