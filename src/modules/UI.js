import CheckValidity from "./validity";

class MobileHeaderUI {
    constructor() {
        this.navButton = document.querySelector('.fa-bars');
        this.navBar = document.querySelector('aside');
    }

    launch() {
        this.navButton.addEventListener('click', this.openNavBar.bind(this));
    }

    openNavBar() {
        this.navBar.classList.toggle('active');
    }
}

class ProjectBar {
    constructor() {
        this.MY_TOPIC1 = 'project_creation';
        this.MY_TOPIC2 = 'project_deletion';
        this.MY_TOPIC3 = 'project_info';
        this.projectBtn = document.querySelector('.projects');
        this.projectList = document.querySelector('.projects-list');
        this.projectAddDiv = document.querySelector('.add-project');
        this.createProjectBtn = document.querySelector('.fas.fa-plus'); 
        this.projectCreationModal = document.querySelector('.project-creation-ui');
        this.projectCreationModalCancelBtn = document.querySelector('.cancel');
        this.projectCreationModalCreateBtn = document.querySelector('.create');
        this.projectCreationModalInput = document.querySelector('input[type=text]');
        this.projectMeta = document.querySelector('.project-meta');
        this.toDoList = document.querySelector('.to-do-list');
    }

    launch() {
        this.projectBtn.addEventListener('click', this.openProjectBar.bind(this));
        this.createProjectBtn.addEventListener('click', this.openCreateProjectModal.bind(this));
        this.projectCreationModalCancelBtn.addEventListener('click', this.closeCreateProjectModal.bind(this));
        this.projectCreationModalCreateBtn.addEventListener('click', this.createProjectAndAppend.bind(this));
        this.projectList.addEventListener('click', this.setActiveOrDelete.bind(this));

    }

    setActiveOrDelete(e) {
        if (e.target.className == 'delete-project') {
            this.deleteProject(e.target);
        }
        if (e.target.className == 'project-child') {
            this.setActiveProject(e.target);
            PubSub.publish(this.MY_TOPIC3, e.target.getAttribute('data-name'));
        }
        if (e.target.className == 'fas fa-list-ul' || e.target.className == 'project-name') {
            this.setActiveProject(e.target);
        }
    }

    openProjectBar() {
        this.projectList.classList.toggle('active');
    }

    openCreateProjectModal() {
        this.projectCreationModal.classList.toggle('active');
    }

    closeCreateProjectModal() {
        this.projectCreationModal.classList.toggle('active');
        this.projectCreationModalInput.value = '';
    }

    createProjectAndAppend() {
        const name = this.projectCreationModalInput.value;
        //  Validity checking using another Class
        if (!CheckValidity.checkValidity(name)) return;

        const project = this.createProjectDiv(name)
        this.appendProject(project);
        this.closeCreateProjectModal();

        PubSub.publish(this.MY_TOPIC1, name);
    }

    createProjectDiv(name) {
        const div = document.createElement('div');
        const i = document.createElement('i');
        const p = document.createElement('p');
        const button = document.createElement('button');
        
        div.className = 'project-child';
        i.className = 'fas fa-list-ul';
        p.className = 'project-name';
        p.textContent = name;
        button.className = 'delete-project';

        div.setAttribute('data-name', name);


        div.append(i, p, button);
        return div;
    }

    appendProject(project) {
        this.projectAddDiv.insertAdjacentElement('beforebegin', project);
    }

    deleteProject(elem) {
        const parentProject = elem.parentElement;
        parentProject.remove();

        const name = this.getNameOfDeletingProject(parentProject);
        PubSub.publish(this.MY_TOPIC2, name);

    }

    getNameOfDeletingProject(parentProject) {
        for (let i = 0; i < parentProject.children.length; i++) {
            if (parentProject.children[i].tagName == "P") {
                return parentProject.children[i].textContent;
            }
        }
    }

    setActiveProject(elem) {
        this.removeAllActiveProject();
        elem.classList.toggle('selected');
    }

    removeAllActiveProject() {
        const projects = document.querySelectorAll('.project-child');
        projects.forEach( (elem) => {
            elem.className = 'project-child';
        })
    }

    refreshToDo() {
        while (this.projectMeta.firstChild) {
            this.projectMeta.removeChild(this.projectMeta.lastChild);
        }
        while (this.toDoList.firstChild) {
            this.toDoList.removeChild(this.toDoList.lastChild);
        }
    }

    createTitleAndDescription(name, description) {
        const h3 = document.createElement('h3');
        const span = document.createElement('span');
        const p = document.createElement('p');

        h3.textContent = name;
        p.textContent = description;
        span.textContent = 'edit';

        h3.className = "project-name";
        span.className = "edit-project";
        p.className = "project-description";

        return [h3, span, p]
    }

    // From backend get name and description
    refreshAndAppendTitle(name, description) {
        let h3, span, p;
        this.refreshToDo();
        [h3, span, p] = this.createTitleAndDescription(name, description);
        console.log(h3,span,p)
        this.projectMeta.append(h3,span,p);
    }
 
}

class EditProjectUI {
    constructor() {
        this.projectName = document.querySelector('.project-name');
        this.projectDescription = document.querySelector('.project-description');
        this.projectEditBtn = document.querySelector('.edit-project')
    }

    launch() {
        //this.projectEditBtn.addEventListener('click', openEditMenu.bind(this));
    }

    openEditMenu() {

    }
    
    createInputForEdit() {
        const input1 = document.createElement('input');
        const input2 = document.createElement('input');
        input1.setAttribute('type', 'text'); 
        input2.setAttribute('type', 'text')
    }
}



export { MobileHeaderUI, ProjectBar, EditProjectUI };


