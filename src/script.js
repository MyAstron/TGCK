const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const snowContainer = document.getElementById('snow-container');
    let currentSlide = 0;
    const numSnowflakes = 50; // Cantidad de copos de nieve
    const snowflakeSpeedMin = 8;
    const snowflakeSpeedMax = 20;
    const snowflakeSizeMin = 5;
    const snowflakeSizeMax = 15;
    const snowflakeDriftMax = 200; // Desplazamiento lateral máximo
    
// ============== INICIO DE PANTALLA DE CARGA (NUEVO) ==============
const loaderScreen = document.getElementById('loader-screen');

// Función para manejar el inicio de la presentación
function startPresentation() {
    // 1. Oculta la pantalla de carga con una transición suave
    loaderScreen.classList.add('hidden');
    
    // 2. Espera un momento (1 segundo) para que termine la animación
    setTimeout(() => {
        // 3. Muestra la primera diapositiva (slide1)
        showSlide(0); 
    }, 1000); 

    // 4. Quita el listener para que el clic no vuelva a ejecutar la función
    document.removeEventListener('click', startPresentation);
}

// Escucha el clic en cualquier parte del documento para comenzar
document.addEventListener('click', startPresentation);

// Por seguridad, también puedes iniciar con la tecla 'Enter'
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        startPresentation();
    }
});

    // Función para mostrar la diapositiva actual
    function showSlide(index) {
        if (index < 0) {
            index = 0;
        } else if (index >= slides.length) {
            index = slides.length - 1;
        }
        
        slides[currentSlide].classList.remove('active');
        currentSlide = index;
        slides[currentSlide].classList.add('active');

        prevBtn.disabled = (currentSlide === 0);
        nextBtn.disabled = (currentSlide === slides.length - 1);
    }

    // Navegación por botones
    nextBtn.addEventListener('click', () => {
        showSlide(currentSlide + 1);
    });

    prevBtn.addEventListener('click', () => {
        showSlide(currentSlide - 1);
    });

    // Inicialización de la presentación
    showSlide(currentSlide); 

    // Generación y animación de copos de nieve
    function createSnowflake() {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        snowContainer.appendChild(snowflake);

        const size = Math.random() * (snowflakeSizeMax - snowflakeSizeMin) + snowflakeSizeMin;
        snowflake.style.width = `${size}px`;
        snowflake.style.height = `${size}px`;
        snowflake.style.left = `${Math.random() * 100}vw`; // Posición horizontal aleatoria
        
        const animationDuration = Math.random() * (snowflakeSpeedMax - snowflakeSpeedMin) + snowflakeSpeedMin;
        snowflake.style.animationDuration = `${animationDuration}s`;
        
        // Simular arrastre lateral por el viento
        const driftAmount = (Math.random() - 0.5) * 2 * snowflakeDriftMax; // Entre -driftMax y +driftMax
        snowflake.style.setProperty('--drift', `${driftAmount}px`);

        // Eliminar copo después de caer para liberar memoria
        snowflake.addEventListener('animationend', () => {
            snowflake.remove();
            createSnowflake(); // Crea un nuevo copo cuando uno termina de caer
        });
    }

    // Crear los copos iniciales
    for (let i = 0; i < numSnowflakes; i++) {
        createSnowflake();
    }