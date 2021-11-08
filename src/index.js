import 'normalize.css';
import './css/style.css';
import { MobileHeaderUI, ProjectBar } from "./modules/UI.js";
import EditProjectUI from './modules/editproject.js';
import Project from "./modules/project.js";
import PubSub from "pubsub-js";
import ToDo from './modules/to-do.js';
import ToDoUI from './modules/todoUI.js';
import ExtraFeature from './modules/extrafeature.js';



const MY_TOPIC1 = 'project_creation';
const MY_TOPIC2 = 'project_deletion';
const MY_TOPIC3 = 'project_info';
const MY_TOPIC4 = 'edit';
const MY_TOPIC5 = 'todo-creation';
const MY_TOPIC6 = 'todo-deletion';
const MY_TOPIC7 = 'todo-done';

const allProjects = [];

const findObject = (name) => {
    for (let i = 0; i < allProjects.length; i++) {
        if (allProjects[i].getName() == name) {
            return allProjects[i];
        }
    }
}

const createProjectHelper = (topic, name) => {
    const projectObject = Project(name);
    allProjects.push(projectObject);
}

const removeProjectFromProjectArray = (topic, name) => {
    for (let i = 0; i < allProjects.length; i++) {
        if (allProjects[i].getName() == name) {
            allProjects.splice(i, 1);
            console.log(allProjects);
        }
        
    }
}

const appendNameAndDescriptionHelper = (topic, name) => {
    for (let i = 0; i < allProjects.length; i++) {
        if (allProjects[i].getName() == name) {
            const infoName = allProjects[i].getName();
            const infoDescription = allProjects[i].getDescription();
            // Call method in UI class
            projectBar.refreshAndAppendTitle(infoName, infoDescription);

            let editProjectUI = new EditProjectUI();
            editProjectUI.launch();

            const projectToDos = allProjects[i].toDoHtml;
            projectBar.appendProjectToDo(projectToDos);

        }
        
    }
}

const editingHelper = (topic, arr) => {
    let name, changesName, changesDescription;
    name = arr[0];
    changesName = arr[1];
    changesDescription = arr[2];
    const project = findObject(arr[0]);
    project.editName(changesName);
    project.editDescription(changesDescription);

}

const createToDoHelper = (topic, arr) => {
    const currentProjectUI = document.querySelector('.project-child.selected');
    const currentProject = findObject(currentProjectUI.getAttribute('data-name'));
    const toDoObj = new ToDo(arr[1], arr[2]);
    currentProject.addToDo(arr[0], toDoObj);
    console.log(currentProject.toDoHtml);
    console.log(currentProject.toDo);
}

const deleteToDohelper = (topic, memo) => {
    const currentProjectUI = document.querySelector('.project-child.selected');
    const currentProject = findObject(currentProjectUI.getAttribute('data-name'));

    for (let i = 0; i < currentProject.toDo.length; i++) {
        if (currentProject.toDo[i].getMemo() === memo) {
            currentProject.toDo.splice(i,1);
            currentProject.toDoHtml.splice(i,1);

            console.log(currentProject.toDo, currentProject.toDoHtml);
        }
    }
}

const recordFinishedToDo = (topic, memo) => {
    const currentProjectUI = document.querySelector('.project-child.selected');
    const currentProject = findObject(currentProjectUI.getAttribute('data-name'));
    
    for (let i = 0; i < currentProject.toDo.length; i++) {
        if (currentProject.toDo[i].getMemo() === memo) {
            currentProject.toDo[i].setHasDone();

            console.log(currentProject.toDoHtml[i].classList, currentProject.toDo[i].getHasDone());
        }
    }
}

let token1 = PubSub.subscribe(MY_TOPIC1, createProjectHelper);
let token2 = PubSub.subscribe(MY_TOPIC2, removeProjectFromProjectArray);
let token3 = PubSub.subscribe(MY_TOPIC3, appendNameAndDescriptionHelper);
let token4 = PubSub.subscribe(MY_TOPIC4, editingHelper);
let token5 = PubSub.subscribe(MY_TOPIC5, createToDoHelper);
let token6 = PubSub.subscribe(MY_TOPIC6, deleteToDohelper);
let token7 = PubSub.subscribe(MY_TOPIC7, recordFinishedToDo);


const headerUI = new MobileHeaderUI();
const projectBar = new ProjectBar();
const toDoUI = new ToDoUI();
const extraFeature = new ExtraFeature();
headerUI.launch(); 
projectBar.launch();
toDoUI.launch();
extraFeature.launch();
