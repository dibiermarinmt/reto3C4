function pintarAse() {
    
    let adminHtml = `
        <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link active" id="pedidosTab" data-bs-toggle="tab" data-bs-target="#pedidos" type="button" role="tab" aria-controls="home" aria-selected="true" onclick="pintarHacerPedido()">Hacer Pedidos</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="logoutTab" data-bs-toggle="tab" data-bs-target="#logout" type="button" role="tab" aria-controls="contact" aria-selected="false" onclick="pintarLogin()">Salir</button>
            </li>
        </ul>
        <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="pedidos" role="tabpanel" aria-labelledby="home-tab"></div>
            <div class="tab-pane fade" id="logout" role="tabpanel" aria-labelledby="contact-tab"> ¿Quieres salir?</div>
        </div>
    `;
    $("#user").html(adminHtml);
    pintarHacerPedido();
}

function pintarHacerPedido() {
    let hacerPedido = `
        <br>
        <br>
        <h4 class="mt-1 mb-5 pb-1">TABLA DE PEDIDOS</h4>
        <p>¡Has tus pedidos!<br>
        Suma o resta al carrito de compra.</p>
        <center><div id="hacerPedido" style="width: 60%;"></div></center>
        <div id="tablaMenuFragances"></div>
    `;
    $("#pedidos").html(hacerPedido);
    consultarMenuFragances();
    pintarListaPedido();
}


function pintarTablaMenuFragances(fragances) {
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
        miTabla += "<td class='btn m-1' style='width: 40%'><input id="+ref+" type='number' style='width: 100%' placeholder='# Pedidos'></input></td>";
        miTabla += "<td type='button' class='btn m-1 gradient-custom-2 text-white border-primary' onclick='pedirMenuFragance("+ref+")'>&nbsp; + &nbsp;</td>";
        miTabla += "<td type='button' class='btn m-1 gradient-custom-2 text-white border-primary' onclick='verMenuFragance("+ref+")'>Ver</td>";
        miTabla += "</tr>";
    }
    miTabla += `
            </tbody>
        </table>
    `;
    $("#tablaMenuFragances").html(miTabla);
}

function consultarMenuFragances(){
    $.ajax({
        url: raiz+"/fragance/all",
        type:"GET",
        datatype:"JSON",
        success:function(fragances){
            pintarTablaMenuFragances(fragances);
        }
    });
}

function verMenuFragance(ref) {
    $.ajax({
        url: raiz + "/fragance/" +ref,
        type:"GET",
        async: false,
        datatype:"JSON",
        success:function(fragance){
            pintarMenuFragance(fragance);
            $("#botonesPedido").html("");
        }
    });
}

function pintarMenuFragance(fragance) {
    
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

                <button class="btn btn-primary btn-lg btn-block fa-lg gradient-custom-2 mb-3" type="button" onclick="pintarListaPedido()">Cerrar</button>
                
            </div>
        </div>
    `;

    $("#hacerPedido").html(datos);
}

let carrito = []; // Referencias de productos para el pedido.
let cantidades = []; // Lista de cantidades del pedido

function pedirMenuFragance(ref) {
    let existeRef = false;
    let cant = 0;
    if($("#"+ref).val() != "") {
        cant = parseInt($("#"+ref).val());
    }


    for(var i=0; i<carrito.length; i++) {
        if(ref == carrito[i] && cantidades[i]+cant > 0) {
            cantidades[i] += cant;
            existeRef = true;
        }
    }
    if(!existeRef && cant > 0) {
        carrito.push(ref);
        cantidades.push(cant);
    }

    pintarListaPedido();

}

function pintarListaPedido() {
    let miTabla = `
        <table class="table table-hover">
            <thead>
                <tr>
                    <th scope="col"># Ref</th>
                    <th scope="col">Precio</th>
                    <th scope="col"># Pedido</th>
                    <!-- th scope="col">Cantidad</th -->
                    <!-- th scope="col">Fotografía</th -->
                </tr>
            </thead>
            <tbody>
    `;

    for(var i=0; i<carrito.length; i++){
        let ref = carrito[i];
        let cant = cantidades[i];
        $.ajax({
            url: raiz + "/fragance/"+ref,
            type:"GET",
            async: false,
            datatype:"JSON",
            success:function(fragance){
                miTabla +="<tr>";
                miTabla += "<th scope='col'>"+ref+"</th>";
                miTabla += "<td>"+fragance.price+"</td>";
                miTabla += "<td>"+cant+"</td>";
                ref = JSON.stringify(ref);
                miTabla += "<td type='button' class='btn m-1 gradient-custom-2 text-white border-primary' onclick='borrarMenuFragance("+ref+")'>&nbsp; − &nbsp;</td>";
                miTabla += "<td type='button' class='btn m-1 gradient-custom-2 text-white border-primary' onclick='verMenuFragance("+ref+")'>Ver</td>";
                miTabla += "</tr>";
            }    
        });
    }
            
    miTabla += `
            </tbody>
        </table>

        <button class="btn btn-primary btn-lg btn-block fa-lg gradient-custom-2 mb-3" type="button" onclick="generarPedido()">Generar</button> &nbsp; &nbsp;
        <button class="btn btn-primary btn-lg btn-block fa-lg gradient-custom-2 mb-3" type="button" onclick="cancelarPedido()">Cancelar</button>
    `;

    $("#hacerPedido").html(miTabla);
}

function borrarMenuFragance(ref){
    let auxCarrito = [];
    let auxCantidades = [];
    for(var i=0; i<carrito.length; i++) {
        if(carrito[i] != ref) {
            auxCarrito.push(carrito[i]);
            auxCantidades.push(cantidades[i]);
        }
    }
    carrito = auxCarrito;
    cantidades = auxCantidades;
    pintarListaPedido();
}

function generarPedido() {

    let json = {
        "registerDay": new Date(Date.now()),
        "status": "Pendiente"
     };

    $.ajax({
        url: raiz + "/user/"+idAse,
        type:"GET",
        async: false,
        datatype:"JSON",
        success:function(user){
            json["salesMan"] = user;
        }    
    });

    let products = {};
    let quantities = {};
    let ref;
    for(var i=0; i<carrito.length; i++) {
        ref = carrito[i];
        $.ajax({
            url: raiz + "/fragance/"+ref,
            type:"GET",
            async: false,
            datatype:"JSON",
            success:function(fragance){
                products[ref] = fragance;
            }    
        });
        quantities[ref] = cantidades[i];
    }
    json["products"] = products;
    json["quantities"] = quantities;

    $.ajax({
        //crossOrigen: true,
        type:"POST",
        contentType:"application/json; charset=utf-8",
        dataType: "text", //mandaba parse error con JSON
        data: JSON.stringify(json),
        url: raiz + "/order/new",

        success: function(respose) {
            alert("Se registró orden correctamente. "+respose);
        },

        error: function(xhr, status){
            console.log(status);
            alert("Quizás no se registró.");
        }
    });
}

function cancelarPedido() {
    carrito = [];
    cantidades = [];
    pintarListaPedido();
}




