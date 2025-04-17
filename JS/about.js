let mobileSliderInterval;

function initMobileSlider() {
  const slider = document.querySelector(".card-slider");
  if (!slider || window.innerWidth > 768) {
    clearInterval(mobileSliderInterval);
    return;
  }

  let slideIndex = 0;
  let cardWidth = slider.querySelector(".card").offsetWidth + 20; 
  let totalCards = slider.children.length;


  mobileSliderInterval = setInterval(() => {
    slideIndex++;

    slider.style.transition = "transform 0.5s ease-in-out";
    slider.style.transform = `translateX(-${slideIndex * cardWidth}px)`;


    if (slideIndex >= totalCards - 1) {
      setTimeout(() => {

        slider.appendChild(slider.children[0]); 
        slideIndex--;
        slider.style.transition = "none";
        slider.style.transform = `translateX(-${slideIndex * cardWidth}px)`;
      }, 500);  
    }
  }, 3000);
}

window.addEventListener("load", initMobileSlider);
window.addEventListener("resize", initMobileSlider);
