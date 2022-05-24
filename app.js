$('.form-bg').toggle()
$('#add-item').click(() => $('.form-bg').toggle("fast"))
$('#submit').click((e) => {
    e.preventDefault()
    $('.form-bg').toggle("fast")
})