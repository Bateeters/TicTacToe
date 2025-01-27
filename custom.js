const Gameboard = (() => {
    let board = ["","","","","","","","",""]; // array with 9 blank spots resembling each square on the board

    const getBoard = () => board; // Pulling the board for use in a game
    const updateBoard = (index, marker) => { // this is grabbing the index in the array (the square on the board), and the player's marker
        if (board[index] === "") { // checks to see if the space is empty
            board[index] = marker; // Update the board to have the player's marker
            return true; // Update successful
        }
        return false; // Spot already taken
    };

    const resetBoard = () => {
        board = ["","","","","","","","",""]; // Reset the board to empty
    };

    return { getBoard, updateBoard, resetBoard}; // Return the functions for use outside of Gameboard
})();

const Player = (name, marker) => { // Creating Player object
    return {name, marker};
};

const Game = (() => {
    const player1 = Player("Player 1", "X"); // Creating Player 1
    const player2 = Player("Player 2", "O"); // Creating Player 2
    let currentPlayer = player1; // Assigning Player 1 as first turn

    const switchPlayer = () => { // Setting up player turn alternation
        currentPlayer = currentPlayer === player1 ? player2 : player1; // if current player is player1 return player2
    };

    const getCurrentPlayer = () => currentPlayer; // getCurrentPlayer() returns currentPlayer

    const checkWin = () => { // Setting up win conditions and checking board
        const board = Gameboard.getBoard(); // Getting current state of board
        const winConditions = [ // Creating array of win conditions
            [0,1,2], [3,4,5], [6,7,8], // Winning Row conditions
            [0,3,6], [1,4,7], [2,5,8], // Winning Column conditions
            [0,4,8], [2,4,6] // Winning Diagonal conditions
        ];

        for (const condition of winConditions) { // loop through each in the winCondition array
            const [a, b, c] = condition; // assigning each value of the current iteration

            // Checking if the marker in each spot is the same (marker in spot a === b and if true, does it === marker in c)
            if (board[a] && board[a] === board[b] && board[a] === board[c]) { 
                return board[a]; // Return the winner's marker if all match
            }
        }

        // check if the board is completely full
        if (!board.includes("")) { // Check if there are anymore blank spaces
            return "Tie"; // No more empty spaces, Tie
        }

        // if no winner move to next turn
        return null; // No winner yet
    };

    return {switchPlayer, getCurrentPlayer, checkWin}; // Return the functions for use outside of Game
})();

const playTurn = (index) => { // Function to play a turn
    const player = Game.getCurrentPlayer();  // Establish who's turn it is.

    // Function to check and/or mark selected position
    if (Gameboard.updateBoard(index, player.marker)) { // place the current player's marker in the selected index spot.
        const result = Game.checkWin();  // Check the win conditions to see if there's a match.
        if (result) { // Check to see if checkWin() returns null. If not, is it a tie? if so, console.log "it's a tie!", if there's a winner console.log winner
            console.log(result === "Tie" ? "It's a tie!" : `${player.name} wins!`);
            Gameboard.resetBoard(); // Reset board if it's a tie or there's a winner
        } else {  // if checkWin() returns null, means there is no winner and empty spaces sill exist.
            Game.switchPlayer(); // Switch to the next player.
        }
    } else { //  if selected spot is not empty.
        console.log("Spot already taken!"); // console.log the spot is already full.
    }
};