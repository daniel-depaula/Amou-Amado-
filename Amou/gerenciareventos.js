async function carregarEventosOrganizador() {
  const idOrganizador = localStorage.getItem("organizadorId");
  if (!idOrganizador) {
    alert("ID do organizador não encontrado.");
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:8080/api/eventos/organizador/${idOrganizador}`
    );
    if (!response.ok) throw new Error("Erro ao buscar eventos");

    const eventos = await response.json();
    const container = document.querySelector(".manage-events");
    container.innerHTML = "";

    eventos.forEach((evento) => {
      const card = document.createElement("div");
      card.classList.add("event-card");
      card.innerHTML = `
                    <div class="event-image">
                        <img src="${
                          evento.imagemUrl ||
                          "https://source.unsplash.com/random/?event"
                        }" alt="${evento.titulo}">
                    </div>
                    <div class="event-content">
                        <h3 class="event-title">${evento.titulo}</h3>
                        <div class="event-meta">
                            <div><i class="far fa-calendar-alt"></i> ${
                              evento.data
                            } - ${evento.horario}</div>
                            <div><i class="fas fa-map-marker-alt"></i> ${
                              evento.local
                            }</div>
                        </div>
                        <div class="event-actions">
                            <button class="btn edit-btn" onclick="editarEvento(${
                              evento.id
                            })">
                                <i class="fas fa-edit"></i> Editar
                            </button>
                            <button class="btn delete-btn" onclick="excluirEvento(${
                              evento.id
                            })">
                                <i class="fas fa-trash"></i> Excluir
                            </button>
                        </div>
                    </div>
                `;
      container.appendChild(card);
    });
  } catch (error) {
    alert("Erro ao carregar eventos.");
    console.error(error);
  }
}

async function excluirEvento(id) {
  if (!confirm("Tem certeza que deseja excluir este evento?")) return;

  try {
    const response = await fetch(`http://localhost:8080/api/eventos/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      alert("Evento excluído com sucesso!");
      carregarEventosOrganizador();
    } else {
      alert("Erro ao excluir evento.");
    }
  } catch (err) {
    alert("Erro na requisição.");
  }
}

function editarEvento(id) {
  window.location.href = `criacaoevento.html?id=${id}`;
}

document.addEventListener("DOMContentLoaded", carregarEventosOrganizador);
