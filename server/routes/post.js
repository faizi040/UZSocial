import express from "express";
import {getFeedPosts,getUserposts,likePost}   from '../controllers/post.js';
import { verifyToken } from "../middleware/auth.js";
const router = express.Router();

/* READ */
router.get('/',verifyToken,getFeedPosts);
router.get('/:userId/posts',verifyToken,getUserposts);

/* UPDATE */
router.patch('/:id/like',verifyToken,likePost);



export default router;