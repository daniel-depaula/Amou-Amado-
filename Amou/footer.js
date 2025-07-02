document.addEventListener('DOMContentLoaded', () => {
    // Cria o elemento footer
    const footer = document.createElement('footer');
    footer.id = 'footer-placeholder';
    
    // Insere o footer antes do fechamento do body
    document.body.appendChild(footer);
    
    // Carrega o conteúdo do footer
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            footer.innerHTML = data;
            
            // Carrega o CSS do footer
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'footer.css';
            document.head.appendChild(link);
        })
        .catch(error => {
            console.error('Erro ao carregar o rodapé:', error);
        });
});