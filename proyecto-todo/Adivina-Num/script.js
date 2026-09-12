const numeroCorrecto = Math.floor(Math.random() * 100) + 1;

let intentos = 10;
let numerosAnteriores = [];

const formulario = document.getElementById('formulario');
const numero = document.getElementById('numero');
const mensaje = document.getElementById('mensaje');
const intentosTexto = document.getElementById('intentos');
const numerosTexto = document.getElementById('numeros-anteriores');
const reiniciar = document.getElementById('reiniciar');

formulario.addEventListener('submit', function(evento) {
    evento.preventDefault();

    const numeroUsuario = Number(numero.value);

    numerosAnteriores.push(numeroUsuario);
    numerosTexto.textContent = numerosAnteriores.join(', ');

    intentos--;
    intentosTexto.textContent = intentos;

    if (numeroUsuario === numeroCorrecto) {
        mensaje.textContent = '🎉 ¡Felicidades! ¡Adivinaste el número!';
        terminarJuego();
    } else if (numeroUsuario < numeroCorrecto) {
        mensaje.textContent = '⬆️ Te has quedado corto.';
    } else {
        mensaje.textContent = '⬇️ Te has pasado.';
    }

    if (intentos === 0 && numeroUsuario !== numeroCorrecto) {
        mensaje.textContent = '❌ Se acabaron los intentos. El número era ' + numeroCorrecto;
        terminarJuego();
    }

    numero.value = '';
    numero.focus();
});

function terminarJuego() {
    numero.disabled = true;
    formulario.querySelector('button').disabled = true;
    reiniciar.style.display = 'inline-block';
}

reiniciar.addEventListener('click', function() {
    location.reload();
});