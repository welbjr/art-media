import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import { Favorite } from "@mui/icons-material/";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  aboutButton: {
    marginLeft: "auto",
  },
});

export const ArtCard = ({ primaryImageSmall, objectName, title, link }) => {
  const classes = useStyles();

  return (
    <Card sx={{ width: 345, height: 350 }}>
      <CardMedia
        component="img"
        image={primaryImageSmall}
        width="200"
        height="200"
        alt="imagem da obra"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title.length > 20 ? title.slice(0, 20) + "..." : title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {objectName}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton aria-label="adicionar like">
          <Favorite />
        </IconButton>
        <div className={classes.aboutButton}>
          <Button size="small" href={link}>
            Details
          </Button>
        </div>
      </CardActions>
    </Card>
  );
};
