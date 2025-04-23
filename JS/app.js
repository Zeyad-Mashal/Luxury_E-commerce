const handleSearch = () => {
    const searchIcon = document.querySelector('.searchIcon');
    const searchContainer = document.querySelector('.searchContainer');
    searchIcon.addEventListener('click', () => {
        searchContainer.classList.toggle('active');
    })
}

const token = localStorage.getItem("token");

if (token) {
    document.querySelector(".login").textContent = "LogOut";
} else {
    document.querySelector(".login").textContent = "Login";
}

document.addEventListener('DOMContentLoaded', () => {
    handleSearch();
});

document.addEventListener("DOMContentLoaded", () => {
    const swiper = new Swiper(".hotSwiper", {
        loop: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        slidesPerView: 1,
        spaceBetween: 20,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        },
    });

    // Add hover events to stop and start autoplay
    const productCards = document.querySelectorAll(".product-card");

    productCards.forEach(card => {
        card.addEventListener("mouseenter", () => {
            swiper.autoplay.stop(); // Stop autoplay on hover
        });

        card.addEventListener("mouseleave", () => {
            swiper.autoplay.start(); // Start autoplay when mouse leaves
        });
    });
});
