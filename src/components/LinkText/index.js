import React from "react";
import { Link } from "@material-ui/core";

import useStyles from "./styles";

import { Typography } from "../Wrappers";

export default function LinkText(props) {
  var classes = useStyles();

  const onClick = () => {
    if (props.linkurl) {
      window.open(props.linkurl, '_blank')
    }
  }

  return (
    <div className={classes.pageTitleContainer}>
      <Typography className={classes.typo} variant="h4" size="sm">
        <Link { ...(props.linkurl) && { onClick } }>{props.title}</Link>
      </Typography>
    </div>
  );
}
