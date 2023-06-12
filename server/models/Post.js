import mongoose from "mongoose" ;


const postSchema =  mongoose.Schema(
    {
        userId :{
            type : String,
            require: true ,
        },

        firstName:{
            type: String,
            require: true,
        },

        lastName:{
            type: String,
            require: true,
        },

        location: String,
        description: String,
        picturePath: String,
        userPicturePath: String,
        likes:{
            type: Map,
            of: Boolean
        },
        comments:{
            type: Array,
            default: [],
        }
    },
    { timestamps : true }
);

const Post = mongoose.model("post" , postSchema);

export default Post;