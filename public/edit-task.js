const params = window.location.search;
const id = new URLSearchParams(params).get('id');
const taskIdValue = document.querySelector('.task-edit-id');
const taskNameValue = document.querySelector('.task-edit-name');
const taskCheckboxValue = document.querySelector('.task-edit-completed');
const editTaskForm = document.querySelector('.single-task-form');
const editButton = document.querySelector('.task-edit-btn');
const formAlert = document.querySelector('.form-alert');

const getTask = async() => {
    try{
        const {data: {task}} = await axios.get(`/api/v1/tasks/${id}`);
        const {_id: taskID, name, completed} = task;

        taskIdValue.textContent = taskID;
        taskNameValue.value = name;
        taskCheckboxValue.checked = completed;
    }
    catch(err){
        console.error(err);
    }
}

getTask()

//SUBMIT INFO TO BACKEND

editTaskForm.addEventListener('submit', async (e) => {
    editButton.textContent = 'Loading...'; 
    e.preventDefault();
    try{
        const taskName = taskNameValue.value;
        const isChecked = taskCheckboxValue.checked;

        const {data: {task}} = await axios.patch(`/api/v1/tasks/${id}`, {
            name: taskName,
            completed: isChecked
        });

        const {_id:taskID, name, completed} = task;

        taskIdValue.textContent = taskID;
        taskNameValue.value = name;
        taskCheckboxValue.checked = completed;
        
        formAlert.style.display = 'block';
        formAlert.textContent = 'success, task edited';
        formAlert.classList.add('text-success');
    }
    catch(err){
        console.error(err);
        formAlert.style.display = 'block'
        formAlert.innerHTML = 'error, please try again';
    }
    editButton.textContent = 'Edit';
    setTimeout(() => {
        formAlert.style.display = 'none';
        formAlert.classList.remove('text-success');
    }, 3000);
});