document.addEventListener('DOMContentLoaded', () => {
  const accordionItems = document.querySelectorAll(".accordion-item");

  accordionItems.forEach(item => {
    const header = item.querySelector(".accordion-header");

    header.addEventListener("click", () => {

      // Cierra los demás items

      accordionItems.forEach(i => {
        if (i !== item) {
          i.classList.remove("active");
        }
      });

      // Alterna el actual
      
      item.classList.toggle("active");
    });
  });

  // ===== Sistema de cambio de imágenes de fondo con scroll =====
  const backgroundImages = [
    'bg-ndlr-plantas',
    'bg-ndlr-plaza', 
    'bg-ndlr',
    'bg-pedernales-all',
    'bg-pedernales'
  ];

  let currentImageIndex = 0;

  // Función para cambiar la imagen de fondo con crossfade suave
  function changeBackgroundImage(index) {
    const newImageClass = backgroundImages[index];
    const newElement = document.querySelector(`.${newImageClass}`);
    const currentActive = document.querySelector('.background-section.active');

    // Si ya está activa, no hacer nada
    if (newElement && newElement.classList.contains('active')) {
      return;
    }

    // Remover todas las clases de transición
    backgroundImages.forEach((className) => {
      const element = document.querySelector(`.${className}`);
      if (element) {
        element.classList.remove('active', 'fade-in', 'fade-out');
      }
    });

    // Si hay una imagen activa, hacerla fade-out
    if (currentActive) {
      currentActive.classList.add('fade-out');
    }

    // Activar la nueva imagen con fade-in
    if (newElement) {
      newElement.classList.add('fade-in');
      
      // Después de la transición, limpiar clases y establecer como activa
      setTimeout(() => {
        backgroundImages.forEach((className) => {
          const element = document.querySelector(`.${className}`);
          if (element) {
            element.classList.remove('fade-in', 'fade-out');
          }
        });
        newElement.classList.add('active');
      }, 3000); // Coincide con la duración de la transición CSS
    }
  }

  // Función para manejar el scroll con efecto más suave
  function handleScroll() {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    // Calcular el índice basado en la posición del scroll con más suavidad
    const scrollPercentage = scrollPosition / (documentHeight - windowHeight);
    const newIndex = Math.min(
      Math.floor(scrollPercentage * backgroundImages.length * 0.8), // Reducir sensibilidad
      backgroundImages.length - 1
    );

    // Cambiar imagen solo si es diferente a la actual
    if (newIndex !== currentImageIndex) {
      currentImageIndex = newIndex;
      changeBackgroundImage(currentImageIndex);
    }
  }

  // Función throttling para suavizar el scroll
  let scrollTimeout;
  function throttledScroll() {
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(handleScroll, 50);
  }

  // Agregar event listener para el scroll con throttling
  window.addEventListener('scroll', throttledScroll);

  // Inicializar con la primera imagen
  changeBackgroundImage(0);
});
