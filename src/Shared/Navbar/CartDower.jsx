import * as React from "react";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Drawer from "@mui/joy/Drawer";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import Typography from "@mui/joy/Typography";
import ModalClose from "@mui/joy/ModalClose";
import { FaCartPlus } from "react-icons/fa";

export default function DrawerScrollable() {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <button onClick={() => setOpen(true)} className="btn btn-sm">
        <FaCartPlus />
        <div className="badge badge-secondary">+0</div>
      </button>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <ModalClose />
        <DialogTitle>Title</DialogTitle>
        <DialogContent>
          <List>
            {[...new Array(100)].map((_, index) => (
              <ListItem key={index}>
                <ListItemButton onClick={() => setOpen(false)}>
                  Item {index}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <Box
          sx={{
            display: "flex",
            gap: 1,
            p: 1.5,
            pb: 2,
            borderTop: "1px solid",
            borderColor: "divider",
          }}
        >
          <Avatar size="lg" />
          <div>
            <Typography level="title-md">Username</Typography>
            <Typography level="body-sm">joined 20 Jun 2023</Typography>
          </div>
        </Box>
      </Drawer>
    </React.Fragment>
  );
}
