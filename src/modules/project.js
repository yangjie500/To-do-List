export default function Project(name) {
    const toDo = [];
    const toDoHtml = [];
    let description = 'description?';

    const editName =  (newName) => {
        name = newName;
    }
    
    const editDescription = (newDescription) => {
        description = newDescription;
    }
    
    const getName = () => {
        return name;
    }

    const getDescription = () => {
        return description;
    }

    const appendToDo = () => {
        toDo.push('hello')
    }
    
    const addToDo = (toDoElem, object) => {
        toDoHtml.push(toDoElem);
        toDo.push(object);
    }

    return {
        toDo,
        toDoHtml,
        editName,
        getName,
        appendToDo,
        getDescription,
        editDescription,
        addToDo,
        name,
        description
    };
}


