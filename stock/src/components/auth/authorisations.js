import axios from 'axios';
export function Authenticate(data,next) {
    if(typeof window !== "undefined"){
        localStorage.setItem('Token',JSON.stringify(data))
        next();
    };
}
export const signOut = (next) => {
    if(typeof window !== "undefined"){
        localStorage.removeItem('Token');
        next();
        axios.get('http://localhost:8000/SignOut')
        .then((res) => res.data)
        .catch(err => console.log(err));
    }
}
export const isAuthenticated = () => {
    if(typeof window == "undefined"){
        return false
    }
    if (localStorage.getItem('Token')){
        return JSON.stringify(localStorage.getItem('Token'))
    }else{
        return false
    }
}