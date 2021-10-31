
export default function Project(name) {
    const toDo = [];

    const editName =  (newName) => {
        name = newName;
    }
    
    const getName = () => {
        return name;
    }

    const appendToDo = () => {
        toDo.push('hello')
    }

    return {
        toDo,
        editName,
        getName,
        appendToDo,
        name
    };
}


