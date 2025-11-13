import { BancoLocalStorage } from "./BancoLocalStorage.js"
import { modalNotify, loading } from "../../frontend/utils.js";

export class Login {

    constructor(email, password) {
        this.email = email,
        this.password = password,
        this.users = new BancoLocalStorage('Users'),
        this.allUsers = this.users.getLocalStorage(),
        this.session = new BancoLocalStorage('Session'),
        this.getSession = this.session.getLocalStorage()
    }
    
    login() {

        const validateLogin = this.allUsers.find(user => user.email === this.email);

        if(!validateLogin) {
            modalNotify('Algo deu errado!', 'Usuário não encontrado', 'error');
            return;
        }

        if(validateLogin.password !== this.password) {
            modalNotify('Algo deu errado!', 'Senha incorreta', 'error');
            return;
        } else {

            const sessionLogin = {
                email: this.email,
                status: true
            }

            this.getSession.push(sessionLogin)
            this.session.setSession(this.getSession);
            loading('../../assets/loading.gif','Efetuando login...');
            setTimeout(() => { location.href = '../app/pending.html' }, 2500);
            return;
        }
    }
}

export class Register {

    constructor(name, email, password) {
        this.name = name,
        this.email = email,
        this.password = password,
        this.users = new BancoLocalStorage('Users'),
        this.allUsers = this.users.getLocalStorage()
    }

    register() {

        const newUser = {
            name: this.name,
            email: this.email,
            password: this.password
        }

        const existingEmail = this.allUsers.find(user => user.email === this.email);
        if (existingEmail) {
            modalNotify('Algo deu errado!', 'E-mail já cadastrado', 'error');
            return;
        }

        this.allUsers.push(newUser);
        this.users.setLocalStorage(this.allUsers);

        loading('../../assets/loading.gif','Cadastrando usuário...');
        setTimeout(() => { location.href = './login.html' }, 2500);
    }   
}
export class Task {
    constructor(
        nameTask = '',
        responsible = '',
        nameProject = '', 
        description = '',
        date = '',
        priority = '',
        status = '',
        createDate = ''
    ) {
        this.nameTask = nameTask,
        this.responsible = responsible,
        this.nameProject = nameProject,
        this.description = description,
        this.date = date, // Data de Vencimento
        this.priority = priority,
        this.status = status,
        this.createDate = createDate,
        this.tasks = new BancoLocalStorage('Tasks'),
        this.allTasks = this.tasks.getLocalStorage(),
        this.session = new BancoLocalStorage('Session'),
        this.getSession = this.session.getLocalStorage()
    }


    createTask() {

        const newTask = {
            name_task: this.nameTask,
            createdBy: this.getSession[0].email,
            responsible: this.responsible,
            name_project: this.nameProject, 
            description: this.description,
            date: this.date,
            priority: this.priority,
            status: this.status,
            create_date: this.createDate
        }

        this.allTasks.push(newTask);
        this.tasks.setLocalStorage(this.allTasks);
        modalNotify('Tudo certo!', 'Tarefa criada com sucesso!', 'success');
    }

    readTask() {
        return this.allTasks;
    }

    updateTask() {

    }

    deleteTask() {

    }
}