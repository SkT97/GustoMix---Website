// Contact FORM
document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Previene il comportamento predefinito del modulo.

    // Configura EmailJS
    emailjs.init("aal3ttYnsZ8DguOJ3"); // Sostituisci con la tua Public Key di EmailJS.

    const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        subject: document.getElementById("msg_subject").value,
        message: document.getElementById("message").value,
    };

    emailjs.send("service_8k3mels", "template_vq1hw5a", formData)
        .then(function (response) {
            alert("Messaggio inviato con successo!");
            document.getElementById("contactForm").reset(); // Resetta il modulo.
        }, function (error) {
            alert("Errore nell'invio del messaggio: " + JSON.stringify(error));
        });
});

// Consenso PRIVACY
document.getElementById('consenso').addEventListener('click', function () {
    const link = document.querySelector('label[for="consenso"] a');
    link.target = '_blank'; // Apre in una nuova scheda
});

// Gallery FORM
// Carica dinamicamente le immagini per ciascuna categoria
document.addEventListener("DOMContentLoaded", () => {
    const categories = [
        { id: "food", maxImages: 50 },
        { id: "local", maxImages: 3 },
        { id: "menu", maxImages: 6 }
    ];

    const loadImages = (category, maxImages, containerId) => {
        const container = document.getElementById(containerId);
        for (let i = 1; i <= maxImages; i++) {
            const imagePath = `images/gallery/${category}_${i}.webp`;

            const img = new Image();
            img.src = imagePath;

            img.onload = () => {
                const imageElement = document.createElement("div");
                imageElement.className = "col";
                imageElement.innerHTML = `
                    <a href="${imagePath}" data-lightbox="${category}" data-title="${category} ${i}">
                        <img src="${imagePath}" alt="${category} ${i}" loading="lazy" class="img-fluid" />
                    </a>
                `;
                container.appendChild(imageElement);
            };

            img.onerror = () => console.log(`Image not found: ${imagePath}`);
        }
    };

    const initializeSlider = (containerId, prevBtnId, nextBtnId) => {
        const container = document.getElementById(containerId);
        const prevBtn = document.getElementById(prevBtnId);
        const nextBtn = document.getElementById(nextBtnId);

        let currentIndex = 0;

        const updateSlider = () => {
            const slideWidth = container.querySelector(".col").offsetWidth + 15;
            container.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        };

        nextBtn.addEventListener("click", () => {
            const totalItems = container.children.length;
            const visibleItems = window.innerWidth > 736 ? 3 : 1;
            if (currentIndex < totalItems - visibleItems) {
                currentIndex++;
                updateSlider();
            }
        });

        prevBtn.addEventListener("click", () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateSlider();
            }
        });

        window.addEventListener("resize", updateSlider);
    };

    categories.forEach(({ id, maxImages }) => {
        loadImages(id, maxImages, `gallery-container-${id}`);
        initializeSlider(`gallery-container-${id}`, `prev-btn-${id}`, `next-btn-${id}`);
    });
});

// Sincronizzazione delle altezze delle immagini nella galleria
document.addEventListener("DOMContentLoaded", () => {
    const syncRowHeights = () => {
        const categories = document.querySelectorAll(".gallery-container");
        categories.forEach(container => {
            const firstItem = container.querySelector(".col img");
            if (firstItem) {
                const height = firstItem.offsetHeight;
                container.querySelectorAll(".col img").forEach(img => {
                    img.style.height = `${height}px`;
                });
            }
        });
    };

    // Chiama la funzione dopo il caricamento delle immagini
    window.addEventListener("resize", syncRowHeights);
    setTimeout(syncRowHeights, 500); // Timeout per assicurarsi che le immagini siano caricate
});