import express, { application } from "express" ;
import{
    getUser,
    getUserFiends,
    addRemovedFriends
} from "../controllers/users.js" ;
import { verifyToken } from "../middleware/auth.js";

const router = express.Router() ;


/*Read*/

router.get("/:id" , verifyToken , getUser ) ;
router.get("/:id/friend" , verifyToken , getUserFiends ) ;

/*Update*/

router.patch("/:id/:friendId" , verifyToken , addRemovedFriends ) ;

export default router ;