import 'normalize.css';
import './css/style.css';
import { MobileHeaderUI, ProjectBar } from "./modules/UI.js";
import EditProjectUI from './modules/editproject.js';
import Project from "./modules/project.js";
import PubSub from "pubsub-js";



const MY_TOPIC1 = 'project_creation';
const MY_TOPIC2 = 'project_deletion';
const MY_TOPIC3 = 'project_info';
const MY_TOPIC4 = 'edit';

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
    console.log(name);
    for (let i = 0; i < allProjects.length; i++) {
        if (allProjects[i].getName() == name) {
            const infoName = allProjects[i].getName();
            const infoDescription = allProjects[i].getDescription();
            projectBar.refreshAndAppendTitle(infoName, infoDescription);
            let editProjectUI = new EditProjectUI();
            editProjectUI.launch();
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

let token1 = PubSub.subscribe(MY_TOPIC1, createProjectHelper);
let token2 = PubSub.subscribe(MY_TOPIC2, removeProjectFromProjectArray);
let token3 = PubSub.subscribe(MY_TOPIC3, appendNameAndDescriptionHelper);
let token4 = PubSub.subscribe(MY_TOPIC4, editingHelper);


const headerUI = new MobileHeaderUI();
const projectBar = new ProjectBar();
headerUI.launch(); 
projectBar.launch();
