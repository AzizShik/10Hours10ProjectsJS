export default class Todo {
  constructor(value, list) {
    this.value = value;
    this.list = list;
    this.arrLS = [];
  }

  addTodo(value) {
    if (!value) return;
    const item = document.createElement('li');
    item.classList.add('list__item');
    item.innerHTML = `
    <span class="list__item-todo">${value}</span>
    <div class="list__item-controls">
      <button class="list__item-btn btn-done btn">
        <span class="material-symbols-outlined">
          done
        </span>
      </button>
      <button class="list__item-btn btn-close btn">
        <span class="material-symbols-outlined">
          close
        </span>
      </button>
    </div>
    `;
    this.list.prepend(item);
  }

  saveLS(value) {
    if (value) this.arrLS.push(value);
    localStorage.setItem('todo', JSON.stringify(this.arrLS));
  }

  loadLS() {
    this.arrLS = JSON.parse(localStorage.getItem('todo'));
    this.arrLS.forEach((e) => {
      this.addTodo(e);
    });
  }

  closeTodo(item) {
    item.remove();
    const todoText = item.querySelector('.list__item-todo').textContent;
    this.arrLS.forEach((e, idx) => {
      console.log(e === todoText);
      if (e === todoText) {
        this.arrLS.splice(idx, 1);
      }
    });
    this.saveLS(null);
  }

  doneTodo(item) {
    const todoEl = item.querySelector('.list__item-todo');
    todoEl.style.textDecoration = 'line-through'
  }
}
