import jwt_decode from "jwt-decode";

const AuthService = {
    setToken : (jwtToken) =>{
        localStorage.setItem('logintoken', jwtToken);
    },
    getToken : () => {
        return localStorage.getItem('logintoken');
    },
    removeToken : () => {
        localStorage.removeItem('logintoken');
    },
    getUser : () => {
        const token = localStorage.getItem('logintoken');
        if (token) {
            const decodedToken = jwt_decode(token);
            console.log(decodedToken);
            return decodedToken;
        }
    }
}

export default AuthService;