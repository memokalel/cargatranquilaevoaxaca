// Datos simulados de cargadores (Añadida propiedad 'imagen' y 'potencia' - ¡POTENCIA REAL!)
const chargers = [
    {
        nombre: "Cargador Plaza Oaxaca",
        ubicacion: "Plaza Oaxaca, Oaxaca",
        direccion: "Av. Universidad S/N, Centro Histórico, 68000 Oaxaca de Juárez",
        semaforo: "VERDE",
        conectores: ["CCS", "CHAdeMO"],
        operador: "Electrolinera XYZ",
        lat: 17.0636,
        lng: -96.7251,
        imagen: "charger-icon.png", // ¡IMAGEN GENÉRICA PARA INICIO!
        potencia: "20kW" // ¡POTENCIA REAL: 20kW!
    },
    {
        nombre: "Cargador Gasolinera Centro",
        ubicacion: "Gasolinera Pemex Centro, Oaxaca",
        direccion: "Calle Macedonio Alcalá 507, Centro, 68000 Oaxaca de Juárez",
        semaforo: "VERDE",
        conectores: ["Tipo 2"],
        operador: "Pemex",
        lat: 17.0612,
        lng: -96.7283,
        imagen: "charger-icon.png", // ¡IMAGEN GENÉRICA PARA INICIO!
        potencia: "7kW"  // ¡POTENCIA REAL: 7kW!
    },
    {
        nombre: "Cargador Hotel Reforma",
        ubicacion: "Hotel Reforma, Oaxaca",
        direccion: "Av. Independencia 1003, Centro, 68000 Oaxaca de Juárez",
        semaforo: "AMARILLO",
        conectores: ["CCS"],
        operador: "Hotel Reforma",
        lat: 17.0588,
        lng: -96.7315,
        imagen: "charger-icon.png", // ¡IMAGEN GENÉRICA PARA INICIO!
        potencia: "11kW"  // ¡POTENCIA REAL: 11kW!
    },
    {
        nombre: "Cargador Desconocido 1",
        ubicacion: "Calle Independencia, Oaxaca",
        direccion: "Calle Independencia 802, Centro, 68000 Oaxaca de Juárez",
        semaforo: "ROJO",
        conectores: ["Desconocido"],
        operador: "Desconocido",
        lat: 17.0564,
        lng: -96.7347,
        imagen: "charger-icon.png", // ¡IMAGEN GENÉRICA PARA INICIO!
        potencia: "6kW" // ¡POTENCIA REAL: 6kW!
    }
];

// Ordenar por semáforo: VERDE > AMARILLO > ROJO
const order = { VERDE: 1, AMARILLO: 2, ROJO: 3 };
chargers.sort((a, b) => order[a.semaforo] - order[b.semaforo]);

function renderChargers() {
    const container = document.getElementById('charger-list'); // ¡ID CORRECTO! 'charger-list'
    container.innerHTML = ''; // Limpiar la lista antes de renderizar

    chargers.forEach(charger => {
        const item = document.createElement('li'); // ¡ELEMENTO 'li' PARA LA LISTA!
        item.className = 'charger-item';
        item.setAttribute('data-charger-id', charger.nombre);

        item.innerHTML = `
            <div class="status-light ${charger.semaforo}"></div>
            <div class="charger-info">
                <h3>${charger.nombre}</h3>
                <p>${charger.ubicacion}</p>
                <p><strong>Conectores:</strong> ${charger.conectores.join(', ')}</p>
            </div>
            <button class="navigate-btn" onclick="event.stopPropagation(); navigateTo(${charger.lat}, ${charger.lng})">
                Ir al cargador
            </button>
        `;

        // Añadir evento para mostrar modal
        item.addEventListener('click', () => showModal(charger)); // ¡FUNCIÓN CORRECTA! 'showModal'

        container.appendChild(item);
    });
}

