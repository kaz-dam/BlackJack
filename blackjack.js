(function(){

var BlackJack = {

	deck: [
		['clubs', '11', 'ace'],
		['clubs', '2', 'two'],
		['clubs', '3', 'three'],
		['clubs', '4', 'four'],
		['clubs', '5', 'five'],
		['clubs', '6', 'six'],
		['clubs', '7', 'seven'],
		['clubs', '8', 'eight'],
		['clubs', '9', 'nine'],
		['clubs', '10', 'ten'],
		['clubs', '10', 'jack'],
		['clubs', '10', 'queen'],
		['clubs', '10', 'king'],
		['diamonds', '11', 'ace'],
		['diamonds', '2', 'two'],
		['diamonds', '3', 'three'],
		['diamonds', '4', 'four'],
		['diamonds', '5', 'five'],
		['diamonds', '6', 'six'],
		['diamonds', '7', 'seven'],
		['diamonds', '8', 'eight'],
		['diamonds', '9', 'nine'],
		['diamonds', '10', 'ten'],
		['diamonds', '10', 'jack'],
		['diamonds', '10', 'queen'],
		['diamonds', '10', 'king'],
		['hearts', '11', 'ace'],
		['hearts', '2', 'two'],
		['hearts', '3', 'three'],
		['hearts', '4', 'four'],
		['hearts', '5', 'five'],
		['hearts', '6', 'six'],
		['hearts', '7', 'seven'],
		['hearts', '8', 'eight'],
		['hearts', '9', 'nine'],
		['hearts', '10', 'ten'],
		['hearts', '10', 'jack'],
		['hearts', '10', 'queen'],
		['hearts', '10', 'king'],
		['spades', '11', 'ace'],
		['spades', '2', 'two'],
		['spades', '3', 'three'],
		['spades', '4', 'four'],
		['spades', '5', 'five'],
		['spades', '6', 'six'],
		['spades', '7', 'seven'],
		['spades', '8', 'eight'],
		['spades', '9', 'nine'],
		['spades', '10', 'ten'],
		['spades', '10', 'jack'],
		['spades', '10', 'queen'],
		['spades', '10', 'king']
	],

	handPlayer1: [],
	handBank: [],
	usedCards: [],
	playerCardPoint: [],
	playerPoint: 0,
	bankCardPoint: [],
	bankPoint: 0,
	actualPot: $('#total_pot'),
	chipPlayer: $('#total1'),
	firstCards: false,
	gameOver: false,

	init: function(chip) {
		this.chip(chip);
		this.events();
	},

	deal: function() {
		for (var i = 0; i < 4; i++) {
			BlackJack.selectCard();
		};
		BlackJack.handBank[BlackJack.handBank.length] = BlackJack.deck[BlackJack.usedCards[0]];
		BlackJack.handPlayer1[BlackJack.handPlayer1.length] = BlackJack.deck[BlackJack.usedCards[1]];
		BlackJack.handBank[BlackJack.handBank.length] = BlackJack.deck[BlackJack.usedCards[2]];
		BlackJack.handPlayer1[BlackJack.handPlayer1.length] = BlackJack.deck[BlackJack.usedCards[3]];
		BlackJack.insertImg('.cards:last', 'card', 'back');
		BlackJack.insertImg('.cards:last', BlackJack.handBank[1][0], BlackJack.handBank[1][2]);
		BlackJack.insertImg('.cards:first', BlackJack.handPlayer1[0][0], BlackJack.handPlayer1[0][2]);
		BlackJack.insertImg('.cards:first', BlackJack.handPlayer1[1][0], BlackJack.handPlayer1[1][2]);
	},

	bet: function() {
		BlackJack.getBet();
		var pot = Number($('#total_pot').html());

		if (!(pot == 0)) {
			BlackJack.deal();
			$('#hit').removeAttr('disabled', 'disabled');
		} else if ( !BlackJack.gameOver ) {
			alert('Please set a pot!');
		}
		BlackJack.countingPlayerCards();
		BlackJack.playerPointTest();
		BlackJack.firstCards = false;
		BlackJack.gameOver = false;
	},

	hit: function() {
		BlackJack.selectCard();
		BlackJack.handPlayer1[BlackJack.handPlayer1.length] = BlackJack.deck[BlackJack.usedCards[BlackJack.usedCards.length - 1]];
		BlackJack.insertImg('.cards:first', BlackJack.handPlayer1[BlackJack.handPlayer1.length - 1][0], BlackJack.handPlayer1[BlackJack.handPlayer1.length - 1][2]);
		BlackJack.countingPlayerCards();
		BlackJack.playerPointTest();
	},

	getBet: function() {
		var betPlayer = $('#bet').val(),
			actualStand = $(BlackJack.chipPlayer).html();
		if ( !(actualStand <= 0) && !(actualStand - betPlayer < 0) ) {
			$(BlackJack.chipPlayer).html(actualStand - betPlayer);
			$(BlackJack.actualPot).html( Number(betPlayer) );
		} else if ( actualStand <= 0 ) {
			BlackJack.gameOver = true;
			$('#player1 .chip button').attr('disabled', 'disabled');
			alert("You don't have more chips! Game over!");
		} else {
			BlackJack.gameOver = true;
			alert('Select smaller bet value!');
		};
	},

	chip: function(option) {
		var defaultChip = '1000';
		if (option) {
			$(BlackJack.chipPlayer).html(option);
		} else {
			$(BlackJack.chipPlayer).html(defaultChip);
		}
	},

	selectCard: function() {
		cardSearch = false;
			do {
				var index = BlackJack.randomNumber();
					if ($.inArray(index, BlackJack.usedCards) == -1) {
						cardSearch = true;
						BlackJack.usedCards[BlackJack.usedCards.length] = index;
					}
			} while (!cardSearch);
	},

	insertImg: function(append, attr1, attr2) {
		
			$(document.createElement('img'))
						.attr({
							'src': 'images/' + attr1 + '-' + attr2 + '.gif',
							'width': '130'
						})
						.fadeIn('slow')
						.appendTo(append);
	},

	countingPlayerCards: function() {
		BlackJack.playerPoint = 0;
		BlackJack.playerCardPoint = [];
		for (var i = 0; i < BlackJack.handPlayer1.length; i++) {
			BlackJack.playerCardPoint[BlackJack.playerCardPoint.length] = Number(BlackJack.handPlayer1[i][1]);
			BlackJack.playerPoint += BlackJack.playerCardPoint[i];
		};
	},

	countingBankCards: function() {
		BlackJack.bankPoint = 0;
		BlackJack.bankCardPoint = [];
		for (var i = 0; i < BlackJack.handBank.length; i++) {
			BlackJack.bankCardPoint[BlackJack.bankCardPoint.length] = Number(BlackJack.handBank[i][1]);
			BlackJack.bankPoint += BlackJack.bankCardPoint[i];
		};
	},

	playerPointTest: function() {
		if ( BlackJack.firstCards ) {
			setTimeout(function(){
				if ( BlackJack.playerPoint == 21 && BlackJack.bankPoint < 21 ) {
					$('#hit').attr('disabled', 'disabled');
					alert('BlackJack!');
					BlackJack.raisingPlayerChip(1.5);
				} else if ( BlackJack.playerPoint > 21 ) {
					BlackJack.resetValues();
					alert('Bust!');
				};
			}, 600);
		} else {
			setTimeout(function(){
				if (BlackJack.playerPoint > 21) {
					$('#hit').attr('disabled', 'disabled');
					alert('Bust!');
					BlackJack.resetValues();
				} else if ( BlackJack.playerPoint == 21 ) {
					$('#hit').attr('disabled', 'disabled');
					alert('BlackJack!');
					BlackJack.raisingPlayerChip(2);
				};
			}, 600);
		};
	},

	comparisonPoints: function() {
		setTimeout(function(){
			if ( BlackJack.playerPoint > BlackJack.bankPoint || BlackJack.bankPoint > 21 ) {
					BlackJack.raisingPlayerChip(2);
				} else if ( BlackJack.playerPoint == BlackJack.bankPoint ) {
					$(BlackJack.actualPot).html('');
					alert('You lose!');
					BlackJack.resetValues();
				} else {
					$(BlackJack.actualPot).html('');
					alert('You lose!');
					BlackJack.resetValues();
				};
		}, 800);
	},

	raisingPlayerChip: function(factor) {
		$(BlackJack.chipPlayer).html( (Number( $(BlackJack.actualPot).html() ) * factor) + Number( $(BlackJack.chipPlayer).html() ) );
		$(BlackJack.actualPot).html('');
		alert('You won!');
	},

	randomNumber: function() {
		var random = Math.floor(Math.random() * 52);
		return random;
	},

	resetValues: function() {
		$('.cards').empty();
		BlackJack.usedCards = [];
		BlackJack.handPlayer1 = [];
		BlackJack.playerCardPoint = [];
		BlackJack.playerPoint = 0;
		BlackJack.handBank = [];
		BlackJack.bankPoint = 0;
		BlackJack.bankCardPoint = [];
		$(BlackJack.actualPot).empty();
		$('#betButton').removeAttr('disabled', 'disabled');
		$('#hit').attr('disabled', 'disabled');
		if ( $('#stand').attr('disabled') == 'disabled' ) {
			$('#stand').removeAttr('disabled', 'disabled');
		}
	},

	events: function() {
		$('#menu ul li:first').on('click', function(){
				$('#new-deal').removeAttr('disabled', 'disabled');
				BlackJack.resetValues();
				BlackJack.chip();
			});

		$('#hit').on('click', function() {
			BlackJack.hit();
		});
			
		$('#betButton').on('click', function(){
			BlackJack.firstCards = true;
			BlackJack.bet();
			if (!Number($('#total_pot').html()) == 0) {
				$('#betButton').attr('disabled', 'disabled');
			}
		});

		$('#stand').on('click', function(){
			$('#hit').attr('disabled', 'disabled');
			$('#stand').attr('disabled', 'disabled');
			$('.cards:last img:first').remove();
			BlackJack.insertImg( '.cards:last', BlackJack.handBank[0][0], BlackJack.handBank[0][2] );
			BlackJack.countingBankCards();
			if ( BlackJack.bankPoint <= 16 ) {
				do {
					BlackJack.selectCard();
					BlackJack.handBank[BlackJack.handBank.length] = BlackJack.deck[BlackJack.usedCards[BlackJack.usedCards.length - 1]];
					BlackJack.countingBankCards();
					BlackJack.insertImg( '.cards:last', BlackJack.handBank[BlackJack.handBank.length - 1][0], BlackJack.handBank[BlackJack.handBank.length - 1][2] );
				} while ( BlackJack.bankPoint <= 17 );
			};
			BlackJack.comparisonPoints();
		});

		$('#new-deal').on('click', function() {
			BlackJack.resetValues();
		});
	}
};
	BlackJack.init(500);
})();