// selector
const todoInput    = document.querySelector('.todo-input');
const todoButton   = document.querySelector('.todo-button');
const todoList     = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

// functions
function addTodo(event) {
    //Prevent form from submitting
    event.preventDefault();

    //Todo Items
    const todoItem = document.createElement('li');
    todoItem.classList.add("todo-item");

    //Todo div content
    const todoContent = document.createElement('div');
    todoContent.classList.add("item-content");

    todoItem.appendChild(todoContent);

    //Create content text
    const todoText = document.createElement('p');
    todoText.innerText = todoInput.value;
    todoText.classList.add('item-text');

    todoContent.appendChild(todoText);

    //ADD TODO TO LOCALSTORAGE
    saveLocalTodos(todoInput.value);

    //Button container
    const todoButton = document.createElement('div');
    todoButton.classList.add("button-container");

    todoItem.appendChild(todoButton);

    //Check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');

    todoButton.appendChild(completedButton)

    //Check trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');

    todoButton.appendChild(trashButton)

    //Append to list
    todoList.appendChild(todoItem);

    //Clear todo input value
    todoInput.value = "";
}

function deleteCheck(e) {
    const item = e.target;

    //Delete item
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement.parentElement;
        todo.classList.add("fall");

        //REMOVE LOCALSTORAGE
        removeLocalStorage(todo);

        //Animation
        todo.addEventListener('transitionend', () => todo.remove())
    }

    //Check mark
    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement.parentElement;
        console.log(todo);
        todo.classList.toggle("completed");
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    console.log(todos)

    const items = todos.forEach(todo => todo.childNodes);
    console.log(items);

    console.log(todos);
    todos.forEach(todo => {
        switch(e.target.value) {
            case "all":
                todo.style.display = 'flex';
                break;
            case "done":
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case "to-do":
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
        }
    })
}

function saveLocalTodos(todo) {
    //Check --Hey Do I already have thing in there?
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    //Check --Hey Do I already have thing in there?
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach( todo => {
        //Todo Items
        const todoItem = document.createElement('li');
        todoItem.classList.add("todo-item");

        //Todo div content
        const todoContent = document.createElement('div');
        todoContent.classList.add("item-content");

        todoItem.appendChild(todoContent);

        //Create content text
        const todoText = document.createElement('p');
        todoText.innerText = todo;
        todoText.classList.add('item-text');

        todoContent.appendChild(todoText);

        //Button container
        const todoButton = document.createElement('div');
        todoButton.classList.add("button-container");

        todoItem.appendChild(todoButton);

        //Check mark button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('complete-btn');

        todoButton.appendChild(completedButton)

        //Check trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');

        todoButton.appendChild(trashButton)

        //Append to list
        todoList.appendChild(todoItem);
    })
}

function removeLocalStorage(todo) {
    //Check --Hey Do I already have thing in there?
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.childNodes[0].childNodes[0].innerText; 
    todos.splice(todos.indexOf(todoIndex), 1);

    localStorage.setItem("todos", JSON.stringify(todos));
}