function navigateTo(lat, lng) {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const mapsUrl = isIOS ?
        `http://maps.apple.com/?daddr=${lat},${lng}` :
        `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

    window.open(mapsUrl, '_blank');
}

function toggleAbout() {
    const aboutSection = document.getElementById('about-section'); // ¡ID CORRECTO! 'about-section'
    aboutSection.style.display = aboutSection.style.display === 'block' ? 'none' : 'block';
}

function hideAbout() {
    const aboutSection = document.getElementById('about-section'); // ¡ID CORRECTO! 'about-section'
    aboutSection.style.display = 'none';
}

function showModal(charger) { // ¡FUNCIÓN CORRECTA! 'showModal'
    const modal = document.getElementById('charger-modal'); // ¡ID CORRECTO! 'charger-modal'
    const overlay = document.getElementById('modal-overlay'); // ¡ID CORRECTO! 'modal-overlay'
    const modalTitle = document.getElementById('modal-title'); // ¡ID CORRECTO! 'modal-title'
    const modalLocation = document.getElementById('modal-location'); // ¡ID CORRECTO! 'modal-location'
    const modalStatus = document.getElementById('modal-status'); // ¡ID CORRECTO! 'modal-status'
    const modalConnectors = document.getElementById('modal-connectors'); // ¡ID CORRECTO! 'modal-connectors'
    const modalPower = document.getElementById('modal-power'); // ¡ID CORRECTO! 'modal-power'
    const modalContent = document.getElementById('modal-content'); // ¡ID CORRECTO! 'modal-content'


    modalTitle.textContent = charger.nombre;
    modalLocation.textContent = charger.ubicacion;
    modalStatus.className = `status-light ${charger.semaforo}`; // Reestablecer la clase para el color
    modalStatus.textContent = `Semáforo: ${charger.semaforo}`; // Añadir texto "Semáforo: VERDE/AMARILLO/ROJO"
    modalConnectors.textContent = charger.conectores.join(', ');
    modalPower.textContent = charger.potencia;

    // Construir el contenido del modal (incluyendo la imagen) - ¡CORREGIDO PARA IMAGEN GENÉRICA!
    modalContent.innerHTML = `
        <img src="images/${charger.imagen}" alt="Cargador VE">
        <h3 id="modal-title">${charger.nombre}</h3>
        <p id="modal-location">${charger.ubicacion}</p>
        <div class="status-light ${charger.semaforo}" id="modal-status" style="display: inline-block; margin-right: 5px;"></div> <p style="display: inline-block;" id="modal-status-text">Semáforo: ${charger.semaforo}</p>
        <p><strong>Conectores:</strong> <span id="modal-connectors">${charger.conectores.join(', ')}</span></p>
        <p><strong>Potencia:</strong> <span id="modal-power">${charger.potencia}</span></p>
        <div class="rating-buttons">
            <button class="rating-button positive-rating" onclick="rateCharger('${charger.nombre}', 'positive')" aria-label="Cargador Funciona"><span role="img" aria-label="Pulgar arriba">👍</span></button>
            <button class="rating-button negative-rating" onclick="rateCharger('${charger.nombre}', 'negative')" aria-label="Cargador No Funciona"><span role="img" aria-label="Pulgar abajo">👎</span></button>
        </div>
    `;


    modal.style.display = 'block';
    overlay.style.display = 'block';
}


function closeModal() {
    document.getElementById('charger-modal').style.display = 'none';
    document.getElementById('modal-overlay').style.display = 'none';
}

function rateCharger(chargerName, ratingType) {
    alert(`¡Gracias por calificar el cargador ${chargerName} con un voto ${ratingType === 'positive' ? 'positivo' : 'negativo'}! Tu opinión nos ayuda a mejorar.`);
    closeModal(); // Cerrar el modal después de calificar - ¡AÑADIDO!
    // En el futuro, aquí se podría guardar la calificación en una base de datos.
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    renderChargers();

    // Event listener para el botón "Acerca de" en el HEADER - ¡MOVIDO AQUÍ PARA MAYOR CLARIDAD!
    const aboutBtnHeader = document.getElementById('about-btn'); // ¡ID CORRECTO! 'about-btn'
    if (aboutBtnHeader) {
        aboutBtnHeader.addEventListener('click', toggleAbout);
    } else {
        console.error("Error: Botón 'Acerca de' no encontrado en el header."); // Mensaje de error si no se encuentra el botón
    }

     // Event listener para el icono "i" en el FOOTER - ¡NUEVO!
     const footerAboutBtn = document.getElementById('footer-about-btn'); // ¡ID CORRECTO! 'footer-about-btn'
     if (footerAboutBtn) {
        footerAboutBtn.addEventListener('click', toggleAbout); // Reutilizar la función toggleAbout para el icono del footer
     } else {
         console.error("Error: Icono 'i' del footer no encontrado."); // Mensaje de error si no se encuentra el icono del footer
     }

});
