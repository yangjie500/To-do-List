

export default class CheckValidity {

    static allProjectsList = document.querySelector('.projects-list');
    static allToDoList = document.querySelector('.to-do-list');

    static _checkForSameName(name) {
        const projects = CheckValidity.allProjectsList.children;
        
        for (let i = 0; i < projects.length -1; i++) {
            
            if ( projects[i].getAttribute('data-name')  && projects[i].getAttribute('data-name') == name) return true;

        }
        return false;
    }

    static _checkForNoName(name) {
        if (name == '') {
            return true;
        } else return false;
    }

    static _checkMoreThan12Char(name) {
        if (name.length > 12) {
            return true;
        } else {
            return false;
        }
    }

    static checkValidity(name) {
        if (CheckValidity._checkMoreThan12Char(name)) {
            alert('No More than 12 Characters')
            return false;
        }
        if (CheckValidity._checkForNoName(name) || CheckValidity._checkForSameName(name)) {
            alert('Not Valid Try Again')
            return false;
        } else {
            return true;
        }
    }

    static _todoCheckForNoSameMemo(memo) {
        const todos = CheckValidity.allToDoList.children;

        for (let i = 0; i < todos.length - 1; i++) {
            if (todos[i].getAttribute('data-memo') === memo) {
                return false;
            } 
        }

        return true;
    }

    static _todoCheckForDate(date) {
        const dateExist = date ? true : false;
        return dateExist;

    }

    static _noName(memo) {
        const memoExist = memo ? true : false;
        return memoExist;
    }



    static checkValidityForTodo(date, memo) {
        if (CheckValidity._todoCheckForDate(date) && CheckValidity._todoCheckForNoSameMemo(memo) && CheckValidity._noName(memo)) {
            return true;
        }
        
        alert('Please input date OR Same name exists already');
        return false

    }
}