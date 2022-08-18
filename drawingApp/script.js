const colorEl = document.getElementById('input-color'),
	canvas = document.querySelector('.canvas'),
	sizeEl = document.querySelector('.size'),
	decreaseBtn = document.querySelector('.decrease'),
	increaseBtn = document.querySelector('.increase'),
	clear = document.querySelector('#clear');

const ctx = canvas.getContext('2d');

let size = parseFloat(sizeEl.textContent);
let color = colorEl.value;
let isPressed = false;
let x;
let y;


function canvasClear() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function sizeDecrease() {
	sizeEl.textContent = parseFloat(sizeEl.textContent) - 1;
}

function sizeIncrease() {
	sizeEl.textContent = parseFloat(sizeEl.textContent) + 1;
}

function drawCircle(x, y) {
	ctx.beginPath();
	ctx.arc(x, y, parseFloat(sizeEl.textContent), 0, 2 * Math.PI);
	ctx.fillStyle = colorEl.value;
	ctx.fill();
}

function drawLine(x1, y1, x2, y2) {
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.strokeStyle = colorEl.value;
	ctx.lineWidth = size * 2;
	ctx.stroke(); 
}


clear.addEventListener('click', canvasClear);
decreaseBtn.addEventListener('click', sizeDecrease);
increaseBtn.addEventListener('click', sizeIncrease);

canvas.addEventListener('mousedown', e => {
	isPressed = true;

	x = e.offsetX;
	y = e.offsetY;
});

canvas.addEventListener('mouseup', e => {
	isPressed = false;

	x = undefined;
	y = undefined;
});

canvas.addEventListener('mousemove', e => {
	if(isPressed) {
		const x2 = e.offsetX;
		const y2 = e.offsetY;

		drawCircle(x2, y2);
		drawLine(x, y, x2, y2);
		x = x2; 
		y = y2;
	}
});