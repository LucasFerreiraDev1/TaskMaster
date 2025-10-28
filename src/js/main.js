
document.addEventListener('DOMContentLoaded', function () {

    /* ============================================
                    TOGGLE SIDEBAR
       ============================================ */
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('overlay');
    const filtersToggle = document.querySelector('.filters-toggle');
    const filters = document.querySelector('.filters');

    sidebarToggle?.addEventListener('click', function () {
        sidebar.classList.toggle('show');
        overlay.classList.toggle('show');
    });

    filtersToggle?.addEventListener('click', function () {
        filters.classList.toggle('show');
        overlay.classList.toggle('show');
    });

    // Fechar o menu ao clicar no overlay
    overlay?.addEventListener('click', function () {
        sidebar.classList.remove('show');
        filters.classList.remove('show');
        overlay.classList.remove('show');
    });

    // Fechar o menu ao clicar em um link de navegação. (Somente mobile)
    const navLinks = document.querySelectorAll('.nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            if (window.innerWidth <= 767) {
                sidebar.classList.remove('show');
                overlay.classList.remove('show');
            }
        });
    });

    /* ============================================
                TASK OPTIONS TOGGLE
       ============================================ */
    // Função para fechar todas as opções abertas
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

    // Adicionar event listeners para os botões de opções
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

    /* ============================================
                TASK ACTIONS
       ============================================ */
    // Event listeners para os botões de ação
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.stopPropagation();

            const action = this.classList.contains('edit') ? 'edit' :
                this.classList.contains('duplicate') ? 'duplicate' :
                    this.classList.contains('delete') ? 'delete' : 'unknown';

            const task = this.closest('.task');
            const taskId = task.getAttribute('data-task-id');
            const taskTitle = task.querySelector('.title').textContent;

            console.log(`Ação: ${action} | Tarefa ID: ${taskId} | Título: ${taskTitle}`);

            // Aqui você pode adicionar a lógica específica para cada ação
            switch (action) {
                case 'edit':
                    alert(`Editando tarefa: ${taskTitle}`);
                    break;
                case 'duplicate':
                    alert(`Duplicando tarefa: ${taskTitle}`);
                    break;
                case 'delete':
                    if (confirm(`Tem certeza que deseja excluir a tarefa "${taskTitle}"?`)) {
                        task.style.opacity = '0.5';
                        task.style.transform = 'translateX(-100%)';
                        setTimeout(() => {
                            task.remove();
                        }, 300);
                    }
                    break;
            }
        });
    });

    /* ============================================
                STATUS CHANGE
       ============================================ */
    // Event listeners para mudança de status
    const statusSelects = document.querySelectorAll('.status-select');
    statusSelects.forEach(select => {
        select.addEventListener('change', function () {
            const task = this.closest('.task');
            const taskId = task.getAttribute('data-task-id');
            const newStatus = this.value;
            const taskTitle = task.querySelector('.title').textContent;

            console.log(`Mudando status da tarefa ${taskId} para: ${newStatus}`);

            // Atualizar a classe do select baseada no novo status
            this.className = `status-select ${newStatus}`;

            // Aqui você pode adicionar lógica para atualizar o status no backend
            // Por exemplo, fazer uma requisição AJAX ou atualizar o estado local

            // Feedback visual
            const originalText = this.style.color;
            this.style.color = '#6be3a6';
            setTimeout(() => {
                this.style.color = originalText;
            }, 1000);
        });
    });

    /* ============================================
                SCROLL INDICATORS
       ============================================ */
    // Controle do indicador de scroll
    const board = document.querySelector('.board');
    if (board) {
        board.addEventListener('scroll', function () {
            if (this.scrollTop > 10) {
                this.classList.add('scrolled');
            } else {
                this.classList.remove('scrolled');
            }
        });
    }

/* ============================================
        VALIDAÇÃO DE FORMULARIO - NOVA TAREFA
    ============================================ */    

    document.getElementById('newTaskForm').addEventListener('submit', function (e) {
        e.preventDefault();
        createNewTask();
    });

    function createNewTask() {
        const formData = new FormData(document.getElementById('newTaskForm'));
        const taskData = {
            name: formData.get('taskName'),
            responsible: formData.get('responsible'),
            project: formData.get('projectName'),
            description: formData.get('description'),
            dueDate: formData.get('dueDate'),
            priority: formData.get('priority'),
            status: formData.get('status'),
            createdAt: new Date().toISOString()
        };

        // Aqui você pode implementar a lógica para salvar a tarefa
        console.log('Nova tarefa criada:', taskData);

        // Exemplo de feedback para o usuário
        alert('Tarefa criada com sucesso!');

        // Redirecionar para o dashboard
        window.location.href = 'dashboard.html';
    }

    function cancelTask() {
        if (confirm('Tem certeza que deseja cancelar? As alterações serão perdidas.')) {
            window.location.href = 'dashboard.html';
        }
    }

    // Definir data mínima como hoje
    document.getElementById('dueDate').min = new Date().toISOString().split('T')[0];
});



