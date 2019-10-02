
$(function (){

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCOjeRJLDCsw9Zut6Zp4TxYMnQ4y4BGH8A",
    authDomain: "train-944c6.firebaseapp.com",
    databaseURL: "https://train-944c6.firebaseio.com",
    projectId: "train-944c6",
    storageBucket: "",
    messagingSenderId: "93391220962",
    appId: "1:93391220962:web:36e0eeb936f8c1195c2ebb"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);


  var database = firebase.database();
  
  
  
  
  var trainsName = "";
  
  var destination = "";
  
  var freqMin = "";
  
  var firstTrain = "";
  
  var minsAway = "";
  
  

  //OnClick submit button
  $("#submit-button").on("click", function (e) {
    //Prevent repeats
    e.preventDefault();
    
     trainsName = $("#trainNameInput").val();
     destination = $("#destinationInput").val();
     freqMin = $("#freqInput").val();
      firstTrain = $("#firstTrainInput").val();
      
      //push it all to the database
      database.ref().push({
        trainsName: trainsName,
          destination: destination,
          freqMin: freqMin,
          firstTrain: firstTrain
        });
        $("#trainNameInput").val("");
        $("#destinationInput").val("");
     $("#freqInput").val("");
     $("#firstTrainInput").val("");
  });
  


  //function runs on new child added
  database.ref().on("child_added", function(data){
    //make sure it works
    console.log(data.val());
    
      var tFrequency = data.val().freqMin
      var tFirstTrain = data.val().firstTrain

      
      var timeArr = tFirstTrain.split(":");
   
      var tMinutes, tArrival;
      var firstTimeConverted = moment(tFirstTrain, "hh:mm").subtract(1, "years");
    
      var currentTime = moment();
  
      
      // Difference between the times
      var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
      //  console.log("DIFFERENCE IN TIME: " + diffTime);
      var tRemainder = diffTime % tFrequency;
      //  console.log(tRemainder,  "this is t remainder");
      var tMinutesTillTrain = tFrequency - tRemainder;
    //  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    //  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
    $("#TrainNames").append(data.val().trainsName + "<hr>")

    //get the val of destination and append it to the destination
    $("#destination").append(data.val().destination + "<hr>")
      $("#frequency").append(data.val().freqMin + "<hr>")
      
      //get the val of nextArrival and append it to the NextArrival
      $("#firstTrain").append(data.val().firstTrain + "<hr>")
      
      //get the val of minsaway and append it to The minsAway
      $("#minsAway").append(tMinutesTillTrain + "<hr>")
      //
      $("#arivalTime").append(moment(nextTrain).format("hh:mm") + "<hr>")
  });
    })