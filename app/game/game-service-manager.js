app.service('GameManager', function(CharactersService) {

    var _computerChoice;
    var _game = {
        characters: CharactersService.getCharacters(),
        propertyList: CharactersService.getPropertyList(),
    };

    this.newGame = function() {
        setRandomChoice();
        reset();
        return _game;
    }

    this.checkGuess = function(character) {
        //THIS ALLOWS YOU TO CHECK EACH CHARACTER INDIVIDUALLY
        //NO MODIFICATION NEEDED HERE
        if (gameOver()) { return }
        if (character === _computerChoice) {
            _game.victory = true;
            gameOver();
        } else {
            character.possible = false;
        }
        _game.guesses++;
    }

    this.checkProperty = function(prop) {
        if (gameOver()) { return }

        /**  CAN GUESS
         * Check if the traitCost is greater than remaning guesses
         * totalGuesses = 10; guesses starts at 0 and should be for each guess
         * the traitCost starts at 2 and goes up by one for each propertyCheck
         * Dont forget to add the traitCost to the _game.guesses
         * setting _game.message will provide the user with feedback
         */

        if (_game.traitsCost > 10 - _game.guesses) {
            _game.message = "NO!";
            return;
        }
        _game.guesses += _game.traitsCost;
        _game.traitsCost++;
        /**  _COMPUTERCHOICE has TRAIT
         * _computerChocie.traits === [String, String]
         * check if _computerChoice.traits has the selected prop.name if so set hasProp = true;
         * also set prop.used = true to disable the same trait check
         */
        var hasProp = false;

        _computerChoice.traits.forEach(function(trait) {
            if (trait === prop.name) {
                hasProp = true;
            }
            prop.used = true;
        })



        /** EACH CHARACTER HAS TRAIT
         * now check each _game.characters individually
         * if the character.traits has prop.name set 
         * found = true
         * after checking the traits
         *  
         * if hasProp && !found 
         * character.possible = false
         * 
         * What else would cause a character.possible to === false?
         * 
         */

        _game.characters.forEach(function(character) {
            var found = false;
            character.traits.forEach(function(trait) {
                if (trait === prop.name) {
                    found = true;
                }
            })
            if (hasProp && !found || !hasProp && found) {
                // character.possible = hasProp === found;
                character.possible = false;
            }
        });
    }

    function reset() {
        /**
         * Reset all of the values on _game
         * each character on _game.characters should set to 
         * character.possible = true
         * all of the traits in  _game.propertyList <--- its an {}
         * should be set to 
         * _game.propertyList[trait].used = false
         */
        for (var i = 0; i < _game.characters.length; i++) {
            _game.characters[i].possible = true;
        }
        for (var trait in _game.propertyList) {
            _game.propertyList[trait].used = false;
        }
        _game.guesses = 0;
        _game.traitsCost = 2;
        _game.message = "";
        _game.victory = false;
        _game._computerChoice = "";
    }

    function gameOver() {
		/**
         * make sure the guesses are less than 10 
         * return true if the game should be over
         * if the game.victory 
         * set _game.computerChoice = _computerChoice
         * return true
         */
        if (!_game.victory && _game.guesses < 10) {
            return false;
        } else {
            _game._computerChoice = _computerChoice
            return true;
        }
    }

    function setRandomChoice() {
        /**
         * This function should get a random index between 0 - _game.characters.length
         * then set _computerChoice to the object at the randI index
         */
        var randI = Math.floor(Math.random() * _game.characters.length)
        _computerChoice = _game.characters[randI];


    }

})