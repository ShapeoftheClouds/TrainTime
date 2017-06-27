  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCfRNl4VGEICZb7FrwN9O6Ch7fazumsbIQ",
    authDomain: "trainsandwinterrains-4c117.firebaseapp.com",
    databaseURL: "https://trainsandwinterrains-4c117.firebaseio.com",
    projectId: "trainsandwinterrains-4c117",
    storageBucket: "",
    messagingSenderId: "46265314640"
  };
  firebase.initializeApp(config);

// Create a variable for the firebase database.
var database = firebase.database();

// Create variables for train information
var trainName = ""; 
var whereWeGo = "";
var trainTime = "";
var frequency = "";

    // Capture Button Click
    $(document).on("click", "#add-train", function(event) {
      // Don't refresh the page!
      event.preventDefault();

      // Store and retrieve recent user data.
      trainName = $("#train-input").val().trim();
      whereWeGo = $("#destination-input").val().trim();
      trainTime = $("#time-input").val().trim();
      frequency = $("#frequency-input").val().trim();

      database.ref().push({
        name: trainName,
        dest: whereWeGo,
        time: trainTime,
        frequ: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });
    });

// Firebase watcher + initial loader HINT: .on("value")
    database.ref().on("child_added", function(childSnapshot) {

      // console.log(childSnapshot.val());
      // console.log(childSnapshot.val().name);
      // console.log(childSnapshot.val().dest);
      // console.log(childSnapshot.val().time);
      // console.log(childSnapshot.val().frequ);


      // Convert Time to show the frequency between trains and the next train's arrival.
      // First Time (pushed back 1 year to make sure it comes before current time)
      var firstTimeConverted = moment(childSnapshot.val().time, "hh:mm").subtract(1, "years"); 
      console.log(firstTimeConverted);
      // Current Time
      var currentTime = moment();
      // Difference between the times
      var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
      // Time apart (remainder)
      var tRemainder = diffTime % childSnapshot.val().frequ;
      // Minutes until train
      var tMinutesTillTrain = childSnapshot.val().frequ - tRemainder;
      // Next Train
      var nextTrain = moment().add(tMinutesTillTrain, "minutes");
      console.log(nextTrain);
      // Next train arrival formatted
      var nextTrainArrival = moment(nextTrain).format("HH:mm");
      console.log(nextTrainArrival);

      // Log everything that's coming out of childSnapshot

      $("table").append('<tr class="panel-heading"><td id="trainName"> ' + childSnapshot.val().name +
        ' </td><td id="destination"> ' + childSnapshot.val().dest +
        ' </td><td id="frequency"> ' + childSnapshot.val().frequ + ' </td><td id="nextArrival"> ' 
        + nextTrainArrival + ' </td><td id="minutesAway"> ' + tMinutesTillTrain +  ' </td></tr> ');
  

    // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });

