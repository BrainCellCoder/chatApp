import { Avatar, Stack, Typography } from "@mui/material";
import React from "react";
import {
  Face as FaceIcon,
  AlternateEmail as UserNameIcon,
  CalendarMonth as CalenderIcon,
} from "@mui/icons-material";
import moment from "moment";
import { transformImg } from "../../lib/features";
const Profile = ({ user }) => {
  console.log(user);
  return (
    <div>
      <Stack spacing={"2rem"} direction={"column"} alignItems={"center"}>
        <Avatar
          src={transformImg(user?.data?.avatar?.url)}
          sx={{
            width: 200,
            height: 200,
            objectFit: "contain",
            marginBottom: "1rem",
            border: "5px solid white",
          }}
        />
        <ProfileCard heading={"Bio"} text={user?.data?.bio} />
        <ProfileCard
          heading={"UserName"}
          text={user?.data?.username}
          Icon={<UserNameIcon />}
        />
        <ProfileCard
          heading={"Name"}
          text={user?.data?.name}
          Icon={<FaceIcon />}
        />
        <ProfileCard
          heading={"Joined"}
          text={moment(user?.data?.createdAt).fromNow()}
          Icon={<CalenderIcon />}
        />
      </Stack>
    </div>
  );
};

const ProfileCard = ({ text, Icon, heading }) => (
  <Stack
    direction={"row"}
    alignItems={"center"}
    spacing={"1rem"}
    color={"white"}
    textAlign={"center"}
  >
    {Icon && Icon}
    <Stack>
      <Typography variant="body1">{text}</Typography>
      <Typography color={"grey"} variant="caption">
        {heading}
      </Typography>
    </Stack>
  </Stack>
);

export default Profile;
