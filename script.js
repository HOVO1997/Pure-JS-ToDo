const body = document.getElementById('tbody')
let array = [];
fetch('https://jsonplaceholder.typicode.com/todos/?_limit=5')
    .then(response => response.json())
    .then(json => {
        array = json
        render()
    })

function render() {
    if (!array.length) {
        document.getElementById('h2').innerText = 'No Todos!'
    } else  {
        document.getElementById('h2').innerText = ''
    }
    for (let i = 0; i < array.length; i++) {
        body.innerHTML += `
            <tr>
            ${array[i].completed ? `<td >${i + 1} <input class="ml-3" onchange="checkboxHandler(${array[i].id})" 
            checked type="checkbox"></td>` : `<td >${i + 1} <input class="ml-3" onchange="checkboxHandler(${array[i].id})" type="checkbox"></td>` }
            
            <td class="${array[i].completed ? 'line' : null}">${array[i].title}</td>
            <td><button onclick="DeleteToDo(${array[i].id})" class="btn btn-danger">Delete</button></td>
            </tr>
            `
    }
}

function FormAdd(e) {
    e.preventDefault()
    let input = document.getElementById('inputPassword2')
    if (input.value.trim()) {
        array.unshift({
            id: Date.now(),
            completed: false,
            title: input.value
        })
    }
    input.value = ''
    body.innerHTML = null
    render()
}


document.getElementById('form').addEventListener('submit', FormAdd)

function DeleteToDo(id) {
    const index = array.findIndex(e => e.id === id)
    array.splice(index, 1)
    body.innerHTML = null
    render()
}


function checkboxHandler(id) {
    array.map(e => {
        if (e.id === id) {
            e.completed = !e.completed
        }
    })
    body.innerHTML = null
    render()
}
