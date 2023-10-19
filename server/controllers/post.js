import Post from "../models/Post.js";
import User from "../models/User.js";
/* CREATE POST */
export const createPost = async (req,res) => {
    try {

        const { userId, description, picturePath } = req.body;
        const user = await User.findById(userId);

        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: []
        })

        await newPost.save();

        const posts = await Post.find();    //retrieving all posts
        res.status(201).json(posts);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}
export const getFeedPosts = async (req,res) => {
    try {
        const posts = await Post.find();    //retrieving all posts
        res.status(200).json(posts);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}
export const getUserposts = async (req,res) => {
    try {

        
        const { userId } = req.params;     //req.params means id is embeded in route URl nd we are taking it
        console.log(userId)
        const posts = await Post.find({ userId });    //rtrieving all posts of a single user
        console.log(posts)

        res.status(200).json(posts);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

/* UPDATE */
export const likePost = async (req,res) => {
    try {
        const { id } = req.params;   //id of the epcific post
        const { userId } = req.body;  //id of the specific user 
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);  //checking if the specific post likes portion contains taht specfic user id
        if (isLiked) {
            post.likes.delete(userId);
            //deleting id if it alredy exists
        }
        else {
            post.likes.set(userId, true)
            //setting id if it not exist
        }

        const updatedPost = await Post.findByIdAndUpdate(   //udating the psot
            id,
            { likes: post.likes },
            {new:true}
        )
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

