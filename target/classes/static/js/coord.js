function pintarCoord() {
    let coordHtml = `
        <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link active" id="pedidosTab" data-bs-toggle="tab" data-bs-target="#pedidos" type="button" role="tab" aria-controls="home" aria-selected="true" onclick="pintarEditarPedidos()">Administrar Pedidos</button>
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
    $("#user").html(coordHtml);
    pintarEditarPedidos();
}

function pintarEditarPedidos() {
    let pedido = `
        <br>
        <br>
        <h4 class="mt-1 mb-5 pb-1">TABLA DE ADMINISTRACIÓN PEDIDOS</h4>
        <p>A continuación edita tus pedidos:</p>
        <center><div id="editarPedido" style="width: 60%;"></div></center>
        <div id="tablaPedidos"></div>
    `;
    $("#pedidos").html(pedido);
    consultarPedidos();
}

function consultarPedidos() {
    $.ajax({
        url: raiz+"/order/zona/"+zoneCoord,
        type:"GET",
        datatype:"JSON",
        success:function(orders){
            pintarTablaPedidos(orders);
        }
    });
}

function pintarTablaPedidos(orders) {
    let miTabla = `
        <table class="table table-hover">
            <thead>
                <tr>
                    <th scope="col"># Id</th>
                    <th scope="col">Comprador</th>
                    <th scope="col">Fecha de Registro</th>
                    <th scope="col">Estado</th>
                </tr>
            </thead>
            <tbody>
    `;
    for(let i = 0; i < orders.length; i++) {
        miTabla += "<tr>";
        miTabla += "<th scope='col'>"+orders[i].id+"</th>";
        miTabla += "<td>"+orders[i].salesMan.name+"</td>";
        miTabla += "<td>"+orders[i].registerDay+"</td>";
        miTabla += "<td>"+orders[i].status+"</td>";
        miTabla += "<td type='button' class='btn m-1 gradient-custom-2 text-white border-primary' onclick='editarPedido("+orders[i].id+")'> Editar </td>";
        miTabla += "<td type='button' class='btn m-1 gradient-custom-2 text-white border-primary' onclick='verPedido("+orders[i].id+")'>Ver</td>";
        miTabla += "</tr>";
    }
    miTabla += `
            </tbody>
        </table>
    `;
    $("#tablaPedidos").html(miTabla);
}

function pintarEditarPedido(order) {
    let formulario = "";
        formulario += "<form>";
        formulario += "<h6 class='mt-1 mb-5 pb-1' style='color: red'>EDITANDO ESTADO DE PEDIDO...</h6>";
        formulario += "<p>A continuación edita el estado del pedido</p>";

        formulario += "<div class='form-floating mb-4'>";
        formulario += "<input type='text' id='status' class='form-control' placeholder='Estado' value='"+order.status+"' />";
        formulario += "<label for='status'>Estado</label>";
        formulario += "</div>";

        formulario += "<div>";
        formulario += "<button class='btn btn-primary btn-lg btn-block fa-lg gradient-custom-2 mb-3' type='button' onclick='guardarEditarPedido("+order.id+")'>Guardar</button> &nbsp; &nbsp;";
        formulario += "<button class='btn btn-primary btn-lg btn-block fa-lg gradient-custom-2 mb-3' type='button' onclick='cancelarEditarPedido()'>Cancelar</button>";
        formulario += "</div>";
        formulario += "</form>";

    $("#editarPedido").html(formulario);
    $("#status").focus();
}

function editarPedido(id) {
    $.ajax({
        url: raiz+"/order/"+id,
        type:"GET",
        datatype:"JSON",
        success:function(order){
            pintarEditarPedido(order);
        }
    });
}

function guardarEditarPedido(idPedido) {
    let estado = {
        id: idPedido,
        status: $("#status").val(),
    };

    $.ajax({
        dataType: 'text',       
        data: JSON.stringify(estado),        
        url: raiz+'/order/update',      
        type: 'PUT',
        contentType:'application/json',        
        
        success: function(json, textStatus, xhr) {
            alert("Estado editado exitosamente.");
            $("#editarPedido").html("");
            consultarPedidos();
        },

        error: function(xhr, status) {
            alert("Quizás no se editó el estado adecuadamente.");
            console.log(status);
        }
    });
}

function cancelarEditarPedido() {
    $("#editarPedido").html("");
}

function verPedido(id) {
    $.ajax({
        url: raiz+"/order/"+id,
        type:"GET",
        datatype:"JSON",
        success:function(order){
            pintarPedido(order);
        }
    });
}

function pintarPedido(order) {
    let pedido =  `
    <div>
        <div class="card-body">
            <h5 class="card-title">${order.id}</h5>
            <h6 class="card-title">${order.registerDay}</h6>
            <h6 class="card-title">${order.status}</h6>
            <br>
            <h6 class="card-title">Datos del Comprador</h6><br>
            <p class="card-text">`
        for (var x in order.salesMan) {
            pedido += `<strong>${x}:</strong> ${order.salesMan[x]}. `;
        }
            
        pedido += `</p><br><br>

            <h6 class="card-title">Productos del Pedido</h6><br>
            <p class="card-text">`;
        for (var x in order.products) {
            for (var dato in order.products[x]) {
                pedido += `<strong>${dato}:</strong> ${order.products[x][dato]}. `;
            }
            pedido += `<strong>CANTIDAD PEDIDA:</strong> ${order.quantities[x]}.<br><br>`;
        }
            
        pedido += `
            </p>

            <button class="btn btn-primary btn-lg btn-block fa-lg gradient-custom-2 mb-3" type="button" onclick="cancelarEditarPedido()">Cerrar</button>
            
        </div>
    </div>
`;  
    $("#editarPedido").html(pedido);
}
