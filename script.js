document.addEventListener('DOMContentLoaded', () => {
  // Navegación entre vistas
  const listView = document.getElementById('list-view');
  const aboutView = document.getElementById('about-view');
  const navHome = document.getElementById('nav-home');
  const navInfo = document.getElementById('nav-info');
  const searchBarContainer = document.getElementById('search-bar-container');

  navHome.addEventListener('click', () => {
    listView.style.display = 'block';
    aboutView.style.display = 'none';
    navHome.classList.add('active');
    navInfo.classList.remove('active');
    // Mostrar la barra de búsqueda en la vista de lista
    searchBarContainer.style.display = 'flex';
  });

  navInfo.addEventListener('click', () => {
    listView.style.display = 'none';
    aboutView.style.display = 'block';
    navInfo.classList.add('active');
    navHome.classList.remove('active');
    // Ocultar la barra de búsqueda en la vista "Acerca de"
    searchBarContainer.style.display = 'none';
  });

  // Elementos para el listado y modal
  const chargerList = document.getElementById('charger-list');
  const chargerPopup = document.getElementById('charger-popup');
  const modalOverlay = document.getElementById('modal-overlay');
  const closeButton = chargerPopup.querySelector('.close-button');

  // Datos de ejemplo de cargadores (con campos extra)
  const chargers = [
    {
      name: "Cargador Plaza Oaxaca",
      location: "Plaza Oaxaca, Oaxaca",
      connectors: ["CCS", "CHAdeMO"],
      status: "green",
      ratingAverage: 4.5,
      ratingCount: 50,
      power: "50 kW",
      address: "Av. Universidad S/N, Centro Histórico, 68000 Oaxaca de Juárez",
      costo: "Gratis",
      horario: "8:00 - 22:00",
      ultimoReporte: "Hace 2 horas",
      estimatedChargeTime: "Para una batería de 40 kWh: ~1 hora (20%-80%)",
      comentarios: ["Excelente ubicación, cerca de cafeterías.", "Algo lento en hora pico."]
    },
    {
      name: "Cargador Gasolinera Centro",
      location: "Gasolinera Pemex Centro, Oaxaca",
      connectors: ["Tipo 2"],
      status: "green",
      ratingAverage: 4.2,
      ratingCount: 35,
      power: "7 kW",
      address: "Calle Macedonio Alcalá 507, Centro, 68000 Oaxaca de Juárez",
      costo: "$0.10/kWh",
      horario: "24/7",
      ultimoReporte: "Hace 1 hora",
      estimatedChargeTime: "Para una batería de 40 kWh: ~45 minutos (20%-80%)",
      comentarios: ["Rápido y eficiente.", "Muy bien ubicado."]
    },
    {
      name: "Cargador Hotel Reforma",
      location: "Hotel Reforma, Oaxaca",
      connectors: ["CCS"],
      status: "yellow",
      ratingAverage: 3.8,
      ratingCount: 22,
      power: "11 kW",
      address: "Av. Independencia 1003, Centro, 68000 Oaxaca de Juárez",
      costo: "$0.15/kWh",
      horario: "8:00 - 20:00",
      ultimoReporte: "Hace 3 horas",
      estimatedChargeTime: "Para una batería de 40 kWh: ~1 hora 15 minutos (20%-80%)",
      comentarios: ["El servicio es regular.", "Puede haber demoras."]
    },
    {
      name: "Cargador Desconocido 1",
      location: "Ubicación Desconocida 1, Oaxaca",
      connectors: ["CCS"],
      status: "red",
      ratingAverage: 2.5,
      ratingCount: 15,
      power: "6 kW",
      address: "Calle Independencia 802, Centro, 68000 Oaxaca de Juárez",
      costo: "Gratis",
      horario: "10:00 - 18:00",
      ultimoReporte: "Hace 5 horas",
      estimatedChargeTime: "Para una batería de 40 kWh: ~1 hora 30 minutos (20%-80%)",
      comentarios: ["No está funcionando bien.", "Falla con frecuencia."]
    }
    // ... más cargadores si se requiere ...
  ];

  let filteredChargers = [...chargers];

  function displayChargerList() {
    chargerList.innerHTML = '';

    filteredChargers.forEach(charger => {
      const chargerItem = document.createElement('div');
      chargerItem.className = 'charger-item';
      chargerItem.setAttribute('data-charger-id', charger.name);

      chargerItem.addEventListener('click', () => {
        openChargerPopup(charger);
      });

      const statusLight = document.createElement('div');
      statusLight.className = `status-light ${charger.status}`;

      const chargerInfo = document.createElement('div');
      chargerInfo.className = 'charger-info';
      // Concatenar conectores y potencia en una misma línea
      chargerInfo.innerHTML = `
        <h3>${charger.name}</h3>
        <p>${charger.location}</p>
        <p>
          <i class="fas fa-plug"></i> ${charger.connectors.join(', ')}
          <span class="separator">|</span>
          <i class="fas fa-bolt"></i> ${charger.power}
        </p>
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
    document.getElementById('popup-charger-name').textContent = charger.name;
    document.getElementById('popup-charger-address-value').textContent = charger.address;
    document.getElementById('popup-charger-power-value').textContent = charger.power || 'Desconocida';
    document.getElementById('popup-charger-connectors-value').textContent = charger.connectors.join(', ');

    const popupSemaphore = document.getElementById('popup-charger-semaphore');
    popupSemaphore.className = `status-light ${charger.status}`;

    const ratingStarsSpan = document.getElementById('popup-rating-stars');
    ratingStarsSpan.textContent = charger.ratingAverage ? `${charger.ratingAverage} estrellas` : 'Sin valoraciones';
    const ratingCountSpan = document.getElementById('popup-rating-count');
    if (ratingCountSpan) {
      ratingCountSpan.textContent = charger.ratingCount ? `(${charger.ratingCount} valoraciones)` : '';
    }

    // Asignar la información extra al modal
    document.getElementById('popup-costo').textContent = charger.costo;
    document.getElementById('popup-horario').textContent = charger.horario;
    document.getElementById('popup-ultimo').textContent = charger.ultimoReporte;
    document.getElementById('popup-tiempo').textContent = charger.estimatedChargeTime;
    document.getElementById('popup-comentarios').innerHTML = charger.comentarios.join('<br>');

    chargerPopup.classList.add('show');
    modalOverlay.classList.add('show');
  }

  function closeChargerPopup() {
    chargerPopup.classList.remove('show');
    modalOverlay.classList.remove('show');
  }

  closeButton.addEventListener('click', closeChargerPopup);
  modalOverlay.addEventListener('click', closeChargerPopup);

  // Botones de rating
  const rateGoodButtons = document.querySelectorAll('.popup-buttons button.rate-button.good');
  const rateBadButtons = document.querySelectorAll('.popup-buttons button.rate-button.bad');

  rateGoodButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      alert("¡Gracias por indicar que funciona bien!");
    });
  });

  rateBadButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      alert("¡Gracias por indicar que no funciona bien!");
    });
  });

  // Botón de feedback en la vista Acerca de
  const feedbackButton = document.getElementById('feedback-button');
  if (feedbackButton) {
    feedbackButton.addEventListener('click', () => {
      window.open("https://forms.gle/wg5kTEsLYEExFVfS6", "_blank");
    });
  }

  // Filtrado en la barra de búsqueda integrada
  const filterInput = document.getElementById('filter-input');

  filterInput.addEventListener('input', (e) => {
    const text = e.target.value.toLowerCase();
    filteredChargers = chargers.filter(charger => {
      const fullText = (charger.name + ' ' + charger.location).toLowerCase();
      return fullText.includes(text);
    });
    displayChargerList();
  });
});
