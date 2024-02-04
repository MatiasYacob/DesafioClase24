import CustomRouter from "./custom.router.js";
import UserService from '../../services/db/users.service.js';
import {createHash, isValidPassword,generateJWToken} from "../../dirname.js";




export default class UsersExtendRouter extends CustomRouter {
    init(){
        const userService = new UserService();

        this.get('/',(req, res)=>{
            res.send('hola a todos')
        })
    }
}