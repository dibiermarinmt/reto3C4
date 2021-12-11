let raiz = "http://129.151.117.196:8080/api/user";
let alerta = "";

function pintarUsers(users) {
    let miTabla = `
        <table class="table table-hover">
            <thead>
                <tr>
                    <th scope="col"># Id</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Dirección</th>
                    <th scope="col">Celular</th>
                    <th scope="col">Correo</th>
                    <th scope="col">Clave</th>
                    <th scope="col">Zona</th>
                    <th scope="col">Tipo</th>
                </tr>
            </thead>
            <tbody>
    `;
    for(let i = 0; i < users.length; i++) {
        let id = ""+users[i].id;
        miTabla += `
                <tr>
                    <th scope="col" id="${"identification"+id}">${users[i].identification}</th>
                    <td id="${users[i].name + id}">${users[i].name}</td>
                    <td id="${users[i].address + id}">${users[i].address}</td>
                    <td id="${users[i].cellPhone + id}">${users[i].cellPhone}</td>
                    <td id="${users[i].email + id}">${users[i].email}</td>
                    <td id="${users[i].password + id}">${users[i].password}</td>
                    <td id="${users[i].zone + id}">${users[i].zone}</td>
                    <td id="${users[i].type + id}">${users[i].type}</td>
                    <td type="button" class="btn m-1 gradient-custom-2 text-white border-primary" onclick="editarUser(${users[i].id})">Editar</td>
                    <td type="button" class="btn m-1 gradient-custom-2 text-white border-primary" onclick="borrarUser(${users[i].id})">Borrar</td>
                </tr>
        `;

    }
    miTabla += `
            </tbody>
        </table>
    `;
    $("#tablaUsers").html(miTabla);
}

function consultarUsers(){
    $.ajax({
        url: raiz+"/all",
        type:"GET",
        datatype:"JSON",
        success:function(users){
            console.log(users);
            pintarUsers(users);
        }
    });
}

$(document).ready(function(){
    consultarUsers();
});



function borrarUser(id){
    var elemento={
        "id":id
      };
      console.log("mirar id de elemento"+ id);
      
      var dataToSend=JSON.stringify(elemento);
    $.ajax({    
        
        dataType : 'JSON',
       
        data : dataToSend,
        
        url : raiz+"/"+id,
        type: 'DELETE',
        contentType:'application/json',
        success : function(json, textStatus, xhr) {
          
                console.log(id);
                
        },
        
        complete : function(xhr, status) {
           //lert('Petición realizada '+xhr.status);
            //limpiarFormulario();
            consultarUsers();
        }
    });
}

function pintarEditar(user){
    let formulario = `
        <form>
        <h6 class="mt-1 mb-5 pb-1" style="color: red">EDITANDO USUARIO...</h6>
        <p>A continuación edita los datos usuario:</p>
        <div class="form-floating mb-4">
            <input type="text" id="identification" class="form-control" placeholder="# Identificación" value="${user.identification}" />
            <label for="identification"># Identificación</label>
        </div>
        <div class="form-floating mb-4">
            <input type="text" id="name" class="form-control" placeholder="Nombre" value="${user.name}" />
            <label for="name">Nombre</label>
        </div>

        <div class="form-floating mb-4">
            <input type="text" id="address" class="form-control" placeholder="Dirección" value="${user.address}" />
            <label for="address">Dirección</label>
        </div>

        <div class="form-floating mb-4">
            <input type="text" id="cellPhone" class="form-control" placeholder="# Celular" value="${user.cellPhone}" />
            <label for="cellPhone"># Celular</label>
        </div>

        <div class="form-floating mb-4">
            <input type="email" id="email" class="form-control" placeholder="Correo" value="${user.email}" />
            <label for="email">Correo</label>
        </div>

        <div class="form-floating mb-4">
            <input type="text" id="zone" class="form-control" placeholder="# Zona" value="${user.zone}" />
            <label for="zone"># Zona</label>
        </div>

        <div class="form-floating mb-4">
            <input type="text" id="type" class="form-control" placeholder="Tipo" value="${user.type}" />
            <label for="zone">Tipo</label>
        </div>

        <div class="form-floating mb-4">
            <input type="text" id="password" class="form-control" placeholder="Contraseña" value="${user.password}" />
            <label for="password">Contraseña</label>
        </div>
        <div>`
    let id = JSON.stringify(user.id);
    let email = JSON.stringify(user.email);
    formulario += "<button class='btn btn-primary btn-lg btn-block fa-lg gradient-custom-2 mb-3' type='button' onclick='guardarEditar("+id+", "+email+")'>Guardar</button> &nbsp; &nbsp;";
    formulario += `<button class="btn btn-primary btn-lg btn-block fa-lg gradient-custom-2 mb-3" type="button" onclick="cancelarEditar()">Cancelar</button>
        </div>
        </form>
    `;
    $("#editarUser").html(formulario);
    $("#identification").focus();
}

