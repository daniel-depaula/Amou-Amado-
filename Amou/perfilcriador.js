
    // Utilitário: obter parâmetros da URL
    function getUrlParams() {
        const params = {};
        const queryString = window.location.search.substring(1);
        const pairs = queryString.split('&');

        pairs.forEach(pair => {
            const [key, value] = pair.split('=');
            if (key) {
                params[key] = decodeURIComponent(value || '');
            }
        });

        return params;
    }

    // Formatar data ISO -> DD/MM/AAAA
    function formatarData(dataIso) {
        const data = new Date(dataIso);
        return data.toLocaleDateString('pt-BR');
    }

    // Carregar perfil do organizador
    async function loadOrganizerProfile() {
        const params = getUrlParams();
        const organizerId = params.id;

        try {
            const res = await fetch(`http://localhost:8080/api/organizadores/${organizerId}`);
            const organizador = await res.json();

            // Nome e bio
            document.querySelector('.organizer-name').textContent = organizador.nome;
            document.querySelector('.organizer-bio p').textContent = organizador.bio;

            // Metadados
            document.querySelectorAll('.meta-content p')[0].textContent = organizador.localizacao;
            document.querySelectorAll('.meta-content p')[1].textContent = organizador.membroDesde;
            document.querySelectorAll('.meta-content p')[2].textContent = `${organizador.quantidadeEventos} eventos`;

            // Contato
            const contactItems = document.querySelectorAll('.contact-list li');
            contactItems[0].innerHTML = `<i class="fas fa-envelope"></i> ${organizador.contato.email}`;
            contactItems[1].innerHTML = `<i class="fas fa-phone"></i> ${organizador.contato.telefone}`;
            contactItems[2].innerHTML = `<i class="fas fa-globe"></i> ${organizador.contato.site}`;
            contactItems[3].innerHTML = `<i class="fab fa-instagram"></i> ${organizador.contato.instagram}`;

            // Foto de perfil e capa
            document.querySelector('.organizer-avatar img').src = organizador.fotoPerfilUrl;
            const slides = document.querySelectorAll('.carousel-slide img');
            slides[0].src = organizador.fotoCapaUrl;

        } catch (error) {
            console.error('Erro ao carregar perfil:', error);
        }
    }


  
    // Inicialização
    document.addEventListener('DOMContentLoaded', () => {
        loadOrganizerProfile();
        loadEventosDoOrganizador();
        initGallery();
        initCarousel();
        setupEventsNavigation();
    });
