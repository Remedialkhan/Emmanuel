
//Cargar vista principal
window.onload = function () {
    var url1 = "/Contacto/Nuevo";
    $.get(url1).done(function (data) {
        $("#cards").html(data);
        $("#grafica").hide();
        $("#grafica2").hide();


    });


};
//Cargar Modal con diferentes Páginas
function vistaPC() {
    var urlA = '/Contacto/Create';
    $.ajax({
        cache: false,
        async: true,
        type: "GET",
        url: urlA,
        data: {},
        success: function (response) {
            $('#resultado').html('');
            $('#resultado').html(response);
        }
    });
}

function vistaPE(a) {
    var b = a.id;
    var urlA = '/Contacto/Edit';
    $.ajax({
        cache: false,
        async: true,
        type: "POST",
        url: urlA,
        data: { id: b },
        success: function (response) {
            $('#resultado').html('');
            $('#resultado').html(response);
        }
    });
}

function vistaPD(a) {
    var b = a.id;
    var url1 = '/Contacto/Delete';
    $.ajax({
        cache: false,
        async: true,
        type: "POST",
        url: url1,
        data: { id: b },
        success: function (response) {
            $('#resultado').html('');
            $('#resultado').html(response);
        },
    });
}

//Funciones de los botones de cada Modal
//Crear
function enviar() {

    var nombre = document.getElementById('nombre').value;
    var telefono = document.getElementById('telefono').value;
    var calle = document.getElementById('calle').value;
    var numeroExt = document.getElementById('numeroExt').value;
    var colonia = document.getElementById('colonia').value;
    var cp = document.getElementById('cp').value;
    var ciudad = document.getElementById('ciudad').value;
    var entidad = document.getElementById('entidad').value;

    if (nombre.length != 0) {
        $('#nombre').addClass('is-valid').removeClass('is-invalid');
        $('#nombreF').html('');
    }
    else {
        $('#nombre').addClass('is-invalid').removeClass('is-valid');
        $('#nombreF').html('<span class="text-danger">El nombre no debe de estar vacío</span>');
    }//Nombre
    if (telefono.length != 10) {
        $('#telefono').addClass('is-invalid').removeClass('is-valid');
        $('#telefonoF').html('<span class="text-danger">El teléfono debe de tener 10 dígitos</span>');
    }
    else {
        $('#telefono').addClass('is-valid').removeClass('is-invalid');
        $('#telefonoF').html('');
    }//teléfono
    if (calle.length != 0) {
        $('#calle').addClass('is-valid').removeClass('is-invalid');
        $('#calleF').html('');
    }
    else {
        $('#calle').addClass('is-invalid').removeClass('is-valid');
        $('#calleF').html('<span class="text-danger">La calle no debe de estar vacía</span>');
    }//Calle
    if (numeroExt.length != 0) {
        $('#numeroExt').addClass('is-valid').removeClass('is-invalid');
        $('#numeroExtF').html('');
    }
    else {
        $('#numeroExt').addClass('is-invalid').removeClass('is-valid');
        $('#numeroExtF').html('<span class="text-danger">El número Exterior no debe de estar vacío</span>');
    }//NumeroExt
    if (colonia.length != 0) {
        $('#colonia').addClass('is-valid').removeClass('is-invalid');
        $('#coloniaF').html('');
    }
    else {
        $('#colonia').addClass('is-invalid').removeClass('is-valid');
        $('#coloniaF').html('<span class="text-danger">La Colonia no debe de estar vacía</span>');
    }//colonia
    if (cp.length != 0) {
        $('#cp').addClass('is-valid').removeClass('is-invalid');
        $('#cpF').html('');
    }
    else {
        $('#cp').addClass('is-invalid').removeClass('is-valid');
        $('#cpF').html('<span class="text-danger">El CP no debe de estar vacío</span>');
    }//CP
    if (ciudad.length != 0) {
        $('#ciudad').addClass('is-valid').removeClass('is-invalid');
        $('#ciudadF').html('');
    }
    else {
        $('#ciudad').addClass('is-invalid').removeClass('is-valid');
        $('#ciudadF').html('<span class="text-danger">La Ciudad no debe de estar vacía</span>');
    }//Ciudad
    if (entidad.length != 0) {
        $('#entidad').addClass('is-valid').removeClass('is-invalid');
        $('#entidadF').html('');
    }
    else {
        $('#entidad').addClass('is-invalid').removeClass('is-valid');
        $('#entidadF').html('<span class="text-danger">La Entidad no debe de estar vacía</span>');
    }//entidad

    if (nombre.length == 0 || calle.length == 0 || telefono.length != 10 || numeroExt.length == 0 || colonia.length == 0 || cp.length == 0
        || ciudad.length == 0 || entidad.length == 0) {
        return true;
    }//Validación
    var html = `<div class="card text-white bg-success mb-3" style="max-width: 23rem; ">
            <div class="card-body">
                <h5 class="card-title">Registro Exitoso</h5>
            </div>
    </div>`;
    var urlA = '/api/ContactoApi/Create';

    $.ajax({
        type: "POST",
        headers: {
            "Content-Type": "application/json",
            "dataType": 'json',
        },
        url: urlA,
        data: JSON.stringify({ Nombre: nombre, Telefono: telefono, Calle: calle, NumeroExt: numeroExt, Colonia: colonia, Cp: cp, Ciudad: ciudad, Entidad: entidad }),
        //data: data2, /*JSON.stringify(data2),*/
        success: function (response) {
            location.href = "#contactos";
            setTimeout(function () {
                $("#alerta").html('');
            }, 4000);
            var url1 = "/Contacto/Nuevo";
            $.get(url1).done(function (data) {
                $("#cards").html(data);
                $('#myModal').modal('hide');
                $("#alerta").html(html);
            });
        },
        error: function (jqXHR, exception) {
            var msg = '';

            if (jqXHR.status === 0) {
                msg = 'No conectado.\n Verifica tu Red.';
            } else if (jqXHR.status == 404) {
                msg = 'Error en el Servidor. Código de Error. [' + jqXHR.status + '].';
            } else if (jqXHR.status == 500) {
                msg = 'Error Interno de Servidor. [' + jqXHR.status + '].';
            } else {
                msg = 'Uncaught Error.\n' + jqXHR.responseText;
            }
            $('#error').html(msg);
        }

    });

};

