// Função para obter o ID da URL
    function obterIdEventoDaUrl() {
        const params = new URLSearchParams(window.location.search);
        return params.get("id");
    }

    // Função para buscar o evento da API pelo ID
    async function buscarEventoPorId(id) {
        try {
            const resposta = await fetch(`http://localhost:8080/api/eventos/${id}`);
            if (!resposta.ok) {
                throw new Error(`Erro ao buscar evento com ID ${id}`);
            }
            return await resposta.json();
        } catch (erro) {
            console.error("Erro ao carregar evento:", erro);
            return null;
        }
    }

    // Função para preencher a página com os dados do evento
    function preencherDetalhesEvento(evento) {
        document.querySelector(".event-title").textContent = evento.titulo || "Evento";
        document.querySelector(".event-category").textContent = evento.categoria || "";
        document.querySelector(".event-image img").src = evento.imagem || "https://via.placeholder.com/1200x600";
        document.querySelector(".event-price").textContent = evento.preco ? `R$ ${evento.preco.toFixed(2)}` : "Gratuito";

        document.querySelector(".meta-content:nth-child(2) p").textContent = evento.local || "";
        document.querySelectorAll(".meta-item")[1].querySelector("p").textContent = evento.data || "";
        document.querySelectorAll(".meta-item")[2].querySelector("p").textContent = evento.duracao || "";
        document.querySelectorAll(".meta-item")[3].querySelector("p").textContent = evento.classificacaoEtaria || "";

        // Descrição
        const descricao = document.querySelector(".event-description p");
        if (descricao) descricao.textContent = evento.descricao || "";

        // Destaques
        const destaquesContainer = document.querySelector(".event-highlights");
        if (destaquesContainer && evento.destaques) {
            const destaques = evento.destaques.split(";").map(d => d.trim()).filter(Boolean);
            destaquesContainer.innerHTML = `
                <h3 class="section-title" style="font-size: 1.5rem;">Destaques</h3>
                ${destaques.map(d => `
                    <div class="highlight-item">
                        <div class="highlight-icon"><i class="fas fa-star"></i></div>
                        <div class="highlight-content"><p>${d}</p></div>
                    </div>
                `).join("")}
            `;
        }

        // Artistas Confirmados
        const listaArtistas = document.querySelector(".artist-list");
        if (listaArtistas && evento.artistas) {
            const artistas = evento.artistas.split(";").map(a => a.trim()).filter(Boolean);
            listaArtistas.innerHTML = artistas.map(artista => `<li>${artista}</li>`).join("");
        }

        // Criador do Evento (fictício por enquanto)
        document.querySelector("#creator-profile").href = `perfil-criador.html?id=1`;
        document.querySelector(".creator-name").textContent = "Organizador";

        // Lista de Preços
        document.querySelector(".price-list").innerHTML = `
            <li>Pista Comum: R$ ${evento.preco?.toFixed(2) || "00,00"}</li>
            <li>Área VIP: R$ ${(evento.preco * 2)?.toFixed(2) || "00,00"}</li>
            <li>Meia-entrada para estudantes e idosos</li>
        `;

        // Políticas
        const listaPoliticas = document.querySelector(".policy-list");
        if (listaPoliticas && evento.politicas) {
            const politicas = evento.politicas.split(";").map(p => p.trim()).filter(Boolean);
            listaPoliticas.innerHTML = politicas.map(p => `<li>${p}</li>`).join("");
        }

        // Contato
        const contatoUl = document.querySelector(".contact-list");
        contatoUl.innerHTML = `
            <li>Telefone: ${evento.telefoneContato || "(00) 00000-0000"}</li>
            <li>Email: ${evento.emailContato || "contato@exemplo.com"}</li>
            <li>Site: ${evento.websiteContato || "www.exemplo.com"}</li>
        `;

        // Localização
        document.querySelector("#map-placeholder p").textContent = `${evento.local}, ${evento.bairro || ""} - ${evento.cidade || ""}, ${evento.estado || ""}`;
    }

    // Iniciar carregamento
    document.addEventListener("DOMContentLoaded", async () => {
        const id = obterIdEventoDaUrl();
        if (!id) {
            alert("ID do evento não encontrado na URL.");
            return;
        }

        const evento = await buscarEventoPorId(id);
        if (!evento) {
            alert("Evento não encontrado.");
            return;
        }

        preencherDetalhesEvento(evento);

        // Botões do header
        document.querySelector('.btn-create')?.addEventListener('click', () => {
            window.location.href = 'criacaoevento.html';
        });
        document.querySelector('.btn-events')?.addEventListener('click', () => {
            window.location.href = 'gerenciareventos.html';
        });
        document.querySelector('.btn-profile')?.addEventListener('click', () => {
            window.location.href = 'perfilcriador.html';
        });

        document.getElementById('buy-tickets')?.addEventListener('click', () => {
            alert('Redirecionando para compra de ingressos');
        });
    });