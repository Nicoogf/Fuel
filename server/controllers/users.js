import User from "../models/User" ; 


/* Read */

export const getUser = async( req , res ) =>{

    try {
        
        const { id } = req.params;
        const user = await User.findById(id) ;
        res.status(200).json(user);

    } catch (err) {
        res.status(404).json( {message : err.message})
    }
}

export const getUserFiends = async ( req , res ) => {

    try {

        const { id } = req.params;
        const user = await User.findById(id) ;

        const friend = await Promise.all(
        user.friend.map( (id)=> User.findById(id))
        );
        const formattedFriends = friend.map(
           ({ _id, firstName, lastName, ocupattion , location , picturePath }) =>{
            return { _id, firstName, lastName, ocupattion , location , picturePath };

           }
         );

         res.status(200).json(formattedFriends) ; 

    } catch (err) {

         res.status(404).json( {message : err.message})

    }
        
}

/* Update */ 
export const addRemovedFriends = async ( req , res ) =>{
    try {
        
        const {id , friendId} = req.params ;
        const user = await User.findById(id) ;
        const friend = await User.findById(friendId) ;
        
        if(user.friends.includes(friendId)){
            user.friend = user.friends.filter( (id)=> id !== friendId) ;
            addRemovedFriends.friends = friend.friends.filter( (id)=> id !== id) ;
        }else{
            user.friends.push(friendId);
            friend.friends.push(id) ;
        }

        await user.save() ;
        await friend.save() ;

        const friends = await Promise.all(
            user.friends.map( (id)=> User.findById(id))
            );
            const formattedFriends = friends.map(
               ({ _id, firstName, lastName, ocupattion , location , picturePath }) =>{
                return { _id, firstName, lastName, ocupattion , location , picturePath };
    
               }
             );

             res.status(200).json(formattedFriends)
    


    } catch (err) {
        res.status(404).json( {message : err.message})
    }

}