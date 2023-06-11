import bycrypt from "bycrypt" ;
import jwt from "jsonwebtoken" ;
import User from "../models/User.js" ;

/* Registro de Usuario*/

export const register = async( req , res ) => {

    try {
        
        const {
            fistName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = req.body ;


        const salt =await bycrypt.genSalt() ;
        const passwordHash = await bycrypt.hash(password , salt) ;
        
        const newUser = new User({ 

        })


    } catch (err) {
        
    }



}