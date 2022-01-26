import { Favorite } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGET, usePOST, useDELETE } from "../hooks/APIHooks";

const useStyles = makeStyles({
  favorites: {
    display: "flex",
    alignItems: "center",
  },
  buttonFavorited: {
    color: red[600],
  },
});

export const FavoriteButton = () => {
  const [isLiked, setIsLiked] = useState(false);
  const classes = useStyles();
  const { id } = useParams();

  const {
    data: totalLikesData,
    setData,
    loadingGET,
  } = useGET("totalLikes", id);
  const { data: likeData } = useGET("like", id);
  const { isPosted, funcPOST: likeArt } = usePOST("likes");
  const { funcDELETE: undoLike } = useDELETE("likes");

  const userLocalStorage = JSON.parse(localStorage.getItem("authData"));
  const userToken =
    userLocalStorage === null ? null : userLocalStorage["token"];
  const isLoggedIn = Boolean(userToken);

  const onFavoriteHandler = () => {
    if (!isLoggedIn) return;

    let newData = totalLikesData;

    if (!isLiked) {
      newData.numLikes++;
      likeArt({ artId: id, userToken });
    } else {
      newData.numLikes--;
      undoLike({ artId: id, userToken });
    }
    setData(newData);
    setIsLiked(!isLiked);
  };

  // useEffect(() => {

  // })

  return (
    <>
      {!loadingGET && (
        <div className={classes.favorites}>
          <IconButton onClick={onFavoriteHandler}>
            <Favorite className={isLiked ? classes.buttonFavorited : null} />
          </IconButton>
          <Typography>{totalLikesData.numLikes}</Typography>
        </div>
      )}
    </>
  );
};
