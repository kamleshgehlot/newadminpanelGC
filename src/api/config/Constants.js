// export const API_URL = 'http://appoint.a1abilities.co.nz'; // Config[KEY].API_URL;
// export const AUTH_URL = 'http://appoint.a1abilities.co.nz'; // Config[KEY].AUTH_URL;
// export const API_CONSUMER = 'http://appoint.a1abilities.co.nz'; // Config[KEY].API_URL;

export const API_URL = 'http://localhost:5001'; // Config[KEY].API_URL;
export const AUTH_URL = 'http://localhost:5001'; // Config[KEY].AUTH_URL;
export const API_CONSUMER = 'http://localhost:5001'; // Config[KEY].API_URL;
export const WEB_URL = 'http://localhost:3000'; 


export const APP_TOKEN = {
    set: ({id, username, name, token, account_id}) => {
        sessionStorage.setItem('id', id);
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('username', username);
        sessionStorage.setItem('name', name);
        sessionStorage.setItem('account_id', account_id);
    },
    get: () => ({
        token: sessionStorage.getItem('token'),
        account_id: sessionStorage.getItem('account_id'),
        token: sessionStorage.getItem('token'),
        username : sessionStorage.getItem('username'),
        name : sessionStorage.getItem('name'),
    }),
    remove: () => {
        sessionStorage.clear();
    },
    get notEmpty() {
        const cond1 = this.get().token !== null;
        const cond2 = this.get().token !== '';
        return cond1 && cond2;
    }
}