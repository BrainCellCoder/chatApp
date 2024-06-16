import { Avatar, AvatarGroup, Box, Stack } from "@mui/material";
import React from "react";
import { transformImg } from "../../lib/features";

//Todo Transform
const AvatarCard = ({ avatar = [], max = 4 }) => {
  return (
    <Stack direction={"row"} spacing={0.5}>
      <AvatarGroup max={max}>
        <Box width={"5rem"} hieght={"3rem"}>
          {avatar.map((i, index) => (
            <Avatar
              key={Math.random() * 100}
              src={transformImg(i)}
              alt={`Avatar ${index}`}
              sx={{
                width: "3rem",
                height: "3rem",
                position: "absolute",
                left: {
                  xs: `${0.5 + index}rem`,
                  sm: `${index}rem`,
                },
                top: "10px",
              }}
            />
          ))}
        </Box>
      </AvatarGroup>
    </Stack>
  );
};

export default AvatarCard;
