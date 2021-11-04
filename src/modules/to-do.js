export default function ToDo(memo) {
    let date;
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
    
    
    return {
        getMemo,
        getDate,
        setHasDone
    }
}