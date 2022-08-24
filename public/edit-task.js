const params = window.location.search;
const id = new URLSearchParams(params).get('id');
const taskIdValue = document.querySelector('.task-edit-id');
const taskNameValue = document.querySelector('.task-edit-name');
const taskCheckboxValue = document.querySelector('.task-edit-completed');

const getTask = async() => {
    try{
        const {data: {task}} = await axios.get(`/api/v1/tasks/${id}`);
        const {_id: taskID, name, completed} = task;
        console.log(task)

        taskIdValue.textContent = taskID;
        taskNameValue.value = name;
        taskCheckboxValue.checked = completed;
    }
    catch(err){
        console.log(err);
    }
}

getTask()