import mongoose from "mongoose";
import { Schema } from "mongoose";

const PostSchema = new Schema({    
    
    userId :{
        type:String,
        required:true
    },
    
    firstName: {
        type: String,
        required: true,
        min: 2,
        max: 50
    },
    lastName: {
        type: String,
        required: true,
        min: 2,
        max: 50
    },
    
    location: String,
    description:String,
    picturePath:String,
    userPicturePath:String,
    likes:{
        type:Map,
        of:Boolean
    
    },
    comments:{
        type:Array,
        default:[]
    }
},
    { timestamps: true }    //will give automatically time of created,updated ...
);

const Post = mongoose.model("Post",PostSchema);
export default Post;