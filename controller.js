document.addEventListener("keydown", (event) => {
    const keyName = event.key;
    if (keyName === "ArrowLeft") {
            currentFigure.moveLeft();
    }
    else if (keyName === "ArrowRight") {
            currentFigure.moveRight();
    }
    else if (keyName === "ArrowDown") {
            currentFigure.moveDown();
    }
    else if (keyName === "ArrowUp") {
            currentFigure.rotate();
    }
});