/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

//Global scope variables, functions
var scores, roundScore, activePlayer, gamePlaying, doublesix, target;

init();

//Updates the ROUND score on the page
//#current-0 represents the score of player 0
//.textContent alters the text
//.innerHTML would alter the HTML code, but the input would have to be in the form of a string:
// ...activePlayer).innerHTML = '<em>' + dice + '</em>';
//The above example would print dice, but italicized
//document.querySelector('#current-' + activePlayer).textContent = dice;

document.querySelector('.dice').style.display = 'none';
document.querySelector('.dice-1').style.display = 'none';
document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';

document.querySelector('.btn-roll').addEventListener('click', function(){
    
    if(gamePlaying){
        //1. Random number
        dice = [Math.floor(Math.random()*6)+1 , Math.floor(Math.random()*6)+1];

        //2. Display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice[0] + '.png'
        
        var diceDOM1 = document.querySelector('.dice-1');
        diceDOM1.style.display = 'block';
        diceDOM1.src = 'dice-' + dice[1] + '.png'

        //3. Update the round score if the rolled number was not a 1
        if (dice[0] !== 1 && dice[1] !== 1) {
            switch (true) {
                //double 6 rolled    
                case (dice[0] == 6 && dice[1] == 6):
                    document.querySelector('#score-' + activePlayer).textContent = 0;
                    doublesix = 0;
                    scores[activePlayer] = 0;
                    nextPlayer();
                    break;
                //2 eventual sixes are rolled
                case ((dice[0] == 6 || dice[1] == 6) && doublesix == 1):
                    document.querySelector('#score-' + activePlayer).textContent = 0;
                    doublesix = 0;
                    scores[activePlayer] = 0;
                    nextPlayer();
                    break;
                //the first six is rolled    
                case ((dice[0] == 6 || dice[1] == 6) && doublesix == 0):
                    //score, doublesix = 1
                    roundScore += dice[0] + dice[1];
                    document.querySelector('#current-' + activePlayer).textContent = roundScore;
                    doublesix ++;
                    break;
                //no sixes are rolled    
                default:
                    //Add score
                    roundScore += dice[0] + dice[1];
                    document.querySelector('#current-' + activePlayer).textContent = roundScore;
            };
        } else {
            nextPlayer(); 
        }
    }
    
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    
    if(gamePlaying){
        
        //Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;

        //Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        

        //Check if the player won the game
        if (scores[activePlayer] >= target) {
            //they won
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.dice-1').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
});

document.querySelector('.btn-tgt').addEventListener('click', function(){
    target = document.getElementById('tgt').value;
});

function nextPlayer() {
            //Next player
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        
        doublesix = 0;
    
        //set the round scores to 0
        roundScore = 0;
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';
        
        //Moves the active player icon
        //document.querySelector('.player-0-panel').classList.remove('active');
        //document.querySelector('.player-1-panel').classList.add('active');
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.dice-1').style.display = 'none';
};


document.querySelector('.btn-new').addEventListener('click', init);

function init(){
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    doublesix = 0;
    target = 20;
    gamePlaying = true;
    document.getElementById('tgt').value = 20;
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice-1').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}


/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/




