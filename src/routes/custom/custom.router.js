import { Router } from "express";


export default class CustomRouter{
    constructor(){
        this.router = Router()
        this.init();
    }
    getRouter(){
        return this.router;
    }

    init() { }//Esto se usa para las clases heredadas.

    get(path, ...callbacks){
        console.log("Entrando por Get a custom Router con path:"+ path);
        this.router.get(path, this.applyCallbaks(callbacks));
    }

    applyCallbaks(callbacks){
        return callbacks.map((callback)=> async(...params)=>{
            try {
                await callback.apply(this, params)

                
            } catch (error) {
                console.error(error);
                //params [1] hace referencia al res
                params[1].status(500).send(error);
            }
        })
    }


}

