import { modalNotify, loading } from "../../frontend/utils.js";

export class Users {
    constructor(name, email, password) {
        this.name = name,
        this.email = email,
        this.password = password
    }

    registerUser() {
        let users = JSON.parse(localStorage.getItem('Users') || '[]');
        const user = {
            name: this.name,
            email: this.email,
            password: this.password
        }

        // Verifica se o E-mail existe dentro do localStorage
        const existingEmail = users.find(u => u.email === this.email);
        if (existingEmail) {
            modalNotify('Algo deu errado!', 'E-mail já cadastrado', 'error');
            return;
        }

        users.push(user);
        localStorage.setItem('Users', JSON.stringify(users));

        loading('../../assets/loading.gif','Cadastrando usuário...');
        modalNotify('Sucesso ao cadastrar!', 'Usuário cadastrado com sucesso', 'success');

        setTimeout(() => { location.href = './login.html' }, 2500);
    }
}