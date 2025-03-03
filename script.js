// Datos simulados de cargadores (Añadida propiedad 'imagen')
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
        imagen: "plaza_oaxaca.jpg" // Nombre de archivo de imagen (PLACEHOLDER - REEMPLAZAR con URLs reales)
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
        imagen: "gasolinera_centro.jpg" // Nombre de archivo de imagen (PLACEHOLDER - REEMPLAZAR con URLs reales)
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
        imagen: "hotel_reforma.jpg" // Nombre de archivo de imagen (PLACEHOLDER - REEMPLAZAR con URLs reales)
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
        imagen: "desconocido_1.jpg" // Nombre de archivo de imagen (PLACEHOLDER - REEMPLAZAR con URLs reales)
    }
];

// Ordenar por semáforo: VERDE > AMARILLO > ROJO
const order = { VERDE: 1, AMARILLO: 2, ROJO: 3 };
chargers.sort((a, b) => order[a.semaforo] - order[b.semaforo]);

function renderChargers() {
    const container = document.getElementById('chargerList');
    container.innerHTML = ''; // Limpiar la lista antes de renderizar

    chargers.forEach(charger => {
        const item = document.createElement('div');
        item.className = 'charger-item';
        item.setAttribute('data-charger-id', charger.nombre);

        item.innerHTML = `
            <div class="status-light ${charger.semaforo}"></div>
            <div class="charger-info">
                <h3>${charger.nombre}</h3>
                <p>${charger.ubicacion}</p>
            </div>
            <div class="rating-buttons">  <button class="rating-button positive-rating" onclick="event.stopPropagation(); rateCharger('${charger.nombre}', 'positive')">😊</button>
                <button class="rating-button negative-rating" onclick="event.stopPropagation(); rateCharger('${charger.nombre}', 'negative')">😔</button>
            </div>
            <button class="navigate-btn" onclick="event.stopPropagation(); navigateTo(${charger.lat}, ${charger.lng})">
                Navegar
            </button>
        `;

        // Añadir evento para mostrar modal
        item.addEventListener('click', () => showChargerDetails(charger));

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
    const about = document.getElementById('aboutSection');
    about.style.display = about.style.display === 'block' ? 'none' : 'block';
}

function showChargerDetails(charger) {
    const modal = document.getElementById('chargerModal');
    const overlay = document.getElementById('modalOverlay');
    const content = document.getElementById('modalContent');

    content.innerHTML = `
        <img src="images/${charger.imagen}" alt="Imagen del cargador ${charger.nombre}">
        <h3>${charger.nombre}</h3>
        <p><strong>Dirección:</strong> ${charger.direccion}</p>
        <p><strong>Conectores:</strong> ${charger.conectores.join(', ')}</p>
        <p><strong>Operador:</strong> ${charger.operador}</p>
    `;

    modal.style.display = 'block';
    overlay.style.display = 'block';
}

function closeModal() {
    document.getElementById('chargerModal').style.display = 'none';
    document.getElementById('modalOverlay').style.display = 'none';
}

function rateCharger(chargerName, ratingType) {
    alert(`¡Gracias por calificar el cargador ${chargerName} con un voto ${ratingType === 'positive' ? 'positivo' : 'negativo'}! Tu opinión nos ayuda a mejorar.`);
    // En el futuro, aquí se podría guardar la calificación en una base de datos.
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    renderChargers();
});