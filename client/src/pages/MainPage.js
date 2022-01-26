import { Divider, Grid, Typography, CircularProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ArtCard } from "../components/ArtCard";
import { useGET } from "../hooks/APIHooks";

const useStyles = makeStyles({
  cards: {
    padding: "10px",
  },
});

export const MainPage = () => {
  const classes = useStyles();
  const { data: dataDaily, loadingGET: loadingDaily } = useGET("daily");
  const { data: dataPopular, loadingGET: loadingPopular } = useGET("arts");

  const renderCards = (arts) => {
    return arts.map((art) => {
      return (
        <Grid item key={art.title}>
          <ArtCard
            primaryImageSmall={art.primaryImageSmall}
            objectName={art.objectName}
            title={art.title}
            link={`arts/${art.objectID}`}
          />
        </Grid>
      );
    });
  };

  return (
    <>
      {loadingDaily ? (
        <CircularProgress />
      ) : (
        <>
          <Typography variant="h3">Daily</Typography>
          <Divider />
          <Grid container spacing={2} className={classes.cards}>
            {renderCards(dataDaily)}
          </Grid>
        </>
      )}
      {loadingPopular ? (
        <CircularProgress />
      ) : (
        <>
          <Typography variant="h3">Popular</Typography>
          <Divider />
          <Grid container spacing={2} className={classes.cards}>
            {renderCards(dataPopular)}
          </Grid>
        </>
      )}
    </>
  );
};
