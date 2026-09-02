class TaskManager {
    constructor(currentId = 0) {
        this.tasks = [];
        this.currentId = currentId;
    }

    addTask(name, description, dueDate, status = 'Pendiente') {
        this.currentId++; 
        this.tasks.push({
            id: this.currentId,
            name: name,
            description: description,
            dueDate: dueDate,
            status: status
        });
    }

     deleteTask(taskId) {
        const newTasks = [];
        for (let task of this.tasks) {
            if (task.id !== taskId) {
                newTasks.push(task);
            }
        }
        this.tasks = newTasks;
    }

   createTaskHtml(id, name, description, dueDate, status) {
        let borderClass = 'border-warning';
        let badgeClass = 'bg-warning text-dark';

        if (status === 'Completado') {
            borderClass = 'border-success';
            badgeClass = 'bg-success text-white';
        } else if (status === 'Retrasado') {
            borderClass = 'border-danger';
            badgeClass = 'bg-danger text-white';
        }

        return `
            <div class="col" data-task-id="${id}">
                <div class="tarjeta-tarea ${borderClass} d-flex flex-column justify-content-between">
                    <div>
                        <div class="titulo-tarea">${name}</div>
                        <div class="fecha-tarea">Fecha de entrega: ${dueDate}</div>
                        <div class="descripcion-tarea">${description}</div>
                    </div>
                    
                    <div class="d-flex justify-content-between align-items-center mt-3 pt-2">
                        <button class="delete-button btn btn-danger btn-sm px-3">
                            Eliminar
                        </button>
                        
                        <div class="dropdown">
                            <button class="btn ${badgeClass} btn-sm dropdown-toggle px-3" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                ${status}
                            </button>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#" data-estado="Pendiente">Pendiente</a></li>
                                <li><a class="dropdown-item" href="#" data-estado="Completado">Completado</a></li>
                                <li><a class="dropdown-item" href="#" data-estado="Retrasado">Retrasado</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    render() {
        const tasksHtmlList = [];

        for (let i = 0; i < this.tasks.length; i++) {
            const currentTask = this.tasks[i];
            const taskHtml = this.createTaskHtml(
                currentTask.id,
                currentTask.name,
                currentTask.description,
                currentTask.dueDate,
                currentTask.status
            );
            tasksHtmlList.push(taskHtml);
        }

        const tasksHtml = tasksHtmlList.join('\n');
        const tasksListContainer = document.querySelector('#lista-de-tareas');
        if (tasksListContainer) {
            tasksListContainer.innerHTML = tasksHtml;
        }
    }

    save() {
        const tasksJson = JSON.stringify(this.tasks);
        localStorage.setItem('tasks', tasksJson);
        localStorage.setItem('currentId', this.currentId.toString());
    }

    load() {
        if (localStorage.getItem('tasks')) {
            const tasksJson = localStorage.getItem('tasks');
            this.tasks = JSON.parse(tasksJson);
        }
        if (localStorage.getItem('currentId')) {
            const currentId = localStorage.getItem('currentId');
            this.currentId = Number(currentId);
        }
    }
}