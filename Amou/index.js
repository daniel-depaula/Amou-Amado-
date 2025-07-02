async function buscarProximosEventos() {
        try {
            const resposta = await fetch("http://localhost:8080/eventos/proximos");
            if (!resposta.ok) throw new Error("Erro ao carregar eventos");

            const eventos = await resposta.json();
            renderEvents(eventos, "proximos-container");
        } catch (erro) {
            console.error("Erro ao buscar eventos:", erro);
        }
    }

    function renderEvents(events, containerId) {
        const container = document.getElementById(containerId);
        container.innerHTML = '';

        events.forEach(event => {
            const preco = event.preco === 0 ? "Gratuito" : R$ ${event.preco.toFixed(2).replace('.', ',')};

            const eventCard = document.createElement('div');
            eventCard.className = 'event-card';
            eventCard.innerHTML = `
                <div class="event-image">
                    <img src="${event.imagemUrl}" alt="${event.titulo}">
                </div>
                <div class="event-content">
                    <span class="event-category">${event.categoria}</span>
                    <h3 class="event-title">${event.titulo}</h3>
                    <div class="event-meta">
                        <div class="meta-item">
                            <i class="far fa-calendar-alt"></i>
                            <span>${formatarData(event.data)}</span>
                        </div>
                        <div class="meta-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>${event.local}</span>
                        </div>
                    </div>
                    <div class="event-price">${preco}</div>
                </div>
            `;
            container.appendChild(eventCard);
        });
    }

    function formatarData(dataString) {
        const data = new Date(dataString);
        const dia = data.getDate().toString().padStart(2, '0');
        const mes = (data.getMonth() + 1).toString().padStart(2, '0');
        const ano = data.getFullYear();
        const horas = data.getHours().toString().padStart(2, '0');
        const minutos = data.getMinutes().toString().padStart(2, '0');
        return ${dia}/${mes}/${ano} às ${horas}:${minutos};
    }

    document.addEventListener("DOMContentLoaded", () => {
        buscarProximosEventos();
    });