function editarUser(id) {
    $.ajax({
        url: raiz + "/" +id,
        type:"GET",
        async: false,
        datatype:"JSON",
        success:function(user){
            console.log(user);
            pintarEditar(user);
        }
    });
}

function cancelarEditar() {
    $("#editarUser").html("");
}

function actualizarUser(id) {
    var user={
        "id":id,
        "identification":$("#identification").val(),
        "name":$("#name").val(),
        "address":$("#address").val(),
        "cellPhone":$("#cellPhone").val(),
        "email":$("#email").val(),
        "zone":$("#zone").val(),
        "type":$("#type").val()
    };
    
    var dataToSend=JSON.stringify(user);
    $.ajax({
        dataType: 'text',       
        data: dataToSend,        
        url: raiz+'/update',        
        type: 'PUT',
        contentType:'application/json',        
        
        success: function(json, textStatus, xhr) {
            alert("Usuario editado exitosamente.");
            consultarUsers();
            cancelarEditar();
        },

        error: function(xhr, status) {
            alert("Quizás no se editó el usuario.");
            console.log(status);
        }
    });
}

function guardarEditar(id, email) {
    if(datosValidos(true, email)) {
        actualizarUser(id);
    } else {
        alert(alerta);
        alerta = "";
    } 
}

function registrarUser(){
    let user = {
        identification: $("#identification").val(),
        name: $("#name").val(),
        address: $("#address").val(),
        cellPhone: $("#cellPhone").val(),
        email: $("#email").val(),
        password: $("#password").val(),
        zone: $("#zone").val(),
        type: $("#type").val()
    };
    $.ajax({
        //crossOrigen: true,
        type:"POST",
        contentType:"application/json; charset=utf-8",
        dataType: "text", //mandaba parse error con JSON
        data: JSON.stringify(user),
        url: raiz + "/new",

        success: function(respose) {
            alert("Se registró usuario correctamente.");
            consultarUsers();
            cancelarEditar();
        },

        error: function(xhr, status){
            console.log(status);
            alert("Quizás no se registró.");
        }
    });
}

function identificationValida() {
    if($("#identification").val() != "") {
        return true;
    } else {
        alerta = "Campo de identificación vacío."
        return false;
    }
}

function nombreValido() {
    if($("#name").val() != "") {
        return true;
    } else {
        alerta ="Campo de nombre vacío.";
        return false;
    }
}

function direccionValida() {
    if($("#address").val() != "") {
        return true;
    } else {
        alerta = "Campo de dirección vacío."
        return false;
    }
}

function celularValido() {
    if($("#cellPhone").val() != "") {
        return true;
    } else {
        alerta = "Campo de número de celular vacío."
        return false;
    }
}

