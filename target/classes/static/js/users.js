function pintarUsers() {
    let users = `
        <br>
        <br>
        <h4 class="mt-1 mb-5 pb-1">TABLA DE ADMINISTRACIÓN DE USUARIOS</h4>
        <p>¿Deseas crear un nuevo usuario?
            <br>
            <br>
            <button class="btn btn-primary btn-lg btn-block fa-lg gradient-custom-2 mb-3" type="button" onclick="crearUser()">Crear</button>
        </p>
        <center><div id="editarUser" style="width: 60%;"></div></center>
        <div id="tablaUsers"></div>
    `;
    $("#users").html(users);
    consultarUsers();
}

// userFunciones.js --- copy


function pintarTablaUsers(users) {
    let miTabla = `
        <table class="table table-hover">
            <thead>
                <tr>
                    <th scope="col"># CC</th>
                    <th scope="col">Nombre</th>
                    <!--th scope="col">Dirección</th-->
                    <!--th scope="col">Celular</th-->
                    <th scope="col">Correo</th>
                    <!--th scope="col">Clave</th-->
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
                    <th scope="col">${users[i].identification}</th>
                    <td>${users[i].name}</td>
                    <!-- td>${users[i].address}</td -->
                    <!-- td>${users[i].cellPhone}</td -->
                    <td>${users[i].email}</td>
                    <!-- td>${users[i].password}</td -->
                    <td>${users[i].zone}</td>
                    <td>${users[i].type}</td>
                    <td type="button" class="btn m-1 gradient-custom-2 text-white border-primary" onclick="editarUser(${users[i].id})">Editar</td>
                    <td type="button" class="btn m-1 gradient-custom-2 text-white border-primary" onclick="borrarUser(${users[i].id})">Borrar</td>
                    <td type="button" class="btn m-1 gradient-custom-2 text-white border-primary" onclick="verUser(${users[i].id})">Ver</td>
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
        url: raiz+"/user/all",
        type:"GET",
        datatype:"JSON",
        success:function(users){
            pintarTablaUsers(users);
        }
    });
}



function borrarUser(id){
    var elemento={
        "id":id
      };
      
      var dataToSend=JSON.stringify(elemento);
    $.ajax({    
        
        dataType : 'JSON',
       
        data : dataToSend,
        
        url : raiz+"/user/"+id,
        type: 'DELETE',
        contentType:'application/json',
        success : function(json, textStatus, xhr) {
            consultarUsers();  
        }
    });
}


function pintarEditarUser(user){
    let fecha = new Date(user.birthtDay);

    let formato = fecha.getFullYear();
    if(fecha.getMonth() < 9) {
        formato += "-0";
    } else {
        formato += "-";
    }
    formato += fecha.getMonth()+1;
    if(fecha.getDate() < 9) {
        formato += "-0";
    } else {
        formato += "-";
    }
    formato += fecha.getDate()+1;

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
            <input type="date" id="birthDay" class="form-control" placeholder="Fecha de Nacimiento" value="${formato}" />
            <label for="name">Fecha de Nacimiento</label>
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
    formulario += "<button class='btn btn-primary btn-lg btn-block fa-lg gradient-custom-2 mb-3' type='button' onclick='guardarEditarUser("+id+", "+email+")'>Guardar</button> &nbsp; &nbsp;";
    formulario += `<button class="btn btn-primary btn-lg btn-block fa-lg gradient-custom-2 mb-3" type="button" onclick="cancelarEditarUser()">Cancelar</button>
        </div>
        </form>
    `;
    $("#editarUser").html(formulario);
    $("#identification").focus();
}


function editarUser(id) {
    $.ajax({
        url: raiz + "/user/" +id,
        type:"GET",
        async: false,
        datatype:"JSON",
        success:function(user){
            console.log(user);
            pintarEditarUser(user);
        }
    });
}


function cancelarEditarUser() {
    $("#editarUser").html("");
}


function actualizarUser(idUser) {
    let fecha = new Date($("#birthDay").val());
    var user={
        id: idUser,
        identification: $("#identification").val(),
        name: $("#name").val(),
        birthtDay: fecha,
        monthBirthtDay: fecha.getMonth()+1,
        address: $("#address").val(),
        cellPhone: $("#cellPhone").val(),
        email: $("#email").val(),
        password: $("#password").val(),
        zone: $("#zone").val(),
        type: $("#type").val()
    };

    console.log(user);
    

    $.ajax({        
        type:"PUT",
        contentType:"application/json; charset=utf-8",
        dataType: "text", //mandaba parse error con JSON
        data: JSON.stringify(user),
        url: raiz + "/user/update",
        
        success: function(json, textStatus, xhr) {
            alert("Usuario editado exitosamente.");
            consultarUsers();
            verUser(idUser);
        },

        error: function(xhr, status) {
            alert("Quizás no se editó el usuario.");
            console.log(status);
        }
    });
}


function guardarEditarUser(id, email) {
    if(datosUserValidos(true, email)) {
        actualizarUser(id);
    } else {
        alert(alerta);
        alerta = "";
    } 
}


function registrarUser(){
    let fecha = new Date($("#birthDay").val()); 
    let user = {
        identification: $("#identification").val(),
        name: $("#name").val(),
        birthtDay: fecha,
        monthBirthtDay: String(parseInt(fecha.getMonth())+1),
        address: $("#address").val(),
        cellPhone: $("#cellPhone").val(),
        email: $("#email").val(),
        password: $("#password").val(),
        zone: $("#zone").val(),
        type: $("#type").val()
    };
    console.log(user);
    $.ajax({
        //crossOrigen: true,
        type:"POST",
        contentType:"application/json; charset=utf-8",
        dataType: "text", //mandaba parse error con JSON
        data: JSON.stringify(user),
        url: raiz + "/user/new",

        success: function(respose) {
            alert("Se registró usuario correctamente.");
            consultarUsers();
            pintarVerUser(user);
        },

        error: function(xhr, status){
            console.log(status);
            alert("Quizás no se registró.");
        }
    });
}

function identificationUserValida() {
    if($("#identification").val() != "") {
        return true;
    } else {
        alerta = "Campo de identificación vacío."
        return false;
    }
}

function nombreUserValido() {
    if($("#name").val() != "") {
        return true;
    } else {
        alerta ="Campo de nombre vacío.";
        return false;
    }
}

function direccionUserValida() {
    if($("#address").val() != "") {
        return true;
    } else {
        alerta = "Campo de dirección vacío."
        return false;
    }
}

function celularUserValido() {
    if($("#cellPhone").val() != "") {
        return true;
    } else {
        alerta = "Campo de número de celular vacío."
        return false;
    }
}

function existeUserCorreo(correo) {
    let existe = false;
    $.ajax({
        //crossOrigin: true,
        url: raiz + "/user/emailexist/" + correo,
        type: "GET",
        async: false,
        dataType: "JSON",
        success: function(respuesta) {
            existe = respuesta;
        }
    });
    return existe;
}

function correoUserValido(editar, email) {
    let esCorreo = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test($("#email").val());
    
    if($("#email").val() == "") {
        alerta = "Campo de correo vacío";
        return false;
    } else if(!esCorreo) {
        alerta = "No es un correo electrónico valido.";
        return false;
    } else if(!editar){
        if(existeUserCorreo($("#email").val())) {
            alerta = "Este correo electrónico ya está registrado.";
            return false;
        }
        return true;
    } else {
       if(email != $("#email").val()) {
        if(existeUserCorreo($("#email").val())) {
            alerta = "Este correo electrónico ya está registrado.";
            return false;
        }
        return true;      
       }
       return true;
    }
}

function zonaUserValida() {
    if($("#zone").val() == "") {
        alerta = "Campo de zona vacío.";
        return false;
    } else {
        return true;
    }
}

function tipoUserValido() {
    if($("#type").val() == "") {
        alerta = "Campo de tipo vacío.";
        $("#password").focus();
        return false;
    } else {
        return true;
    }
}

function claveUserValida() {
    if($("#password").val() == "") {
        alerta = "Campo de contraseña vacío.";
        $("#password").focus();
        return false;
    } else {
        return true;
    }
}


function datosUserValidos(editar, email) {
    let validos = true;
    validos &&= identificationUserValida();
    validos &&= nombreUserValido();
    validos &&= direccionUserValida();
    validos &&= celularUserValido();
    validos &&= correoUserValido(editar, email);
    validos &&= zonaUserValida();
    validos &&= tipoUserValido();
    validos &&= claveUserValida();
    return validos;
}


function guardarCrearUser() {
    if(datosUserValidos(false, "")) {
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
            <input type="date" id="birthDay" class="form-control" placeholder="Fecha de Nacimiento" />
            <label for="name">Fecha de Nacimiento</label>
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
        <button class="btn btn-primary btn-lg btn-block fa-lg gradient-custom-2 mb-3" type="button" onclick="guardarCrearUser()">Guardar</button> &nbsp; &nbsp;
        <button class="btn btn-primary btn-lg btn-block fa-lg gradient-custom-2 mb-3" type="button" onclick="cancelarEditarUser()">Cancelar</button>
        </div>
        </form>
    `;
    $("#editarUser").html(formulario);
    $("#identification").focus();
}

