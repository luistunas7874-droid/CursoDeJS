const botonesEquipo = document.querySelectorAll(".ver-equipo");
const informacion = document.getElementById("informacion");
const botonTema = document.getElementById("tema");
const botonInicio = document.getElementById("inicio");
const botonEquipos = document.getElementById("equipos");
const botonQuiz = document.getElementById("quiz");

const equipos = {
    "🇲🇽 Chivas": {
        pais: "México",
        estadio: "Estadio Akron",
        fundacion: "1906",
        colores: "Rojo y blanco",
        apodo: "El Rebaño Sagrado",
        descripcion: "Club mexicano con una gran tradición y reconocido por su identidad de utilizar futbolistas mexicanos."
    },

    "🇪🇸 Real Madrid": {
        pais: "España",
        estadio: "Santiago Bernabéu",
        fundacion: "1902",
        colores: "Blanco",
        apodo: "Los Blancos",
        descripcion: "Uno de los clubes más reconocidos de España y del fútbol mundial."
    },

    "🇩🇪 Bayern Múnich": {
        pais: "Alemania",
        estadio: "Allianz Arena",
        fundacion: "1900",
        colores: "Rojo y blanco",
        apodo: "Los Bávaros",
        descripcion: "Uno de los clubes más importantes y exitosos del fútbol alemán."
    },

    "🏴 Liverpool": {
        pais: "Inglaterra",
        estadio: "Anfield",
        fundacion: "1892",
        colores: "Rojo",
        apodo: "The Reds",
        descripcion: "Histórico club inglés con una gran tradición y una de las aficiones más conocidas del fútbol."
    }
};

botonesEquipo.forEach((boton) => {

    boton.addEventListener("click", () => {

        const nombreEquipo = boton.parentElement.querySelector("h3").textContent;
        const equipo = equipos[nombreEquipo];

        informacion.innerHTML = `
            <h2>⚽ ${nombreEquipo}</h2>

            <p>${equipo.descripcion}</p>

            <p>
                <strong>🌎 País:</strong>
                ${equipo.pais}
            </p>

            <p>
                <strong>🏟️ Estadio:</strong>
                ${equipo.estadio}
            </p>

            <p>
                <strong>📅 Fundación:</strong>
                ${equipo.fundacion}
            </p>

            <p>
                <strong>🎨 Colores:</strong>
                ${equipo.colores}
            </p>

            <p>
                <strong>⭐ Apodo:</strong>
                ${equipo.apodo}
            </p>
        `;

        informacion.scrollIntoView({
            behavior: "smooth"
        });
    });

});

botonInicio.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});

botonEquipos.addEventListener("click", () => {

    document.querySelector(".equipos").scrollIntoView({
        behavior: "smooth"
    });

});

botonTema.addEventListener("click", () => {

    document.body.classList.toggle("oscuro");

    if (document.body.classList.contains("oscuro")) {
        botonTema.textContent = "☀️";
    } else {
        botonTema.textContent = "🌙";
    }

});

botonQuiz.addEventListener("click", () => {

    let puntos = 0;

    const pregunta1 = prompt(
        "🏆 PREGUNTA 1\n\n" +
        "¿Qué equipo juega en México?\n\n" +
        "1. Real Madrid\n" +
        "2. Chivas\n" +
        "3. Liverpool\n" +
        "4. Bayern Múnich"
    );

    if (pregunta1 === "2") {
        puntos++;
    }

    const pregunta2 = prompt(
        "🏆 PREGUNTA 2\n\n" +
        "¿En qué estadio juega el Real Madrid?\n\n" +
        "1. Anfield\n" +
        "2. Allianz Arena\n" +
        "3. Santiago Bernabéu\n" +
        "4. Estadio Akron"
    );

    if (pregunta2 === "3") {
        puntos++;
    }

    const pregunta3 = prompt(
        "🏆 PREGUNTA 3\n\n" +
        "¿Cuál es el apodo del Liverpool?\n\n" +
        "1. The Reds\n" +
        "2. Los Blancos\n" +
        "3. Los Bávaros\n" +
        "4. El Rebaño Sagrado"
    );

    if (pregunta3 === "1") {
        puntos++;
    }

    const pregunta4 = prompt(
        "🏆 PREGUNTA 4\n\n" +
        "¿En qué país juega el Bayern Múnich?\n\n" +
        "1. España\n" +
        "2. México\n" +
        "3. Inglaterra\n" +
        "4. Alemania"
    );

    if (pregunta4 === "4") {
        puntos++;
    }

    const pregunta5 = prompt(
        "🏆 PREGUNTA 5\n\n" +
        "¿En qué año fue fundado Chivas?\n\n" +
        "1. 1892\n" +
        "2. 1900\n" +
        "3. 1902\n" +
        "4. 1906"
    );

    if (pregunta5 === "4") {
        puntos++;
    }

    alert(
        "🏆 RESULTADO FINAL\n\n" +
        "Obtuviste " + puntos + " de 5 puntos."
    );

});
const selectorEquipo1 = document.getElementById("equipo1");
const selectorEquipo2 = document.getElementById("equipo2");
const botonComparar = document.getElementById("comparar");
const resultadoComparacion = document.getElementById("resultado-comparacion");

const nombresEquipo = {
    "Chivas": "🇲🇽 Chivas",
    "Real Madrid": "🇪🇸 Real Madrid",
    "Bayern Múnich": "🇩🇪 Bayern Múnich",
    "Liverpool": "🏴 Liverpool"
};

botonComparar.addEventListener("click", () => {

    const nombre1 = selectorEquipo1.value;
    const nombre2 = selectorEquipo2.value;

    if (nombre1 === "" || nombre2 === "") {
        resultadoComparacion.innerHTML = "<p>⚠️ Selecciona los dos equipos.</p>";
        return;
    }

    if (nombre1 === nombre2) {
        resultadoComparacion.innerHTML = "<p>⚠️ Selecciona dos equipos diferentes.</p>";
        return;
    }

    const equipo1 = equipos[nombresEquipo[nombre1]];
    const equipo2 = equipos[nombresEquipo[nombre2]];

    resultadoComparacion.innerHTML = `
        <table class="tabla-comparacion">
            <tr>
                <th>Dato</th>
                <th>${nombre1}</th>
                <th>${nombre2}</th>
            </tr>
            <tr>
                <td>🌎 País</td>
                <td>${equipo1.pais}</td>
                <td>${equipo2.pais}</td>
            </tr>
            <tr>
                <td>🏟️ Estadio</td>
                <td>${equipo1.estadio}</td>
                <td>${equipo2.estadio}</td>
            </tr>
            <tr>
                <td>📅 Fundación</td>
                <td>${equipo1.fundacion}</td>
                <td>${equipo2.fundacion}</td>
            </tr>
            <tr>
                <td>🎨 Colores</td>
                <td>${equipo1.colores}</td>
                <td>${equipo2.colores}</td>
            </tr>
            <tr>
                <td>⭐ Apodo</td>
                <td>${equipo1.apodo}</td>
                <td>${equipo2.apodo}</td>
            </tr>
        </table>
    `;
});