let todos = []
let editTaskId = 0
let targetTask = {}
let results
todos = getLocalStorageItems()

$('.form-bg').toggle()
$('#add-item').click(() => $('.form-bg').toggle("fast"))

$('#submit').click((e) => {
    e.preventDefault()
    if (validateInput())
        return
    let id
    if (editTaskId) {
        targetTask.title = $('#title').val()
        targetTask.description = $('#Description').val()
        targetTask.point = $('#Point').val()
        targetTask.dueTime.value = new Date($('#due-time').val())
        targetTask.dueTime.time = `${ curTime($('#due-time').val()) }`
        for (let i = 0; i < todos.length; i++) {
            if (todos[i].taskId === targetTask.taskId) {
                todos[i] = targetTask
            }
        }
        $('.form-bg').toggle()
        editTaskId = 0
        updateEdits(targetTask)
        targetTask = {}

    } else {
        id = todoId()
        $('.form-bg').toggle("fast")
        todos.push({
            completed: false,
            taskId: id,
            title: `${ $('#title').val() }`,
            description: `${ $('#Description').val() }`,
            point: `${ $('#Point').val() }`,
            createdTime: {
                time: `${ curTime() }`,
                value: new Date()
            },
            dueTime: {
                time: `${ curTime($('#due-time').val()) }`,
                value: new Date($('#due-time').val())
            }
        })

        $(`<div class="element" id="div${ id }">
        <i class="fa-solid fa-pen-to-square" id="pen${ id }"></i>
        <div>
        <input type="checkbox" name="Completed" id="Completed${ id }">
        </div>
        <div id="t${ id }">
            <p>${ id }</p>
        </div>
        <div id="t${ id }">
            <p>${ $('#title').val() }</p>
        </div>
        <div id="t${ id }">
            <p>${ $('#Description').val() }</p>
        </div>
        <div id="t${ id }">
            ${ $('#Point').val() }
        </div>
        <div id="t${ id }">
            <p>${ curTime() }</p>
        </div>
        <div id="t${ id }">
            ${ curTime($('#due-time').val()) }
        </div>
        <i class="fa-solid fa-trash-can" id="trash${ id }"></i>
        </div>`)
            .appendTo(".list-container")
    }
    edit(`#pen${ id }`)
    progress(`#Completed${ id }`)
    deleteTask(`#trash${ id }`)
    $('#title').val('')
    $('#Description').val('')
    $('#Point').val('1')
    $('#due-time').val('')
    localStorage.clear()
    fillLocalStorage(todos)
})

$('.fa-xmark').click(() => $('.form-bg').toggle("fast"))

const edit = (selector) =>
    $(selector).click((e) => {
        for (let todo of todos) {
            let penId = `pen${ todo.taskId }`
            if (penId === e.target.id) {
                targetTask = todo
                break
            }
        }
        editTaskId = targetTask.taskId
        $('.form-bg').toggle("fast")
        $('#title').val(targetTask.title)
        $('#Description').val(targetTask.description)
        $('#Point').val(targetTask.point)
        $('#due-time').val(targetTask.dueTime.value)
    })

const sortByPoint = (arr, order = 'asc') => {
    if (order === 'asc')
        arr.sort((a, b) => {
            return a.point - b.point
        })
    else {
        arr.sort((a, b) => {
            return b.point - a.point
        })
    }
}

$('#points').click((e) => {
    $('#points').toggleClass('fa-angle-up')
    let todosB
    if (results) {
        todosB = [...results]
    } else {
        todosB = [...todos]
    }
    if (e.target.classList.contains('fa-angle-up'))
        sortByPoint(todosB)
    else
        sortByPoint(todosB, 's')
    renderTodos(todosB)
})

$('#search').on('keyup', (e) => {
    results = []
    for (let todo of todos) {
        if (todo.title.toLowerCase().includes(e.target.value.toLowerCase()) || todo.description.toLowerCase().includes(e.target.value.toLowerCase())) {
            results.includes(todo) ? '' : results.push(todo)
        }
    }
    renderTodos(results)
})

$('#clear').click(() => {
    localStorage.clear()
    todos = []
    renderTodos(todos)
})

edit('.fa-pen-to-square')
progress('input[type=checkbox]')
deleteTask('.fa-trash-can')
renderTodos(todos)