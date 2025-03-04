// Datos simulados de cargadores
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
        imagen: "charger-icon.png",
        potencia: "20kW"
    },
    {
        nombre: "Cargador Gasolinera Centro",
        ubicacion: "Gasolinera Pemex Centro, Oaxaca",
        direccion: "Calle Macedonio Alcalá 507, Centro, 68000 Oaxaca de Juárez",
        semaforo: "AMARILLO",
        conectores: ["Tipo 2"],
        operador: "Pemex",
        lat: 17.0612,
        lng: -96.7283,
        imagen: "charger-icon.png",
        potencia: "7kW"
    },
    {
        nombre: "Cargador Hotel Reforma",
        ubicacion: "Hotel Reforma, Oaxaca",
        direccion: "Av. Independencia 1003, Centro, 68000 Oaxaca de Juárez",
        semaforo: "ROJO",
        conectores: ["CCS"],
        operador: "Hotel Reforma",
        lat: 17.0588,
        lng: -96.7315,
        imagen: "charger-icon.png",
        potencia: "11kW"
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
        imagen: "charger-icon.png",
        potencia: "6kW"
    }
];

// Ordenar por semáforo
const order = { VERDE: 1, AMARILLO: 2, ROJO: 3 };
chargers.sort((a, b) => order[a.semaforo] - order[b.semaforo]);

function renderChargers() {
    // ¡Busca el contenedor con id="chargerList" AHORA (en lugar de 'charger-list')!
    const container = document.getElementById('chargerList');
    container.innerHTML = '';

    chargers.forEach(charger => {
        // ¡Crea un <div> con clase "charger-item" AHORA (en lugar de <li>)!
        const item = document.createElement('div');
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

        item.addEventListener('click', () => showModal(charger));

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
    const aboutSection = document.getElementById('about-section');
    aboutSection.style.display = aboutSection.style.display === 'block' ? 'none' : 'block';
}

function showModal(charger) {
    const modal = document.getElementById('charger-modal');
    const overlay = document.getElementById('modal-overlay');
    const modalContent = document.getElementById('modal-content');

    let prediccionText = ""; // Variable para almacenar el texto de predicción
    if (charger.semaforo === "VERDE") {
        prediccionText = "Carga asegurada";
    } else if (charger.semaforo === "AMARILLO") {
        prediccionText = "Carga con precaución";
    } else if (charger.semaforo === "ROJO") {
        prediccionText = "Carga no recomendada";
    }

    modalContent.innerHTML = `
        <h3>${charger.nombre}</h3>
        <div class="modal-status-container">
            <div class="status-light ${charger.semaforo} modal-status-light"></div>
            <p class="modal-status-text">Semáforo ${charger.semaforo}</p>
        </div>
        <p><strong>Predicción:</strong> ${prediccionText}</p>
        <p><strong>Disponibilidad estimada:</strong> Sin esperas</p>
        <p><strong>Dirección:</strong> ${charger.direccion}</p>
        <p><strong>Conectores:</strong> ${charger.conectores.join(', ')}</p>
        <p><strong>Potencia:</strong> ${charger.potencia}</p>
        <p class="disclaimer-text">Predicción basada en historial y reportes. Sujeto a cambios.</p>

        <div class="rating-buttons">
            <button class="rating-button positive-rating" onclick="rateCharger('${charger.nombre}', 'positive')" aria-label="Cargador Funciona">
                <span role="img" aria-label="Cargador Funciona">👍 Funciona</span> <span class="button-text-description">(Si funciona bien)</span>
            </button>
            <button class="rating-button negative-rating" onclick="rateCharger('${charger.nombre}', 'negative')" aria-label="Cargador No Funciona">
                <span role="img" aria-label="Cargador No Funciona">👎 No Funciona</span> <span class="button-text-description">(Si no funciona o falla)</span>
            </button>
        </div>

        <div class="report-button-container">
            <button class="report-button navigate-btn" onclick="reportCharger('${charger.nombre}')">
                Reportar estado <span class="button-text-description">(Reportar problemas o estado actual)</span>
            </button>
        </div>
    `;

    modal.style.display = 'block';
    overlay.style.display = 'block';
}

function reportCharger(chargerName) {
    alert(`Funcionalidad "Reportar estado" para el cargador ${chargerName} ¡Próximamente! \n\nEn futuras versiones, podrás usar este botón para reportar problemas o el estado actual del cargador para ayudar a otros usuarios.`);
    closeModal();
}

function closeModal() {
    document.getElementById('charger-modal').style.display = 'none';
    document.getElementById('modal-overlay').style.display = 'none';
}

function rateCharger(chargerName, ratingType) {
    alert(`¡Gracias por calificar el cargador ${chargerName} con un voto ${ratingType === 'positive' ? 'positivo' : 'negativo'}! Tu opinión nos ayuda a mejorar.`);
    closeModal();
}

document.addEventListener('DOMContentLoaded', () => {
    renderChargers();

    const footerAboutBtn = document.getElementById('footer-about-btn');
    footerAboutBtn.addEventListener('click', toggleAbout);
});
