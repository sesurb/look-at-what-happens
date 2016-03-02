app.service('GameManager', function(CharactersService){
	
	var _computerChoice;
	var _game = {
		characters: CharactersService.getCharacters(),
		propertyList: CharactersService.getPropertyList(),
	};
	
	this.newGame = function(){
		_game.guesses = 0;
		_game.victory = false;
		resetCharacters()
		return _game;
	}
	
	this.checkGuess = function (character) {
		if(gameOver()){ return }
		if(character === _computerChoice){
			_game.victory = true;
		}
	}
	
	this.checkProperty = function(prop){
		_game.characters.forEach(function(character) {
		var found = false;
			character.traits.forEach(function(trait) {
				if(trait === prop){
					found = true;
				}
			});
			if(!found){
				character.possible = false;
			}
		});
	}
	
	function resetCharacters(){
		_game.characters.forEach(function(character){
			character.possible = true;
		});
	}
	
	function gameOver() {
		if(_game.guesses > 9){
			return true;
		}
	}
	
	
})