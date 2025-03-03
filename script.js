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
        potencia: "7kW"  // ¡POTENCIA REAL: 7kW!
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
        potencia: "11kW"  // ¡POTENCIA REAL: 11kW!
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
            <div class="charger-item-content">
                <div class="status-light <span class="math-inline">\{charger\.semaforo\}"\></div\>
<div class\="charger\-info"\>
<h3\></span>{charger.nombre}</h3>
                    <p>${charger.ubicacion}</p>
                    <p><strong>Conectores:</strong> <span class="math-inline">\{charger\.conectores\.join\(', '\)\}</p\>
</div\>
<button class\="navigate\-btn" onclick\="event\.stopPropagation\(\); navigateTo\(</span>{charger.lat}, ${charger.lng})">
                    Ir al cargador
                </button>
            </div>
        `;

        // Añadir evento para mostrar modal
        item.addEventListener('click', () => showModal(charger)); // ¡FUNCIÓN CORRECTA! 'showModal'

        container.appendChild(item);
    });
}

function navigateTo(lat, lng) {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const mapsUrl = isIOS ?
        `http://maps.apple.com/?daddr=<span class="math-inline">\{lat\},</span>{lng}` :
        `https://www.google.com/maps/search/?api=1&query=<span class="math-inline">\{lat\},</span>{lng}`;

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
    const modal = document.getElementById('charger-modal');
    const overlay = document.getElementById('modal-overlay');
    const modalContent = document.getElementById('modal-content');

    // Construir el contenido del modal (incluyendo la imagen y TODOS los datos) - ¡SIMPLIFICADO Y CORREGIDO!
    modalContent.innerHTML = `
        <img src="images/<span class="math-inline">\{charger\.imagen\}" alt\="Cargador VE"\>
<h3\></span>{charger.nombre}</h3>
        <p>${charger.ubicacion}</p>
        <p><strong>Dirección:</strong> ${charger.direccion}</p>
        <div class="modal-status-container"> <div class="status-light ${charger.semaforo} modal-status-light"></div> <p class="modal-status-text">Semáforo ${charger.semaforo}</p> </div>
        <p><strong>Conectores:</strong> ${charger.conectores.join(', ')}</p>
        <p><strong>Potencia:</strong> ${charger.potencia}</p>
        <div class="rating-buttons">
