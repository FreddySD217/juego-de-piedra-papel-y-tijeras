const users = []; // Array para almacenar usuarios

// Función para mostrar contenedores
function showContainer(containerId) {
    document.querySelectorAll("main").forEach((main) => {
        main.style.display = "none";
    });
    document.getElementById(containerId).style.display = "block";
}

// Manejo de registro
document.getElementById("register-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("new-username").value;
    const password = document.getElementById("new-password").value;

    if (users.find((user) => user.username === username)) {
        alert("El usuario ya existe. Intenta con otro nombre.");
    } else {
        users.push({ username, password });
        alert("Registro exitoso.");
        showContainer("login-container");
    }
});

// Manejo de inicio de sesión
document.getElementById("login-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const user = users.find((user) => user.username === username && user.password === password);

    if (user) {
        console.table(users);
        alert(`¡Bienvenido, ${username}!`);
        showContainer("game-container");
    } else {
        document.getElementById("login-message").textContent = "Usuario o contraseña incorrectos.";
    }
});

// Navegación entre secciones
document.getElementById("go-to-register").addEventListener("click", () => {
    showContainer("register-container");
});

document.getElementById("go-to-login").addEventListener("click", () => {
    showContainer("login-container");
});


class Juego {
    constructor() {
        this.opciones = ["✊","✋","✌"];
    }

    CPU() {
        const eleccioncpu = Math.floor(Math.random() * this.opciones.length);
        return this.opciones[eleccioncpu];
    }
}

class Puntaje {
    constructor() {
        this.puntajeusuario = 0;
        this.puntajecpu = 0;
    }

    actualizar(jugador, cpu) {
        this.puntajeusuario += jugador;
        this.puntajecpu += cpu;

        const pusuario = document.getElementById('puntos jugador');
        const pcpu = document.getElementById('puntos computadora');
        pusuario.textContent = `${this.puntajeusuario}`;
        pcpu.textContent = `${this.puntajecpu}`;
    }

    reiniciar() {
        this.puntajeusuario = 0;
        this.puntajecpu = 0;
        const pusuario = document.getElementById('puntos jugador');
        const pcpu = document.getElementById('puntos computadora');
        pusuario.textContent = `${this.puntajeusuario}`;
        pcpu.textContent = `${this.puntajecpu}`;
    }
}

const juego = new Juego();
const puntaje = new Puntaje();

function empezar(eleccionusuario) {
    const eleccioncpu = juego.CPU();
    textos(eleccionusuario,eleccioncpu);
}

function textos(eleccionusuario,eleccioncpu) {
    const texto1 = document.getElementById('elejiste');
    const texto2 = document.getElementById('cpu');
    texto1.textContent = `Elegiste: ${eleccionusuario}`;
    texto2.textContent = `El CPU eligió: ${eleccioncpu}`;
    logica(eleccionusuario,eleccioncpu);
}

function logica(usuario,cpu) {
    const resultado = document.getElementById('resultado');
    if (usuario === cpu) {
        resultado.textContent = "Empate";
    } else if (
        (usuario === "✊" && cpu === "✌") ||
        (usuario === "✋" && cpu === "✊") ||
        (usuario === "✌" && cpu === "✋")
    ) {
        resultado.textContent = "Ganaste";
        puntaje.actualizar(1,0);
    } else {
        resultado.textContent = "Perdiste";
        puntaje.actualizar(0,1);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const botones = document.querySelectorAll('.arma');
    botones.forEach(boton => {
        boton.addEventListener('click', () => {
            const eleccion = boton.textContent;
            empezar(eleccion);
        });
    });

    const reiniciar = document.getElementById('reinicio');
    reiniciar.addEventListener('click', () => {
        const texto1 = document.getElementById('elejiste');
        const texto2 = document.getElementById('cpu');
        texto1.textContent = "‎";
        texto2.textContent = "‎";
        const resultado = document.getElementById('resultado');
        resultado.textContent = "‎";
        puntaje.reiniciar();
    });

    document.getElementById('troll').addEventListener('click', function() {
    // Limpiar todo el contenido de la página
    document.body.innerHTML = '';

    // Crear un contenedor para el video
    const videoContainer = document.createElement('div');
    const a = document.createElement('div');
    a.className = 'juego2';
    videoContainer.id = 'video-container';

    // Crear el elemento de video
    const video = document.createElement('video');
    video.src = 'video.mp4'; // Ruta de tu video con fondo verde
    video.autoplay = true; // Reproducir automáticamente
    video.loop = false; // Desactivar la repetición automática
    video.width = '100vh'; // Ajustar tamaño (opcional)
    video.height = '100vh'; // Ajustar tamaño (opcional)

    // Crear un canvas para procesar el video
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');

    // Función para eliminar el fondo verde
    function processFrame() {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Obtener los datos de píxeles
        const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = pixels.data;

        // Iterar sobre cada píxel
        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];     // Rojo
            const g = data[i + 1]; // Verde
            const b = data[i + 2]; // Azul

            // Detectar el color verde (ajustar según tu fondo verde)
            if (r < 10 && g < 10 && b < 10) {
                // Hacer el fondo verde transparente (Alpha = 0)
                data[i + 3] = 0; // Establecer la opacidad a 0
            }
        }

        // Volver a poner los datos procesados en el canvas
        ctx.putImageData(pixels, 0, 0);

        // Solicitar el siguiente cuadro solo si el video sigue reproduciéndose
        if (!video.ended) {
            requestAnimationFrame(processFrame);
        }
    }

    // Iniciar el procesamiento del video cuando comience a reproducirse
    video.addEventListener('play', processFrame);

    //cambiar de color la pagina//
    for (let i = 14; i >= 0; i--){
        setTimeout(() => {
            document.body.style.backgroundColor = `hsl(259, 100%, ${i}%)`;
        }, (40 - i) * 20);
    }

    // Crear y mostrar el mensaje "El juego ha terminado"
    const mensaje = document.createElement('p');
    mensaje.textContent = "El juego ha terminado";
    mensaje.id = "gameOverMessage";
    mensaje.style.fontSize = `${Math.min(window.innerWidth, window.innerHeight) / 20}px`; // Ajuste proporcional al tamaño de la ventana
    mensaje.style.color = '#ff0000'; // Puedes cambiar el color
    mensaje.style.textShadow = '0px 0px 4px #ff0000, 0px 0px 10px #000000';
    mensaje.style.position = 'fixed'; // Posicionar el mensaje de forma fija
    mensaje.style.bottom = '10px'; // Colocar a 10px de la parte inferior
    mensaje.style.left = '50%'; // Centrarlo horizontalmente
    mensaje.style.transform = 'translateX(-50%)'; // Asegura el centrado exacto
    mensaje.style.zIndex = '9999'; // Asegura que el mensaje esté por encima de otros elementos

    // Añadir el mensaje debajo del video
    setTimeout(() => {
        videoContainer.appendChild(mensaje);
    }, 500);

    // Añadir el canvas al contenedor
    videoContainer.appendChild(canvas);

    // Añadir el contenedor del video al cuerpo de la página
    document.body.appendChild(videoContainer);

    // Detener la reproducción del video al finalizar
    video.addEventListener('ended', function() {
        // Cuando termine el video, eliminar el video y canvas
        videoContainer.remove();

        // Eliminar el mensaje de "El juego ha terminado"
        mensaje.remove();
    });
});
});