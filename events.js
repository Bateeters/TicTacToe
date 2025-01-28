const DisplayController = (() => { // starting event for spaces
    const squares = document.querySelectorAll(".square"); // selecting all the spaces on the board
    const render = () => { // creating function to populate board with saved markers
        const board = Gameboard.getBoard(); // saving current state of board into a variable for use.
        squares.forEach((square, index) => {  // grab each square and the index of it
            square.textContent = board[index];  // update the square's text content with the matching index content saved on the board
        });
    };

    squares.forEach((square) => {  // itterate through each square on the board
        square.addEventListener("click", (e) => { // for each square, create click event listener.
            const index = e.target.dataset.index;
            const player = Game.getCurrentPlayer();
            if (Gameboard.updateBoard(index, player.marker)) {
                const result = Game.checkWin();
                render();
                if (result) {
                    alert(result === "Tie" ? "It's a tie!" : `${player.name} wins!`);
                    Gameboard.resetBoard();
                    render();
                } else {
                    Game.switchPlayer();
                }
            }
        });
    });

    return { render };
})();

DisplayController.render();