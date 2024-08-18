import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

// Custom styles for Dialog
const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    backgroundColor: "#f7f7f7", // Dialog background color
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
  },
}));

// Custom styles for DialogTitle
const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  backgroundColor: "#3f51b5", // Title background color
  color: "#fff", // Title text color
  padding: theme.spacing(2),
  fontSize : "25px",
  textAlign:"center"
}));

// Custom styles for DialogContentText
const StyledDialogContentText = styled(DialogContentText)(({ theme }) => ({
  color: "#333", // Content text color
  fontSize: "1rem",
  paddingBottom: theme.spacing(2),
}));

// Custom styles for Buttons
const StyledButton = styled(Button)(({ theme }) => ({
  color: "#fff", // Button text color
  backgroundColor: "#3f51b5", // Button background color
  "&:hover": {
    backgroundColor: "#303f9f", // Button hover color
  },
}));

const LogoutDialog = ({ open, onClose }) => {
  const handleYes = () => {
    onClose(true); // Pass true to indicate that the user confirmed the logout
  };

  const handleCancel = () => {
    onClose(false); // Pass false to indicate that the user canceled the logout
  };

  return (
    <StyledDialog
      open={open}
      onClose={handleCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <StyledDialogTitle id="alert-dialog-title">{"LOGOUT"}</StyledDialogTitle>
      <DialogContent>
        <StyledDialogContentText id="alert-dialog-description">
          Are you sure you want to logout?
        </StyledDialogContentText>
      </DialogContent>
      <DialogActions>
        <StyledButton onClick={handleCancel} color="primary">
          Cancel
        </StyledButton>
        <StyledButton onClick={handleYes} color="primary" autoFocus>
          Yes
        </StyledButton>
      </DialogActions>
    </StyledDialog>
  );
};

export default LogoutDialog;
