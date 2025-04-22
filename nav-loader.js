fetch("nav.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("nav-placeholder").innerHTML = data;

    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("nav-links");

    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  });
