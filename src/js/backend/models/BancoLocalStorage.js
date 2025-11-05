
export class BancoLocalStorage {
    
    constructor(key) {
        this.key = key
    }

    getLocalStorage() {
        return JSON.parse(localStorage.getItem(this.key) || '[]');
    }

    setLocalStorage(value) {
        localStorage.setItem(this.key, JSON.stringify(value));
    }
    
}