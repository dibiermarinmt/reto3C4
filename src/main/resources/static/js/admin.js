/**
 * FUNCIONES PARA EL PERFIL DE ADMINISTRADOR
 * 
 */

/**
 *  Esta función pinta el html
 */
function pintarAdmin() {
    let adminHtml = `
        <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link active" id="usersTab" data-bs-toggle="tab" data-bs-target="#users" type="button" role="tab" aria-controls="home" aria-selected="true">Administrar Usuarios</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="fragancesTab" data-bs-toggle="tab" data-bs-target="#fragances" type="button" role="tab" aria-controls="profile" aria-selected="false">Administrar Productos</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="logoutTab" data-bs-toggle="tab" data-bs-target="#logout" type="button" role="tab" aria-controls="contact" aria-selected="false">Salir</button>
            </li>
        </ul>
        <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="users" role="tabpanel" aria-labelledby="home-tab"></div>
            <div class="tab-pane fade" id="fragances" role="tabpanel" aria-labelledby="profile-tab">hola fragance</div>
            <div class="tab-pane fade" id="logout" role="tabpanel" aria-labelledby="contact-tab"> ¿Quieres salir?</div>
        </div>
    `;
    $("#user").html(adminHtml);
}