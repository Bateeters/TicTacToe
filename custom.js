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