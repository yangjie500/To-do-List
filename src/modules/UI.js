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
        this.projectBtn = document.querySelector('.projects');
        this.projectList = document.querySelector('.projects-list');
        this.projectAddDiv = document.querySelector('.add-project');
        this.createProjectBtn = document.querySelector('.fas.fa-plus'); 
        this.projectCreationModal = document.querySelector('.project-creation-ui');
        this.projectCreationModalCancelBtn = document.querySelector('.cancel');
        this.projectCreationModalCreateBtn = document.querySelector('.create');
        this.projectCreationModalInput = document.querySelector('input[type=text]');
    }

    launch() {
        this.projectBtn.addEventListener('click', this.openProjectBar.bind(this));
        this.createProjectBtn.addEventListener('click', this.openCreateProjectModal.bind(this));
        this.projectCreationModalCancelBtn.addEventListener('click', this.closeCreateProjectModal.bind(this));
        this.projectCreationModalCreateBtn.addEventListener('click', this.createProjectAndAppend.bind(this));
        this.projectList.addEventListener('click', this.checkEventTarget.bind(this));

    }

    checkEventTarget(e) {
        if (e.target.className == 'delete-project') {
            this.deleteProject(e.target);
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
        p.textContent = name;
        button.className = 'delete-project';

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


 
}

export { MobileHeaderUI, ProjectBar };


















const projectModal = (() => {
    const projectList = document.querySelector('.projects-list');
    const createProjectBtn = document.querySelector('.fas.fa-plus');
    const addProjectDiv = document.querySelector('.add-project');
    const cancelBtn = document.querySelector('.cancel');
    const createBtn = document.querySelector('.create');
    const projectCreationUi = document.querySelector('.project-creation-ui');
    const nameInput = document.querySelector('input[type="text"]');
    
    createProjectDiv = (name) => {
        const div = document.createElement('div');
        const i = document.createElement('i');
        const p = document.createElement('p');
        const button = document.createElement('button');
        
        div.className = 'project-child';
        i.className = 'fas fa-list-ul';
        p.textContent = name;

        div.append(i, p, button);
        return div;
    }


    projectList.addEventListener('click', (e) => {
        const targetChildren = e.target;
    })

    createProjectBtn.addEventListener('click', (e) => {
        createProjectBtn.classList.toggle('active');
        projectCreationUi.classList.toggle('active');

    })

    cancelBtn.addEventListener('click', (e) => {
        createProjectBtn.classList.toggle('active');
        projectCreationUi.classList.toggle('active');
        nameInput.value = ''
    })

    createBtn.addEventListener('click', (e) => {
        const name = nameInput.value;
        const project = createProjectDiv(name);
        addProjectDiv.insertAdjacentElement('beforebegin', project);
        nameInput.value = "";
        createProjectBtn.classList.toggle('active');
        projectCreationUi.classList.toggle('active');
        
    })



});

