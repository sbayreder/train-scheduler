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








//submit button
$('#button').on('click', function(event){
    event.preventDefault();

    var tFrequency = $("#fBar").val().trim(); 

// needs to be altered from text box
var  nextArrival = $("#ftBar").val().trim();

var firstTimeConverted = moment(nextArrival, "HH:mm");





var diffTime = moment().diff(moment(firstTimeConverted), "minutes");


//frequency get tFrequency from txt box
var tRemainder = diffTime % tFrequency;


//minutes away
var minutesAway = tFrequency - tRemainder;





//from text box
var tName = $("#tBar").val().trim();
var destination = $("#dBar").val().trim();



//code for the push
database.ref().push({
   tName: tName,
    destination: destination,
    tFrequency: tFrequency,
    nextArrival: nextArrival,

    
   minutesAway: minutesAway
  });
});
  database.ref().on("value", function(snapshot) {
   //check anytime an entry goes to firebase. (timer every min (for miutesAway)) 
    
    snapshot.forEach((train) => {

      var tableRow = $('<tr></tr>');
      
         
        
      var sv = train.val();
      $("<td></td>").text(sv.tName).appendTo(tableRow);
      $("<td></td>").text(sv.destination).appendTo(tableRow);
      $("<td></td>").text(sv.tFrequency).appendTo(tableRow);
      $("<td></td>").text(sv.nextArrival).appendTo(tableRow);
      $("<td></td>").text(sv.minutesAway).appendTo(tableRow); 

      $('tbody').append(tableRow);
      
      
    });

    
   
    // Change the HTML to reflect
    

    // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });
