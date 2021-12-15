function pintarFragances() {
    let fragances = `
        <br>
        <br>
        <h4 class="mt-1 mb-5 pb-1">TABLA DE ADMINISTRACIÓN DE PRODUCTOS</h4>
        <p>¿Deseas crear una nueva fragancia?
            <br>
            <br>
            <button class="btn btn-primary btn-lg btn-block fa-lg gradient-custom-2 mb-3" type="button" onclick="crearFragance()">Crear</button>
        </p>
        <center><div id="editarFragance" style="width: 60%;"></div></center>
        <div id="tablaFragances"></div>
    `;
    $("#fragances").html(fragances);
    consultarFragances();
}


// --- copy fragancesFunciones.js


function pintarTablaFragances(fragances) {
    let miTabla = `
        <table class="table table-hover">
            <thead>
                <tr>
                    <th scope="col"># Ref</th>
                    <th scope="col">Marca</th>
                    <th scope="col">Categoría</th>
                    <!-- th scope="col">Presentación</th -->
                    <th scope="col">Descripción</th>
                    <!-- th scope="col">Disponibilidad</th -->
                    <th scope="col">Precio</th>
                    <!-- th scope="col">Cantidad</th -->
                    <!-- th scope="col">Fotografía</th -->
                </tr>
            </thead>
            <tbody>
    `;
    for(let i = 0; i < fragances.length; i++) {
        let ref = JSON.stringify(fragances[i].reference);
        miTabla += "<tr>";
        miTabla += "<th scope='col'>"+fragances[i].reference+"</th>";
        miTabla += "<td>"+fragances[i].brand+"</td>";
        miTabla += "<td>"+fragances[i].category+"</td>";
        miTabla += "<!-- td>"+fragances[i].presentation+"</td -->";
        miTabla += "<td>"+fragances[i].description+"</td>";
        miTabla += "<!-- td>"+fragances[i].availability+"</td -->";
        miTabla += "<td>"+fragances[i].price+"</td>";
        miTabla += "<!-- td>"+fragances[i].quantity+"</td -->";
        miTabla += "<!-- td>"+fragances[i].photography+"</td -->";
        miTabla += "<td type='button' class='btn m-1 gradient-custom-2 text-white border-primary' onclick='editarFragance("+ref+")'>Editar</td>";
        miTabla += "<td type='button' class='btn m-1 gradient-custom-2 text-white border-primary' onclick='borrarFragance("+ref+")'>Borrar</td>";
        miTabla += "<td type='button' class='btn m-1 gradient-custom-2 text-white border-primary' onclick='verFragance("+ref+")'>Ver</td>";
        miTabla += "</tr>";
    }
    miTabla += `
            </tbody>
        </table>
    `;
    $("#tablaFragances").html(miTabla);
}

function consultarFragances(){
    $.ajax({
        url: raiz+"/fragance/all",
        type:"GET",
        datatype:"JSON",
        success:function(fragances){
            pintarTablaFragances(fragances);
        }
    });
}


function borrarFragance(ref){
    let json={
        "reference":ref
    };
    
    //let dataToSend=JSON.stringify(elemento);

    $.ajax({        
        dataType: "JSON",       
        data: JSON.stringify(json),      
        url: raiz+"/fragance/"+ref,
        type: "DELETE",
        contentType: "application/json",

        success: function() {
            consultarFragances();
        },
        
        error: function(xhr, status) {
           //lert('Petición realizada '+xhr.status);
            //limpiarFormulario();
            alert("No se borró " + status);
            consultarFragances();
        }
    });
}

