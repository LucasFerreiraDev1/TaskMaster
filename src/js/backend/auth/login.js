import { Login } from "../models/models.js";
import { modalNotify, validateEmail } from "../../frontend/utils.js";

document.querySelector("#btnLogin").addEventListener('click', (event) => {
    event.preventDefault();

    let fieldEmail = document.querySelector("#email");
    let fieldPassword = document.querySelector("#password");

    const fields = [
        { element: fieldEmail, label: 'E-mail' },
        { element: fieldPassword, label: 'Senha'}
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

    let newLogin = new Login(fieldEmail.value.toLowerCase(), fieldPassword.value);
    newLogin.login();

});

