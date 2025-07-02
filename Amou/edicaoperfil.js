document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    const avatarInput = document.getElementById('avatar-input');
    const coverInput = document.getElementById('cover-input');
    const avatarPreview = document.getElementById('avatar-preview');
    const coverPreview = document.getElementById('cover-preview');

    let avatarBase64 = null;
    let coverBase64 = null;

    async function fetchOrganizador() {
        const response = await fetch(http://localhost:8080/api/organizadores/${id});
        const data = await response.json();

        document.getElementById('name').value = data.nome || '';
        document.getElementById('location').value = data.localizacao || '';
        document.getElementById('since').value = data.membroDesde || '';
        document.getElementById('bio').value = data.biografia || '';
        document.getElementById('email').value = data.email || '';
        document.getElementById('phone').value = data.telefone || '';
        document.getElementById('website').value = data.website || '';
        document.getElementById('events').value = data.eventosRealizados || 0;

        document.getElementById('instagram').value = data.instagram || '';
        document.getElementById('facebook').value = data.facebook || '';
        document.getElementById('twitter').value = data.twitter || '';
        document.getElementById('linkedin').value = data.linkedin || '';

        if (data.fotoPerfilUrl) {
            avatarPreview.innerHTML = <img src="${data.fotoPerfilUrl}" alt="Foto de perfil">;
            avatarBase64 = data.fotoPerfilUrl;
        }

        if (data.fotoCapaUrl) {
            coverPreview.innerHTML = <img src="${data.fotoCapaUrl}" alt="Foto de capa">;
            coverBase64 = data.fotoCapaUrl;
        }
    }

    async function toBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    avatarInput.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (file) {
            avatarBase64 = await toBase64(file);
            avatarPreview.innerHTML = <img src="${avatarBase64}" alt="Preview do Avatar">;
        }
    });

    coverInput.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (file) {
            coverBase64 = await toBase64(file);
            coverPreview.innerHTML = <img src="${coverBase64}" alt="Preview da Capa">;
        }
    });

    document.getElementById('edit-profile-form').addEventListener('submit', async (e) => {
        e.preventDefault();

        const organizadorDTO = {
            nome: document.getElementById('name').value,
            localizacao: document.getElementById('location').value,
            membroDesde: document.getElementById('since').value,
            biografia: document.getElementById('bio').value,
            email: document.getElementById('email').value,
            telefone: document.getElementById('phone').value,
            website: document.getElementById('website').value,
            eventosRealizados: parseInt(document.getElementById('events').value) || 0,
            instagram: document.getElementById('instagram').value,
            facebook: document.getElementById('facebook').value,
            twitter: document.getElementById('twitter').value,
            linkedin: document.getElementById('linkedin').value,
            fotoPerfilUrl: avatarBase64,
            fotoCapaUrl: coverBase64
        };

        const response = await fetch(http://localhost:8080/api/organizadores/${id}, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(organizadorDTO)
        });

        if (response.ok) {
            alert('Perfil atualizado com sucesso!');
            window.location.href = perfilcriador.html?id=${id};
        } else {
            alert('Erro ao atualizar o perfil.');
        }
    });

    document.querySelector('.btn-secondary').addEventListener('click', () => {
        if (confirm('Deseja cancelar?')) {
            window.location.href = perfilcriador.html?id=${id};
        }
    });

    fetchOrganizador();
});