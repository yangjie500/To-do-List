const navButton = document.querySelector('.fa-bars');
const navBar = document.querySelector('aside');
const projects = document.querySelector('.projects');
const projectsList = document.querySelector('.projects-list');
const caret = document.querySelector('.fa-caret-up');

navButton.addEventListener('click', (e) => {
    navBar.classList.toggle('active');
})

projects.addEventListener('click', (e) => {
    projectsList.classList.toggle('active');
    caret.classList.toggle('active');
})