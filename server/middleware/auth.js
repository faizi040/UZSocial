import Jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
    try {
        let token = req.header("Authorization");
        if (!token) {
            res.status(403).json({ message: "Access Denied!" });
        }

        if (token.startsWith("Bearer")) {
            //we wiil set token to start with Bearer through fornt-end
            token = token.slice(7, token.length).trimLeft();
            //in the upper line we are grabing the actual token by removing bearer word from ts start along eith white space(7)

            const verified = Jwt.verify(token,process.env.JWT_SECRET);   //here verfied contain object  that specific user id
            req.user = verified;    // altering request data---need to understand this line
            next();   //next means call the newxt middleware/function
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}