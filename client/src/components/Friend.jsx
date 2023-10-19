//Reperesent the layout of a single friend
import { Box, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

const Friend = ({friendId, name, subtitle, userPicturePath }) => {
  // upper lines ({friendId,name,subtitle,userPicturePath}) is simply props desrtucturing coming from componnet nothing else
  const navigate = useNavigate();
  //down color variables
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  // const isFriend = friends.map((friend) => friend._id === friendId);
  //upper line checking if the user and other person is friend or not by making that person id matched with user friends ids

 

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);  //this line will refresh the page making the component re-render
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
    </FlexBetween>
  );
};

export default Friend;