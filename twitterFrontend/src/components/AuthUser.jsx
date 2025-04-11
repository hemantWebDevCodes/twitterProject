import http from "../http";

const AuthUser = async() => {
     const response = await http.get('/getUser');
    console.log(response);
}


export default AuthUser
