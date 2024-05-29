const toggleMenu = document.getElementsByClassName('menu')[0]
const links = document.getElementsByClassName('links')[0]

toggleMenu.addEventListener('click', () => {
    links.classList.toggle('active')
})