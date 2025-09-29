
        const nav = document.querySelector('.navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY >= 56) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });

        const copyButton = document.getElementById('copyButton');
        const pixKeyInput = document.getElementById('pixKey');

        if (copyButton && pixKeyInput) {
            copyButton.addEventListener('click', function() {
                navigator.clipboard.writeText(pixKeyInput.value).then(() => {
                    const originalContent = copyButton.innerHTML;
                    copyButton.innerHTML = '<i class="bi bi-check-lg"></i> Copiado!';
                    setTimeout(() => {
                        copyButton.innerHTML = originalContent;
                    }, 2000);
                }).catch(err => {
                    console.error('Erro ao copiar a chave: ', err);
                });  
            });
        }

        document.addEventListener('DOMContentLoaded', function() {
            var welcomeModal = new bootstrap.Modal(document.getElementById('welcomeModal'));
            welcomeModal.show();

            document.getElementById('helpButton').addEventListener('click', function() {
                document.getElementById('neemias').scrollIntoView({
                    behavior: 'smooth'
                });
            });

            const eventos = {
                'impacto-jovem': {
                    titulo: 'Impacto Jovem',
                    imagemPrincipal: 'imgs/collection.png', 
                    galeria: [
                        'imgs/IMG_1780.JPG',
                        'imgs/IMG_1802.JPG',
                        'imgs/IMG_1756.JPG',
                        'imgs/IMG_1760.JPG',
                        'imgs/IMG_1772.JPG',
                        'imgs/IMG_1787.JPG'
                    ]
                },
                'congresso-senhoras': {
                    titulo: 'Restaurando Vasos Quebrados',
                    imagemPrincipal: 'imgs/IMGVASO/restaurandovasos.png', 
                    galeria: [
                        'imgs/IMGVASO/IMG_0633.cr2',
                        'imgs/IMGVASO/IMG_0635.cr2',
                        'imgs/IMGVASO/IMG_0638.cr2',
                        'imgs/IMGVASO/IMG_0640.cr2',
                        'imgs/IMGVASO/IMG_0641.cr2',
                        'imgs/IMGVASO/IMG_0642.cr2',
                        'imgs/IMGVASO/IMG_0647.cr2',
                        'imgs/IMGVASO/IMG_0659.cr2',
                        'imgs/IMGVASO/IMG_0661.cr2',
                        'imgs/IMGVASO/IMG_0662.cr2'
                    ]
                }
            };

            const carouselInner = document.querySelector('#eventoPrincipalCarousel .carousel-inner');
            const eventosModal = document.getElementById('eventosModal');
            let currentEventId = Object.keys(eventos)[0]; 

            function popularCarrossel() {
                let isFirst = true;
                for (const eventId in eventos) {
                    const evento = eventos[eventId];
                    const activeClass = isFirst ? 'active' : '';
                    
                    const itemHtml = `
                        <div class="carousel-item ${activeClass}" data-evento-id="${eventId}">
                            <img src="${evento.imagemPrincipal}" class="d-block w-100 rounded" alt="${evento.titulo}">
                            <div class="carousel-caption d-none d-md-block bg-dark bg-opacity-50 p-2 rounded">
                                <h5>${evento.titulo}</h5>
                            </div>
                        </div>
                    `;
                    carouselInner.innerHTML += itemHtml;
                    isFirst = false;
                }
            }
            
            const eventoPrincipalCarousel = document.getElementById('eventoPrincipalCarousel');
            if (eventoPrincipalCarousel) {
                eventoPrincipalCarousel.addEventListener('slide.bs.carousel', function (event) {
                    const proximoSlide = event.relatedTarget;
                    currentEventId = proximoSlide.getAttribute('data-evento-id');
                });
            }

            if (eventosModal) {
                eventosModal.addEventListener('show.bs.modal', function() {
                    const eventoAtual = eventos[currentEventId];
                    const modalTitle = eventosModal.querySelector('.modal-title');
                    const modalBody = eventosModal.querySelector('#galeria-eventos-body');

                    modalTitle.textContent = `Galeria: ${eventoAtual.titulo}`;
                    
                    modalBody.innerHTML = '';
                    if (eventoAtual.galeria && eventoAtual.galeria.length > 0) {
                        eventoAtual.galeria.forEach((imgSrc) => {
                            const colHtml = `
                                <div class="col-lg-4 col-md-6 col-12 mb-3">
                                    <img src="${imgSrc}" class="img-fluid rounded shadow-sm gallery-thumbnail" alt="Foto de ${eventoAtual.titulo}" style="cursor: pointer;">
                                </div>
                            `;
                            modalBody.innerHTML += colHtml;
                        });
                    } else {
                        modalBody.innerHTML = '<p class="text-center">Nenhuma foto adicional disponível para este evento.</p>';
                    }
                });
            }

            const galeriaBody = document.getElementById('galeria-eventos-body');
            const zoomedImage = document.getElementById('zoomedImage');
            const imageZoomModal = new bootstrap.Modal(document.getElementById('imageZoomModal'));

            if (galeriaBody) {
                galeriaBody.addEventListener('click', function(e) {
                    if (e.target && e.target.classList.contains('gallery-thumbnail')) {
                        const imgSrc = e.target.src;
                        if (zoomedImage) {
                            zoomedImage.src = imgSrc;
                        }
                        imageZoomModal.show();
                    }
                });
            }

            if (carouselInner) {
                 popularCarrossel();
            }
        });
  
