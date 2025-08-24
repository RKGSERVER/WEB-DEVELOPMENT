document.querySelectorAll('a.nav-link').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetID = this.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetID);

    if (targetSection) {
      const navbarHeight = document.querySelector('.navbar').offsetHeight;
      const elementPosition = targetSection.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      history.pushState(null, null, `#${targetID}`);
    }
  });
});
