import { Box, Link } from "@mui/material";

export const ArtImage = ({ picture }) => {
  return (
    <Box
      sx={{
        backgroundColor: "primary.dark",
        "&:hover": {
          backgroundColor: "primary.main",
          opacity: [0.9, 0.8, 0.8],
        },
      }}
    >
      <Link href={picture} rel="noreferrer" target="_blank">
        <img src={picture} style={{ width: "-moz-available" }} alt="imagem" />
      </Link>
    </Box>
  );
};
