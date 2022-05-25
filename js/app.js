let todos = []
let editTaskId = 0
let targetTask = {}

todos = getLocalStorageItems()
renderTodos(todos)

$('.form-bg').toggle()
$('#add-item').click(() => $('.form-bg').toggle("fast"))

$('#submit').click((e) => {
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

    } else {
        let id = todoId()
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

        $(`<div class="element">
        <i class="fa-solid fa-pen-to-square"></i>
        <div>
        <input type="checkbox">
        </div>
        <div>
            <p>${ id }</p>
        </div>
        <div>
            <p>${ $('#title').val() }</p>
        </div>
        <div>
            <p>${ $('#Description').val() }</p>
        </div>
        <div>
            ${ $('#Point').val() }
        </div>
        <div>
            <p>${ curTime() }</p>
        </div>
        <div>
            ${ curTime($('#due-time').val()) }
        </div></div>`)
            .appendTo(".list-container")
    }
    $('#title').val('')
    $('#Description').val('')
    $('#Point').val('1')
    $('#due-time').val('')
    localStorage.clear()
    fillLocalStorage(todos)
})

$('.fa-xmark').click(() => $('.form-bg').toggle("fast"))

$('.fa-pen-to-square').click((e) => {
    for (let todo of todos) {
        if (todo.taskId === parseInt(e.target.id)) {
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