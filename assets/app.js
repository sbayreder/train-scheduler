var firebaseConfig = {
    apiKey: "AIzaSyDoYv41l2_igtXyXIvU0mjnGAeTujyfP7I",
    authDomain: "train-scheduler-75913.firebaseapp.com",
    databaseURL: "https://train-scheduler-75913.firebaseio.com",
    projectId: "train-scheduler-75913",
    storageBucket: "train-scheduler-75913.appspot.com",
    messagingSenderId: "438656784420",
    appId: "1:438656784420:web:0f10a32dbeb62ac91520b1",
    measurementId: "G-VMK35J85NK"
};
firebase.initializeApp(firebaseConfig);

var database = firebase.database();



var tFrequency = 3;

// needs to be altered from text box
var firstTime = "03:00";

var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");


var currentTime = moment();


var diffTime = moment().diff(moment(firstTimeConverted), "minutes");


//frequency get tFrequency from txt box
var tRemainder = diffTime % tFrequency;


//minutes away
var tMinutesTillTrain = tFrequency - tRemainder;
$("#minAway").text(tMinutesTillTrain);

//next arrival
var nextTrain = moment().add(tMinutesTillTrain, "minutes");
$("#nextArrival").text( moment(nextTrain).format("hh:mm"));


//train name to html from text box
var input = $("#trainName")




//submit button
$('#button').on('click', function(event){
    event.preventDefault();


//from text box
tName = $("#tBar").val().trim();
destination = $("#dBar").val().trim();
tFrequency = $("#fBar").val().trim();
nextArrival = $("#ftBar").val().trim();
minutesAway = $("#minAway").val().trim();

//code for the push
database.ref().push({
   tName: tName,
    destination: destination,
    tFrequency: tFrequency,
    nextArrival: nextArrival,

    //fix this
   minutesAway: firebase.database.ServerValue.TIMESTAMP
  });

  database.ref().on("value", function(snapshot) {
    
    var sv = snapshot.val();

    
   
    // Change the HTML to reflect
    $("#trainName").text(tName);
    $("#desti").text(destination);
    $("#freq").text(tFrequency);
    $("#nextArrival").text(nextArrival);

    // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });
});