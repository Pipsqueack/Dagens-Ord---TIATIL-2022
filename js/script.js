document.addEventListener("DOMContentLoaded",() => {
    createSquares();

    let guessedWords = [[]];

    let availableSpace = 1;

    let word = "sussy"

    let guessedWordCount = 0;

    const keys = document.querySelectorAll('.keyboard-row button');

    const nav = document.getElementById('navLinks')

    const helpButton = document.getElementById('helpButton')

    function toggleMenu() {
        nav.classList.toggle('navActive')
    }

    helpButton.addEventListener('click', toggleMenu)
    
    for (let i = 0; i < keys.length; i++) {
        keys[i].onclick = ({ target }) => {
            const letter = target.getAttribute("data-key");

            if (letter === 'enter') {
                handleSubmitWord()
                return;
            }
            
            if (letter === 'del') {
                handleDeleteLetter()
                return;
            }

            updateGuessedWords(letter);
        };
    }

    function getCurrentWordArr() {
        const numberOfGuessedWords = guessedWords.length
        return guessedWords[numberOfGuessedWords - 1];
    }

    function updateGuessedWords(letter) {
        const currentWordArr = getCurrentWordArr();

        if (currentWordArr && currentWordArr.length < 5) {
            currentWordArr.push(letter);

            const availableSpaceEl = document.getElementById(String(availableSpace))
            availableSpace = availableSpace + 1

            availableSpaceEl.textContent = letter;
        }
    }

    function getTileColor(letter, index) {
        const isCorrectLetter = word.includes(letter);
    
        if (!isCorrectLetter) {
          return "rgb(58, 58, 60)";
        }
    
        const letterInThatPosition = word.charAt(index);

        const isCorrectPosition = letter === letterInThatPosition;
    
        if (isCorrectPosition) {
          return "rgb(83, 141, 78)";
        }
    
        return "rgb(181, 159, 59)";
      }
    

    function handleSubmitWord() {
        const currentWordArr = getCurrentWordArr();
        if (currentWordArr.length !==5) {
            window.alert("Ordet måste innehålla 5 bokstäver")
            return;
        }

        const currentWord = currentWordArr.join('')
        
        const firstLetterId = guessedWordCount * 5 + 1;

        const interval = 200;

        currentWordArr.forEach((letter, index) => {
          setTimeout(() => {

            const tileColor = getTileColor(letter, index);

            const letterId = firstLetterId + index;

            const letterEl = document.getElementById(letterId);

            letterEl.classList.add("flipped");

            letterEl.style = `background-color:${tileColor};border-color:${tileColor}`;
          }, interval * index);

        });
        guessedWordCount += 1;

        if (currentWord === word) {
            window.alert("Rätt ord! Grattis!")
        }

        if (guessedWords.length === 6) {
            window.alert(`Dina gissningar är slut! Ordet var ${word}`)
        }

        guessedWords.push([])
    }

    function handleDeleteLetter() {

        const currentWordArr = getCurrentWordArr()

        if (currentWordArr == '') {
            window.alert("Du kan inte ta bort bokstäver från en tom eller redan inlagd rad!")
            return
        }

        const removedLetter = currentWordArr.pop()

        guessedWords[guessedWords.length - 1] = currentWordArr

        const lastLetterEl = document.getElementById(String(availableSpace - 1))

        lastLetterEl.textContent = ''

        availableSpace = availableSpace - 1

        console.log(currentWordArr);
        
        console.log(guessedWords);

    }

    function createSquares() {
        const gameBoard = document.getElementById("board")

        for (let index = 0; index < 30; index++) {

            let square = document.createElement("div")

            square.classList.add("square")

            square.setAttribute("id", index + 1)   

            gameBoard.appendChild(square)       

        }
    }



})