export default class CheckValidity {

    static allProjectsList = document.querySelector('.projects-list');

    static _checkForSameName(name) {
        const projects = CheckValidity.allProjectsList.children;
        console.log(name);

        for (let i = 0; i < projects.length -1; i++) {
            
            if (projects[i].getAttribute('data-name') == name) {
                return true;
            } 
        }
        return false;
    }

    static _checkForNoName(name) {
        if (name == '') {
            return true;
        } else return false;
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

    static _checkMoreThan12Char(name) {
        if (name.length > 12) {
            return true;
        } else {
            return false;
        }
    }
}