function verUser(id) {
    $.ajax({
        url: raiz + "/user/" +id,
        type:"GET",
        async: false,
        datatype:"JSON",
        success:function(user){
            pintarVerUser(user);
        }
    });
}

function pintarVerUser(user) {
    let mes = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    let date = new Date(user.birthtDay);
    let fecha = date.getFullYear() +", "
    fecha += mes[date.getMonth()]+" ";
    fecha += date.getDate()+1;
    
    let datos = `
        <div>
            <div class="card-body">
                <h5 class="card-title">${user.name}</h1>
                <p class="card-text">
                    <br>
                    <strong>Documento:</strong> &nbsp; ${user.identification}<br>
                    <strong>Celular:</strong> &nbsp; ${user.cellPhone}<br>
                    <strong>Fecha de Nacimiento:</strong> &nbsp; ${fecha}<br>
                    <strong>Dirección:</strong> &nbsp; ${user.address}<br>
                    <strong>Zona:</strong> &nbsp; ${user.zone}<br>
                    <strong>Tipo:</strong> &nbsp; ${user.type}<br>
                    <strong>Correo:</strong> &nbsp; <a href="${"mailto:"+user.email}">${user.email}</a><br>
                    <strong>Contraseña:</strong> &nbsp; ${user.password}<br>
                </p>

                <button class="btn btn-primary btn-lg btn-block fa-lg gradient-custom-2 mb-3" type="button" onclick="cancelarEditar()">Cerrar</button>
                
            </div>
        </div>
    `;

    $("#editarUser").html(datos);
}