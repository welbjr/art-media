import { Delete } from "@mui/icons-material";
import {
  Avatar,
  IconButton,
  Typography,
  CircularProgress,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { makeStyles } from "@mui/styles";
import stringAvatar from "../utils/stringAvatar";
import { useGET, useDELETE } from "../hooks/APIHooks";
import { useParams } from "react-router-dom";

const useStyles = makeStyles({
  commentsAvatar: {
    marginRight: "15px",
    marginTop: "7px",
  },
  comments: {
    marginLeft: "15px",
    marginBottom: "15px",
    display: "flex",
    padding: "7px",
    paddingRight: "15px",
    "&:hover": {
      backgroundColor: grey[100],
      opacity: [0.9, 0.8, 0.7],
    },
  },
  comment: {
    wordWrap: "anywhere",
  },
  userName: {
    marginBottom: "7px !important",
  },
});

export const Comments = () => {
  const { id } = useParams();
  const classes = useStyles();

  const { data, setData, loadingGET } = useGET("artComments", id);
  const { funcDELETE: deleteComment, isDeleted } = useDELETE("comments");

  const userLocalStorage = JSON.parse(localStorage.getItem("authData"));
  const userName = userLocalStorage ? userLocalStorage["name"] : undefined;

  const deleteCommentHandler = (comment) => {
    deleteComment({ id: comment.id });
  };

  const renderComments = (comments) => {
    return comments.map((comment) => {
      return (
        <div className={classes.comments} key={comment.content}>
          <Avatar
            className={classes.commentsAvatar}
            {...stringAvatar(comment.User.name)}
          />
          <div>
            <Typography paragraph variant="h6" className={classes.userName}>
              <b>{comment.User.name}</b>
            </Typography>
            <Typography paragraph variant="h5" className={classes.comment}>
              {comment.content}
            </Typography>
          </div>
          {userName === comment.User.name && (
            <IconButton
              sx={{ marginLeft: "auto" }}
              disableRipple={true}
              onClick={() => deleteCommentHandler(comment)}
            >
              <Delete />
            </IconButton>
          )}
        </div>
      );
    });
  };

  return (
    <>
      {loadingGET ? (
        <CircularProgress />
      ) : (
        <>
          {data.length === 0 ? (
            <Typography align="center" variant="h6">
              Be the first one to comment on this art!
            </Typography>
          ) : (
            <>{renderComments(data.comments)}</>
          )}
        </>
      )}
    </>
  );
};
