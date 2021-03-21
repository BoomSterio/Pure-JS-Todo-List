export const getTodos = (userId) => {
    return fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`)
        .then(res => res.json())
        .catch(err => console.error(err))
}