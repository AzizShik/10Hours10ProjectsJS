import Todo from './Todo.js';

const form = document.querySelector('[data-form]');
const formInput = document.querySelector('[data-input]');
const list = document.querySelector('[data-list]');

const todo = new Todo(formInput, list);
if (localStorage.getItem('todo')) {
  todo.loadLS();
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  todo.addTodo(formInput.value);
  todo.saveLS(formInput.value);
  formInput.value = '';
});

list.addEventListener('click', (e) => {
  const el = e.target;

  if (el.matches('.btn-close')) {
    const parent = el.closest('.list__item');
    todo.closeTodo(parent);
  }

  if (el.matches('.btn-done')) {
    const parent = el.closest('.list__item');
    todo.doneTodo(parent);
  }
});
