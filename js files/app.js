let todoItems = [];

function renderTodo(todo) {
    const list = document.querySelector('.js-todo-list');
    const item = document.querySelector(`[data-key='${todo.id}']`);
    if (todo.deleted) {
        item.remove();
        return
    }
    const isChecked = todo.checked ? 'done' : ' ';
    const node = document.createElement("li");

    node.innerHTML = `
    <input id="${todo.id}" type ="checkbox"  class="tick js-tick"/>
    <label for="${todo.id} class="tick js-tick"></label>
    <span id= "todo-text">${todo.text}</span>
    <button class="delete-todo js-delete-todo"><i class="far fa-trash-alt delete-todo js-delete-todo"></i></button>
    `;

    node.setAttribute('class', `todo-item ${isChecked}`);
    node.setAttribute('data-key', todo.id);

    if (item) {
        list.replaceChild(node, item)
    }
    else {
        list.append(node);
    }
}

function addTodo(text) {
    const todo = {
        text,
        checked: false,
        id: Date.now(),
    };
    todoItems.push(todo);
    renderTodo(todo);
}

function toggleDone(key) {
    const index = todoItems.findIndex(item => item.id === Number(key));
    todoItems[index].checked = !todoItems[index].checked;
    renderTodo(todoItems[index])
}

function deleteTodo(key) {
    const index = todoItems.findIndex(item => item.id === Number(key));
    const todo = {
        deleted: true,
        ...todoItems[index]
    };
    todoItems = todoItems.filter(item => item.id !== Number(key));
    renderTodo(todo);
}

const form = document.querySelector('.js-form');
form.addEventListener('submit', event => {
    event.preventDefault();
    const input = document.querySelector('.js-todo-input');
    const text = input.value.trim();
    if (text !== '') {
        addTodo(text);
        input.value = '';
        input.focus();
    }
})

const list = document.querySelector('.js-todo-list');
list.addEventListener('click', event => {
    if (event.target.classList.contains('js-tick')) {
        const itemKey = event.target.parentElement.dataset.key;
        toggleDone(itemKey);
    }
    if (event.target.classList.contains('js-delete-todo')) {
        if (event.target.firstChild === null) {
            const itemKey = event.target.parentElement.parentElement.dataset.key;
            deleteTodo(itemKey);
        }
        else {
            const itemKey = event.target.parentElement.dataset.key;
            deleteTodo(itemKey);
        }
    }
})

document.querySelector("#clear-completed").onclick = function () {
    let tick_tasks = document.querySelectorAll(".todo-item");
    for (let i = 0; i < tick_tasks.length; i++) {
        if (tick_tasks[i].classList.contains('done') == true) {
            let id = tick_tasks[i].dataset.key
            tick_tasks[i].remove();
            let index = todoItems.findIndex((item) => Number(item.id) == Number(id))
            todoItems.splice(index, 1)
        }
    }
}

document.querySelector("#active").onclick = function () {
    let tick_tasks = document.querySelectorAll(".todo-item");
    for (let i = 0; i < tick_tasks.length; i++) {
        if (tick_tasks[i].classList.contains('done') == true) {
            tick_tasks[i].style.display = "none";
        }
        else {
            tick_tasks[i].style.display = "flex";
        }
    }
}

document.querySelector("#completed").onclick = function () {
    let tick_tasks = document.querySelectorAll(".todo-item");
    for (let i = 0; i < tick_tasks.length; i++) {
        console.log(tick_tasks[i].classList.contains('done'));
        if (tick_tasks[i].classList.contains('done') == false) {
            tick_tasks[i].style.display = "none";
        }
        else {
            tick_tasks[i].style.display = "flex";
        }
    }
}

document.querySelector("#all").onclick = function () {
    let tick_tasks = document.querySelectorAll(".todo-item");
    for (let i = 0; i < tick_tasks.length; i++) {
        tick_tasks[i].style.display = "flex";
    }
}

document.querySelector("#all-clear").onclick = function () {
    let tick_tasks = document.querySelectorAll(".todo-item");
    for (let i = 0; i < tick_tasks.length; i++) {
        let id = tick_tasks[i].dataset.key
            tick_tasks[i].remove();
            let index = todoItems.findIndex((item) => Number(item.id) == Number(id))
            todoItems.splice(index, 1)
    }
}