function pintarEditarFragance(fragance){
    let formulario = "";
        formulario += "<form>";
        formulario += "<h6 class='mt-1 mb-5 pb-1' style='color: red'>EDITANDO FRAGANCIA...</h6>";
        formulario += "<p>A continuación edita los datos de la fragancia:</p>";
        formulario += "<!--div class='form-floating mb-4'>";
        formulario += "<input type='text' id='reference' class='form-control' placeholder='# Ref' value='"+fragance.reference+"' />";
        formulario += "<label for='reference'># Ref</label>";
        formulario += "</div-->";
        formulario += "<div class='form-floating mb-4'>";
        formulario += "<input type='text' id='brand' class='form-control' placeholder='Marca' value='"+fragance.brand+"' />";
        formulario += "<label for='brand'>Marca</label>";
        formulario += "</div>";

        formulario += "<div class='form-floating mb-4'>";
        formulario += "<input type='text' id='category' class='form-control' placeholder='Categoría' value='"+fragance.category+"' />";
        formulario += "<label for='category'>Categoría</label>";
        formulario += "</div>";

        formulario += "<div class='form-floating mb-4'>";
        formulario += "<input type='text' id='presentation' class='form-control' placeholder='Presentación' value='"+fragance.presentation+"' />";
        formulario += "<label for='presentation'>Presentación</label>";
        formulario += "</div>";

        formulario += "<div class='form-floating mb-4'>";
        formulario += "<input type='email' id='description' class='form-control' placeholder='Descripción' value='"+fragance.description+"' />";
        formulario += "<label for='description'>Descripción</label>";
        formulario += "</div>";

        formulario += "<div class='form-floating mb-4'>";
        formulario += "<input type='text' id='availability' class='form-control' placeholder='Disponibilidad' value='"+fragance.availability+"'/>";
        formulario += "<label for='availability'>Disponibilidad</label>";
        formulario += "</div>";

        formulario += "<div class='form-floating mb-4'>";
        formulario += "<input type='number' step='any' id='price' class='form-control' placeholder='Precio' value='"+fragance.price+"'/>";
        formulario += "<label for='price'>Precio</label>";
        formulario += "</div>"

        formulario += "<div class='form-floating mb-4'>";
        formulario += "<input type='number' id='quantity' class='form-control' placeholder='Cantidad' value='"+fragance.quantity+"'/>";
        formulario += "<label for='quantity'>Cantidad</label>";
        formulario += "</div>";
        formulario += "<div class='form-floating mb-4'>";
        formulario += "<input type='text' id='photography' class='form-control' placeholder='Fotografía' value='"+fragance.photography+"'/>";
        formulario += "<label for='photography'>Fotografía</label>";
        formulario += "</div>";
        
        let ref = JSON.stringify(fragance.reference);

        formulario += "<div>";
        formulario += "<button class='btn btn-primary btn-lg btn-block fa-lg gradient-custom-2 mb-3' type='button' onclick='guardarEditarFragance("+ref+")'>Guardar</button> &nbsp; &nbsp;";
        formulario += "<button class='btn btn-primary btn-lg btn-block fa-lg gradient-custom-2 mb-3' type='button' onclick='cancelarEditarFragance()'>Cancelar</button>";
        formulario += "</div>";
        formulario += "</form>";

    $("#editarFragance").html(formulario);
    $("#brand").focus();

}

function editarFragance(ref) {
    $.ajax({
        url: raiz + "/fragance/" +ref,
        type:"GET",
        async: false,
        datatype:"JSON",
        success:function(fragance){
            console.log(fragance);
            pintarEditarFragance(fragance);
        }
    });
}

function cancelarEditarFragance() {
    $("#editarFragance").html("");
}

function actualizarFragance(ref) {
    var fragance={
        "reference":ref,
        "brand":$("#brand").val(),
        "category":$("#category").val(),
        "presentation":$("#presentation").val(),
        "description":$("#description").val(),
        "availability":$("#availability").val(),
        "price":$("#price").val(),
        "quantity":$("#quantity").val(),
        "photography":$("#photography").val()
    };
    
    var dataToSend=JSON.stringify(fragance);
    $.ajax({
        dataType: 'text',       
        data: dataToSend,        
        url: raiz+'/fragance/update',        
        type: 'PUT',
        contentType:'application/json',        
        
        success: function(json, textStatus, xhr) {
            alert("Fragancia editada exitosamente exitosamente.");
            consultarFragances();
            verFragance(ref);
        },

        error: function(xhr, status) {
            alert("Quizás no se editó la fragancia adecuadamente.");
            console.log(status);
        }
    });
}


