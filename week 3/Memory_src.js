/**
 *
 */


function initGame(size) {
	initVars(size);
	vulSpeelveld(size);

}

function initVars(size){
  // vul de variabelen
}

function vulSpeelveld(size){
    playField = Create2DArray(size);
    $('#speelveld').empty();
    var html = '';

	getLetter = new nextLetter(size);
	for(var i = 0; i < size; i ++){
        html += "<tr>";
	    for(var j = 0; j < size; j ++){
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
var nextLetter = function(size){
	var letterArray = "AABBCCDDEEFFGGHHIIJJKKLLMMNNOOPPQQRRSSTTUUVVWWXXYYZZ".substring(0,size*size).split('');
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

    var first = ''
    var second = '';
    var turnEnded = false;
    var timer = new Timer(clear, $('#looptijd').val() * 1000);
    var globalTimer = $("#tijd");
    var totalTime = 0;
    timer.stop();

    $("#opnieuw").click(function(){
        initGame($("#size").val());
        console.log('opnieuw geklikt');
        totalTime = 0;
        globalTimer.text(totalTime);
    });

    //When the player clicks a card, this function will return the row and column
    //of the card which is clicked on.
    $('#speelveld td').click(function () {
        event.preventDefault();
        console.log('clicked');
        $(this).attr('class', 'active');

        //TODO make sure the rebind click somewhere.
        //$(this).unbind('click');
        var col = $(this).parent().children().index($(this));
        var row = $(this).parent().parent().children().index($(this).parent());
        console.log('row: ' + row + ' column: ' + col);
        getClickedLetter(row, col, this);
    });

    //this function returns the letters hided behind the card depending on the row and column.
    function getClickedLetter(row, col, clickedElement){

            if (first && first !== '') {
                second = playField[row][col];
                $(clickedElement).html(second);
            } else {
                first = playField[row][col];
                $(clickedElement).html(first);
            }

            if (second && !turnEnded) {

                timer.start();
                console.log('timer has started running!');
                console.log('card 1: ' + first + ' card 2: ' + second);
                if (first === second) {
                    console.log('found a pair');
                    $('.active').attr('class', 'found');
                    first = '';
                    second = '';
                    timer.stop();
                } else if (first !== second) {
                    console.log('both cards didn\'t match, starting new turn.');
                    timer.start();
                }
                turnEnded = true;

            }else if(turnEnded){
                clear();
                turnEnded = false;
            }
    }

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
        first = '';
        second = '';
        timer.stop();
    }

    $('#looptijd').change(function () {
        $('#looptijd_value').html($(this).val());
        timer.reset($(this).val() * 1000);
    })

    //

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
        ++totalTime;
        globalTimer.text(totalTime);
    }, 1000);
});



