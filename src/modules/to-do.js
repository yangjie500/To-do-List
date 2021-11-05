export default function ToDo(memo, date) {
    let hasDone = false;

    const getMemo = () => {
        return memo
    }
    
    const getDate = () => {
        return date
    }
    
    const setHasDone = () => {
        hasDone = hasDone ? false : true;
    }

    const getHasDone = () => {
        return hasDone;
    }
    
    
    return {
        memo,
        date,
        getHasDone,
        getMemo,
        getDate,
        setHasDone
    }
}