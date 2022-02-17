//Variables a usar
var palabras_secretas = ["PERA", "MANZANA", "SANDIA", "LUNA", "SOL", "PERRO", "CURSO", "DIA", "NOCHE", "TARDE", "SUMAR", "ZAPATO", "POLO", "ALMOHADA", "ESPEJO", "GATO", "CAMIONETA", "ESCRITORIO", "DESAYUNO", "CEREAL", "LECHE", "SILLA", "CUADERNO", "ZAPATO", "JUGUETE", "DICCIONARIO", "PASTILLA", "LAMPARA", "MELON", "BICICLETA"];
var palabra_secreta = palabra_secreta_azar(palabras_secretas);
var letras_erroneas = [];
var contador_errores = 0;
var letras_ingresadas = [];
var letras_correctas = [];


for (var i = 0; i < palabra_secreta.length; i++) {
    letras_ingresadas[i] = "";
    letras_correctas[i] = "";
}


function checkKeyPress(palabra) {

    tecla = this.value.toUpperCase();
    inputAuxiliar.value = "";

    letraValida = validar_letras(tecla);

    if (letraValida) {
        alert("Solo se permiten letras, nada de números ni caracteres especiales, vuelva a ingresar una letra!");

    } else {

        const expresion = new RegExp(tecla, "i");

        if (!expresion.test(palabra_secreta)) {
            contador_errores += 1;

            if (!expresion.test(letras_erroneas)) {
                letras_erroneas.push(tecla);

                render();
            }

        } else {

            for (var i = 0; i < palabra_secreta.length; i++) {
                const element = palabra_secreta[i];
                var letraActual = letras_correctas;
                if (element == tecla) {

                    letraActual[i] = element;

                    if (letras_ingresadas[i] == "") {
                        letras_ingresadas[i] = element;

                        render();
                    }

                    letraActual[i] = "";
                }
            }
        }
    }
}



//BOTONES

var btn_iniciar_juego = document.querySelector("#iniciar_juego");
var btn_ingresar_palabra = document.querySelector("#agregar_palabra");
var botonAgregarContinuar = document.querySelector("#btn_agregar_continuar");
var btnRetroceso = document.querySelector("#btn_cancelar");
var btnNuevoJuego = document.querySelector("#btn_nuevo_juego");
var btnDesistir = document.querySelector("#btn_desistir");

var index = document.querySelector(".inicio");
var agregar_palabra = document.querySelector(".ingresar_palabra");
var jugar = document.querySelector(".jugar");


//index.classList.add("oculto");
agregar_palabra.classList.add("oculto");
jugar.classList.add("oculto");

btn_iniciar_juego.addEventListener("click", function (event) {
    index.classList.add("oculto");
    jugar.classList.remove("oculto");

    nuevoJuego();

    inputAuxiliar.focus();
});

btn_ingresar_palabra.addEventListener("click", function (event) {
    index.classList.add("oculto");
    agregar_palabra.classList.remove("oculto");
});

botonAgregarContinuar.addEventListener("click", function () {

    var textArea = document.querySelector("#input_nueva_palabra");
    var palabraIngresar = textArea.value.toUpperCase();

    errores = validarPalabra(palabraIngresar);

    if (errores.length == 0) {
        palabras_secretas.push(palabraIngresar);
        alert("La palabra " + palabras_secretas[palabras_secretas.length - 1] + " fue agregada correctamete.");
        textArea.value = "";

        agregar_palabra.classList.add("oculto");
        jugar.classList.remove("oculto");

        nuevoJuego();

        inputAuxiliar.focus();

    } else {
        alert(errores[0]);
    }
});

btnRetroceso.addEventListener("click", function (event) {
    agregar_palabra.classList.add("oculto");
    jugar.classList.add("oculto");
    index.classList.remove("oculto");

    inputAuxiliar.removeEventListener("input", checkKeyPress, false);

});

btnNuevoJuego.addEventListener("click", function (event) {
    
    nuevoJuego();

    inputAuxiliar.focus();
});

btnDesistir.addEventListener("click", function (event) {
    agregar_palabra.classList.add("oculto");
    jugar.classList.add("oculto");
    index.classList.remove("oculto");

    inputAuxiliar.removeEventListener("input", checkKeyPress, false);
}); 



var inputAuxiliar = document.querySelector("#input_teclado");

function nuevoJuego() {

    inputAuxiliar.addEventListener("input", checkKeyPress, false);

    palabra_secreta = palabra_secreta_azar();

    letras_ingresadas = [];
    letras_correctas = [];

    for (let i = 0; i < palabra_secreta.length; i++) {
        letras_ingresadas[i] = "";
        letras_correctas[i] = "";
    }

    letras_erroneas = [];

    render();
}

function palabra_secreta_azar() {
    var palabra_Azar = palabras_secretas[Math.floor(Math.random() * palabras_secretas.length)];
    return palabra_Azar.split('');
}

function validarPalabra(palabraIngresar) {

    errores = [];
    letraValida = validar_letras(palabraIngresar);

    if (palabraIngresar.length == 0) {
        errores.push("El campo no puede estar vacío");
    }

    if (palabraIngresar.length > 8) {
        errores.push("La palabra a ingresar debe tener max. 8 letras");
    }

    if (letraValida) {
        errores.push("El campo solo guarda letras");
    }

    return errores;
}

