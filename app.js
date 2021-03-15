const iconChange = document.querySelector('.theme')
const bgChange = document.querySelector('.container')

// + Dark and light background
iconChange.addEventListener("click", () => {
    if(iconChange.children[0].classList.contains('fa-moon')) {
        bgChange.classList.toggle('change')
        iconChange.classList.toggle('light')
        iconChange.removeChild(iconChange.childNodes[0]);
        iconChange.innerHTML = `<i class="fas fa-sun"></i>`
    } else {
        bgChange.classList.toggle('change')
        iconChange.classList.toggle('light')
        iconChange.removeChild(iconChange.childNodes[0]);
        iconChange.innerHTML = `<i class="fas fa-moon"></i>`
    }
})
