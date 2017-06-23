// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCi4SjAmABzF94lEunAgVtRLubv78UByRg",
    authDomain: "starshipawesome-f4af8.firebaseapp.com",
    databaseURL: "https://starshipawesome-f4af8.firebaseio.com",
    projectId: "starshipawesome-f4af8",
    storageBucket: "starshipawesome-f4af8.appspot.com",
    messagingSenderId: "899885022111"
  };
  // Initializing the firebase database
  firebase.initializeApp(config);

// Create a variable for the firebase database.
var database = firebase.database();

// Create variables for train information
var trainName = ""; 
var destination = "";
var trainTime = "";
var frequency = "";
    // Capture Button Click
    $("#add-train").on("click", function(event) {
      // Don't refresh the page!
      event.preventDefault();

      // Store and retrieve recent user data.
      trainName = $("#train-input").val().trim();
      destination = $("#destination-input").val().trim();
      trainTime = $("#time-input").val().trim();
      frequency = $("#frequency-input").val().trim();

      database.ref().set({
        name: trainName,
        dest: destination,
        time: trainTime,
        frequ: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });
    });

    // Firebase watcher + initial loader HINT: .on("value")
    database.ref().on("value", function(snapshot) {

      // Log everything that's coming out of childSnapshot
      console.log(snapshot.val());
      // console.log(snapshot.val().trainName);
      // console.log(snapshot.val().destination);
      // console.log(snapshot.val().trainTime);
      // console.log(snapshot.val().frequency);

      // $("#fullTrainInfo").append('<tr><th id="trainName"> ' + childSnapshot.val().trainName +
      //   ' </th><th id="destination"> ' + childSnapshot.val().destination +
      //   ' </th<th id="trainTime"> ' + childSnapshot.val().trainTime +
      //   ' </th><th="frequency"> ' + childSnapshot.val().frequency + " </th></tr>");
    

    // Handle the errors
    });//, function(errorObject) {
    //   console.log("Errors handled: " + errorObject.code);
    // });

    // database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(childSnapshot) {
    //   // Change the HTML to reflect
    //   $("#trainName").html(childSnapshot.val().trainName);
    //   $("#destination").html(childSnapshot.val().destination);
    //   $("#trainTime").html(childSnapshot.val().trainTime);
    //   $("#frequency").html(childSnapshot.val().frequency);
    // });