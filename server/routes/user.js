import express from "express";
const router = express.Router();
import {getUser,getUserFriends,addRemoveFriend} from "../controllers/user.js";
import { verifyToken } from "../middleware/auth.js";

// Read routes

router.get('/:id',verifyToken,getUser);   //get user by id specify in the route
router.get('/:id/friends',verifyToken,getUserFriends)   //get user friends by id specify in the route

//update routes

router.patch('/:id/:friendId',verifyToken,addRemoveFriend); //need both user id and friend id to which you want to add or remove like facebook friends or insta followers

//Important:: PATCH is used to apply partial updates to a resource, meaning that only the fields that need to be changed are sent in the request body. PUT is used to replace the entire resource with a new representation, meaning that all the fields of the resource are sent in the request body, even if they are not modified

export default router;
