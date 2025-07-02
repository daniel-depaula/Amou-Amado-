document.addEventListener('DOMContentLoaded', function() {
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            // Inserir o header no início do body
            document.body.insertAdjacentHTML('afterbegin', data);
            
            // Lógica do botão login/logout
            const loginBtn = document.getElementById('login-logout-btn');
            let isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
            
            // Atualizar estado inicial do botão
            updateLoginButton(isLoggedIn);
            
            // Adicionar evento de clique
            loginBtn.addEventListener('click', () => {
                isLoggedIn = !isLoggedIn;
                localStorage.setItem('isLoggedIn', isLoggedIn);
                updateLoginButton(isLoggedIn);
                
                // Executar ações de login/logout
                if(isLoggedIn) {
                    console.log("Usuário logado");
                    // Redirecionar ou executar ações de login
                } else {
                    console.log("Usuário deslogado");
                    // Executar logout
                }
            });
            
            // Função para atualizar aparência do botão
            function updateLoginButton(loggedIn) {
                if(loggedIn) {
                    loginBtn.innerHTML = `
                        <i class="fas fa-sign-out-alt"></i>
                        <span class="btn-text">Logout</span>
                    `;
                    loginBtn.classList.add('logged-in');
                } else {
                    loginBtn.innerHTML = `
                        <i class="fas fa-sign-in-alt"></i>
                        <span class="btn-text">Login</span>
                    `;
                    loginBtn.classList.remove('logged-in');
                }
            }
        });
});