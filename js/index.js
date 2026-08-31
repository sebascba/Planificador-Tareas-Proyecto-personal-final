 const taskManager = new TaskManager();

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

        console.log(taskManager.tasks);

         formulario.reset();
    }
});

 document.addEventListener('click', function(e) {
    if (e.target.classList.contains('dropdown-item')) {
        e.preventDefault();
        
        const tarjeta = e.target.closest('.tarjeta-tarea');
        const botonBadge = tarjeta.querySelector('.dropdown-toggle');
        
        const nuevoEstado = e.target.getAttribute('data-estado');
        const nuevoBg = e.target.getAttribute('data-bg');
        const nuevoBorder = e.target.getAttribute('data-border');
        
        tarjeta.classList.remove('border-success', 'border-warning', 'border-danger');
        tarjeta.classList.add(nuevoBorder);
        
        botonBadge.className = `badge ${nuevoBg} etiqueta-personalizada dropdown-toggle`;
        botonBadge.textContent = nuevoEstado;
    }
});