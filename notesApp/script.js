const addBtn = document.querySelector('.add-btn');

const notes = JSON.parse(localStorage.getItem('notes'));

if (notes) {
	notes.forEach(note => addNote(note));
}


addBtn.addEventListener('click', () => addNote());

function addNote(text = '') {
	const note = document.createElement('div');
	note.classList.add('note');
	note.innerHTML = `
			<div class="tools">
				<button class="btn tools__edit"><i class="fas fa-edit"></i></button>
				<button class="btn tools__delete"><i class="fas fa-trash-alt"></i></button>
		</div>
			<div class="note__info ${text ? '' : "hidden"}"></div>
			<textarea class="note__text ${text ? "hidden" : ""}"></textarea>
	`;

	const editBtn = note.querySelector('.tools__edit');
	const deleteBtn = note.querySelector('.tools__delete');
	const info = note.querySelector('.note__info');
	const textArea = note.querySelector('.note__text');

	textArea.value = text;
	info.innerHTML = marked(text);

	deleteBtn.addEventListener('click', () => {
		note.remove();
		updateLS();
	});

	editBtn.addEventListener('click', () => {
		info.classList.toggle('hidden');
		textArea.classList.toggle('hidden');
	});

	textArea.addEventListener('input', e => {
		const {
			value
		} = e.target;

		info.innerHTML = marked(value);

		updateLS();
	});

	document.querySelector('body').insertAdjacentElement('beforeend', note);
}

function updateLS() {
	const textAreas = document.querySelectorAll('.note__text');

	const notes = [];

	textAreas.forEach(area => notes.push(area.value));

	localStorage.setItem('notes', JSON.stringify(notes));
}