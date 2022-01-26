import { ExpandMore } from "@mui/icons-material";
import { Button, Collapse, Link, Typography } from "@mui/material";
import { useState } from "react";
import v from "voca";

const renderDetails = (data) => {
  return Object.keys(data).map((key) => {
    const links = [
      "primaryImage",
      "primaryImageSmall",
      "artistWikidata_URL",
      "artistULAN_URL",
      "additionalImages",
      "objectURL",
    ];
    if (!data[key] || typeof data[key] !== "string") return null;
    if (links.includes(key)) {
      return (
        <Typography key={key}>
          <b>{v(key).kebabCase().replaceAll("-", " ").titleCase().value()}</b>:{" "}
          <Link href={data[key]} target="_blank" rel="noreferrer">
            {data[key]}
          </Link>
        </Typography>
      );
    } else
      return (
        <Typography key={key}>
          <b>{v(key).kebabCase().replaceAll("-", " ").titleCase().value()}</b>:{" "}
          {data[key]}
        </Typography>
      );
  });
};

export const ArtDetails = ({ data }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <Typography paragraph variant={data.title.length <= 35 ? "h1" : "h2"}>
        {data.title}
      </Typography>
      {/* <Typography paragraph variant="h4">
        {data.objectName}
      </Typography> */}
      <Typography paragraph variant="h5">
        <b>Author</b>: {data.artistDisplayName || "unknown"}{" "}
        {data.artistULAN_URL && (
          <Link
            href={data.artistULAN_URL}
            target="_blank"
            rel="noreferrer"
            underline="hover"
          >
            [ULAN]{" "}
          </Link>
        )}
        {data.artistWikidata_URL && (
          <Link
            href={data.artistWikidata_URL}
            target="_blank"
            rel="noopener"
            underline="hover"
          >
            [WikiData]{" "}
          </Link>
        )}
      </Typography>
      <Button
        variant="text"
        onClick={handleExpandClick}
        endIcon={<ExpandMore />}
      >
        Details
      </Button>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {renderDetails(data)}
      </Collapse>
    </>
  );
};
