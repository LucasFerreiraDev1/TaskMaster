import { modalNotify } from "../../frontend/utils.js";

document.addEventListener('DOMContentLoaded', () => {
    const taskName = document.querySelector('#taskName');
    const responsible = document.querySelector('#responsible');
    const projectName = document.querySelector('#projectName');
    const description = document.querySelector('#description');
    const dueDate = document.querySelector('#dueDate');
    const priority = document.querySelector('#priority');
    const allStatus = document.getElementsByName('status');


    document.querySelector('#createTask').addEventListener('click', event => 
    {
        event.preventDefault();

        let status = '';
        for(let i = 0; i < allStatus.length; i++) 
        {
            if (allStatus[i].checked) 
            {
                status = allStatus[i].value;
            }
        }

        const fields = 
        [
            { element: taskName, label: "Nome da Tarefa" },
            { element: responsible, label: "Responsável" },
            { element: projectName, label: "Nome do Projeto" },
            { element: description, label: "Descrição" },
            { element: dueDate, label: "Data de Entrega" },
            { element: priority, label: "Prioridade" },
            { element: status, label: "Status"}
        ];

        for(let field of fields) 
        {
            if(field.element.value.trim() === "")
            {
                modalNotify('Algo deu errado!', `Preencha o campo ${field.label}`, 'error');
                field.element.style.borderColor = 'red';
                return false;
            }
        }

    });
    
    document.querySelector('#cancelTask').addEventListener('click', () =>
    {
        location.href = './pending.html';
    });

});