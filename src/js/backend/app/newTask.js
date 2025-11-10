
document.addEventListener('DOMContentLoaded', () => {
    const taskName = document.querySelector('#taskName');
    const responsible = document.querySelector('#responsible');
    const projectName = document.querySelector('#projectName');
    const description = document.querySelector('#description');
    const dueDate = document.querySelector('#dueDate');
    const priority = document.querySelector('#priority');
    const allStatus = document.getElementsByName('status');


    document.querySelector('#createTask').addEventListener('click', event => {
        event.preventDefault();

        const status = '';
        for(let i = 0; i <= allStatus.length; i++) {
            if (allStatus[i].checked) {
                status = allStatus[i].value;
            }
        }
        
    });
    
    document.querySelector('#cancelTask').addEventListener('click', () => {
        location.href = './pending.html';
    });

});