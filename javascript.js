const GameController = (function() {
    let gameboard = [" ", " ", " ",
                       " ", " ", " ",
                       " ", " ", " "];

    // legacy                       
    const displayBoard = () => {

        console.log("\n--- Board ---")
        for(let i = 0; i < gameboard.length; i++) {

            process.stdout.write(" " + gameboard[i] + "")

            if (i == 2 || i == 5  || i == 8)
                console.log("\n")
        }
    }

    const checkWin = (p1, p2) => {

        // check row win X
        if (gameboard[0] == "X" && gameboard[1] == "X" && gameboard[2] == "X" ||
            gameboard[3] == "X" && gameboard[4] == "X" && gameboard[5] == "X" ||
            gameboard[6] == "X" && gameboard[7] == "X" && gameboard[8] == "X" ) {

        return p1

        // check row win O
        } else if (gameboard[0] == "O" && gameboard[1] == "O" && gameboard[2] == "O" ||
            gameboard[3] == "O" && gameboard[4] == "O" && gameboard[5] == "O" ||
            gameboard[6] == "O" && gameboard[7] == "O" && gameboard[8] == "O" ) {

        return p2

        // check column win X
        } else if (gameboard[0] == "X" && gameboard[3] == "X" && gameboard[6] == "X" ||
            gameboard[1] == "X" && gameboard[4] == "X" && gameboard[7] == "X" ||
            gameboard[2] == "X" && gameboard[5] == "X" && gameboard[8] == "X" ) {

        return p1

        // check column win O
        } else if (gameboard[0] == "O" && gameboard[3] == "O" && gameboard[6] == "O" ||
            gameboard[1] == "O" && gameboard[4] == "O" && gameboard[7] == "O" ||
            gameboard[2] == "O" && gameboard[5] == "O" && gameboard[8] == "O" ) {

        return p2

        // check diagonal win X
        } else if (gameboard[0] == "X" && gameboard[4] == "X" && gameboard[8] == "X" ||
                   gameboard[2] == "X" && gameboard[4] == "X" && gameboard[6] == "X" ) {
            
        return p1

        // check diagonal win O
        } else if (gameboard[0] == "O" && gameboard[4] == "O" && gameboard[8] == "O" ||
                   gameboard[2] == "O" && gameboard[4] == "O" && gameboard[6] == "O" ) {

        return p2
        } else {
            return null
        }

    }

    const isBoardFull = () => {

        for(let i = 0; i < gameboard.length; i++) {

            if (gameboard[i] == " ") return false
        }

        return true
    }

    const playP1 = (index) => {

        if (gameboard[index] !== " ") {
            return false
        }

        gameboard[index] = "X"

        return true

    }

    const playP2 = (index) => {

        if (gameboard[index] !== " ") {
            return false
        }

        gameboard[index] = "O"
        return true

    }

    const playGame = (p1, p2) => {
        
        console.log("Game started")
        displayBoard()

        while(true) {

            if(isBoardFull()) return

            let p1choice = Math.floor(Math.random() * 9)
            playP1(p1choice)
            displayBoard()
            
            let winner = checkWin(p1, p2)

            if (winner) {
                console.log(`Parabéns ${winner.name}`)
                return checkWin
            }

            if(isBoardFull()) return

            let p2choice = Math.floor(Math.random() * 9)
            playP2(p2choice)
            displayBoard()
            
            winner = checkWin(p1, p2)

            if (winner) {
                console.log(`Parabéns ${winner.name}`)
                return checkWin
            }


            
        }
    }

    return {gameboard, displayBoard, playGame, checkWin, playP1, playP2}
})();

const ScreenController = (function () {

    let P1Name = "p1_default"
    let P2Name = "p2_default"


    const PlayerNamesForm = document.getElementById('name-form')
    const Result = document.getElementById('results') 
    const Board = document.getElementById('board')
    let BoardSquares = document.getElementsByClassName('board-square')

    if (PlayerNamesForm) {

        PlayerNamesForm.addEventListener('submit', function(e) {
            e.preventDefault()
    
            const formData = new FormData(e.target)
            
            P1Name = formData.get('P1Name') || P1Name
            P2Name = formData.get('P2Name') || P2Name

            Board.hidden = false
        })

    }

    const updateScreen = () => {

        for(let i = 0; i < gameboard.length; i++) {

            BoardSquares[i].textContent = gameboard[i]
        }

    }

    const showResults = () => {

        
    }

    const getPlayerNames = () => {

        return {p1: P1Name, p2: P2Name}
    }

    return {initialize}
})();

function Player(name) {

    return {name}
}

const p1 = Player("luis")
const p2 = Player("manuel")

GameController.playGame(p1, p2)





