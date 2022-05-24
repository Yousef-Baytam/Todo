const curTime = () => {
    return `${ new Date().getDate() }:${ new Date().getMonth() + 1 }:${ new Date().getFullYear() }  ${ new Date().getHours() }:${ new Date().getMinutes() }:${ new Date().getSeconds() }`
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

const renderTodos = (arr) => {
    for (todo of arr) {
        $(`<div class="element">
    <div>
    <input type="checkbox" name="Completed" id="Completed" ${ todo.completed ? checked : '' }>
    </div>
    <div>
        <p>${ todo.taskId }</p>
    </div>
    <div>
        <p>${ todo.title }</p>
    </div>
    <div>
        <p>${ todo.Description }</p>
    </div>
    <div>
        ${ todo.point }
    </div>
    <div>
        <p>${ todo.createdTime }</p>
    </div>
    <div>
        ${ todo.dueTime }
    </div></div>`)
            .appendTo(".list-container")
    }
}