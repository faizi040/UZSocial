import User from "../models/User.js";


//Read operation functions
export const getUser = async (req, res) => {
    try {

        const {id} = req.params;   //getting id embedded in req f
        const user = await User.findById(id);   //fetching user from its id
        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getUserFriends = async (req, res) => {
    try {
        const {id} = req.params;  f
        const user = await User.findById(id); 

        //Finding all friends of a user
        const friends = await Promise.all(
            user.friends.map((id)=> User.findById(id))
        );
        //Formatting friedns data into an object
        const formattedFriends =friends.map(({_id,firstName,lastName,occupation,location,picturePath})=>{
        return {_id,firstName,lastName,occupation,location,picturePath}
        }
        );
        res.status(200).json(formattedFriends);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//update operations functions
export const addRemoveFriend = async (req, res) => {
    try {

        const {id,friendId} = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        if(user.friends.includes(friendId)){
            // id friend is added Removing it
            user.friends = user.friends.filter((id)=> id !==friendId);   //removing that friend from use profilr
            friend.friends = friend.friends.filter((id)=> id !==id);    //removing user from that friend profile
        }
        else{
            user.friends.push(friendId);   //adding that friend to user profile
            friend.friends.push(id);     //adding thatuser to friend profile
        }

        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map((id)=> User.findById(id))
        );
        //Formatting friedns data into an object
        const formattedFriends =friends.map(({_id,firstName,lastName,occupation,location,picturePath})=>{
        return {_id,firstName,lastName,occupation,location,picturePath}
        }
        );
        res.status(200).json(formattedFriends);


    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}