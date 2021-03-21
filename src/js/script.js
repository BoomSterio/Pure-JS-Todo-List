import {getTodos} from './api'
import "regenerator-runtime/runtime.js"
import {todoList, addTodo, removeTodo, USER_ID, setTodos} from './actions'

let list = document.querySelector('.list')
let addButton = document.querySelector('#add-todo')
let textarea = document.querySelector('#textarea')

//if localStorage is empty then we fetch data from server
if (JSON.parse(localStorage.getItem('todoList'))?.length > 0) {
    setTodos(JSON.parse(localStorage.getItem('todoList')))
} else {
    (async () => {
        let data = await getTodos(USER_ID)
        setTodos(todoList.concat(data))
    })()
}

const createTodo = () => {
    if (!textarea.value) return

    addTodo(textarea.value)
    textarea.value = ''
}

textarea.addEventListener('keyup', e => {
    if (e.key !== 'Enter') return

    e.preventDefault()
    createTodo()
})

addButton.onclick = createTodo

list.addEventListener('change', e => {
    e.preventDefault()
    const idCheck = e.target.getAttribute('id')
    const id = Number(idCheck.slice(5))

    setTodos(todoList.map(item => item.id === id ? {...item, completed: !item.completed} : item))
})

list.addEventListener('click', e => {
    if (e.target?.getAttribute('id')?.includes('delete_')) {
        e.preventDefault()
        const idCheck = e.target.getAttribute('id')
        const id = Number(idCheck.slice(7))

        //transition and removing item
        let listItem = document.querySelector(`#item_${id}`)
        listItem.classList.remove('hover')
        listItem.classList.add('fadeOut')
        listItem.addEventListener('transitionend', () => removeTodo(id))
    }
})

