document.addEventListener('DOMContentLoaded', () => {
    const taskList = document.getElementById('task-list');
    const newTaskInput = document.getElementById('new-task-input');
    const addTaskButton = document.getElementById('add-task-button');

    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function renderTasks() {
        taskList.innerHTML = '';
        savedTasks.forEach((task, index) => {
            addTaskToDOM(task, index);
        });
    }

    function addTaskToDOM(task, index) {
        const listItem = document.createElement('li');
        const taskText = document.createElement('span');
        taskText.textContent = task.name;

        if (task.completed) {
            taskText.classList.add('completed');
        }

        const completeButton = document.createElement('button');
        completeButton.textContent = '✔️';
        completeButton.addEventListener('click', () => {
            toggleComplete(index);
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = '❌';
        deleteButton.addEventListener('click', () => {
            deleteTask(index);
        });

        listItem.appendChild(taskText);
        listItem.appendChild(completeButton);
        listItem.appendChild(deleteButton);
        taskList.appendChild(listItem);
    }

    function toggleComplete(index) {
        savedTasks[index].completed = !savedTasks[index].completed;
        localStorage.setItem('tasks', JSON.stringify(savedTasks));
        renderTasks();
    }

    function deleteTask(index) {
        savedTasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(savedTasks));
        renderTasks();
    }

    addTaskButton.addEventListener('click', () => {
        const taskName = newTaskInput.value.trim();
        if (taskName !== '') {
            const newTask = { name: taskName, completed: false };
            savedTasks.push(newTask);
            localStorage.setItem('tasks', JSON.stringify(savedTasks));
            newTaskInput.value = '';
            renderTasks();
        }
    });

    renderTasks();
});