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
});
