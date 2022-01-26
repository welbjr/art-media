import { Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import AppBar from "../components/AppBar";

const useStyles = makeStyles({
  paper: {
    display: "block",
    margin: "auto",
    padding: "15px",
    paddingBottom: "25vh",
    width: "98%",
  },
});

export const Layout = ({ children }) => {
  const classes = useStyles();
  return (
    <>
      <AppBar />
      <Paper elevation={6} className={classes.paper}>
        {children}
      </Paper>
    </>
  );
};
