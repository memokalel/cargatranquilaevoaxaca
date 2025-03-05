document.addEventListener('DOMContentLoaded', () => {
    const chargerList = document.getElementById('charger-list');
    const chargerPopup = document.getElementById('charger-popup');
    const modalOverlay = document.getElementById('modal-overlay');
    const closeButton = chargerPopup.querySelector('.close-button');
    const infoButtonHeader = document.getElementById('info-btn-header');

    // Elementos del Pop-Up "Acerca de"
    const aboutUsPopup = document.getElementById('about-us-popup');
    const closeAboutUsButton = aboutUsPopup.querySelector('.close-button');


    const chargers = [
        {
            name: "Cargador Plaza Oaxaca",
            location: "Plaza Oaxaca, Oaxaca",
            connectors: ["CCS", "CHAdeMO"],
            status: "green",
            ratingAverage: 4.5,
            ratingCount: 50,
            photos: [],
            power: "50 kW",
            address: "Av. Universidad S/N, Centro Histórico, 68000 Oaxaca de Juárez"
        },
        {
            name: "Cargador Gasolinera Centro",
            location: "Gasolinera Pemex Centro, Oaxaca",
            connectors: ["Tipo 2"],
            status: "green",
            ratingAverage: 4.2,
            ratingCount: 35,
             photos: [],
             power: "7 kW",
             address: "Calle Macedonio Alcalá 507, Centro, 68000 Oaxaca de Juárez"
        },
        {
            name: "Cargador Hotel Reforma",
            location: "Hotel Reforma, Oaxaca",
            connectors: ["CCS"],
            status: "yellow",
            ratingAverage: 3.8,
            ratingCount: 22,
             photos: [],
             power: "11 kW",
             address: "Av. Independencia 1003, Centro, 68000 Oaxaca de Juárez"
        },
        {
            name: "Cargador Desconocido 1", // Ejemplo de cargador ROJO
            location: "Ubicación Desconocida 1, Oaxaca",
            connectors: ["CCS"],
            status: "red",
            ratingAverage: 2.5,
            ratingCount: 15,
            photos: [],
            power: "6 kW",
            address: "Calle Independencia 802, Centro, 68000 Oaxaca de Juárez"
        },

        // ... más cargadores aquí ...
    ];

    function displayChargerList() {
        chargerList.innerHTML = '';

        chargers.forEach(charger => {
            const chargerItem = document.createElement('div');
            chargerItem.className = 'charger-item';
            chargerItem.setAttribute('data-charger-id', charger.name);

            chargerItem.addEventListener('click', () => { // **AÑADIDO console.log AQUÍ**
                console.log(`Hiciste click en el cargador: ${charger.name}`);
                openChargerPopup(charger);
            });

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
                event.stopPropagation();
                const addressForMaps = encodeURIComponent(charger.address);
                window.open(`https://www.google.com/maps/dir/?api=1&destination=${addressForMaps}`, '_blank');
            });


            chargerItem.appendChild(statusLight);
            chargerItem.appendChild(chargerInfo);
            chargerItem.appendChild(navigateButton);
            chargerList.appendChild(chargerItem);
        });
    }

    displayChargerList();


    function openChargerPopup(charger) {
        console.log(`Función openChargerPopup() ejecutada para: ${charger.name}`); // **AÑADIDO console.log AQUÍ**
        // Popular los detalles del cargador en el Pop-Up
        document.getElementById('popup-charger-name').textContent = charger.name;
        document.getElementById('popup-charger-address-value').textContent = charger.address;
        document.getElementById('popup-charger-power-value').textContent = charger.power || 'Desconocida';
        document.getElementById('popup-charger-connectors-value').textContent = charger.connectors.join(', ');


        const popupSemaphore = document.getElementById('popup-charger-semaphore');
        popupSemaphore.className = `status-light ${charger.status}`;

        const ratingStarsSpan = document.getElementById('popup-rating-stars');
        ratingStarsSpan.textContent = charger.ratingAverage ? `${charger.ratingAverage} estrellas` : 'Sin valoraciones';
        const ratingCountSpan = document.getElementById('popup-rating-count');
        ratingCountSpan.textContent = charger.ratingCount ? `(${charger.ratingCount} valoraciones)` : '';


        // Mostrar el Pop-Up y el overlay
        chargerPopup.classList.add('show');
        modalOverlay.classList.add('show');
    }

    function closeChargerPopup() {
        chargerPopup.classList.remove('show');
        modalOverlay.classList.remove('show');
    }

    closeButton.addEventListener('click', closeChargerPopup);
    modalOverlay.addEventListener('click', closeChargerPopup);


    // **FUNCIONALIDAD "Acerca de" IMPLEMENTADA:  Abrir y cerrar Pop-Up "Acerca de"**
    function openAboutUsPopup() {
        console.log("Función openAboutUsPopup() ejecutada"); // **AÑADIDO console.log AQUÍ**
        aboutUsPopup.classList.add('show');
        modalOverlay.classList.add('show');
    }

    function closeAboutUsPopup() {
        aboutUsPopup.classList.remove('show');
        modalOverlay.classList.remove('show');
    }

    infoButtonHeader.addEventListener('click', () => { // **AÑADIDO console.log AQUÍ**
        console.log("Botón 'Acerca de' en Header clickeado");
        openAboutUsPopup();
    });
    closeAboutUsButton.addEventListener('click', closeAboutUsPopup);


    // Simulación de botones de rating y reporte (POR AHORA - MVP SIMULADO)
    const rateGoodButtons = document.querySelectorAll('.popup-buttons button.rate-button.good');
    const rateBadButtons = document.querySelectorAll('.popup-buttons button.rate-button.bad');
    const reportButtons = document.querySelectorAll('.popup-buttons button.report-button');

    rateGoodButtons.forEach(button => {
        button.addEventListener('click', () => {
            alert("¡Gracias por indicar que funciona bien! (Funcionalidad de rating en desarrollo - MVP Simulado)");
        });
    });

    rateBadButtons.forEach(button => {
        button.addEventListener('click', () => {
            alert("¡Gracias por indicar que no funciona bien! (Funcionalidad de rating en desarrollo - MVP Simulado)");
        });
    });

    reportButtons.forEach(button => {
        button.addEventListener('click', () => {
            alert("Funcionalidad 'Reportar Estado' en desarrollo - MVP Simulado");
        });
    });


});
