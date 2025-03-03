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

        // ¡¡¡CARITAS DE EMOJI ELIMINADAS DE LA LISTA PRINCIPAL!!!
        item.innerHTML = `
            <div class="status-light <span class="math-inline">\{charger\.semaforo\}"\></div\>
