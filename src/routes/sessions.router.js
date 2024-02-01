import { Router } from "express";
import userModel from "../dao/models/user.model.js";
import { createHash, generateJWToken, isValidPassword } from "../dirname.js";
import passport from "passport";


const router = Router();
//Passport GitHub
router.get('/github',passport.authenticate("github",{scope:['user:email']}),
async (req, res)=>{
    {}
})

router.get("/githubcallback", passport.authenticate('github',{failureRedirect:'/github/error'}),
    async(req, res)=>{
        const user = req.user;
        req.session.user={
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            age: user.age,
            role: user.role,
        };
        res.redirect("/users")
    }
)




//Passport local

//Register

//Register

router.post('/register', passport.authenticate('register', {
    failureRedirect: "/fail-register",
}), async (req, res) => {
    console.log("Registrando usuario:");

    // Puedes manejar la respuesta aquí y decidir si redirigir o enviar otra respuesta.
    res.status(201).send("Registro exitoso");
});









//LogIn
router.post('/login', passport.authenticate('login', {
    failureRedirect: "api/session/fail-login"
}),
    async (req, res) => {

    const user = req.user;


    // req.session.user = {
    //     name: `${user.first_name} ${user.last_name}`,
    //     email: user.email,
    //     age: user.age,
    //     role: user.role,
    // }

//Usando JWT

const access_token = generateJWToken(user)
console.log(access_token);

    res.send({ access_token: access_token });

})


//Logout
router.post('/logout', (req, res) => {
    // Elimina la sesión del usuario
    req.session.destroy((err) => {
        if (err) {
            console.error("Error al desloguear:", err);
            return res.status(500).send({ status: "error", message: "Error al desloguear" });
        }
        res.send({ status: "success", message: "Sesión cerrada exitosamente" });
    });
});

//error 
 router.get("/fail-register", (req, res)=>{
    res.status(401).send({error:"fallo el registro"});
 });
 router.get("/fail-login", (req, res)=>{
    res.status(401).send({error:"fallo el logueo"});
 });
 
  


export default router;