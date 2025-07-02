const categoryData = {
    teatro: {
        title: "Teatro e Apresentações",
        description: "Descubra as mais emocionantes peças teatrais, performances e apresentações artísticas da comunidade LGBTQIA+ de Salvador. De clássicos reinventados a produções contemporâneas, encontre cultura, emoção e representatividade.",
        backendValue: "Teatro e apresentações"
    },
    palestras: {
        title: "Palestras e Oficinas",
        description: "Encontre palestras, workshops e oficinas que promovem conhecimento, diálogo e empoderamento da comunidade LGBTQIA+ em Salvador.",
        backendValue: "Palestras e Oficinas"
    },
    shows: {
        title: "Shows e Festas",
        description: "Aproveite a vida noturna de Salvador com os melhores shows, festas e eventos sociais voltados para o público LGBTQIA+. Celebre a diversidade com música, dança e alegria.",
        backendValue: "Shows e Festas"
    }
};

const urlParams = new URLSearchParams(window.location.search);
const categoriaUrl = urlParams.get('categoria') || 'teatro';
const categoriaSelecionada = categoryData[categoriaUrl] || categoryData['teatro'];
let allEvents = [];

// Atualiza título e descrição da categoria
document.getElementById('page-title').textContent = categoriaSelecionada.title;
document.getElementById('category-description').textContent = categoriaSelecionada.description;
document.title = `${categoriaSelecionada.title} | Amou, Amado?`;

async function fetchEventsByCategory() {
    try {
        const response = await fetch(`http://localhost:8080/api/eventos/categoria/${encodeURIComponent(categoriaSelecionada.backendValue)}`);
        if (!response.ok) throw new Error('Erro ao buscar eventos');
        const data = await response.json();
        allEvents = data;
        renderEvents(allEvents);
    } catch (err) {
        console.error(err);
        alert('Não foi possível carregar os eventos');
    }
}

function renderEvents(events) {
    const container = document.getElementById('events-container');
    container.innerHTML = '';

    if (events.length === 0) {
        container.innerHTML = '<p>Nenhum evento encontrado.</p>';
        return;
    }

    events.forEach(event => {
        const priceText = !event.ingressos || event.ingressos.length === 0
            ? 'Gratuito'
            : `R$ ${Math.min(...event.ingressos.map(i => i.preco)).toFixed(2)}`;

        const eventCard = document.createElement('div');
        eventCard.className = 'event-card';
        eventCard.innerHTML = `
            <img src="${event.imagem || 'imagens/banner-padrao.jpg'}" alt="${event.titulo}" class="event-banner">
            <div class="event-content">
                <h3 class="event-title">${event.titulo}</h3>
                <div class="event-category">${event.categoria}</div>
                <div class="event-location">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${event.cidade} - ${event.estado}</span>
                </div>
                <div class="event-date">
                    <i class="far fa-calendar-alt"></i>
                    <span>${formatDate(event.data)} às ${event.horario}</span>
                </div>
                <div class="event-info">
                    <span class="duration"><i class="far fa-clock"></i> ${event.duracao || 'Não informada'}</span>
                    <span class="age-rating"><i class="fas fa-user"></i> ${event.classificacaoEtaria || 'Livre'}</span>
                </div>
                <div class="event-price">${priceText}</div>
            </div>
        `;
        eventCard.addEventListener('click', () => {
            window.location.href = `descricaoevento.html?id=${event.id}`;
        });

        container.appendChild(eventCard);
    });
}

function formatDate(dateStr) {
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
}

function applyFilters() {
    const dateFilter = document.getElementById('date-filter').value;
    const priceFilter = document.getElementById('price-filter').value;

    let filtered = [...allEvents];

    // Filtro por preço
    if (priceFilter !== 'all') {
        if (priceFilter === 'free') {
            filtered = filtered.filter(e => !e.ingressos || e.ingressos.every(i => i.preco === 0));
        } else {
            const max = parseFloat(priceFilter);
            filtered = filtered.filter(e => e.ingressos && e.ingressos.some(i => i.preco <= max));
        }
    }

    // Filtro por data
    const hoje = new Date();
    const fimSemana = new Date(hoje);
    fimSemana.setDate(fimSemana.getDate() + 7);

    if (dateFilter === 'week') {
        filtered = filtered.filter(e => new Date(e.data) <= fimSemana);
    } else if (dateFilter === 'month') {
        filtered = filtered.filter(e => new Date(e.data).getMonth() === hoje.getMonth());
    } else if (dateFilter === 'upcoming') {
        filtered = filtered.filter(e => new Date(e.data) >= hoje);
    }

    renderEvents(filtered);
}

function searchEvents() {
    const term = document.getElementById('search-input').value.toLowerCase();
    const filtered = allEvents.filter(e =>
        e.titulo.toLowerCase().includes(term) ||
        e.local?.toLowerCase().includes(term) ||
        e.cidade?.toLowerCase().includes(term)
    );
    renderEvents(filtered);
}

document.addEventListener('DOMContentLoaded', () => {
    fetchEventsByCategory();

    document.getElementById('apply-filters').addEventListener('click', applyFilters);
    document.getElementById('reset-filters').addEventListener('click', () => {
        document.getElementById('date-filter').value = 'all';
        document.getElementById('price-filter').value = 'all';
        renderEvents(allEvents);
    });

    document.getElementById('search-input').addEventListener('input', searchEvents);
    document.getElementById('search-input').addEventListener('keyup', (e) => {
        if (e.key === 'Enter') searchEvents();
    });
});
