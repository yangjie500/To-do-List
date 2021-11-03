export default function Project(name) {
    const toDo = [];
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

    return {
        toDo,
        editName,
        getName,
        appendToDo,
        getDescription,
        editDescription,
        name,
        description
    };
}


