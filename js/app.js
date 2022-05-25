let todos = []
let editTaskId = 0
let targetTask = {}
todos = getLocalStorageItems()

$('.form-bg').toggle()
$('#add-item').click(() => $('.form-bg').toggle("fast"))

$('#submit').click((e) => {
    let id
    e.preventDefault()
    if (editTaskId) {
        targetTask.title = $('#title').val()
        targetTask.description = $('#Description').val()
        targetTask.point = $('#Point').val()
        targetTask.dueTime = $('#due-time').val()
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
            createdTime: `${ curTime() }`,
            dueTime: `${ $('#due-time').val() }`
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
        $('#due-time').val(targetTask.dueTime)
    })

const sortByPoint = (arr, order = 'asc') => {
    console.log(arr)
    if (order === 'asc')
        arr.sort((a, b) => {
            console.log(a.point, b.point)
            return a.point - b.point
        })
    else {
        arr.sort((a, b) => {
            console.log(a.point, b.point)
            return b.point - a.point
        })
    }
}
edit('.fa-pen-to-square')
progress('input[type=checkbox]')
deleteTask('.fa-trash-can')
renderTodos(todos)
sortByPoint(todos, 'x')