//-------------copy


function guardarEditarFragance(ref) {
    if(datosFraganceValidos()) {
        actualizarFragance(ref);
    } else {
        alert(alerta);
        alerta = "";
    } 
}

function registrarFragance(){
    let fragance = {
        brand: $("#brand").val(),
        category: $("#category").val(),
        presentation: $("#presentation").val(),
        description: $("#description").val(),
        availability: $("#availability").val(),
        price: $("#price").val(),
        quantity: $("#quantity").val(),
        photography: $("#photography").val()
    };
    $.ajax({
        //crossOrigen: true,
        type:"POST",
        contentType:"application/json; charset=utf-8",
        dataType: "text", //mandaba parse error con JSON
        data: JSON.stringify(fragance),
        url: raiz + "/fragance/new",

        success: function(respose) {
            alert("Se registró fragancia correctamente.");
            consultarFragances();
            pintarVerFragance(fragance);
        },

        error: function(xhr, status){
            console.log(status);
            alert("Quizás no se registró.");
        }
    });
}

function marcaFraganceValida() {
    if($("#brand").val() != "") {
        return true;
    } else {
        alerta = "Campo de marca vacío."
        return false;
    }
}

function categoriaFraganceValida() {
    if($("#category").val() != "") {
        return true;
    } else {
        alerta ="Campo de categoría vacío.";
        return false;
    }
}

function presentacionFraganceValida() {
    if($("#presentation").val() != "") {
        return true;
    } else {
        alerta = "Campo de presentación vacío."
        return false;
    }
}

function descripcionFraganceValida() {
    if($("#description").val() != "") {
        return true;
    } else {
        alerta = "Campo de descripción vacío."
        return false;
    }
}

function disponibilidadFraganceValida() {
    if($("#availability").val() == "") {
        alerta = "Campo de disponibilidad vacío.";
        return false;
    } else {
        return true;
    }
}

function precioFraganceValido() {
    if($("#price").val() == "") {
        alerta = "Campo de precio vacío.";
        return false;
    } else {
        return true;
    }
}

function cantidadFraganceValida() {
    if($("#quantity").val() == "") {
        alerta = "Campo de cantidad vacío.";
        return false;
    } else {
        return true;
    }
}

function fotografiaFraganceValida() {
    if($("#photography").val() == "") {
        alerta = "Campo de fotografía vacío.";
        return false;
    } else {
        return true;
    }
}

function datosFraganceValidos() {
    let validos = true;
    validos &&= marcaFraganceValida();
    validos &&= categoriaFraganceValida();
    validos &&= presentacionFraganceValida();
    validos &&= descripcionFraganceValida();
    validos &&= disponibilidadFraganceValida();
    validos &&= precioFraganceValido();
    validos &&= cantidadFraganceValida();
    validos &&= fotografiaFraganceValida();
    return validos;
}

function guardarCrearFragance() {
    if(datosFraganceValidos()) {
        registrarFragance();
    } else {
        alert(alerta);
        alerta = "";
    }
}


