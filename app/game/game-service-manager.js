app.service('GameManager', function(CharactersService){
	
	var _computerChoice;
	var _game = {
		characters: CharactersService.getCharacters(),
		propertyList: CharactersService.getPropertyList(),
	};
	
	this.newGame = function(){
		setRandomChoice();
		reset();
		return _game;
	}
	
	this.checkGuess = function (character) {
		if(gameOver()){ return }
		if(character === _computerChoice){
			_game.victory = true;
		}else{
			character.possible = false;
		}
		_game.guesses++;
	}
	
	this.checkProperty = function(prop){
		if(gameOver()){ return }
		if(_game.traitsCost >= 10 - _game.guesses){
			_game.message = "Sorry you don't have enough points for that."
			return
		}
		_game.traitsCost += 1; 
		var hasProp = false;
		var found = false;
		prop.used = true;
		_computerChoice.traits.forEach(function(trait){
			if(trait === prop.name){
				hasProp = true;
			}
		})
		_game.characters.forEach(function(character) {
			found = false;
			character.traits.forEach(function(trait) {
				if(trait === prop.name){
					found = true;
				}
			});
			if(hasProp && !found || !hasProp && found){
				character.possible = false;
			}
		});
		_game.guesses += _game.traitsCost;
	}
	
	function reset(){
		_game.guesses = 0;
		_game.victory = false;
		_game.gameOver = false;
		_game.traitsCost = 2;
		_game.message = '';
		_game.computerChoice = '';
		_game.characters.forEach(function(character){
			character.possible = true;
		});
		for(var prop in _game.propertyList){
			_game.propertyList[prop].used = false;
		}
	}
	
	function gameOver() {
		if(_game.guesses > 9){
			_game.gameOver = true;
			_game.message = 'HAHAHA the computer Wins';
			return true;
		}
		if(_game.victory){
			_game.computerChoice = _computerChoice;
			_game.message = 'Bummer you have beaten the computer.';
			return true;
		}
	}
	
	function setRandomChoice(){
		var randI = Math.floor(Math.random() * _game.characters.length - 1);
		_computerChoice = _game.characters[randI];
	}
	
})