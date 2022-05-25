let todos = []
let editTaskId = 0
let targetTask = {}
let renderTodos
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

edit('.fa-pen-to-square')

const progress = (selector) =>
    $(selector).change(
        function (e) {
            for (let todo of todos) {
                let checkboxId = `Completed${ todo.taskId }`
                if (checkboxId === e.target.id) {
                    targetTask = todo
                    break
                }
            }
            if (e.target.checked) {
                targetTask.completed = true
            }
            else {
                targetTask.completed = false
            }
            for (let i = 0; i < todos.length; i++) {
                if (todos[i].taskId === targetTask.taskId) {
                    todos[i] = targetTask
                }
            }
            updateProgress(targetTask)
            localStorage.clear()
            fillLocalStorage(todos)
            targetTask = {}
        })
progress('input[type=checkbox]')

const deleteTask = (selector) =>
    $(selector).click((e) => {
        for (let i = 0; i < todos.length; i++) {
            let TrashId = `trash${ todos[i].taskId }`
            if (TrashId === e.target.id) {
                todos = todos.filter(task => {
                    return task !== todos[i]
                });
            }
        }
        renderTodos(todos)
        localStorage.clear()
        fillLocalStorage(todos)
        targetTask = {}
    })
deleteTask('.fa-trash-can')

renderTodos = (arr) => {
    $('.list-container .element').remove()
    for (todo of arr) {
        $(`<div class="element ${ todo.completed ? 'done' : '' }" id="div${ todo.taskId }">
        <i class="fa-solid fa-pen-to-square" id="pen${ todo.taskId }"></i>
    <div>
    <input type="checkbox" name="Completed" id="Completed${ todo.taskId }" ${ todo.completed ? 'checked' : '' }>
    </div>
    <div id="t${ todo.taskId }">
        <p>${ todo.taskId }</p>
    </div>
    <div id="t${ todo.taskId }">
        <p>${ todo.title }</p>
    </div>
    <div id="t${ todo.taskId }">
        <p>${ todo.description }</p>
    </div>
    <div id="t${ todo.taskId }">
        ${ todo.point }
    </div>
    <div id="t${ todo.taskId }">
        <p>${ todo.createdTime }</p>
    </div>
    <div id="t${ todo.taskId }">
        ${ curTime(todo.dueTime) }
    </div>
    <i class="fa-solid fa-trash-can" id="trash${ todo.taskId }"></i>
    </div>`)
            .appendTo(".list-container")
    }
    edit('.fa-pen-to-square')
    deleteTask('.fa-trash-can')
    progress('input[type=checkbox]')
}

renderTodos(todos)