import { Users } from "../DB/Users.js";
import { modalNotify } from "../../frontend/utils.js";

document.querySelector('#btnRegister').addEventListener('click', (event) => {
    event.preventDefault();

    let fieldName = document.querySelector("#name");
    let fieldEmail = document.querySelector("#email");
    let fieldPassword = document.querySelector("#password");
    let fieldConfirmPassword = document.querySelector("#confirmPassword");

    const fields = [
        {element: fieldName, label: 'Nome'},
        {element: fieldEmail, label: 'E-mail'},
        {element: fieldPassword, label: 'Senha'},
        {element: fieldConfirmPassword, label: 'Confirmar Senha'}
    ];
    
    for(let field of fields) {
        if(field.element.value.trim() === '') {
            modalNotify('Algo deu errado!', `Preencha o campo ${field.label}`, 'error');
            field.element.style.borderColor = 'red';
            return;
        }
    }

    if(!validateEmail(fieldEmail.value.toLowerCase())) {
        modalNotify('Algo deu errado!', 'E-mail inválido', 'error');
        fieldEmail.style.borderColor = 'red';
        return;
    }

    if(fieldPassword.value !== fieldConfirmPassword.value) {
        modalNotify('Algo deu errado!', 'Senhas não conferem', 'error');
        fieldPassword.style.borderColor = 'red';
        fieldConfirmPassword.style.borderColor = 'red';
        return;
    }
    
    let user = new Users(
        fieldName.value,
        fieldEmail.value.toLowerCase(),
        fieldPassword.value
    );
    user.registerUser();

    clearFields();
});

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function clearFields() {
    document.querySelector("#name").value = '';
    document.querySelector("#email").value = '';
    document.querySelector("#password").value = '';
    document.querySelector("#confirmPassword").value = '';
}