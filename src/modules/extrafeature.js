export default class ExtraFeature {
    constructor() {
        this.dueToday = document.querySelector('.due-today');
        this.dueThisWeek = document.querySelector('.due-next-week');
        this.projectMeta = document.querySelector('.project-meta');
        this.todoList = document.querySelector('.to-do-list');
        this.projectList = document.querySelector('.projects-list');

    }

    launch() {
        this.dueToday.addEventListener('click', this.displayToday.bind(this));
        this.dueThisWeek.addEventListener('click', this.displayThisWeek.bind(this));
        this.projectList.addEventListener('click', this.toggleBar.bind(this));
    }

    displayToday() {
        this.toggleBar('today');
        this.deselectProject();
        this.removeAndReplaceMeta('today');
        this.removeAllTodo();
    }

    displayThisWeek() {
        this.toggleBar('thisweek');
        this.deselectProject();
        this.removeAndReplaceMeta('thisweek');
        this.removeAllTodo();
    }

    toggleBar(due) {
        this.dueToday.className = 'due-today';
        this.dueThisWeek.className = 'due-next-week';
        if (due === 'today') {
            this.dueToday.classList.add('selected');
        }
        if (due === 'thisweek') {
            this.dueThisWeek.classList.add('selected');
        }
     }

    deselectProject() {
        const selectedProject = document.querySelector('.project-child.selected');
        if (selectedProject) {
            selectedProject.classList.toggle('selected');
        }
    }  

    removeAllTodo() {
        const todoListChild = this.todoList;
        
        while (todoListChild.firstElementChild) {

            if (Array.from(todoListChild.firstElementChild.classList).includes('to-do-edit')) {
                return;
            }

            todoListChild.firstElementChild.remove();
    
        }

    }

    removeAndReplaceMeta(due) {
        const metaItem = document.querySelector('.project-meta');

        while (metaItem.firstElementChild) {
            metaItem.lastElementChild.remove();
        }

        this.createAndInsertMeta(due);
    }

    createAndInsertMeta(due) {
        const h3 = document.createElement('h3');
        const p = document.createElement('p');

        if (due == 'today') {
            h3.textContent = 'Today';
            p.textContent = 'To-do that are due today!!!';
        }

        if (due == 'thisweek') {
            h3.textContent = 'Next 7 Days';
            p.textContent = 'To-do that are due this week!!!';
        }

        this.projectMeta.append(h3,p);
    }


}