import 'normalize.css';
import './css/style.css';
import { MobileHeaderUI, ProjectBar } from "./modules/UI.js";
import Project from "./modules/project.js";
import PubSub from "pubsub-js";



const MY_TOPIC1 = 'project_creation';
const MY_TOPIC2 = 'project_deletion';
const allProjects = [];

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

let token1 = PubSub.subscribe(MY_TOPIC1, createProjectHelper);
let token2 = PubSub.subscribe(MY_TOPIC2, removeProjectFromProjectArray);



const headerUI = new MobileHeaderUI();
const projectBar = new ProjectBar();
headerUI.launch(); 
projectBar.launch();