//Editar
function editar() {

    var nombre = document.getElementById('nombre').value;
    var telefono = document.getElementById('telefono').value;
    var calle = document.getElementById('calle').value;
    var numeroExt = document.getElementById('numeroExt').value;
    var colonia = document.getElementById('colonia').value;
    var cp = document.getElementById('cp').value;
    var ciudad = document.getElementById('ciudad').value;
    var entidad = document.getElementById('entidad').value;
    var id = document.getElementById('id').value;
    var direccionId = document.getElementById('direccionId').value;
    var html = `<div class="card text-white bg-primary mb-3" style="max-width: 23rem; ">
            <div class="card-body">
                <h5 class="card-title">Registro Editado</h5>
            </div>
    </div>`;

    if (nombre.length != 0) {
        $('#nombre').addClass('is-valid').removeClass('is-invalid');
        $('#nombreF').html('');
    }
    else {
        $('#nombre').addClass('is-invalid').removeClass('is-valid');
        $('#nombreF').html('<span class="text-danger">El nombre no debe de estar vacío</span>');
    }//Nombre
    if (telefono.length != 10) {
        $('#telefono').addClass('is-invalid').removeClass('is-valid');
        $('#telefonoF').html('<span class="text-danger">El teléfono debe de tener 10 dígitos</span>');
    }
    else {
        $('#telefono').addClass('is-valid').removeClass('is-invalid');
        $('#telefonoF').html('');
    }//teléfono
    if (calle.length != 0) {
        $('#calle').addClass('is-valid').removeClass('is-invalid');
        $('#calleF').html('');
    }
    else {
        $('#calle').addClass('is-invalid').removeClass('is-valid');
        $('#calleF').html('<span class="text-danger">La calle no debe de estar vacía</span>');
    }//Calle
    if (numeroExt.length != 0) {
        $('#numeroExt').addClass('is-valid').removeClass('is-invalid');
        $('#numeroExtF').html('');
    }
    else {
        $('#numeroExt').addClass('is-invalid').removeClass('is-valid');
        $('#numeroExtF').html('<span class="text-danger">El número Exterior no debe de estar vacío</span>');
    }//NumeroExt
    if (colonia.length != 0) {
        $('#colonia').addClass('is-valid').removeClass('is-invalid');
        $('#coloniaF').html('');
    }
    else {
        $('#colonia').addClass('is-invalid').removeClass('is-valid');
        $('#coloniaF').html('<span class="text-danger">La Colonia no debe de estar vacía</span>');
    }//colonia
    if (cp.length != 0) {
        $('#cp').addClass('is-valid').removeClass('is-invalid');
        $('#cpF').html('');
    }
    else {
        $('#cp').addClass('is-invalid').removeClass('is-valid');
        $('#cpF').html('<span class="text-danger">El CP no debe de estar vacío</span>');
    }//CP
    if (ciudad.length != 0) {
        $('#ciudad').addClass('is-valid').removeClass('is-invalid');
        $('#ciudadF').html('');
    }
    else {
        $('#ciudad').addClass('is-invalid').removeClass('is-valid');
        $('#ciudadF').html('<span class="text-danger">La Ciudad no debe de estar vacía</span>');
    }//Ciudad
    if (entidad.length != 0) {
        $('#entidad').addClass('is-valid').removeClass('is-invalid');
        $('#entidadF').html('');
    }
    else {
        $('#entidad').addClass('is-invalid').removeClass('is-valid');
        $('#entidadF').html('<span class="text-danger">La Entidad no debe de estar vacía</span>');
    }//entidad

    if (nombre.length == 0 || calle.length == 0 || telefono.length != 10 || numeroExt.length == 0 || colonia.length == 0 || cp.length == 0
        || ciudad.length == 0 || entidad.length == 0) {
        return true;
    }//Validación

    var urlA = '/api/ContactoApi/Put';

    $.ajax({
        type: "PUT",
        headers: {
            "Content-Type": "application/json",
            "dataType": 'json',
        },
        url: urlA,
        data: JSON.stringify({ Id: id, DireccionId: direccionId, Nombre: nombre, Telefono: telefono, Calle: calle, NumeroExt: numeroExt, Colonia: colonia, Cp: cp, Ciudad: ciudad, Entidad: entidad }),
        success: function (response) {
            location.href = "#contactos";
            setTimeout(function () {
                $("#alerta").html('');
            }, 4000);
            var url1 = "/Contacto/Nuevo";
            $.get(url1).done(function (data) {
                $("#cards").html(data);
                $("#myModal").modal("hide");
                $("#alerta").html(html);
            });
        },
        error: function (jqXHR, exception) {
            var msg = '';
            if (jqXHR.status === 0) {
                msg = 'No conectado.\n Verifica tu Red.';
            } else if (jqXHR.status == 404) {
                msg = 'Error en el Servidor. Código de Error. [' + jqXHR.status + ']. Contacte al administrador';
            } else if (jqXHR.status == 500) {
                msg = 'Error Interno de Servidor. [' + jqXHR.status + ']. Contacte al administrador';
            } else {
                msg = 'Error desconocido Error.\n' + jqXHR.responseText + '. Contacte al administrador';
            }
            console.log(jqXHR.responseText);
            $('#error').html(msg);
        }
    });
}

