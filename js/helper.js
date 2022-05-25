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
    $(`${ id }:nth-of-type(7)`).html(`<p>${ curTime(task.dueTime) }</p>`)
}
const updateProgress = (task) => {
    let divId = `#div${ task.taskId }`
    $(divId).toggleClass('done')
}

