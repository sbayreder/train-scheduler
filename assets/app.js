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
console.log(firstTimeConverted);

var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);

//frequency get tFrequency from txt box
var tRemainder = diffTime % tFrequency;
console.log(tRemainder);

//minutes away
var tMinutesTillTrain = tFrequency - tRemainder;
$("#minAway").text(tMinutesTillTrain);

//next arrival
var nextTrain = moment().add(tMinutesTillTrain, "minutes");
$("#nextArrival").text( moment(nextTrain).format("hh:mm"));


//train name to html from text box
var input = $("#trainName")

//destination to html from text box


//submit button
$('#button').on('click', function(event){
    event.preventDefault();
});

//from text box
tName = $("#trainName").val().trim();
destination = $("#desti").val().trim();
frequency = $("#freq").val().trim();
nextArrival = $("#nextArrival").val().trim();
minutesAway = $("#minAway").val().trim();

//code for the push
database.ref().push({
   tName: tName,
    destination: destination,
    frequency: frequency,
    nextArrival: nextArrival,
   minutesAway: firebase.database.ServerValue.TIMESTAMP
  });