//Eliminar
function eliminar() {
    var id = document.getElementById('id').value;
    var direccionId = document.getElementById('direccionId').value;
    var estado = document.getElementById('estado').value;

    var html0 = `<div class="card text-white bg-warning mb-3" style="max-width: 23rem; ">
            <div class="card-body">
                <h5 class="card-title text-dark">Registro No se Eliminó</h5>
            </div>
    </div>`;
    var html1 = `<div class="card text-white bg-danger mb-3" style="max-width: 23rem; ">
            <div class="card-body">
                <h5 class="card-title">Registro Eliminado</h5>
            </div>
    </div>`;

    var urlA = '/api/ContactoApi/Delete';
    $.ajax({
        type: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "dataType": 'json',
        },
        url: urlA,
        data: JSON.stringify({ Id: id, DireccionId: direccionId, Estado: estado }),
        success: function (response) {
            if (response == 1) {
                $("#alerta").html(html1);
            } else {
                $("#alerta").html(html0);
            }
            setTimeout(function () {
                $("#alerta").html('');
            }, 4000);
            location.href = "#contactos";
            var url1 = "/Contacto/Nuevo";
            $.get(url1).done(function (data) {
                $("#cards").html(data);
                $("#myModal").modal('hide');
            });
        },
        error: function (jqXHR, exception) {
            var msg = '';
            if (jqXHR.status === 0) {
                msg = 'No conectado.\n Verifica tu Red.';
            } else if (jqXHR.status == 404) {
                msg = 'Error en el Servidor. Código de Error. [' + jqXHR.status + ']. Contacte al administrador';
            } else if (jqXHR.status == 500) {
                msg = 'Error Interno de Servidor. [' + jqXHR.status + ']. Contacte al administrador';
            } else {
                msg = 'Error Desconocido. \n' + jqXHR.responseText + '. Contacte al administrador';
            }
            console.log(jqXHR.responseText);
            $('#error').html(msg);
        }
    });

}

