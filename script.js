window.onload = function () {
    // Definitions
    var canvas = document.getElementById("paint-canvas");
    var context = canvas.getContext("2d");
    var boundings = canvas.getBoundingClientRect();

    // Specs
    var mouseX = 0;
    var mouseY = 0;
    var isDrawing = false;
    context.strokeStyle = "black"; // Initial brush color

    // Handle brush size
    var brush = document.getElementById("brush");

    brush.addEventListener("input", function (brush) {
        context.lineWidth = brush.target.value;
    });

    // Handle colors
    var colors = document.getElementsByClassName("colors")[0];

    colors.addEventListener("click", function (event) {
        context.strokeStyle = event.target.value || "black";
    });


    // Mouse down event
    canvas.addEventListener("mousedown", function (event) {
        setMouseCoordinates(event);
        isDrawing = true;

        // Start drawing
        context.beginPath();
        context.moveTo(mouseX, mouseY);
    });

    // Mouse move event
    canvas.addEventListener("mousemove", function (event) {
        setMouseCoordinates(event);

        if (isDrawing) {
            context.lineTo(mouseX, mouseY);
            context.stroke();
        }
    });

    // Mouse up event
    canvas.addEventListener("mouseup", function (event) {
        setMouseCoordinates(event);
        isDrawing = false;
    });

    // Handle mouse coordinates
    function setMouseCoordinates(event) {
        mouseX = event.clientX - boundings.left;
        mouseY = event.clientY - boundings.top;
    }

    // Handle clear button
    var clearButton = document.getElementById("clear");

    clearButton.addEventListener("click", function () {
        context.clearRect(0, 0, canvas.width, canvas.height);
    });

    // Handle save button
    var saveButton = document.getElementById("save");

    saveButton.addEventListener("click", function () {
        var imageName = prompt("Please enter image name");
        var canvasDataURL = canvas.toDataURL();
        var a = document.createElement("a");
        a.href = canvasDataURL;
        a.download = imageName || "drawing";
        a.click();
    });
};
