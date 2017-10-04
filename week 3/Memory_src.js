/**
 *
 */



function initGame(size) {
	initVars(size);
	vulSpeelveld(size);
  // Verder aanvullen....
    console.log(playField);
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

    $("#opnieuw").click(function(){
        initGame($("#size").val());
        console.log('opnieuw geklikt');
    });

    $('#speelveld td').click(function () {
        $(this).attr('class', 'active');
        var col = $(this).parent().children().index($(this));
        var row = $(this).parent().parent().children().index($(this).parent());
        console.log('row: ' + row + ' column: ' + col);
        if(first && first !== ''){
            second = playField[row][col];
        } else {
            first = playField[row][col];
        }

        if(second){
            console.log('card 1: ' + first + ' card 2: ' + second);
            if(first === second){
                // pair found
                console.log('found a pair');
                $('.active').attr('class', 'found');
                first = '';
                second = '';

            }else if(first !== second){

            }

        }
    });
    
    setInterval(function () {
        clear();
    }, 2000);

    function clear() {
        $('.active').attr('class', 'inactive');
        first = '';
        second = '';
    }

});



