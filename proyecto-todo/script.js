const formulario = document.getElementById('form-tarea');
const inputTarea = document.getElementById('input-tarea');
const categoriaTarea = document.getElementById('categoria-tarea');
const fechaTarea = document.getElementById('fecha-tarea');
const listaTareas = document.getElementById('lista-tareas');
const contadorPendientes = document.getElementById('contador-pendientes');
const botonesFiltro = document.querySelectorAll('.filtro');
const btnTema = document.getElementById('btn-tema');

let tareas = [];
let filtroActual = 'todas';

function cargarTareas() {
    const tareasGuardadas = localStorage.getItem('tareas');

    if (tareasGuardadas) {
        tareas = JSON.parse(tareasGuardadas);
    }

    renderizarTareas();
}

function guardarTareas() {
    localStorage.setItem('tareas', JSON.stringify(tareas));
}

function agregarTarea(texto, categoria, fecha) {
    const nuevaTarea = {
        id: Date.now(),
        texto: texto,
        categoria: categoria,
        fecha: fecha,
        completada: false
    };

    tareas.unshift(nuevaTarea);
    guardarTareas();
    renderizarTareas();
}

function toggleTarea(id) {
    tareas = tareas.map(tarea => {
        if (tarea.id === id) {
            return {
                ...tarea,
                completada: !tarea.completada
            };
        }

        return tarea;
    });

    guardarTareas();
    renderizarTareas();
}

function editarTarea(id) {
    const tarea = tareas.find(tarea => tarea.id === id);

    if (!tarea) {
        return;
    }

    const nuevoTexto = document.createElement('input');

    nuevoTexto.type = 'text';
    nuevoTexto.value = tarea.texto;
    nuevoTexto.className = 'input-editar';

    const tareaElemento = [...listaTareas.children].find(li => {
        const boton = li.querySelector('.btn-editar');
        return boton && boton.dataset.id == id;
    });

    if (tareaElemento) {
        const texto = tareaElemento.querySelector('.tarea-texto');

        texto.replaceWith(nuevoTexto);

        nuevoTexto.focus();

        nuevoTexto.addEventListener('keydown', e => {
            if (e.key === 'Enter') {
                guardarEdicion();
            }
        });

        nuevoTexto.addEventListener('blur', () => {
            guardarEdicion();
        });

        function guardarEdicion() {
            const textoNuevo = nuevoTexto.value.trim();

            if (textoNuevo) {
                tarea.texto = textoNuevo;
                guardarTareas();
            }

            renderizarTareas();
        }
    }
}

function eliminarTarea(id, elemento) {
    elemento.classList.add('eliminando');

    setTimeout(() => {
        tareas = tareas.filter(tarea => tarea.id !== id);
        guardarTareas();
        renderizarTareas();
    }, 500);
}

function filtrarTareas() {
    switch (filtroActual) {
        case 'pendientes':
            return tareas.filter(tarea => !tarea.completada);

        case 'completadas':
            return tareas.filter(tarea => tarea.completada);

        default:
            return tareas;
    }
}

function obtenerNombreCategoria(categoria) {
    switch (categoria) {
        case 'escuela':
            return '🎓 Escuela';

        case 'trabajo':
            return '💼 Trabajo';

        case 'personal':
            return '👤 Personal';

        default:
            return '📌 Otros';
    }
}

function revisarFecha(tarea) {
    if (!tarea.fecha || tarea.completada) {
        return '';
    }

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const fecha = new Date(tarea.fecha + 'T00:00:00');
    fecha.setHours(0, 0, 0, 0);

    const diferencia = fecha - hoy;

    const dias = Math.ceil(
        diferencia / (1000 * 60 * 60 * 24)
    );

    if (dias < 0) {
        return '⚠️ Vencida';
    }

    if (dias === 0) {
        return '⚠️ Vence hoy';
    }

    if (dias <= 2) {
        return '⏰ Próxima a vencer';
    }

    return '';
}

