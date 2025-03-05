document.addEventListener('DOMContentLoaded', () => {
    const chargerList = document.getElementById('charger-list');
    const chargerPopup = document.getElementById('charger-popup');
    const modalOverlay = document.getElementById('modal-overlay');
    const closeButton = chargerPopup.querySelector('.close-button');
    const infoButtonHeader = document.getElementById('info-btn-header');
    const infoButtonFooter = document.getElementById('info-btn-footer');
    const infoButtonPopupFooter = chargerPopup.querySelector('#info-btn-popup-footer'); // Icono "i" en Footer del Pop-Up

    // Elementos del Pop-Up "Acerca de"
    const aboutUsPopup = document.getElementById('about-us-popup');
    const closeAboutUsButton = aboutUsPopup.querySelector('.close-button');


    const chargers = [
        {
            name: "Cargador Plaza Oaxaca",
            location: "Plaza Oaxaca, Oaxaca",
            connectors: ["CCS", "CHAdeMO"], // ¡¡¡CORREGIDO: AHORA ES UN ARRAY!!!
            status: "green", // Semáforo Verde
            ratingAverage: 4.5,
            ratingCount: 50,
            photos: [], // Ejemplo: Array de URLs de fotos
            power: "50 kW", // Añadido potencia
            address: "Av. Universidad S/N, Centro Histórico, 68000 Oaxaca de Juárez" //Añadido dirección detallada
        },
        {
            name: "Cargador Gasolinera Centro",
            location: "Gasolinera Pemex Centro, Oaxaca",
            connectors: ["Tipo 2"], // ¡¡¡CORREGIDO: AHORA ES UN ARRAY!!!
            status: "green", // Semáforo Verde
            ratingAverage: 4.2,
            ratingCount: 35,
             photos: [],
             power: "7 kW",
             address: "Calle Macedonio Alcalá 507, Centro, 68000 Oaxaca de Juárez"
        },
        {
            name: "Cargador Hotel Reforma",
            location: "Hotel Reforma, Oaxaca",
            connectors: ["CCS"], // ¡¡¡CORREGIDO: AHORA ES UN ARRAY!!!
            status: "yellow", // Semáforo Amarillo
            ratingAverage: 3.8,
            ratingCount: 22,
             photos: [],
             power: "11 kW",
             address: "Av. Independencia 1003, Centro, 68000 Oaxaca de Juárez"
        },
        {
            name: "Cargador Desconocido 1", // Ejemplo de cargador ROJO
            location: "Ubicación Desconocida 1, Oaxaca",
            connectors: ["CCS"], // ¡¡¡CORREGIDO: AHORA ES UN ARRAY!!!
            status: "red", // Semáforo Rojo
            ratingAverage: 2.5,
            ratingCount: 15,
            photos: [],
            power: "6 kW",
            address: "Calle Independencia 802, Centro, 68000 Oaxaca de Juárez"
        },

        // ... más cargadores aquí ...
    ];

    function displayChargerList() {
        chargerList.innerHTML = ''; // Limpiar la lista anterior

        chargers.forEach(charger => {
            const chargerItem = document.createElement('div'); // Cambiado a div en lugar de li
            chargerItem.className = 'charger-item';
            chargerItem.setAttribute('data-charger-id', charger.name);

            chargerItem.addEventListener('click', () => openChargerPopup(charger)); // Añadir evento click a la fila

            const statusLight = document.createElement('div');
            statusLight.className = `status-light ${charger.status}`;

            const chargerInfo = document.createElement('div');
            chargerInfo.className = 'charger-info';
            chargerInfo.innerHTML = `
                <h3>${charger.name}</h3>
                <p>${charger.location}</p>
                <p><strong>Conectores:</strong> ${charger.connectors.join(', ')}</p>
            `;

            const navigateButton = document.createElement('button');
            navigateButton.className = 'navigate-btn';
            navigateButton.textContent = 'Ir al cargador';
             navigateButton.addEventListener('click', (event) => {
                event.stopPropagation(); // Evita que el click en el botón se propague al li
                // **FUNCIONALIDAD "Ir al cargador" IMPLEMENTADA: Abrir Google Maps con la dirección**
                const addressForMaps = encodeURIComponent(charger.address); // Codificar la dirección para la URL
                window.open(`https://www.google.com/maps/dir/?api=1&destination=${addressForMaps}`);
            });


            chargerItem.appendChild(statusLight);
            chargerItem.appendChild(chargerInfo);
            chargerItem.appendChild(navigateButton);
            chargerList.appendChild(chargerItem);
        });
    }

    displayChargerList(); // Llama a la función para mostrar la lista de cargadores al cargar la página


    function openChargerPopup(charger) {
        // Popular los detalles del cargador en el Pop-Up
        document.getElementById('popup-charger-name').textContent = charger.name;
        document.getElementById('popup-charger-address-value').textContent = charger.address; // Usar el span con id "popup-charger-address-value"
        document.getElementById('popup-charger-power-value').textContent = charger.power || 'Desconocida'; // Usar el span con id "popup-charger-power-value"
        document.getElementById('popup-charger-connectors-value').textContent = charger.connectors.join(', '); // Usar el span con id "popup-charger-connectors-value"


        const popupSemaphore = document.getElementById('popup-charger-semaphore');
        popupSemaphore.className = `status-light ${charger.status}`; // Clase para el color del semáforo en Pop-Up

        const ratingStarsSpan = document.getElementById('popup-rating-stars');
        ratingStarsSpan.textContent = charger.ratingAverage ? `${charger.ratingAverage} estrellas` : 'Sin valoraciones'; //Muestra rating o "Sin valoraciones"
        const ratingCountSpan = document.getElementById('popup-rating-count');
        ratingCountSpan.textContent = charger.ratingCount ? `(${charger.ratingCount} valoraciones)` : ''; // Muestra el conteo si hay valoraciones


        // Mostrar el Pop-Up y el overlay
        chargerPopup.classList.add('show'); // Añade clase 'show' para mostrar el modal
        modalOverlay.classList.add('show'); // Añade clase 'show' para mostrar el overlay
    }

    function closeChargerPopup() {
        chargerPopup.classList.remove('show'); // Remueve clase 'show' para ocultar el modal
        modalOverlay.classList.remove('show'); // Remueve clase 'show' para ocultar el overlay
    }

    closeButton.addEventListener('click', closeChargerPopup);
    modalOverlay.addEventListener('click', closeChargerPopup); // Cierra el modal al hacer clic fuera


    // **FUNCIONALIDAD "Acerca de" IMPLEMENTADA:  Abrir y cerrar Pop-Up "Acerca de"**
    function openAboutUsPopup() {
        aboutUsPopup.classList.add('show');
        modalOverlay.classList.add('show');
    }

    function closeAboutUsPopup() {
        aboutUsPopup.classList.remove('show');
        modalOverlay.classList.remove('show');
    }

    infoButtonHeader.addEventListener('click', openAboutUsPopup);
    infoButtonFooter.addEventListener('click', openAboutUsPopup);
    infoButtonPopupFooter.addEventListener('click', openAboutUsPopup); // Icono "i" en Footer del Pop-Up
    closeAboutUsButton.addEventListener('click', closeAboutUsPopup); // Botón de cierre en Pop-Up "Acerca de"


    // Simulación de botones de rating y reporte (POR AHORA - MVP SIMULADO)
    const rateGoodButtons = document.querySelectorAll('.popup-buttons button.rate-button.good');
    const rateBadButtons = document.querySelectorAll('.popup-buttons button.rate-button.bad');
    const reportButtons = document.querySelectorAll('.popup-buttons button.report-button');

    rateGoodButtons.forEach(button => {
        button.addEventListener('click', () => {
            alert("¡Gracias por indicar que funciona bien! (Funcionalidad de rating en desarrollo)");
        });
    });

    rateBadButtons.forEach(button => {
        button.addEventListener('click', () => {
            alert("¡Gracias por indicar que no funciona bien! (Funcionalidad de rating en desarrollo)");
        });
    });

    reportButtons.forEach(button => {
        button.addEventListener('click', () => {
            alert("Funcionalidad 'Reportar Estado' en desarrollo");
        });
    });


});
