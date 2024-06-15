import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import React, { memo } from "react";
import { sampleNotifications } from "../../constants/sampleDate";

const Notifications = () => {
  const friendRequestHandler = ({ _id, accept }) => {};
  return (
    <Dialog open>
      <Stack p={{ xs: "1rem", sm: "2rem" }} maxWidth={"30rem"}>
        <DialogTitle>Notifications</DialogTitle>
        {sampleNotifications.length > 0 ? (
          sampleNotifications.map((noti) => (
            <NotificationItem
              sender={noti.sender}
              _id={noti._id}
              handler={friendRequestHandler}
              key={noti._id}
            />
          ))
        ) : (
          <Typography textAlign={"center"}>0 notification</Typography>
        )}
      </Stack>
    </Dialog>
  );
};

const NotificationItem = memo(({ sender, _id, handler }) => {
  const { name, avatar } = sender;
  return (
    <ListItem>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        width={"100%"}
      >
        <Avatar src={avatar} />
        <Typography
          variant="body1"
          sx={{
            flexGrow: 1,
            display: "-webkit-box",
            WebkitLineClamp: "vertical",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100%",
          }}
        >
          {/* {`${name} sent you a friend request.`} */}
          {name}
        </Typography>
        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
        >
          <Button
            color="success"
            onClick={() => handler({ _id, accept: true })}
            variant="outlined"
          >
            Accept
          </Button>
          <Button color="error" onClick={() => handler({ _id, accept: false })}>
            Reject
          </Button>
        </Stack>
      </Stack>
    </ListItem>
  );
});

export default Notifications;
