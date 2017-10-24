/**
 *
 */

var gameSize = 2;

function initGame(size) {
  console.log('init game');
  initVars(size);
  vulSpeelveld();
}

function initVars(size){
  // vul de variabelen
  gameSize = size;
  amountOfPossiblePairs = (gameSize * gameSize)/ 2;
  console.log('gameSize: ' + gameSize);
}

function vulSpeelveld(){
  playField = Create2DArray(gameSize);
  $('#speelveld').empty();
  var html = '';

  getLetter = new nextLetter(gameSize);
  for(var i = 0; i < gameSize; i ++){
      html += "<tr>";
    for(var j = 0; j < gameSize; j ++){
      var letter = getLetter();
      html += "<td class='inactive'>" + $('#character').val() + "</td>";
      playField[i][j] = letter;
    }
      html += "</tr>";
  }
  $('#speelveld').first().append(html);
  console.log(playField);
}

// TODO rest van de functionaliteit.

// nextLetter wordt gebruikt om één voor één de te gebruiken letters voor de cellen op te halen
var nextLetter = function(gameSize){
  var letterArray = "AABBCCDDEEFFGGHHIIJJKKLLMMNNOOPPQQRRSSTTUUVVWWXXYYZZ".substring(0,gameSize*gameSize).split('');
  var idx=0;
  letterArray=shuffle(letterArray);
  return function() {
    var letter = letterArray[idx++];
    return letter;
  }
}

// de functie setColor verandert de kleur van de kaarten (functionaliteit is nog incompleet)
function setColor(stylesheetId) {
  var valueLocation = '#value'+stylesheetId.substring(3);
  console.log(valueLocation);
  var color = $(valueLocation).val();
  $(stylesheetId).css('background-color', '#'+color );
  }

// knuth array shuffle
// from https://bost.ocks.org/mike/shuffle/
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function Create2DArray(rows) {
  var arr = [];

  for (var i=0;i<rows;i++) {
    arr[i] = [];
  }

  return arr;
}


$(document).ready(function(){

  var firstElement = ''
  var secondElement = '';
  var cardPair = [];
  var turnEnded = false;
  var timer = new Timer(clear, $('#looptijd').val() * 1000);
  var globalTimer = $("#tijd");
  var totalTime = 0;
  var currentAmount0fPairs = 0;
  var gameWon = false;
  var winTime = '';
  timer.stop();

  //TODO this part should be called after a game is finished
  $("#submit").click(function(){
    //event.preventDefault();
    var userName = $("#username").val();
    $.ajax({
      url: "/submitScore",
      type: 'POST',
      data: {name: userName, score: winTime},

      succes: function(data){
        aler('succes');

      }

    });
  });

  //restart game
  $("#opnieuw").click(function(){
    initGame(gameSize);
    currentAmount0fPairs = 0;
    $("#scoreSubmitForm").css("display", "none");
    console.log('opnieuw geklikt');
    totalTime = 0;
    globalTimer.text(totalTime);
  });

  //set game size
  $("#size").click(function(){
    gameSize = $(this).val();
    console.log('new gameSize: ' + gameSize);
  });

  //When the player clicks a card, this function will return the row and column
  //of the card which is clicked on.
  $('#speelveld').on('click', 'td', function () {
    if(turnEnded){
      turnEnded = false;
      clear();
    }

    //TODO make sure the rebind click somewhere.
    //$(this).unbind('click');
    var col = $(this).parent().children().index($(this));
    var row = $(this).parent().parent().children().index($(this).parent());

    //make sure the cardpair array can not contain more than 2 cards

    if(cardPair.length < 2){
      if($(this).attr('class') !== 'found'){
        $(this).attr('class', 'active');

        if(firstElement != ''){
          secondElement = $(this);
        } else {
          firstElement = $(this);
        }

        //get letter and turn card with corresponding letter
        var card = getClickedLetter(row, col);
        $(this).html(card);

        //push card onto compare array for comparing
        cardPair.push(card);
      }
    }

    //compare cards if cardpair array has size 2
    if(cardPair.length == 2){
      //start toontijd
      timer.start();

      console.log(cardPair);
      compareCards(firstElement, secondElement);
    }


  });

  function compareCards(first, second){
    if(cardPair[0] === cardPair[1]){
      console.log('we found a pair!');
      currentAmount0fPairs++;

      //increase pair count in view
      $('#gevonden').html(currentAmount0fPairs);

      //make cards class 'found'
      first.attr('class', 'found');
      second.attr('class', 'found');

      //check if player won game
      if(currentAmount0fPairs == amountOfPossiblePairs ){
        $("#scoreSubmitForm").show();
        alert('you won!!!');
        gameWon = true;
      }

      //reset timer
      timer.stop();
    } else {
      console.log('sorry, no pair found');
      //turn is over
      turnEnded = true;
      //wait till toontijd is voorbij

    }

    firstElement = '';
    secondElement = '';
    //empty compare array
    cardPair = [];

  }

  //this function returns the letters hided behind the card depending on the row and column.
  function getClickedLetter(row, col){
    var letter = playField[row][col];
    return letter;
  }

  //set all card that haven't been found to inactive after turn is over
  function clear() {
    for(var i = 0; i < playField.length; i++){
      for(var j = 0; j < playField.length; j++){
        var card = playField[i][j];
        var domElement = $('#speelveld tr').eq(i).find('td').eq(j)
        if(card !== $('#character').val() && domElement.attr('class') !== 'found'){
          domElement.attr('class', 'inactive');
          domElement.html($('#character').val());
        }
      }
    }
    timer.stop();
  }

  $('#looptijd').change(function () {
    $('#looptijd_value').html($(this).val());
    timer.reset($(this).val() * 1000);
  })

  function Timer(fn, time) {
    var timerObject = setInterval(fn, time);

    this.stop = function() {
      if (timerObject) {
        clearInterval(timerObject);
        timerObject = null;
      }
      return this;
    }

    // start timer using current settings (if it's not already running)
    this.start = function() {
      if (!timerObject) {
        this.stop();
        timerObject = setInterval(fn, time);
      }
      return this;
    }

    // start with new interval, stop current interval
    this.reset = function(newTime) {
      time = newTime;
      return this.stop().start();
    }
  }

  setInterval(function(){
    if(!gameWon){
      ++totalTime;
      globalTimer.text(totalTime);
    } else {
      winTime = globalTimer.text()
      gameWon = false;
    }

  }, 1000);

  function updateProgress(percentage) {
    $('#pbar_innerdiv').css("width", percentage + "%");
    $('#pbar_innertext').text(percentage + "%");
  }


});