function renderizarTareas() {
    const tareasFiltradas = filtrarTareas();

    listaTareas.innerHTML = '';

    if (tareasFiltradas.length === 0) {
        listaTareas.innerHTML = `
            <li class="sin-tareas">
                ${
                    filtroActual === 'todas'
                        ? '¡No hay tareas! Agrega una nueva.'
                        : `No hay tareas ${filtroActual}.`
                }
            </li>
        `;

        actualizarContador();
        return;
    }

    tareasFiltradas.forEach(tarea => {
        const li = document.createElement('li');

        const avisoFecha = revisarFecha(tarea);

        li.className = 'tarea';

        if (tarea.completada) {
            li.classList.add('completada');
        }

        if (
            avisoFecha === '⏰ Próxima a vencer' ||
            avisoFecha === '⚠️ Vence hoy'
        ) {
            li.classList.add('proxima');
        }

        if (avisoFecha === '⚠️ Vencida') {
            li.classList.add('vencida');
        }

        let fechaTexto = '';

        if (tarea.fecha) {
            fechaTexto = `📅 ${tarea.fecha}`;

            if (avisoFecha) {
                fechaTexto += ` - ${avisoFecha}`;
            }
        }

        li.innerHTML = `
            <input
                type="checkbox"
                ${tarea.completada ? 'checked' : ''}
                aria-label="Marcar tarea"
            >

            <div class="tarea-info">
                <span class="tarea-texto">
                    ${escaparHTML(tarea.texto)}
                </span>

                <span class="tarea-detalles">
                    ${obtenerNombreCategoria(tarea.categoria)}
                    ${fechaTexto ? ` | ${fechaTexto}` : ''}
                </span>
            </div>

            <button
                class="btn-editar"
                data-id="${tarea.id}"
                aria-label="Editar tarea"
            >
                ✏️
            </button>

            <button
                class="btn-eliminar"
                aria-label="Eliminar tarea"
            >
                🗑️
            </button>
        `;

        const checkbox = li.querySelector(
            'input[type="checkbox"]'
        );

        checkbox.addEventListener('change', () => {
            toggleTarea(tarea.id);
        });

        const btnEditar = li.querySelector('.btn-editar');

        btnEditar.addEventListener('click', () => {
            editarTarea(tarea.id);
        });

        const btnEliminar = li.querySelector('.btn-eliminar');

        btnEliminar.addEventListener('click', () => {
            eliminarTarea(tarea.id, li);
        });

        listaTareas.appendChild(li);
    });

    actualizarContador();
}

function actualizarContador() {
    const pendientes = tareas.filter(
        tarea => !tarea.completada
    ).length;

    contadorPendientes.textContent = pendientes;
}

function escaparHTML(texto) {
    const div = document.createElement('div');

    div.textContent = texto;

    return div.innerHTML;
}

formulario.addEventListener('submit', e => {
    e.preventDefault();

    const texto = inputTarea.value.trim();
    const categoria = categoriaTarea.value;
    const fecha = fechaTarea.value;

    if (texto) {
        agregarTarea(texto, categoria, fecha);

        inputTarea.value = '';
        fechaTarea.value = '';

        inputTarea.focus();
    }
});

botonesFiltro.forEach(boton => {
    boton.addEventListener('click', () => {
        botonesFiltro.forEach(b => {
            b.classList.remove('activo');
        });

        boton.classList.add('activo');

        filtroActual = boton.dataset.filtro;

        renderizarTareas();
    });
});

btnTema.addEventListener('click', () => {
    document.body.classList.toggle('modo-oscuro');

    if (document.body.classList.contains('modo-oscuro')) {
        btnTema.textContent = '☀️';

        localStorage.setItem('tema', 'oscuro');
    } else {
        btnTema.textContent = '🌙';

        localStorage.setItem('tema', 'claro');
    }
});

function cargarTema() {
    const tema = localStorage.getItem('tema');

    if (tema === 'oscuro') {
        document.body.classList.add('modo-oscuro');

        btnTema.textContent = '☀️';
    }
}

cargarTema();
cargarTareas();

console.log('🚀 Aplicación de tareas lista');