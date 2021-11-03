export default class EditProjectUI {
    constructor() {
        this.MY_TOPIC4 = "edit";
        this.projectMeta = document.querySelector('.project-meta');
        this.projectName = document.querySelector('h3.project-name');
        this.projectBarName = document.querySelector('.project-child.selected p');
        this.projectDescription = document.querySelector('.project-description');
        this.projectEditBtn = document.querySelector('.edit-project');
        
    }

    launch() {
        this.projectEditBtn.addEventListener('click', this.openEditMenu.bind(this));
    }

    openEditMenu() {
        let input1, input2, yesBtn;
        [input1, input2, yesBtn] = this.createInputForEdit();

        this.projectMeta.classList.toggle('editing');
        this.projectMeta.append(input1, input2, yesBtn);
    }
    
    createInputForEdit() {
        const input1 = document.createElement('input');
        const input2 = document.createElement('input');
        input1.className = "edit-name";
        input2.className = "edit-description";
        input1.setAttribute('type', 'text'); 
        input2.setAttribute('type', 'text');
        input1.setAttribute('value', this.projectName.textContent);
        input2.setAttribute('value', this.projectDescription.textContent);

        const yesBtn = document.createElement('button');
        yesBtn.setAttribute('class', 'confirm-edit');
        yesBtn.textContent = 'Edit';
        this.affixEventListenerForBtn(yesBtn);

        return [input1, input2, yesBtn];
    }

    affixEventListenerForBtn(yesBtn) {
        yesBtn.addEventListener('click', this.editAndClose.bind(this));
    }

    editAndClose() {
        const input1 = document.querySelector('.edit-name');
        const input2 = document.querySelector('.edit-description');
        const yesBtn = document.querySelector('.confirm-edit');
        PubSub.publish(this.MY_TOPIC4, [this.projectBarName.textContent,input1.value, input2.value]);

        this.projectName.textContent = input1.value;
        this.projectDescription.textContent = input2.value;
        this.projectBarName.textContent = input1.value;
        this.projectBarName.parentElement.setAttribute('data-name', input1.value);

        this.closeEditMenu(input1, input2, yesBtn);
    }

    closeEditMenu(input1, input2, yesBtn) {
        input1.remove();
        input2.remove();
        yesBtn.remove();

        this.projectMeta.classList.toggle('editing');
    }
}
