document.getElementById('signup-form').addEventListener('submit', async function (e) {
        e.preventDefault();

        // Coleta dos dados do formulário
        const fullName = document.getElementById('fullName').value;
        const socialName = document.getElementById('socialName').value;
        const pronoun = document.getElementById('pronoun').value;
        const gender = document.getElementById('gender').value;
        const ddd = document.getElementById('ddd').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const artArea = document.getElementById('artArea').value;
        const bio = document.getElementById('bio').value;
        const terms = document.getElementById('terms').checked;

        // Validações básicas
        if (!fullName || !ddd || !phone || !email || !password || !confirmPassword || !artArea || !terms) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        if (password !== confirmPassword) {
            alert('As senhas não coincidem. Por favor, verifique.');
            return;
        }

        // Montagem do objeto para envio à API
        const payload = {
            nomeCompleto: fullName,
            nomeSocial: socialName,
            pronome: pronoun,
            identidadeGenero: gender,
            ddd: ddd,
            telefone: phone,
            email: email,
            senha: password,
            areaArtistica: artArea,
            biografia: bio
        };

        try {
            const response = await fetch('http://localhost:8080/api/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                alert('Cadastro realizado com sucesso! Bem-vindo(a) à comunidade Amou, Amado?');
                window.location.href = 'login.html';
            } else {
                const erro = await response.json();
                alert('Erro ao cadastrar: ' + (erro.message || 'Verifique os dados e tente novamente.'));
            }
        } catch (error) {
            alert('Erro ao conectar com o servidor.');
            console.error(error);
        }
    });

    // Formatação do campo de telefone
    document.getElementById('phone').addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 9) value = value.slice(0, 9);
        e.target.value = value;
    });

    document.getElementById('ddd').addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 2) value = value.slice(0, 2);
        e.target.value = value;
    });