const inputs = document.querySelector(".inputs"),
resetBtn = document.querySelector(".reset-btn"),
hint = document.querySelector(".hint span"),
guessLeft = document.querySelector(".guess-left span"),
wrongLetter = document.querySelector(".wrong-letter span"),
typingInput = document.querySelector(".typing-input");

let word, maxguesses, corrects = [], incorrects = [];

function randomWord (){
    let ranObj = wordList[Math.floor(Math.random () * wordList.length)];
     word = ranObj.word;
     maxguesses = 8; corrects = []; incorrects = [];

    hint.innerText = ranObj.hint;
    guessLeft.innerText = maxguesses;
    wrongLetter.innerText = incorrects;
console.log(word);
    let html = "";
    for(
        i = 0 ; i < word.length; i++){
            html += ` <input type="text"  disabled>`;
        }
        inputs.innerHTML = html;
    
}
randomWord();

function initGame (e){
    let key = e.target.value;
    if(key.match(/^[A-Za-z]+$/) && !incorrects.includes(` ${key}`)
        && !corrects.includes(key)){
        if(word.includes(key)){
           for( i = 0; i < word.length; i++){
            if(word[i] === key){
                corrects.push(key);
                inputs.querySelectorAll("input")[i].value = key
            }
           }
            
        }
        else{
          maxguesses --;
            incorrects.push(` ${key}`);
            
        }
        guessLeft.innerText = maxguesses;
        wrongLetter.innerText = incorrects;
    }

    typingInput.value = "";
   setTimeout( ()=> {
    if(corrects.length === word.length){
        alert(`Congrats! You Found the Word ${word.toUpperCase()}`);
        randomWord();
    }
    else if(maxguesses < 1){
        alert('Game Over! You Don"t Have Remaining Guesses');
        for( i = 0; i < word.length; i++){
            
            inputs.querySelectorAll("input")[i].value = word[i];
           }
    }
   });
    
}
resetBtn.addEventListener("click", randomWord);
typingInput.addEventListener("input", initGame);
inputs.addEventListener("click", () => typingInput.focus());
document.addEventListener("keydown", () => typingInput.focus());
