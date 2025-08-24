document.addEventListener("DOMContentLoaded", () => {
  const readMoreLinks = document.querySelectorAll(".read-more");

  readMoreLinks.forEach(link => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      alert(`You clicked on: ${link.getAttribute("href")}`);

    });
  });
});