//Botones del navbar 2

function Prueba1() {
    var url1 = "/Contacto/Nuevo";
    $.get(url1).done(function (data) {
        $("#cards").html(data);
        $("#cards").show();
        $("#grafica").hide();
        $("#grafica2").hide();
    });

}
function Prueba2() {
    var urlA = '/api/ContactoApi/GetCategory';
    $.ajax({
        type: "GET",
        url: urlA,
        data: {},            //data: data2, /*JSON.stringify(data2),*/
        success: function (response) {
            var dataPoint = "[";
            for (var i = 0; i < response.length; i++) {
                var a = response[i];
                if (a['nombre'] == null) {
                    a['nombre'] = "Sin Categoría";
                }
                dataPoint = dataPoint + '{"label":"' + a['nombre'] + '", "y":' + a['quantity'] + "},"
            }
            dataPoint = dataPoint.substring(0, dataPoint.length - 1);
            dataPoint = dataPoint + "]";
            var grafica = JSON.parse(dataPoint);
            var chart = new CanvasJS.Chart("grafica", {
                theme: "dark2", // "light2", "dark1", "dark2"
                animationEnabled: true, // change to true		
                title: {
                    text: "Contactos"
                },
                data: [
                    {
                        // Change type to "bar", "area", "spline", "pie",etc.
                        type: "column",
                        legendText: "{indexLabel}",
                        showInLegend: true,
                        dataPoints: grafica
                    }
                ]
            });
            chart.render();
        },
        error: function (jqXHR, exception) {
            var msg = '';

            if (jqXHR.status === 0) {
                msg = 'No conectado.\n Verifica tu Red.';
            } else if (jqXHR.status == 404) {
                msg = 'Error en el Servidor. Código de Error. [' + jqXHR.status + '].';
            } else if (jqXHR.status == 500) {
                msg = 'Error Interno de Servidor. [' + jqXHR.status + '].';
            } else {
                msg = 'Uncaught Error.\n' + jqXHR.responseText;
            }
            $('#error').html(msg);
        }

    });
    $("#grafica").show();
    $("#cards").hide();
    $("#grafica2").hide();
}
function Prueba3() {
    var urlA = '/api/ContactoApi/GetCategory';
    $.ajax({
        type: "GET",
        url: urlA,
        data: {},            //data: data2, /*JSON.stringify(data2),*/
        success: function (response) {
            var dataPoint = "[";
            for (var i = 0; i < response.length; i++) {
                var a = response[i];
                if (a['nombre'] == null) {
                    a['nombre'] = "Sin Categoría";
                }
                dataPoint = dataPoint + '{"indexLabel":"' + a['nombre']+'", "y":'+a['quantity']+"},"
            }
            dataPoint = dataPoint.substring(0, dataPoint.length - 1);
            dataPoint = dataPoint + "]";
            var grafica = JSON.parse(dataPoint);
            var chart2 = new CanvasJS.Chart("grafica2", {
                theme: "dark2", // "light2", "dark1", "dark2"
                animationEnabled: true, // change to true		
                title: {
                    text: "Contactos"
                },
                data: [
                    {
                        // Change type to "bar", "area", "spline", "pie",etc.
                        type: "pie",
                        legendText: "{indexLabel}",
                        showInLegend: true,
                        dataPoints: grafica
                    }
                ]
            });
            chart2.render();
        },
        error: function (jqXHR, exception) {
            var msg = '';

            if (jqXHR.status === 0) {
                msg = 'No conectado.\n Verifica tu Red.';
            } else if (jqXHR.status == 404) {
                msg = 'Error en el Servidor. Código de Error. [' + jqXHR.status + '].';
            } else if (jqXHR.status == 500) {
                msg = 'Error Interno de Servidor. [' + jqXHR.status + '].';
            } else {
                msg = 'Uncaught Error.\n' + jqXHR.responseText;
            }
            $('#error').html(msg);
        }

    });
    $("#grafica2").show();
    $("#grafica").hide();
    $("#cards").hide();
}

