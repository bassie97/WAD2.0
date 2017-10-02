/**
 *
 */

function initGame(size) {
	initVars(size);
	vulSpeelveld(size);
  // Verder aanvullen....
}

function initVars(size){
  // vul de variabelen
}

function vulSpeelveld(size){
	getLetter = new nextLetter(size);
  // Hier moet de code om het speelveld te vullen met de cellen
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

$(document).ready(function(){
    $("#opnieuw").click(function(){
        initGame($("#size").val());
    });
});