function validar_letras(tecla) {
    letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (let i = 0; i < tecla.length; i++) {
        const element = tecla[i];
        if (letras.indexOf(element) == -1) {
            return true;
        }
    }
}


//Dibujo del ahorcado dentro de la pantalla
var pantalla = document.getElementById("ahorcado");
var context = pantalla.getContext("2d");

var render = function () {

    context.canvas.width = document.documentElement.clientWidth * .95;
    context.canvas.height = document.documentElement.clientHeight * .60;

    hacerLineas((context.canvas.width * .50) - ((35 * (palabra_secreta.length)) / 2), context.canvas.height * .90, palabra_secreta.length);

    // mostrar letras bien ingresadas
    mostrarLetras((context.canvas.width * .50) - ((35 * (letras_ingresadas.length)) / 2), context.canvas.height * .90, letras_ingresadas, "24px Inter", "blue");

    // mostrar letras mal ingresadas
    mostrarLetras((context.canvas.width * .50) - ((35 * (letras_erroneas.length)) / 2), context.canvas.height, letras_erroneas, "24px Inter", "white");

    //dibujarHorca(context.canvas.width, context.canvas.height);
    dibujarHorca(context.canvas.width, context.canvas.height * .75);

    //dibujando texto, intentos restantes
    mostrarFrase(context.canvas.width * 1.3, context.canvas.height * 1.4, "Intentos restantes " + (7 - letras_erroneas.length), "20px Inter", "red");

    // validar si terminó el Juego correctamente
    if (JSON.stringify(palabra_secreta) === JSON.stringify(letras_ingresadas)) {
        mostrarFrase(context.canvas.width, context.canvas.height - 50, "¡Felicidades, Ganaste!", "30px Inter", "green");
        inputAuxiliar.removeEventListener("input", checkKeyPress, false);
        inputAuxiliar.focus();
    }
};

function dibujarHorca(x, y) {
    for (var i = 0; i < letras_erroneas.length + 1; i++) {

        if (i == 0) {

            // DIBUJA BASE AHORCADO

            // Color y tamaño línea
            context.strokeStyle = "orange";
            context.lineWidth = 5;

            // Línea
            context.moveTo(x * .200, y);
            context.lineTo(x * .700, y);
            context.stroke();
            // Base 
            context.moveTo(x * .250, y);
            context.lineTo(x * .300, y * .900);
            context.lineTo(x * .350, y);
            context.stroke();

            // Dibuja "poste"
            context.moveTo(x * .300, y * .900);
            context.lineTo(x * .300, y * .100);
            context.stroke();

        }

        if (i == 1) {
            // Dibuja "viga"
            context.moveTo(x * .300, y * .100);
            context.lineTo(x * .700, y * .100);
            context.stroke();

            // Dibuja "lazo"
            context.moveTo(x * .7, y * .1);
            context.lineTo(x * .7, y * .25);
            context.stroke();
        }

        if (i == 2) {
            context.lineWidth = 2;

            // Cabeza
            context.beginPath();
            context.arc(x * .7, y * .321, y * .075, 0, 2 * Math.PI);
            context.stroke();
        }

        if (i == 3) {
            // Cuerpo
            context.moveTo(x * .7, y * .395);
            context.lineTo(x * .7, y * .55);
            context.stroke();
        }

        if (i == 4) {
            // Mano izquierda
            context.moveTo(x * .7, y * .4);
            context.lineTo(x * .680, y * .5);
            context.stroke();
        }

        if (i == 5) {
            // Mano derecha
            context.moveTo(x * .7, y * .4);
            context.lineTo(x * .720, y * .5);
            context.stroke()
        }

        if (i == 6) {
            // Pie izquierdo
            context.moveTo(x * .7, y * .55);
            context.lineTo(x * .675, y * .7);
            context.stroke();
        }

        if (i == 7) {
            // Pie derecho
            context.moveTo(x * .7, y * .55);
            context.lineTo(x * .725, y * .7);
            context.stroke();

            mostrarFrase(context.canvas.width, context.canvas.height, "Perdiste, ¡Intentalo de nuevo!", "30px Inter", "red");
            inputAuxiliar.removeEventListener("input", checkKeyPress, false);
            inputAuxiliar.blur();
        }
    }
}

function hacerLineas(x, y, cant) {

    for (let i = 0; i < cant; i++) {

        context.moveTo(x, y);
        context.lineTo(x + 30, y);
        context.stroke();

        x += 35;
    }

}

function mostrarLetras(x, y, letras, formatoLetras, color) {
    for (var i = 0; i < letras.length; i++) {
        var letra = letras[i];

        context.font = formatoLetras;
        context.fillStyle = color;
        context.textAlign = "center";
        context.fillText(letra, x + 15, y - 10);

        x += 35;
    }
}

function mostrarFrase(x, y, frase, formato, color) {
    context.font = formato;
    context.fillStyle = color;
    context.textAlign = "center";
    context.fillText(frase, x / 2, y / 2);
}


window.addEventListener("resize", render);
render();