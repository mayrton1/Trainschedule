
$(function (){

  
  var firebaseConfig = {
    apiKey: "AIzaSyCOjeRJLDCsw9Zut6Zp4TxYMnQ4y4BGH8A",
    authDomain: "train-944c6.firebaseapp.com",
    databaseURL: "https://train-944c6.firebaseio.com",
    projectId: "train-944c6",
    storageBucket: "",
    messagingSenderId: "93391220962",
    appId: "1:93391220962:web:36e0eeb936f8c1195c2ebb"
  };

firebase.initializeApp(firebaseConfig);


  var database = firebase.database();
  
  
  
  
  var trainsName = "";
  
  var destination = "";
  
  var freqMin = "";
  
  var firstTrain = "";
  
  var minsAway = "";
  
  

  
  $("#submit-button").on("click", function (e) {
    
    e.preventDefault();
    
     trainsName = $("#trainNameInput").val();
     destination = $("#destinationInput").val();
     freqMin = $("#freqInput").val();
      firstTrain = $("#firstTrainInput").val();
      
      
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
  


 
  database.ref().on("child_added", function(data){
    
    //console.log(data.val());
    
      var tFrequency = data.val().freqMin
      var tFirstTrain = data.val().firstTrain

      
      //var timeArr = tFirstTrain.split(":");
   
      //var tMinutes, tArrival;
      var firstTimeConverted = moment(tFirstTrain, "hh:mm").subtract(1, "years");
    
      //var currentTime = moment();
  
      
      
      var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
     
      var tRemainder = diffTime % tFrequency;
    
      var tMinutesTillTrain = tFrequency - tRemainder;
    
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    
    $("#TrainNames").append(data.val().trainsName + "<hr>")


    $("#destination").append(data.val().destination + "<hr>")
      $("#frequency").append(data.val().freqMin + "<hr>")
      
      
      $("#firstTrain").append(data.val().firstTrain + "<hr>")
      
   
      $("#minsAway").append(tMinutesTillTrain + "<hr>")
      
      $("#arivalTime").append(moment(nextTrain).format("HH:mm") + "<hr>")
  });
    })