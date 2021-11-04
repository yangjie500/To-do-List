export default class ToDoUI {

    constructor() {
        this.toDoList = document.querySelector('.to-do-list');
        this.addToDoBtn = document.querySelector('.add-todo');
        this.toDoCreationBar = document. querySelector('.to-do-edit');
        this.memoInput = document.querySelector('.memo');
        this.dateInput = document.querySelector('.date');
        this.createToDo = document.querySelector('.create-todo');
        this.cancelToDo = document.querySelector('.cancel-todo');
    }

    launch() {
        //this.toDoList.addEventListener('click', this.selectEvent.bind(this));
        console.log(this.toDoList);
        this.addToDoBtn.addEventListener('click', this.createToDoInput.bind(this));
    }

    createToDoInput() {
        this.toDoCreationBar.classList.toggle('active');
    } 

}