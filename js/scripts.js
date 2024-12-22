const canvas = document.getElementById('doodleCanvas');
const ctx = canvas.getContext('2d');

let painting = false;

const colorPicker = document.getElementById('colorPicker');
const lineWidthSlider = document.getElementById('lineWidthSlider');
const clearButton = document.getElementById('clearButton');
const saveButton = document.getElementById('saveButton');

colorPicker.addEventListener('input', (e) => {
    ctx.strokeStyle = e.target.value;
});

lineWidthSlider.addEventListener('input', (e) => {
    ctx.lineWidth = e.target.value;
});

clearButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

saveButton.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'drawing.png';
    link.href = canvas.toDataURL();
    link.click();
});

function startPosition(e) {
    painting = true;
    draw(e);
}

function finishedPosition() {
    painting = false;
    ctx.beginPath();
}

function draw(e) {
    if (!painting) return;
    ctx.lineWidth = lineWidthSlider.value;
    ctx.lineCap = 'round';
    ctx.strokeStyle = colorPicker.value;

    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}

canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', finishedPosition);
canvas.addEventListener('mousemove', draw);
