app.controller('GameController', function($scope, GameManager){
	
	$scope.startGame = function(){
		$scope.game = GameManager.newGame();
	}
	
	$scope.guess = function(character){
		GameManager.checkGuess(character);
	}
	
	$scope.propertyCheck = function(property){
		GameManager.checkProperty(property);
	}
	
	$scope.reset = function (){
		GameManager.reset();
	}
})