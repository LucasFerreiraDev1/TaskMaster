import  { BancoLocalStorage } from "./models/BancoLocalStorage.js";
const session = new BancoLocalStorage('Session');

export function closeSession() {
    session.deleteSession();
    location.href = '../auth/login.html';
}

