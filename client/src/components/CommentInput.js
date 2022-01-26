import { Send } from "@mui/icons-material";
import { TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { usePOST } from "../hooks/APIHooks";

const useStyles = makeStyles({
  commentInput: {
    display: "flex",
    margin: "15px 15px 30px 15px",
  },
});

export const CommentInput = () => {
  const classes = useStyles();
  const [inputText, setInputText] = useState("");
  const { isPosted, loadingPOST, errorPOST, funcPOST } = usePOST("comments");
  const { id: artId } = useParams();

  const userLocalStorage = JSON.parse(localStorage.getItem("authData"));
  const userToken =
    userLocalStorage === null ? null : userLocalStorage["token"];

  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  const handleClick = () => {
    funcPOST({ artId, userToken, content: inputText });
  };

  return (
    <div className={classes.commentInput}>
      <TextField
        fullWidth
        id="comment"
        color="primary"
        focused
        onChange={handleChange}
      />
      <LoadingButton
        color="primary"
        aria-label="upload picture"
        component="span"
        loading={loadingPOST}
        onClick={handleClick}
      >
        <Send />
      </LoadingButton>
    </div>
  );
};
