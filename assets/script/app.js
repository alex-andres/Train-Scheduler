$(function() {
  
  var config = {
    apiKey: "AIzaSyDMQXaASeJIX5bVbJXFaaI6TI4hEz7ogcw",
    authDomain: "train-scheduler-41b22.firebaseapp.com",
    databaseURL: "https://train-scheduler-41b22.firebaseio.com",
    projectId: "train-scheduler-41b22",
    storageBucket: "",
    messagingSenderId: "919240510064"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#submitButton").on("click",function(event){
    event.preventDefault();

    //Receives user input from form fields
    var trainName = $("#train-name").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrain = $("#start-time").val().trim();
    var frequency = $("#frequency").val().trim();
  
    //stores the value of the input in the newTrain variable
    var newTrain = {
      trainName: trainName,
      destination: destination,
      firstTrain: firstTrain,
      frequency: frequency
    }
    //updates the database to push new information to table    
    database.ref().push(newTrain)
    //clears the form 
    $("#train-name").val("");
    $("#destination").val("");
    $("#start-time").val("");
    $("#frequency").val("");
  });


  

  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().trainName;
  var destination = childSnapshot.val().destination;
  var firstTrain = childSnapshot.val().firstTrain;
  var frequency = childSnapshot.val().frequency;

  // Employee Info
  console.log(trainName);
  console.log(destination);
  console.log(firstTrain);
  console.log(frequency);


  function trainTimer(tFrequency, firstTime){
    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "hh:mm")
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
};

  // Add each train's data into the table
  $("#trainTable").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
  firstTrain + "</td><td>" + frequency + "</td></tr>");
  });

  // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
});