const menuItems = document.querySelectorAll(".menu-item");
const sections = document.querySelectorAll(".account-section");

menuItems.forEach((item) => {
  item.addEventListener("click", function () {
    menuItems.forEach((i) => i.classList.remove("active"));
    sections.forEach((s) => s.classList.remove("active"));

    this.classList.add("active");

    const sectionId = this.getAttribute("data-section") + "-section";
    document.getElementById(sectionId).classList.add("active");

    if (sectionId === "favorites-section") {
      setTimeout(() => {
        window.location.href = "fav.html";
      }, 1000);
    }
  });
});
