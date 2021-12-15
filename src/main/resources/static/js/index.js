/**
 * FUNCIONES PRINCIPALES INDEX
 * 
 * Contiene todo el html base común a todas los
 * servicios de la página web.
 */

// PARÁMETROS GLOBALES
const raiz = "http://129.151.117.196:8080/api"; // "http://localhost:8080/api";
let alerta = "";

/**
 * Crea una variable htmlBase interna que contiene
 * el html base. Las funcionalidades de la página web
 * se van a desplegar en una carta maindCard
 */
function pintarBase() {
    let htmlBase = `
        <section class="h-100 gradient-form" style="background-color: #eee;">
            <div class="container py-5 h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col-xl-10">
                        <!--carta principal-->
                        <div class="card rounded-3" id="mainCard">
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
    $("#base").html(htmlBase);
}

/**
 * Esta función descarga el html base al iniciar
 * la página web.
 */
$(document).ready(function() {
    pintarBase();
});



