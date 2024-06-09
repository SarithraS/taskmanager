document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('taskForm');
    const tasksList = document.getElementById('tasksList');

    // Fetch tasks from the server
    const fetchTasks = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/tasks');
            const tasks = await response.json();
            tasksList.innerHTML = '';
            tasks.forEach(task => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <span>${task.title} - ${task.description} - ${task.dueDate}</span>
                    <button onclick="deleteTask('${task._id}')">Delete</button>
                `;
                tasksList.appendChild(li);
            });
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    fetchTasks();

    // Add new task
    taskForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const dueDate = document.getElementById('dueDate').value;

        try {
            await fetch('http://localhost:5000/api/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, description, dueDate })
            });
            fetchTasks();
            taskForm.reset();
        } catch (error) {
            console.error('Error adding task:', error);
        }
    });

    // Delete task function
    window.deleteTask = async (id) => {
        try {
            await fetch(`http://localhost:5000/api/tasks/${id}`, {
                method: 'DELETE'
            });
            fetchTasks();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };
});
