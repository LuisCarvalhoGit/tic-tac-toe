function Player(name) {
    return {name}
}

const p1 = Player("luis")
const p2 = Player("manuel")

const GameController = (function() {
    let gameboard = [" ", " ", " ",
                     " ", " ", " ",
                     " ", " ", " "];

    let activePlayer = p1

    // legacy                       
    const displayBoard = () => {

        console.log("\n--- Board ---")
        for(let i = 0; i < gameboard.length; i++) {

            process.stdout.write(" " + gameboard[i] + "")

            if (i == 2 || i == 5  || i == 8)
                console.log("\n")
        }
    }

    const checkWin = () => {

        // Lógica de vitória 
        const wins = [
            [0,1,2], [3,4,5], [6,7,8], // Linhas
            [0,3,6], [1,4,7], [2,5,8], // Colunas
            [0,4,8], [2,4,6]           // Diagonais
        ];

        for (let combo of wins) {
            const [a, b, c] = combo;
            if (gameboard[a] !== " " && 
                gameboard[a] === gameboard[b] && 
                gameboard[a] === gameboard[c]) {
                return activePlayer; // Retorna o jogador atual (que acabou de jogar)
            }
        }
        return null;

    }

    const isBoardFull = () => {

        for(let i = 0; i < gameboard.length; i++) {

            if (gameboard[i] == " ") return false
        }

        ScreenController.displayMessage("It's a Tie!")

        return true
    }


    const playRound = (index) => {
        

        if (gameboard[index] !== " ") {
            return
        }

        if (activePlayer.name == p1.name) {
            gameboard[index] = "X"
        } else if (activePlayer.name == p2.name) {
            gameboard[index] = "O"
        }
        
        ScreenController.updateScreen()

        const winner = checkWin();
        if (winner) {
            ScreenController.displayMessage(`Congratulations! ${winner.name} won!`);
            ScreenController.removePlayHability()
            return;
        }

        if (isBoardFull()) {
            ScreenController.displayMessage("Draw!");
            return;
        }


        if(activePlayer == p1)
            activePlayer = p2
        else 
            activePlayer = p1

        ScreenController.displayMessage(`${activePlayer.name} turn!`)

        return true


        
    }

    return {gameboard, playRound}
})();

const ScreenController = (function () {

    p1.name = "p1_default"
    p2.name = "p2_default"


    const PlayerNamesForm = document.getElementById('name-form')
    const Message = document.getElementById('message') 
    const Board = document.getElementById('board')
    const ResetButton = document.getElementById('reset-button')
    let BoardSquares = document.getElementsByClassName('board-square')


    if (PlayerNamesForm) {

        PlayerNamesForm.addEventListener('submit', function(e) {
            e.preventDefault()
    
            const formData = new FormData(e.target)
            
            p1.name = formData.get('P1Name') || p1.name
            p2.name = formData.get('P2Name') || p2.name

            Board.hidden = false
            ResetButton.hidden = false

            updateScreen()
        })

    }

    if (ResetButton) {
        ResetButton.addEventListener('click', () => {

            for(let i = 0; i < GameController.gameboard.length; i++) {
                GameController.gameboard[i] = " "
            }
            ScreenController.updateScreen()
            GameController.activePlayer = p1

        })
    }

    const updateScreen = () => {

        const currentBoard = GameController.gameboard

        for(let i = 0; i < currentBoard.length; i++) {

            BoardSquares[i].textContent = currentBoard[i]
        }

    }

    const removePlayHability = () => {
        Board.removeEventListener('click', clickHandlerBoard)
    }

    const clickHandlerBoard = (e) => {

        const selectedSquare = e.target

        if (!selectedSquare.id || selectedSquare.id === "board") return

        const index = Number(selectedSquare.id)


        if (GameController.gameboard[index] !== " ") 
            return
        else 
            GameController.playRound(index)
        

    }

    Board.addEventListener('click', clickHandlerBoard)


    const displayMessage = (message) => {

        Message.textContent = ""
        Message.textContent = message
        
    }

    return {updateScreen, displayMessage, removePlayHability}
})();




ScreenController.updateScreen()







