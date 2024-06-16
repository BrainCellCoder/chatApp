import { Menu } from "@mui/material";
import React from "react";

const FileMenu = ({ anchorE1 }) => {
  return (
    <Menu anchorEl={anchorE1} open={false}>
      <div style={{ width: "10rem" }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit repellat
        labore et vitae suscipit totam numquam ducimus dolorem deleniti, ad,
        corporis id perspiciatis eligendi itaque quidem hic sunt. Veniam,
        dolorum.
      </div>
    </Menu>
  );
};

export default FileMenu;
