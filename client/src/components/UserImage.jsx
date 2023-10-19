import { Box } from "@mui/material";
const UserImage = ({ image, size = "60px" }) => {
    return (
        <Box width={size} height={size}>
            <img
            
                style={{ objectFit: "cover", borderRadius: "50%" }}
                height={size}
                width={size}
                alt="user"
                src={`${import.meta.env.VITE_HOST}/assets/${image}`}   //path of assests folder and plus image name
            />
        </Box>
    );
};
export default UserImage;