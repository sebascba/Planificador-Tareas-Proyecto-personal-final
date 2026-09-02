const taskManager = new TaskManager();

taskManager.load();
taskManager.render();

const formulario = document.querySelector('#formulario-tarea');
const alertaError = document.querySelector('#alerta-error');

function validFormFieldInput() {
    const tituloDeLaTarea = document.querySelector('#tituloDeLaTarea').value.trim();
    const fechaDeEntrega = document.querySelector('#fechaDeEntrega').value;
    const estadoTarea = document.querySelector('#estadoTarea').value;
    const descripcionDeLaTarea = document.querySelector('#descripcionDeLaTarea').value.trim();

    if (tituloDeLaTarea === '' || descripcionDeLaTarea === '' || fechaDeEntrega === '' || estadoTarea === '') {
        alertaError.classList.remove('d-none');
        alertaError.classList.add('d-block');
        return false;
    } else {
        alertaError.classList.remove('d-block');
        alertaError.classList.add('d-none');
        return true;  
    }
}

formulario.addEventListener('submit', function(evento) {
    evento.preventDefault();  

    const formularioValido = validFormFieldInput();

    if (formularioValido) {
        const tituloDeLaTarea = document.querySelector('#tituloDeLaTarea').value.trim();
        const descripcionDeLaTarea = document.querySelector('#descripcionDeLaTarea').value.trim();
        const fechaDeEntrega = document.querySelector('#fechaDeEntrega').value;
        const estadoTarea = document.querySelector('#estadoTarea').value;

         taskManager.addTask(
            tituloDeLaTarea,
            descripcionDeLaTarea,
            fechaDeEntrega,
            estadoTarea
        );

         taskManager.save();
         taskManager.render();
        formulario.reset();
    }
});

const listaDeTareas = document.querySelector('#lista-de-tareas');

if (listaDeTareas) {
    listaDeTareas.addEventListener('click', (event) => {
        event.preventDefault();  
         if (event.target.classList.contains('delete-button')) {
            const parentTask = event.target.closest('.col');
            
            if (parentTask) {
                const taskId = Number(parentTask.dataset.taskId);
                
                taskManager.deleteTask(taskId);
                taskManager.save();
                taskManager.render();
            }
        }

         if (event.target.classList.contains('dropdown-item')) {
            const parentTask = event.target.closest('.col');

            if (parentTask) {
                const taskId = Number(parentTask.dataset.taskId);
                const nuevoEstado = event.target.getAttribute('data-estado');

                 const tareaActual = taskManager.tasks.find(task => task.id === taskId);
                if (tareaActual) {
                    tareaActual.status = nuevoEstado;
                    
                     taskManager.save();
                    taskManager.render();
                }
            }
        }
    });
}