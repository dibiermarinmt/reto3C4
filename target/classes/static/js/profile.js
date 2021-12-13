/**
 * FUNCIONES DE PERFIL
 * 
 * Una vez se han validado los datos en el login,
 * se despliega un perfil según su tipo.
 */

/**
 * Esta función pinta el perfil según su tipo.
 * Contiene un html genérico del perfil con una carta
 * que será llenada con html según el tipo de usuario
 * que validó el login.
 */

function pintarProfile() {

    let profileHtml = `

        <!--head-->
        <div class="card-header gradient-custom-2"> <!-- header -->
            <div class="text-white px-3 py-4 p-md-5 mx-md-4">
                <div class="text-center">
                    <img src="img/zorrilloblanco.png" style="width: 185px;" alt="logo" />
                    <h4 class="mt-1 mb-5 pb-1">Zorrillo LTDA</h4>
                </div>
                <h4 class="mb-4">¡Somos más que una compañía!</h4>
            </div>
        </div>

        <!--body-->
        <div class="card-body text-center">
            <!--h4 class="mt-1 mb-5 pb-1">TABLA DE ADMINISTRACIÓN DE FRAGANCIAS</h4>
            <p>
                ¿Deseas crear un nuevo producto?
                <br>
                <br>
                <button class="btn btn-primary btn-lg btn-block fa-lg gradient-custom-2 mb-3" type="button" onclick="crearFragance()">Crear</button>
            </p>
            <center><div id="editarFragance" style="width: 60%;"></div></center>
            <div class="text-center" id="tablaFragances"></div-->            
        </div>
    `;

    $("#mainCard").html(profileHtml);
}