function crearFragance(){
    let formulario = "";
        formulario += "<form>";
        formulario += "<h6 class='mt-1 mb-5 pb-1' style='color: red'>CREANDO NUEVA FRAGANCIA...</h6>";
        formulario += "<p>A continuación ingresa los datos de la fragancia nueva:</p>";
        formulario += "<!--div class='form-floating mb-4'>";
        formulario += "<input type='text' id='reference' class='form-control' placeholder='# Ref'/>";
        formulario += "<label for='reference'># Ref</label>";
        formulario += "</div-->";
        formulario += "<div class='form-floating mb-4'>";
        formulario += "<input type='text' id='brand' class='form-control' placeholder='Marca'/>";
        formulario += "<label for='brand'>Marca</label>";
        formulario += "</div>";

        formulario += "<div class='form-floating mb-4'>";
        formulario += "<input type='text' id='category' class='form-control' placeholder='Categoría'/>";
        formulario += "<label for='category'>Categoría</label>";
        formulario += "</div>";

        formulario += "<div class='form-floating mb-4'>";
        formulario += "<input type='text' id='presentation' class='form-control' placeholder='Presentación'/>";
        formulario += "<label for='presentation'>Presentación</label>";
        formulario += "</div>";

        formulario += "<div class='form-floating mb-4'>";
        formulario += "<input type='email' id='description' class='form-control' placeholder='Descripción'/>";
        formulario += "<label for='description'>Descripción</label>";
        formulario += "</div>";

        formulario += "<div class='form-floating mb-4'>";
        formulario += "<input type='text' id='availability' class='form-control' placeholder='Disponibilidad'/>";
        formulario += "<label for='availability'>Disponibilidad</label>";
        formulario += "</div>";

        formulario += "<div class='form-floating mb-4'>";
        formulario += "<input type='number' step='any' id='price' class='form-control' placeholder='Precio'/>";
        formulario += "<label for='price'>Precio</label>";
        formulario += "</div>"

        formulario += "<div class='form-floating mb-4'>";
        formulario += "<input type='number' id='quantity' class='form-control' placeholder='Cantidad'/>";
        formulario += "<label for='quantity'>Cantidad</label>";
        formulario += "</div>";
        formulario += "<div class='form-floating mb-4'>";
        formulario += "<input type='text' id='photography' class='form-control' placeholder='Fotografía'/>";
        formulario += "<label for='photography'>Fotografía</label>";
        formulario += "</div>";

        formulario += "<div>";
        formulario += "<button class='btn btn-primary btn-lg btn-block fa-lg gradient-custom-2 mb-3' type='button' onclick='guardarCrearFragance()'>Guardar</button> &nbsp; &nbsp;";
        formulario += "<button class='btn btn-primary btn-lg btn-block fa-lg gradient-custom-2 mb-3' type='button' onclick='cancelarEditarFragance()'>Cancelar</button>";
        formulario += "</div>";
        formulario += "</form>";

    $("#editarFragance").html(formulario);
    $("#brand").focus();
}

function verFragance(ref) {
    $.ajax({
        url: raiz + "/fragance/" +ref,
        type:"GET",
        async: false,
        datatype:"JSON",
        success:function(fragance){
            pintarVerFragance(fragance);
        }
    });
}

function pintarVerFragance(fragance) {
    
    let datos = `
        <div>
            <div class="card-body">
                <h5 class="card-title">${fragance.brand}</h5>
                <h6 class="card-title">${fragance.category}</h6>
                <p class="card-text">
                    <br>
                    <strong>Referencia:</strong> &nbsp; ${fragance.reference}<br>
                    <strong>Presentación:</strong> &nbsp; ${fragance.presentation}<br>
                    <strong>Descripción:</strong> &nbsp; ${fragance.description}<br>
                    <strong>Disponibilidad:</strong> &nbsp; ${fragance.availability}<br>
                    <strong>Precio:</strong> &nbsp; ${fragance.price}<br>
                    <strong>Cantidad:</strong> &nbsp; ${fragance.quantity}<br>
                    <strong>Fotografía:</strong> &nbsp; ${fragance.photography}<br>
                </p>

                <button class="btn btn-primary btn-lg btn-block fa-lg gradient-custom-2 mb-3" type="button" onclick="cancelarEditarFragance()">Cerrar</button>
                
            </div>
        </div>
    `;

    $("#editarFragance").html(datos);
}

