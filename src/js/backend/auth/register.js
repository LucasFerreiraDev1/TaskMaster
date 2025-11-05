import { Register } from "../models/models.js";
import { modalNotify, validateEmail } from "../../frontend/utils.js";

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
    
    let newUser = new Register(
        fieldName.value,
        fieldEmail.value.toLowerCase(),
        fieldPassword.value
    );
    newUser.register();

});