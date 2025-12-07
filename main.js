//  VALIDACIONES BÁSICAS 

// Función para validar  correo
function correoValido(correo) {
    // Debe tener texto + @ + texto + . + texto
    let regex = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
    return regex.test(correo);
}

// Función para validar contraseña pide un minimo de 6 caracteres
function claveValida(clave) {
    return clave.length >= 6;
}

//  DATOS EN MEMORIA 

// Objeto que simula una "base de datos" en memoria
let usuarioActual = {
    correo: "",           // Guardará el correo registrado
    clave: "",            // Guardará la contraseña
    intentosFallidos: 0,  // Contador de intentos de login fallidos
    bloqueado: false      // Estado de bloqueo temporal
};

// REGISTRO

 // se ejecuta cuando el usuario envia el formulario de registro

document.getElementById("formRegistro").addEventListener("submit", function(e){
    e.preventDefault(); // Evita que el formulario se recargue

    // Obtener valores ingresados
    let correo = document.getElementById("emailRegistro").value.trim();
    let clave = document.getElementById("passRegistro").value.trim();

    // Validaciones de correo y cntraseña
    if(!correoValido(correo)) {
        alert("Por favor ingresa un correo válido");
        return;
    }

    if(!claveValida(clave)) {
        alert("La contraseña debe tener al menos 6 caracteres");
        return;
    }

    // Guardar datos en el objeto
    usuarioActual.correo = correo;
    usuarioActual.clave = clave;
    usuarioActual.intentosFallidos = 0;
    usuarioActual.bloqueado = false;

    alert("Usuario registrado correctamente");
});

//  LOGIN 

// se ejecuta al enviar el formulario de inicio de sesión
document.getElementById("formLogin").addEventListener("submit", function(e){
    e.preventDefault(); // Evita recargar la página

    // Revisar si el usuario está bloqueado
    if(usuarioActual.bloqueado) {
        document.getElementById("bloqueoMensaje").textContent = 
            "Cuenta bloqueada temporalmente.";
        return;
    }

    // Obtener datos ingresados
    let correo = document.getElementById("emailLogin").value.trim();
    let clave = document.getElementById("passLogin").value.trim();

    // Verificar coincidencia con los datos registrados
    if(correo === usuarioActual.correo && clave === usuarioActual.clave) {
        alert("Has iniciado sesión correctamente");
        usuarioActual.intentosFallidos = 0; // Resetear intentos
    } else {
        // Contador de intentos fallidos
        usuarioActual.intentosFallidos++;

        if(usuarioActual.intentosFallidos >= 3) {
            // Bloquear usuario después de 3 intentos fallidos
            usuarioActual.bloqueado = true;
            document.getElementById("bloqueoMensaje").textContent = 
                "Se ha bloqueado la cuenta por 20 segundos.";

            // Desbloquear después de 20 segundos
            setTimeout(() => {
                usuarioActual.bloqueado = false;
                usuarioActual.intentosFallidos = 0;
                document.getElementById("bloqueoMensaje").textContent = "";
            }, 20000);
        } else {
            alert("Correo o contraseña incorrectos. Intento " + usuarioActual.intentosFallidos);
        }
    }
});

// MOSTRAR CONTRASEÑA 

// sirve para mostrar y cultar la contraseña
document.getElementById("verPass").addEventListener("change", function(){
    let campo = document.getElementById("passLogin");
    campo.type = campo.type === "password" ? "text" : "password";
});

//RECUPERAR CONTRASEÑA 

// se ejecuta al enviar el formulario de recuperación
document.getElementById("formRecuperar").addEventListener("submit", function(e){
    e.preventDefault(); // Evita recargar la página

    // Obtener correo ingresado
    let correo = document.getElementById("emailRecuperar").value.trim();

    // Verificar si el correo existe
    if(correo !== usuarioActual.correo) {
        document.getElementById("mensaje").textContent = 
            "Correo no registrado";
        return;
    }

    // Pedir al usuario la nueva contraseña
    let nuevaClave = prompt("Ingresa tu nueva contraseña:");

    // Validar nueva contraseña
    if(!claveValida(nuevaClave)) {
        document.getElementById("mensaje").textContent = 
            "La nueva contraseña debe tener al menos 6 caracteres";
        return;
    }

    // Actualizar datos del usuario
    usuarioActual.clave = nuevaClave;
    usuarioActual.intentosFallidos = 0;
    usuarioActual.bloqueado = false;

    document.getElementById("mensaje").textContent = 
        "Contraseña actualizada correctamente";
});
