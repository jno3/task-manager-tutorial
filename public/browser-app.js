const formAlert = document.getElementById('form-alert');
// GET ALL TASKS
const tasksDiv = document.getElementById('tasks-div');

const getAllTasks = async () => {
    try {
        const { data: { tasks } } = await axios.get('/api/v1/tasks');

        if (tasks.length < 1) {
            tasksDiv.innerHTML = '<h5>No tasks in your list</h5>';
            return;
        }
        const allTasks = tasks.map((task) => {
            const { _id: taskID, name, completed } = task;
            return `
            <div class="single-task" ${completed && 'task-completed'}>
                <h5><span><i class="far fa-check-circle"></i></span>${name}</h5>
                <div class="task-links">
                    <a href="task.html?id=${taskID}" class="edit-link">
                    edit
                        <i class="fas fa-edit"></i>
                    </a>

                    <button type="button" class="delete-btn" data-id="${taskID}">
                    delete
                        <i class="fas fa fa-trash"></i>
                    </button>
                </div>
            </div>`

        }).join('');
        tasksDiv.innerHTML = allTasks;
    }
    catch (err) {
        tasksDiv.innerHTML = '<h5>No tasks in your list</h5>';
    }
}

getAllTasks();

// DELETE TASK
tasksDiv.addEventListener('click', async (e) => {
    const el = e.target;
    console.log(el.classList)
    if(el.classList.contains('delete-btn')){
        const id = el.dataset.id;
        try{
            await axios.delete(`/api/v1/tasks/${id}`);
            getAllTasks();
        }
        catch(err){
            console.log(err);
        }
    }
});

// SUBMIT TASK TO BACKEND
const submitForm = document.querySelector('.form-control');
const submitFormValue = document.querySelector('.task-input');

submitForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = submitFormValue.value;
    try {
        await axios.post('/api/v1/tasks', { name });
        getAllTasks();
        submitFormValue.value = '';
        formAlert.style.display = 'block';
        formAlert.textContent = 'success, task added';
        formAlert.classList.add('text-success');
    }
    catch (err) {
        formAlert.textContent = 'error, please try again';
    }
    setTimeout(() => {
        formAlert.style.display = 'none';
        formAlert.classList.remove('text-success');
    }, 3000);
})






















