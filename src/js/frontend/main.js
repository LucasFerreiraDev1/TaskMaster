
document.addEventListener('DOMContentLoaded', function() {
    // TOGGLE SIDEBAR
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('overlay');
    const filtersToggle = document.querySelector('.filters-toggle');
    const filters = document.querySelector('.filters');

    sidebarToggle?.addEventListener('click', () => {
        sidebar.classList.toggle('show');
        overlay.classList.toggle('show');
    });
    
    filtersToggle?.addEventListener('click', () => {
        filters.classList.toggle('show');
        overlay.classList.toggle('show');
    });

    overlay?.addEventListener('click', () => {
        sidebar.classList.remove('show');
        filters.classList.remove('show');
        overlay.classList.remove('show');
    });

    const navLinks = document.querySelectorAll('.nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            if (window.innerWidth <= 767) {
                sidebar.classList.remove('show');
                overlay.classList.remove('show');
            }
        });
    });


    // TOGGLE DE OPÇÕES DAS TAREFAS
    function closeAllOptions() {
        const allOptions = document.querySelectorAll('.options');
        const allButtons = document.querySelectorAll('.show-options');

        allOptions.forEach(option => {
            option.classList.remove('show');
        });

        allButtons.forEach(button => {
            button.classList.remove('active');
        });
    }

    
    const showOptionsButtons = document.querySelectorAll('.show-options');
    showOptionsButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.stopPropagation(); // Previne que o evento se propague

            const task = this.closest('.task');
            const options = task.querySelector('.options');
            const isActive = this.classList.contains('active');

            // Fechar todas as outras opções primeiro
            closeAllOptions();

            // Se não estava ativo, abrir as opções desta tarefa
            if (!isActive) {
                options.classList.add('show');
                this.classList.add('active');
            }
        });
    });

    // Fechar opções ao clicar fora da tarefa
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.task')) {
            closeAllOptions();
        }
    });

    // Fechar opções ao pressionar Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeAllOptions();
        }
    });
});
