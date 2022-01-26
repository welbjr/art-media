import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { CommentInput } from "./CommentInput";
import { Comments } from "./Comments";

const useStyles = makeStyles({
  commentSection: {
    padding: "15px",
  },
});

export const ArtComments = () => {
  const classes = useStyles();
  return (
    <Grid container direction="column" className={classes.commentSection}>
      <Grid item>
        <CommentInput />
        <Grid item>
          <Comments />
        </Grid>
      </Grid>
    </Grid>
  );
};
