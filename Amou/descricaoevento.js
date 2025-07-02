document.addEventListener("DOMContentLoaded", function () {
            const params = new URLSearchParams(window.location.search);
            const id = params.get("id");

            if (!id) {
                alert("ID do evento não fornecido.");
                return;
            }

            fetch(http://localhost:8080/api/eventos/${id})
        .then(response => {
                if (!response.ok) {
                    throw new Error("Erro ao buscar evento.");
                }
                return response.json();
            })
                    .then(evento => {
                        // Preenchendo os dados na página
                        document.querySelector(".event-title").textContent = evento.titulo;
                        document.querySelector(".event-category").textContent = evento.categoria;
                        document.querySelector(".event-image img").src = evento.imagem;
                        document.querySelector(".event-location p").textContent = evento.local;
                        document.querySelector(".event-date p").textContent = ${ evento.data } às ${ evento.horario };
                        document.querySelector(".event-price").textContent = evento.preco === 0 ? "Gratuito" : R$ ${ evento.preco.toFixed(2) };
                        document.querySelector(".event-duration p").textContent = evento.duracao;
                        document.querySelector(".event-info .event-body .event-description p").textContent = evento.descricao;
                        document.querySelector(".event-classification p").textContent = evento.classificacaoEtaria;

                        // Destaques (separados por quebra de linha ou vírgula)
                        const destaquesContainer = document.querySelector(".event-highlights");
                        destaquesContainer.innerHTML = <h3 class="section-title">Destaques</h3>;
                        if (evento.destaques) {
                            evento.destaques.split(/\n|,/).forEach(destaque => {
                                if (destaque.trim()) {
                                    const item = document.createElement("div");
                                    item.className = "highlight-item";
                                    item.innerHTML = `
                            <div class="highlight-icon"><i class="fas fa-star"></i></div>
                            <div class="highlight-content"><p>${destaque.trim()}</p></div>
                        `;
                                    destaquesContainer.appendChild(item);
                                }
                            });
                        }

                        // Artistas
                        const artistasList = document.querySelector(".artist-list");
                        if (evento.artistas) {
                            artistasList.innerHTML = "";
                            evento.artistas.split(/\n|,/).forEach(artista => {
                                if (artista.trim()) {
                                    const li = document.createElement("li");
                                    li.textContent = artista.trim();
                                    artistasList.appendChild(li);
                                }
                            });
                        }

                        // Políticas
                        const policyList = document.querySelector(".policy-list");
                        if (evento.politicas) {
                            policyList.innerHTML = "";
                            evento.politicas.split(/\n|,/).forEach(politica => {
                                if (politica.trim()) {
                                    const li = document.createElement("li");
                                    li.textContent = politica.trim();
                                    policyList.appendChild(li);
                                }
                            });
                        }

                        // Contato
                        const contactList = document.querySelector(".contact-list");
                        contactList.innerHTML = `
                <li>Telefone: ${evento.telefoneContato || "(não informado)"}</li>
                <li>Email: ${evento.emailContato || "(não informado)"}</li>
                <li>Site: ${evento.websiteContato || "(não informado)"}</li>
            `;

                        // Criador (placeholder)
                        document.querySelector(".creator-name").textContent = evento.titulo;
                        document.getElementById("creator-profile").href = perfil - criador.html ? id = ${ evento.id };

                        // Mapa/localização (se quiser integrar com Google Maps futuramente)
                        document.querySelector("#map-placeholder p").textContent = evento.local;
                    })
                    .catch(error => {
                        console.error(error);
                        alert("Erro ao carregar detalhes do evento.");
                    });

            // Botões do cabeçalho
            document.querySelector('.btn-create').addEventListener('click', () => {
                window.location.href = "criarevento.html";
            });

            document.querySelector('.btn-events').addEventListener('click', () => {
                window.location.href = "meuseventos.html";
            });

            document.querySelector('.btn-profile').addEventListener('click', () => {
                window.location.href = "perfil.html";
            });

            document.getElementById('buy-tickets').addEventListener('click', () => {
                alert('Página de compra de ingressos ainda em desenvolvimento!');
            });
        });