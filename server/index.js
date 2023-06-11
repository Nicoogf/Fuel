import express from "express" ;
import bodyParser from "body-parser" ;
import mongoose from "mongoose" ;
import cors from "cors" ;
import dotenv from "dotenv" ;
import multer from "multer" ;
import helmet from "helmet" ;
import morgan from "morgan" ;
import path from "path" ;
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js" ;
import userRouter  from "./routes/users.js"
import { register } from "./controllers/auth.js" ;


/* Configuracion */

const __filename = fileURLToPath(import.meta.url) ; // Ubicacion completa del Archivo
const __dirname = path.dirname(__filename) ; // Ruta de donde esta Guardado el archivo

dotenv.config() ;
const app = express() ;
app.use(express.json())
app.use(helmet()) ;
app.use(helmet.crossOriginResourcePolicy( {policy : "cross-origin"} )) ;
app.use(morgan("common")) ;
app.use(bodyParser.json( {limit: "30mb" , extended : true} )) ;
app.use(bodyParser.urlencoded({limit : "30mb" , extended : true})) ; 
app.use(cors()) ;
app.use("/assets" , express.static(path.join(__dirname , "public/assets"))) ;

/* Almacenamiento */

const storage = multer.diskStorage({
    destination: function ( req , file , cb){
        cb(null , "public/assets");
    },
    filename: function (req , file , cb){
        cb( null , file.originalname) ;
    }
})


const upload = multer({storage}) ; 

/*Rutas con Archivos */

app.post( "/auth/register" , upload.single("picture")  , register );

/*Rutas*/

app.use("/auth" , authRoutes) ;
app.use("/users" , userRouter) ;


/* Mongoose DB Configuracion */

const PORT = process.env.PORT || 6001 ;
    mongoose.connect (process.env.MONGO_URL , {
        useNewUrlParser : true,
        useUnifiedTopology : true,
    }). then( ()=>{
        app.listen( PORT , ()=> console.log(`Servidor corriendo en puerto ${PORT}`)) ;
    }).catch((error)=>console.log(`El error ${error} no dejo iniciar el proyecto `))