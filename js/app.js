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