function existeCorreo(correo) {
    let existe = false;
    $.ajax({
        //crossOrigin: true,
        url: raiz + "/emailexist/" + correo,
        type: "GET",
        async: false,
        dataType: "JSON",
        success: function(respuesta) {
            existe = respuesta;
        }
    });
    return existe;
}

function correoValido(editar, email) {
    let esCorreo = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test($("#email").val());
    
    if($("#email").val() == "") {
        alerta = "Campo de correo vacío";
        return false;
    } else if(!esCorreo) {
        alerta = "No es un correo electrónico valido.";
        return false;
    } else if(!editar){
        if(existeCorreo($("#email").val())) {
            alerta = "Este correo electrónico ya está registrado.";
            return false;
        }
        return true;
    } else {
       if(email != $("#email").val()) {
        if(existeCorreo($("#email").val())) {
            alerta = "Este correo electrónico ya está registrado.";
            return false;
        }
        return true;      
       }
       return true;
    }
}

function zonaValida() {
    if($("#zone").val() == "") {
        alerta = "Campo de zona vacío.";
        return false;
    } else {
        return true;
    }
}

function tipoValido() {
    if($("#type").val() == "") {
        alerta = "Campo de tipo vacío.";
        $("#password").focus();
        return false;
    } else {
        return true;
    }
}

function claveValida() {
    if($("#password").val() == "") {
        alerta = "Campo de contraseña vacío.";
        $("#password").focus();
        return false;
    } else {
        return true;
    }
}


function datosValidos(editar, email) {
    let validos = true;
    validos &&= identificationValida();
    validos &&= nombreValido();
    validos &&= direccionValida();
    validos &&= celularValido();
    validos &&= correoValido(editar, email);
    validos &&= zonaValida();
    validos &&= tipoValido();
    validos &&= claveValida();
    return validos;
}

function guardarCrear() {
    if(datosValidos(false, "")) {
        registrarUser();
    } else {
        alert(alerta);
        alerta = "";
    }
}


function crearUser(){
    let formulario = `
        <form>
        <h6 class="mt-1 mb-5 pb-1" style="color: red">CREANDO NUEVO USUARIO...</h6>
        <p>A continuación ingresa los datos usuario:</p>
        <div class="form-floating mb-4">
            <input type="text" id="identification" class="form-control" placeholder="# Identificación" />
            <label for="identification"># Identificación</label>
        </div>
        <div class="form-floating mb-4">
            <input type="text" id="name" class="form-control" placeholder="Nombre" />
            <label for="name">Nombre</label>
        </div>

        <div class="form-floating mb-4">
            <input type="text" id="address" class="form-control" placeholder="Dirección" />
            <label for="address">Dirección</label>
        </div>

        <div class="form-floating mb-4">
            <input type="text" id="cellPhone" class="form-control" placeholder="# Celular" />
            <label for="cellPhone"># Celular</label>
        </div>

        <div class="form-floating mb-4">
            <input type="email" id="email" class="form-control" placeholder="Correo" />
            <label for="email">Correo</label>
        </div>

        <div class="form-floating mb-4">
            <input type="text" id="zone" class="form-control" placeholder="# Zona" />
            <label for="zone"># Zona</label>
        </div>

        <div class="form-floating mb-4">
            <input type="text" id="type" class="form-control" placeholder="Tipo" />
            <label for="zone">Tipo</label>
        </div>

        <div class="form-floating mb-4">
            <input type="text" id="password" class="form-control" placeholder="Contraseña" />
            <label for="password">Contraseña</label>
        </div>
        <div>
        <button class="btn btn-primary btn-lg btn-block fa-lg gradient-custom-2 mb-3" type="button" onclick="guardarCrear()">Guardar</button> &nbsp; &nbsp;
        <button class="btn btn-primary btn-lg btn-block fa-lg gradient-custom-2 mb-3" type="button" onclick="cancelarEditar()">Cancelar</button>
        </div>
        </form>
    `;
    $("#editarUser").html(formulario);
    $("#identification").focus();
}