document.addEventListener('DOMContentLoaded', function() {
    // Función auxiliar para verificar si un elemento existe
    function ensureElementExists(selector, action) {
        const element = document.querySelector(selector);
        if (element && typeof action === 'function') {
            action(element);
        }
    }

    // Funcionalidad del menú de navegación
    ensureElementExists(".navbar-collapse", function(navbarCollapse) {
        const navLinks = document.querySelectorAll(".nav-link");

        navLinks.forEach(function(link) {
            link.addEventListener("click", function() {
                if (window.innerWidth < 992) { // Solo en dispositivos móviles
                    new bootstrap.Collapse(navbarCollapse, { toggle: true });
                }
            });
        });
    });

    // Funcionalidad del slider de galería
    ensureElementExists(".gallery-slider", function(gallerySlider) {
        const prevBtn = document.querySelector('.gallery-nav.prev');
        const nextBtn = document.querySelector('.gallery-nav.next');

        let scrollAmount = 0;
        const scrollStep = 300;

        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                scrollAmount = Math.max(0, scrollAmount - scrollStep);
                gallerySlider.scrollTo({ left: scrollAmount, behavior: 'smooth' });
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                scrollAmount = Math.min(gallerySlider.scrollWidth - gallerySlider.clientWidth, scrollAmount + scrollStep);
                gallerySlider.scrollTo({ left: scrollAmount, behavior: 'smooth' });
            });
        }
    });

    // Manejo de envío del formulario de contacto con validación
    ensureElementExists("#contact-form", function(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = contactForm.querySelector('#name').value.trim();
            const email = contactForm.querySelector('#email').value.trim();

            if (name && email) {
                alert('¡Mensaje enviado! Gracias por contactar.');
                contactForm.reset();
            } else {
                alert('Por favor completa todos los campos.');
            }
        });
    });

    // Funcionalidad de reproducción de canciones
    ensureElementExists(".play-all-btn", function(playAllBtn) {
        playAllBtn.addEventListener('click', function() {
            alert('Reproduciendo todas las canciones del álbum: El Viaje A Ninguna Parte - XX Aniversario');
        });
    });

    ensureElementExists(".btn-outline-light", function(shuffleBtn) {
        shuffleBtn.addEventListener('click', function() {
            alert('Mezclando canciones');
        });
    });

    ensureElementExists(".btn-outline-light:nth-of-type(2)", function(saveAlbumBtn) {
        saveAlbumBtn.addEventListener('click', function() {
            alert('Álbum guardado en tu biblioteca');
        });
    });

    // Delegación de eventos para los elementos de la lista de canciones
    ensureElementExists(".song-list", function(songList) {
        songList.addEventListener('click', function(e) {
            const target = e.target.closest('.song-item'); 
            if (target) {
                const index = Array.from(target.parentNode.children).indexOf(target);
                alert(`Reproduciendo Canción ${index + 1}`);
            }
        });
    });

    // Mostrar loaders en streaming y redirigir a Spotify
    ensureElementExists("#spotify-link", function(spotifyLink) {
        spotifyLink.addEventListener('click', function(e) {
            e.preventDefault(); // Prevenir redirección inmediata
            const linkHref = spotifyLink.href; // Guardar el enlace real
            showLoader('spotify', 2000); // Mostrar el loader

            setTimeout(() => {
                window.location.href = linkHref; // Redirigir después del delay
            }, 2000); // Ajustar al mismo tiempo que el loader
        });
    });

    // Mostrar loaders en streaming para Apple Music
    ensureElementExists("#apple-music-link", function(appleMusicLink) {
        appleMusicLink.addEventListener('click', function(e) {
            e.preventDefault(); // Prevenir redirección inmediata
            const linkHref = appleMusicLink.href; // Guardar el enlace real
            showLoader('apple-music', 2000); // Mostrar el loader

            setTimeout(() => {
                window.location.href = linkHref; // Redirigir después del delay
            }, 2000); // Ajustar al mismo tiempo que el loader
        });
    });
});

// Función para mostrar loaders con tiempo configurable
function showLoader(platform, duration = 2000) {
    const loader = document.getElementById(`${platform}-loader`);
    const link = document.getElementById(`${platform}-link`);
    const icon = document.querySelector(`.${platform}-icon`);

    if (loader && link && icon) {
        loader.style.display = 'block';
        setTimeout(() => {
            loader.style.display = 'none';
            link.style.display = 'none';
            icon.style.display = 'inline-block';
        }, duration);
    }
}
