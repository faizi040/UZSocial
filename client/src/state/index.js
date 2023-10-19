//File to setUp redux toolit steup

import { createSlice } from "@reduxjs/toolkit";
const initialState = {    //initial state onject contains initial values of all states
    mode: "light",
    user: null,
    token: null,
    posts: []

}

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {   //reducers are siply functions that modfy your state according to user need

        //all reducers

        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";  //using ternary operator
        },
        setLogin: (state, action) => {  //when we are logging in we are saving user and token in state
            state.user = action.payload.user;  //action.payload.user are simply reducer function parameters
            state.token = action.payload.token;
        },
        setLogout: (state) => {   //when we logout we again set user and token state to null
            state.user = null;
            state.token = null;
        },
        // setFriends: (state, action) => {
        //     if (state.user) {
        //         state.user.friends = action.payload.friends;    //need to understand
        //     } else {
        //         console.error("User friends non-existance :(")
        //     }

        // },
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },
        setPost: (state, action) => {
            const updatedposts = state.posts.map((post) => {
                //if post id matches with the id given we will return updated post 
                if (post._id === action.payload.post._id) {
                    return action.payload.post;
                }
                 //otherwise return original post
                 return post;

                
            })
            state.posts = updatedposts;
        }


    }
});
export const { setMode, setLogin, setLogout, setPosts, setPost } = authSlice.actions;
export default authSlice.reducer;