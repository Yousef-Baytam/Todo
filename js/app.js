let todos = []

todos = getLocalStorageItems()

$('.form-bg').toggle()
$('#add-item').click(() => $('.form-bg').toggle("fast"))
$('#submit').click((e) => {
    e.preventDefault()
    let id = todoId()
    $('.form-bg').toggle("fast")
    todos.push({
        completed: false,
        taskId: todoId,
        title: `${ $('#title').val() }`,
        point: `${ $('#Point').val() }`,
        createdTime: `${ new Date().getDate() }:${ new Date().getDate() }:${ new Date().getDate() }`,
        dueTime: `${ $('#due-time').val() }`
    })

    $(`<div class="element">
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
        ${ $('#due-time').val() }
    </div></div>`)
        .appendTo(".list-container")

    localStorage.clear()
    fillLocalStorage(todos)
})

