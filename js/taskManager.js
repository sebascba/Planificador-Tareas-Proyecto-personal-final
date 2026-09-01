class TaskManager {
    constructor(currentId = 0) {
        this.tasks = [];
        this.currentId = currentId;
    }

    addTask(name, description, dueDate, status = 'PORHACER') {
        this.currentId++; 
        this.tasks.push({
            id: this.currentId,
            name: name,
            description: description,
            dueDate: dueDate,
            status: status
        });
    }

    createTaskHtml(id, name, description, dueDate, status) {
    const html = `
        <div class="col" data-task-id="${id}">
            <div class="tarjeta-tarea border-warning">
                <div class="titulo-tarea">${name}</div>
                <div class="fecha-tarea">Fecha de entrega: ${dueDate}</div>
                <div class="descripcion-tarea">${description}</div>
                
                 <button class="delete-button btn btn-danger btn-sm" style="position: absolute; bottom: 15px; left: 15px;">
                    Eliminar
                </button>
                
                <div class="dropdown" style="position: absolute; bottom: 15px; right: 15px;">
                    <button class="badge bg-warning text-dark etiqueta-personalizada dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        ${status}
                    </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#" data-estado="Pendiente" data-bg="bg-warning text-dark" data-border="border-warning">Pendiente</a></li>
                        <li><a class="dropdown-item" href="#" data-estado="Completado" data-bg="bg-success" data-border="border-success">Completado</a></li>
                        <li><a class="dropdown-item" href="#" data-estado="Retrasado" data-bg="bg-danger" data-border="border-danger">Retrasado</a></li>
                    </ul>
                </div>
            </div>
        </div>
    `;
    return html;
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
}
 