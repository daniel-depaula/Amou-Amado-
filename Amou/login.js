document
  .getElementById("login-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const payload = {
      email: email,
      senha: password,
    };

    try {
      const response = await fetch("http://localhost:8080/api/usuarios/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();

        // Armazena dados localmente (token e informações básicas do usuário)
        localStorage.setItem("token", data.token);
        localStorage.setItem("usuarioId", data.id);
        localStorage.setItem("usuarioNome", data.nome);
        localStorage.setItem("usuarioEmail", data.email);

        alert("Login realizado com sucesso! Redirecionando...");
        window.location.href = "index.html";
      } else {
        const erro = await response.text();
        alert("Erro no login: " + erro);
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao conectar com o servidor.");
    }
  });
