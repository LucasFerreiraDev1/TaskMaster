import { modalNotify } from "../../frontend/utils.js";

export class Users {
    constructor(name, email, password) {
        this.name = name,
        this.email = email,
        this.password = password
    }

    createUser() {
        let users = JSON.parse(localStorage.getItem('Users') || '[]');
        const user = {
            name: this.name,
            email: this.email,
            password: this.password
        }

        // Verifica se o E-mail existe dentro do localStorage
        const existingEmail = users.find(u => u.email === this.email);
        if (existingEmail) {
            console.log('Email já cadastrado');
            return;
        }

        users.push(user);
        localStorage.setItem('Users', JSON.stringify(users));

        modalNotify('Sucesso ao cadastrar!', 'Usuário cadastrado com sucesso', 'success');
    }
}