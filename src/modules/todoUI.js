import CheckValidity from "./validity.js";

export default class ToDoUI {

    constructor() {
        this.MY_TOPIC5 = 'todo-creation';
        this.MY_TOPIC6 = 'todo-deletion';
        this.MY_TOPIC7 = 'todo-done';
        this.toDoList = document.querySelector('.to-do-list');
        this.addToDoBtn = document.querySelector('.add-todo');
        this.toDoCreationBar = document. querySelector('.to-do-edit');
        this.memoInput = document.querySelector('.memo');
        this.dateInput = document.querySelector('.date');
        this.createToDoBtn = document.querySelector('.create-todo');
        this.cancelToDo = document.querySelector('.cancel-todo');
    }

    launch() {
        this.toDoList.addEventListener('click', this.selectEvent.bind(this));
        this.addToDoBtn.addEventListener('click', this.toggleToDoInput.bind(this));
        this.createToDoBtn.addEventListener('click', this.insertToDo.bind(this));
   
    }

    toggleToDoInput() {
        this.toDoCreationBar.classList.toggle('active');
    }

    getUserInput() {
        const memo = this.memoInput.value;
        const date = this.dateInput.value;
        this.memoInput.value = '';
        this.dateInput.value = '';

        return [memo, date];
    }

    createToDo() {
        const btn = document.createElement('button');
        const p = document.createElement('p');
        const dateDiv = document.createElement('div');
        const div = document.createElement('div');
        const cancel = document.createElement('button');

        div.className = 'to-do';
        dateDiv.className = 'datedue';
        btn.className = 'finish';
        cancel.className = 'delete-todo';

        return [div, btn, p, dateDiv, cancel];
    }

    insertToDo() {
        let memo, date;
        let btn, p ,dateDiv, div, cancel;

        [div, btn, p, dateDiv, cancel] = this.createToDo();
        [memo, date] = this.getUserInput();

        // Check Validity
        div.setAttribute('data-memo', memo);
        if (!CheckValidity.checkValidityForTodo(date, memo)) return;

        p.textContent = memo;
        dateDiv.textContent = date;
        // Easy Reference to delete later
        cancel.setAttribute('data-memo', memo);
        btn.setAttribute('data-memo', memo);

        div.append(btn, p, dateDiv, cancel);
        this.toDoCreationBar.insertAdjacentElement('beforebegin', div);
        // Insert Pubsub to notify backend;
        PubSub.publish(this.MY_TOPIC5, [div, memo, date]);

        this.toggleToDoInput();
    }

    deleteToDo(elem) {
        const parent = elem.parentElement;
        parent.remove();

        // Insert Pubsub to notify backend;
        PubSub.publish(this.MY_TOPIC6, elem.getAttribute('data-memo'));
    }

    toggleFinish(elem) {
        const parent = elem.parentElement;
        parent.classList.toggle('done');

        PubSub.publish(this.MY_TOPIC7, elem.getAttribute('data-memo'));
    }
    
    selectEvent(e) {
        if (e.target.className === 'delete-todo') {
            this.deleteToDo(e.target);
        }
        
        if (e.target.className === 'finish') {
            this.toggleFinish(e.target);
        }
    }



}