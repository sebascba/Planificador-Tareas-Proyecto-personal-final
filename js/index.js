const formulario = document.querySelector('#formulario-tarea');

 const alertaError = document.querySelector('#alerta-error');

 function validFormFieldInput(data) {
     const tituloDeLaTarea = document.querySelector('#tituloDeLaTarea').value.trim();
    const fechaDeEntrega = document.querySelector('#fechaDeEntrega').value;
    const estadoTarea = document.querySelector('#estadoTarea').value;
    const descripcionDeLaTarea = document.querySelector('#descripcionDeLaTarea').value.trim();

     console.log("Título: " + tituloDeLaTarea);
    console.log("Fecha: " + fechaDeEntrega);
    console.log("Estado: " + estadoTarea);
    console.log("Descripción: " + descripcionDeLaTarea);

     
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
        console.log("Los campos del formulario son validos");
        
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

const taskManager = new TaskManager();
console.log(taskManager.tasks);