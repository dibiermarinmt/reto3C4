/**
 * FUNCIONES DE PERFIL
 * 
 * Una vez se han validado los datos en el login,
 * se despliega un perfil según su tipo.
 * 
 */

let idAse; //Constante global para guardar un id de Asesor.
let zoneCoord; // Constante global para guardar la zona de un Coordinador.

function pintarProfile(id) {
    /**
     * Html base para el perfil de cada usuario.
     * El div user va a ser llenado según la función
     * pintarUserBody(id)
     */
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
        <div class="card-body text-center" id="user"></div>
    `;
    $("#mainCard").html(profileHtml);
    pintarUserBody(id);
}

function pintarUserBody(id) {
    $.ajax({
        url: raiz + "/user/" +id,
        type:"GET",
        async: false,
        datatype:"JSON",
        success:function(user){
            let userBody = "<script>";
            if(user.type == "ADM") {
                let name = JSON.stringify(user.name);
                userBody += "pintarAdmin("+name+");";
            } else if(user.type == "COORD") {
                zoneCoord = user.zone;
                userBody += "pintarCoord();";
            } else if(user.type == "ASE") {
                idAse = id;
                userBody += "pintarAse();";
            } else {
                userBody = "No tienes un rol asignado.";
            }
            userBody += "</script>";
            $("#user").html(userBody);
        }
    });
}
