/**
 * FUNCIONES PRINCIPALES DE LOGIN
 * 
 * Contiene el formulario de login que se desplegará
 * al iniciar la página web. Implementa los servicios
 * de la api para hacer un inicio de sesión.
 */


/**
 * Crea una variable htmlLogin que contendrá el formulario
 * de login.
 */
function pintarLogin() {
    let loginHtml = `
        <div class="row g-0">

            <!--login-->
            <div class="col-lg-6">
                <div class="card-body p-md-5 mx-md-4">

                    <div class="text-center">
                        <img src="img/zorrillo.png" style="width: 185px;" alt="logo" />
                        <h4 class="mt-1 mb-5 pb-1">Zorrillo LTDA</h4>
                    </div>

                    <form action="/action_page.php">

                        <p>Ingresa tus credenciales:</p>

                        <div class="form-floating mb-4">
                            <input type="email" id="email" class="form-control" placeholder="Correo"/>
                            <label for="correo">Correo</label>
                        </div>

                        <div class="form-floating mb-4">
                            <input type="password" id="password" class="form-control" placeholder="Contraseña" />
                            <label for="clave">Contraseña</label>
                        </div>

                        <div class="text-center pt-1 mb-4 pb-1">
                            <button class="btn btn-primary btn-lg btn-block fa-lg gradient-custom-2 mb-3" type="button" onclick="entrarUser()">Entrar</button><br />
                            ¿No tienes una cuenta?<br>
                            Crea una <a class="text-muted" href="new.html">Aquí</a>.
                        </div>

                    </form>

                </div>
            </div>

            <!--info zorrillo-->
            <div class="card-body rounded col-lg-6 d-flex align-items-center gradient-custom-2">
                <div class="text-white px-3 py-4 p-md-5 mx-md-4">
                    <h4 class="mb-4">Somos más que una compañía</h4>
                    <p class="small mb-0">Zorrillo LTDA es una empresa Ibaguereña con más de 10 años de trayectoria en la venta de perfumes y colonias mediante el servicio de venta directa por catalogo, se ubica en el barrio Interlaken. Actualmente cuenta con más de 80 empleados entre directos y fuerza de ventas independiente.</p>
                    <p class="small mb-0">Contamos con una gran variedad de colonias. Estamos en constante contacto con nuestros clientes para ofrecer las fragancias que justamente ellos quieren.</p>
                </div>
            </div>

        </div>
    `;
    $("#mainCard").html(loginHtml);
}

function habilitarUser(){
    let correo = $("#email").val();
    let clave = $("#password").val();

    $.ajax({
        //crossOrigin: true,
        url: raiz + "/user/" + correo + "/" + clave,
        type: "GET",
        dataType: "JSON",

        success: function(json) {
            if(json.id != null) {
                alert("Bienvenido " + json.name +" ! ! !");
                $("#mainCard").html(`
                    <script>
                        pintarProfile(${json.id});
                    </script>
                `);
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

/**
 * Esta función descarga el html base al iniciar
 * la página web.
 */
$(document).ready(function() {
    pintarLogin();
});


