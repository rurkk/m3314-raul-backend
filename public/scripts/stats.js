(function () {
    window.addEventListener('load', function () {
        const loadTime = performance.now();
        const loadTimeElement = document.getElementById('load-time');

        if (loadTimeElement) {
            loadTimeElement.textContent = `Время загрузки страницы: ${loadTime.toFixed(0)} мс`;
        }

        const menuLinks = document.querySelectorAll('nav ul li a');
        const currentPath = window.location.pathname;

        menuLinks.forEach((link) => {
            const linkPath = new URL(link.href).pathname;
            if (linkPath === currentPath) {
                link.classList.add('active');
            }
        });
    });
})();
