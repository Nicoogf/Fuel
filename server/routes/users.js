import express, { application } from "express" ;
import{
    getUsers,
    getUserFiends,
    addRemovedFriends
} from "../controllers/users.js" ;
import { verifyToken } from "../middleware/auth.js";

const router = express.Router() ;


/*Read*/

router.get("/:id" , verifyToken , getUsers ) ;
router.get("/:id/friend" , verifyToken , getUserFiends ) ;

/*Update*/

router.patch("/:id/:friendId" , verifyToken , addRemovedFriends ) ;

export default router ;