import {Router} from 'express';
import { authToken, passportCall, authorization } from '../dirname.js';
import passport from 'passport';


const router = Router();



router.get("/login",(req, res)=>{
    res.render('login')
});
router.get("/register",(req, res)=>{
    res.render('register')
});

// Endpoint que renderiza la vista del perfil de usuario
router.get("/",
    // authToken, //-> Usando Authorization Bearer Token
    // passport.authenticate('jwt', { session: false }), //-> Usando JWT por Cookie
    passportCall('jwt'), //-> Usando passport-JWT por Cookie mediante customCall
    
    (req, res) => {
        res.render("profile", {
            user: req.user
        });
    }
);



router.get("/:userId", authToken, async (req, res) => {
    const userId = req.params.userId; // Cambiado de "useId" a "userId"
    
    try {
        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found with ID: " + userId });
        }

        res.json(user);
    } catch (error) {
        console.error("Error consultando el usuario con ID: " + userId);
        res.status(500).json({ error: "Internal Server Error" });
    }
});





export default router;