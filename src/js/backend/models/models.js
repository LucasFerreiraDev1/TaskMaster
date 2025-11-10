import { BancoLocalStorage } from "./BancoLocalStorage.js"
import { modalNotify, loading } from "../../frontend/utils.js";



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
            let session = new BancoLocalStorage('Session');
            let getSession = session.getSession();

            const sessionLogin = {
                email: this.email,
                status: true
            }

            getSession.push(sessionLogin)
            session.setSession(getSession);
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
        this.password = password
    }

    register() {

        let users = new BancoLocalStorage('Users');
        let allUsers = users.getLocalStorage();
    
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
export class Task {
    constructor(
        nameTask,
        responsible,
        nameProject, 
        description,
        date,
        priority,
        status,
        createDate
    ) {
        this.nameTask = nameTask,
        this.responsible = responsible,
        this.nameProject = nameProject,
        this.description = description,
        this.date = date, // Data de Vencimento
        this.priority = priority,
        this.status = status,
        this.createDate = createDate
    }


    createTask() {
        let tasks = new BancoLocalStorage('Tasks');
        let allTasks = tasks.getLocalStorage();

        const newTask = {
            name_task: this.nameTask,
            responsible: this.responsible,
            name_project: this.nameProject, 
            description: this.description,
            date: this.date,
            priority: this.priority,
            status: this.status,
            create_date: this.createDate
        }

        allTasks.push(newTask);
        tasks.setLocalStorage(allTasks);
    }
}

/* Criar script de destroy session e button logoff

Cria class de Task
Constructor:
    nameTask
    responsible
    nameProject
    description
    date
    priority
    status
    createDate

Funções do class Task: 
	createTask()
	getTasks()
	updateTask() 
	deleteTask()
*/