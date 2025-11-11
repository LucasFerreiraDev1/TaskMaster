import { modalNotify, loading } from "../../frontend/utils.js";
import { Task } from '../models/models.js';

document.addEventListener('DOMContentLoaded', () => {
    const taskName = document.querySelector('#taskName');
    const responsible = document.querySelector('#responsible');
    const projectName = document.querySelector('#projectName');
    const description = document.querySelector('#description');
    const dueDate = document.querySelector('#dueDate');
    const priority = document.querySelector('#priority');
    const allStatus = document.getElementsByName('status');
    const date = new Date()
    const createDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

    document.querySelector('#createTask').addEventListener('click', event => {
        event.preventDefault();

        const fields = [
            { element: taskName, label: "Nome da Tarefa" },
            { element: responsible, label: "Responsável" },
            { element: projectName, label: "Nome do Projeto" },
            { element: description, label: "Descrição" },
            { element: dueDate, label: "Data de Entrega" },
            { element: priority, label: "Prioridade" }
        ];

        for (let field of fields) {
            if (field.element.value.trim() === "") {
                modalNotify('Algo deu errado!', `Preencha o campo ${field.label}`, 'error');
                field.element.style.borderColor = 'red';
                return;
            }
        }

        let status = '';
        for (let i = 0; i < allStatus.length; i++) {
            if (allStatus[i].checked) {
                status = allStatus[i].value;
                break;
            }
        }

        if (status === '') {
            modalNotify('Algo deu errado!', 'Selecione um status para a tarefa', 'error');
            return;
        }

        let task = new Task(
            taskName.value,
            responsible.value,
            projectName.value,
            description.value,
            dueDate.value,
            priority.value,
            status,
            createDate
        );

        task.createTask()

        loading('../../assets/loading.gif','Criando nova tarefa...');
    });

    document.querySelector('#cancelTask').addEventListener('click', () => {
        location.href = './pending.html';
    });

});