import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useGET } from "../hooks/APIHooks";
import { CircularProgress, Link } from "@mui/material";

export const ArtSuggestions = () => {
  const { data, loadingGET } = useGET("daily");

  const renderSuggestions = (arts) => {
    return arts.map((el) => {
      return (
        <Card sx={{ maxWidth: 345 }} variant="outlined" key={el.title}>
          <CardMedia
            component="img"
            height="200"
            image={el.primaryImageSmall}
            alt={el.title}
          />
          <CardContent>
            <Typography variant="h5" component="div">
              <Link href={`${el.objectID}`} underline="hover" color="black">
                {el.title.length > 20
                  ? el.title.slice(0, 20) + "..."
                  : el.title}
              </Link>
            </Typography>
          </CardContent>
        </Card>
      );
    });
  };

  return (
    <>{loadingGET ? <CircularProgress /> : <>{renderSuggestions(data)}</>}</>
  );
};
