let list = document.querySelector('.list')

let todoList = []

const USER_ID = 1

const setTodos = (items) => {
    todoList = items
    saveTodos()
}

const saveTodos = () => {
    todoList.sort((a, b) => {
        if (a.completed === b.completed)
            return b.id - a.id
        else if (a.completed)
            return 1
        else return -1
    })
    localStorage.setItem('todoList', JSON.stringify(todoList))
    displayTodos()
}

const addTodo = (text) => {
    const newTodo = {
        id: todoList.length + 1,
        userId: USER_ID,
        title: text,
        completed: false
    }

    todoList.push(newTodo)
    saveTodos()
}

const removeTodo = id => {
    setTodos(todoList.filter(item => item.id !== id))
}

const displayTodos = () => {
    let todos = ''

    todoList.forEach((item) => {
        todos += `
            <li id="item_${item.id}" class="hover ${item.completed && 'completed'}">
                <input type="checkbox" id="item_${item.id}" ${item.completed && 'checked'}>
                <label for="item_${item.id}">${item.title}</label>
                <button id="delete_${item.id}">
                    <svg id="delete_${item.id}" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path id="delete_${item.id}" d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                        <path id="delete_${item.id}" fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                </button>
            </li>
        `
    })

    list.innerHTML = todos
    if (todos === '')
        list.innerHTML = null
}

export {setTodos, addTodo, removeTodo, todoList, USER_ID}