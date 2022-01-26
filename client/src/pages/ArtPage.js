import { Box, CircularProgress, Divider, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ArtImage } from "../components/ArtImage";
import { ArtDetails } from "../components/ArtDetails";
import { ArtComments } from "../components/ArtComments";
import { useParams } from "react-router-dom";
import { FavoriteButton } from "../components/FavoriteButton";
import { useGET } from "../hooks/APIHooks";
import { ArtSuggestions } from "../components/ArtSuggestions";

const useStyles = makeStyles({
  grid: {
    margin: "10px 25px 30px 25px",
  },
  informationGrid: {
    padding: "25px",
  },
});

export const ArtPage = () => {
  const { id } = useParams();
  const classes = useStyles();
  const { data: art, loadingGET } = useGET("art", id);

  return (
    <>
      {loadingGET ? (
        <CircularProgress />
      ) : (
        <>
          <Grid
            container
            alignItems="stretch"
            justifyContent="space-around"
            className={classes.grid}
          >
            <Grid item xs={4}>
              <ArtImage picture={art.primaryImage} />
              <FavoriteButton />
            </Grid>
            <Grid item xs={8} className={classes.informationGrid}>
              <ArtDetails data={art} />
            </Grid>
          </Grid>
          <Divider />
          <Grid container>
            <Grid item xs={9}>
              <ArtComments />
            </Grid>
            <Grid item xs={3}>
              <ArtSuggestions />
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};
