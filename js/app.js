let todos = []

$('.form-bg').toggle()
$('#add-item').click(() => $('.form-bg').toggle("fast"))
$('#submit').click((e) => {
    e.preventDefault()
    $('.form-bg').toggle("fast")
    todos.push({
        completed: false,
        taskId: 231,
        title: `${ $('#title').val() }`,
        point: `${ $('#Point').val() }`,
        createdTime: `${ new Date().getDate() }:${ new Date().getDate() }:${ new Date().getDate() }`
    })

    $(`<div class="element">
    <div>
    <input type="checkbox">
    </div>
    <div>
        <p>${ todoId() }</p>
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
})