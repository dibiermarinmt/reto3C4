let raiz = "http://129.151.117.196:8080/api/user";
let alerta = "";

function habilitarUser(){
    let correo = $("#email").val();
    let clave = $("#password").val();

    $.ajax({
        //crossOrigin: true,
        url: raiz + "/" + correo + "/" + clave,
        type: "GET",
        dataType: "JSON",

        success: function(json) {
            console.log(json);
            if(json.id != null) {
                alert("Bienvenido " + json.name +" ! ! !");
                pintarOpciones();
            } else {
                alert("El usuario no está en la base. Revisa tus credenciales o crea un usuario nuevo");
            }
        },

        error: function() {
            alert("Algo pasó...")
        }
    });
}


function correoValido() {
    let esCorreo = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test($("#email").val());
    
    if(!esCorreo) {
        alerta = "Por favor escriba un correo electrónico valido."
        return false;
    } else {
        return true;
    }
}

function claveValida() {
    if($("#password").val() == "") {
        alerta = "Contraseña vacía. Escriba una contraseña.";
        return false;
    } else {
        return true;
    }
} 

function camposValidos(){
    let validos = true;
    validos = validos &&  correoValido();
    validos = validos && claveValida();
    return validos;
}

function entrarUser() {
    if(camposValidos()) {
        habilitarUser();
    } else {
        alert(alerta);
        alerta = "";
    }
}

function pintarOpciones(){
    let opciones = `
        ¿Qué deceas hacer?<br>
        Administra usuarios <a class="text-muted" href="users.html">Aquí</a>.<br>
        Administra productos <a class="text-muted" href="fragances.html">Aquí</a>.<br>
    `;
    $("#opciones").html(opciones);
}