const overlay = document.getElementById('modal-overlay');
    const modalContent = document.getElementById('modal-content');

    // Construir el contenido del modal (incluyendo la imagen y TODOS los datos) - ¡SIMPLIFICADO Y CORREGIDO!
    modalContent.innerHTML = `
        <img src="images/${charger.imagen}" alt="Cargador VE">
        <h3>${charger.nombre}</h3>
        <p>${charger.ubicacion}</p>
        <p><strong>Dirección:</strong> ${charger.direccion}</p>
        <div class="modal-status-container"> <div class="status-light ${charger.semaforo} modal-status-light"></div> <p class="modal-status-text">Semáforo ${charger.semaforo}</p> </div>
        <p><strong>Conectores:</strong> ${charger.conectores.join(', ')}</p>
        <p><strong>Potencia:</strong> ${charger.potencia}</p>
        <div class="rating-buttons">
            <button class="rating-button positive-rating" onclick="rateCharger('${charger.nombre}', 'positive')" aria-label="Cargador Funciona"><span role="img" aria-label="Cargador Funciona">👍 Funciona</span></button> <button class="rating-button negative-rating" onclick="rateCharger('${charger.nombre}', 'negative')" aria-label="Cargador No Funciona"><span role="img" aria-label="Cargador No Funciona">👎 No Funciona</span></button> </div>
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

     // Event listener para el icono "i" en el FOOTER - ¡NUEVO!
     const footerAboutBtn = document.getElementById('footer-about-btn'); // ¡ID CORRECTO! 'footer-about-btn'
     if (footerAboutBtn) {
        footerAboutBtn.addEventListener('click', toggleAbout); // Reutilizar la función toggleAbout para el icono del footer
     } else {
         console.error("Error: Icono 'i' del footer no encontrado."); // Mensaje de error si no se encuentra el icono del footer
     }

     // Event listener para el icono "i" en "Acerca de" - ¡NUEVO PARA SMARTPHONES!
     const aboutInfoIcon = document.querySelector('.info-icon'); // ¡SELECTOR CSS CORRECTO!
     if (aboutInfoIcon) {
        aboutInfoIcon.addEventListener('click', () => { // Añadir evento 'click'
            const tooltipText = aboutInfoIcon.nextElementSibling; // Obtener el tooltip hermano
            tooltipText.style.visibility = tooltipText.style.visibility === 'visible' ? 'hidden' : 'visible'; // Toggle visibility
            tooltipText.style.opacity = tooltipText.style.opacity === '1' ? '0' : '1'; // Toggle opacity
        });
     } else {
         console.error("Error: Icono 'i' de 'Acerca de' no encontrado."); // Mensaje de error si no se encuentra el icono "i" de "Acerca de"
     }


});
