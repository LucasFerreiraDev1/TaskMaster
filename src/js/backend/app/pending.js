import { Task } from '../models/models.js';
import { BancoLocalStorage } from '../models/BancoLocalStorage.js';

document.addEventListener('DOMContentLoaded', () => {
    const session = new BancoLocalStorage('Session');
    const email_session = session.getSession();

    let task = new Task();
    let allTasks = task.readTask();
    let board = document.getElementById('board');
    board.innerHTML = '';

    allTasks.map((task, index) => {
        console.log(task);
        if (task.status === 'pending' && task.createdBy === email_session[0].email) {
            board.innerHTML += 
            `
                <article class="task" id="task_${index}">
                    <div class="task-header">
                        <div class="title">${task.name_task}</div>
                    </div>

                    <div class="description">${task.description}</div>

                    <div class="meta">
                        <div class="meta-item">
                            <i class="fas fa-user"></i>
                            <span>${task.responsible}</span>
                        </div>
                        <div class="meta-item">
                            <i class="fas fa-calendar"></i>
                            <span>${task.date}</span>
                        </div>
                        <div class="meta-item">
                            <i class="fas fa-tag"></i>
                            <span>${task.name_project}</span>
                        </div>
                    </div>

                    <div class="footer-task">
                        <div class="labels">
                            <span class="label priority">${task.priority}</span>
                        </div>

                        <button class="show-options" aria-label="Mostrar opções">
                            <i class="fa-solid fa-chevron-down"></i>
                        </button>
                    </div>

                    <div class="options">
                        <div class="options-content">
                            <div class="status-section">
                                <label>Alterar Status:</label>
                                <select name="status" class="status-select pendente">
                                    <option value="pendente">🕒 Pendente</option>
                                    <option value="em_andamento">⏳ Em andamento</option>
                                    <option value="concluida">✅ Concluída</option>
                                </select>
                            </div>

                            <div class="action-buttons">
                                <button class="action-btn edit">
                                    <i class="fas fa-edit"></i>
                                    Editar
                                </button>
                                <button class="action-btn duplicate">
                                    <i class="fas fa-copy"></i>
                                    Duplicar
                                </button>
                                <button class="action-btn delete">
                                    <i class="fas fa-trash"></i>
                                    Excluir
                                </button>
                            </div>
                        </div>
                    </div>
                </article>

            `
        }
    });

    if(board.innerHTML === '') {
        board.innerHTML = '<h1>Nenhuma tarefa encontrada</h1>';
    }
});
