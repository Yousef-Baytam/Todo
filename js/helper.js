let renderTodos

const curTime = (x = null) => {
    if (x) {
        return `${ new Date(x).getDate() }:${ new Date(x).getMonth() + 1 }:${ new Date(x).getFullYear() } <br> ${ new Date(x).getHours() }:${ new Date(x).getMinutes() }:${ new Date(x).getSeconds() }`
    }
    return `${ new Date().getDate() }:${ new Date().getMonth() + 1 }:${ new Date().getFullYear() } <br> ${ new Date().getHours() }:${ new Date().getMinutes() }:${ new Date().getSeconds() }`
}

const todoId = () => {
    let rand
    do {
        rand = Math.floor(Math.random() * 899 + 100)
    } while (todos.includes(rand))
    return rand
}

const getLocalStorageItems = () => {
    let localItems = []
    let i = 1
    while (JSON.parse(localStorage.getItem(`todo:${ i }`))) {
        localItems.push(JSON.parse(localStorage.getItem(`todo:${ i }`)))
        i++
    }
    return localItems
}

const fillLocalStorage = (arr) => {
    let index = 1
    for (todo of arr) {
        localStorage.setItem(`todo:${ index }`,
            JSON.stringify(todo)
        )
        index++
    }
}

const updateEdits = (task) => {
    let id = `#t${ task.taskId }`
    $(`${ id }:nth-of-type(3)`).html(`<p>${ task.title }</p>`)
    $(`${ id }:nth-of-type(4)`).html(`<p>${ task.description }</p>`)
    $(`${ id }:nth-of-type(5)`).html(`<p>${ task.point }</p>`)
    $(`${ id }:nth-of-type(7)`).html(`<p>${ task.dueTime.time }</p>`)
}
const updateProgress = (task) => {
    let divId = `#div${ task.taskId }`
    $(divId).toggleClass('done')
}

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
        <p>${ todo.createdTime.time }</p>
    </div>
    <div id="t${ todo.taskId }">
        ${ todo.dueTime.time }
    </div>
    <i class="fa-solid fa-trash-can" id="trash${ todo.taskId }"></i>
    </div>`)
            .appendTo(".list-container")
    }
    edit('.fa-pen-to-square')
    deleteTask('.fa-trash-can')
    progress('input[type=checkbox]')
}

const validateInput = () => {
    if ($('#title').val() === '' || $('#Description').val() === '' || $('#due-time').val() === '') {
        if ($('#title').val() === '') {
            $('#title').addClass('error')
            $('#title').attr('placeholder', 'title cannot be empty')
        }
        if ($('#Description').val() === '') {
            $('#Description').addClass('error')
            $('#Description').attr('placeholder', 'Description cannot be empty')
        }
        if ($('#due-time').val() === '')
            $('#due-time').addClass('error')
        return true
    } else {
        $('.error') ? $('.error').removeClass('error') : ''
    }
}

const dueTimeValidator = setInterval(() => {
    for (let todo of todos) {
        if (new Date(todo.dueTime.value) - new Date() < 60 * 60 * 1000) {
            $(`#div${ todo.taskId }`).addClass('dueSoon')
        }
        if (new Date(todo.dueTime.value) - new Date() > 60 * 60 * 1000) {
            $(`#div${ todo.taskId }`).removeClass('dueSoon')
        }
    }
}, 200)