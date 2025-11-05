import { BancoLocalStorage } from "./BancoLocalStorage.js"
import { modalNotify, loading } from "../../frontend/utils.js";

let users = new BancoLocalStorage('Users');
let allUsers = users.getLocalStorage();

export class Login {

    constructor(email, password) {
        this.email = email,
        this.password = password
    }
    
    login() {
        const validateLogin = allUsers.find(user => user.email === this.email);

        if(!validateLogin) {
            modalNotify('Algo deu errado!', 'Usuário não encontrado', 'error');
            return;
        }

        if(validateLogin.password !== this.password) {
            modalNotify('Algo deu errado!', 'Senha incorreta', 'error');
            return;
        } else {
            loading('../../assets/loading.gif','Efetuando login...');
            setTimeout(() => { location.href = '../app/pending.html' }, 2500);
            return
        }
    }
}

export class Register {

    constructor(name, email, password) {
        this.name = name,
        this.email = email,
        this.password = password
    }

    register() {
        
        const newUser = {
            name: this.name,
            email: this.email,
            password: this.password
        }

        const existingEmail = allUsers.find(user => user.email === this.email);
        if (existingEmail) {
            modalNotify('Algo deu errado!', 'E-mail já cadastrado', 'error');
            return;
        }

        allUsers.push(newUser);
        users.setLocalStorage(allUsers);

        loading('../../assets/loading.gif','Cadastrando usuário...');
        setTimeout(() => { location.href = './login.html' }, 2500);
    }   
}