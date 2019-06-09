document.getElementById('next').addEventListener('click', () => {
    var number = document.getElementsByClassName("page-link")
    for (let i = 4; i < number.length - 1; i++) {
        number[i].style.display = "block"
    }
    for (let i = 1; i < 4; i++) {
        number[i].style.display = "none"
    }
})
document.getElementById('previous').addEventListener('click', () => {
    var number = document.getElementsByClassName("page-link")
    for (let i = 4; i < number.length - 1; i++) {
        number[i].style.display = "none"
    }
    for (let i = 1; i < 4; i++) {
        number[i].style.display = "block"
    }
})