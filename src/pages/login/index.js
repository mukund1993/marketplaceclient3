import React, { useState } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  Tabs,
  Tab,
  TextField,
  Fade,
  Card,
  CardContent,
  Divider
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import MaterialUiPhoneNumber from 'material-ui-phone-number';
import { Link } from "react-router-dom";

// styles
import useStyles from "./styles";

// context
import { useUserDispatch, loginUser } from "../../context/UserContext";

function Login(props) {
  var classes = useStyles();

  // global
  var userDispatch = useUserDispatch();

  // local
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);
  var [activeTabId, setActiveTabId] = useState(0);
  var [emailValue, setEmailValue] = useState("");
  var [phoneNumber, setPhoneNumber] = useState("");

  return (
    <Grid container className={classes.container}>
      <div className={classes.formContainer}>
        <Card>

<CardContent className="flex flex-col items-center justify-center p-32">
  <Avatar className={classes.avatar} style={{margin: 'auto'}}>
    <LockOutlinedIcon />
  </Avatar>
  <Typography component="h1" variant="h5" style={{textAlign: 'center'}}>
   Sign in
 </Typography>
 <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
<TextField
  InputProps={{
    classes: {
      underline: classes.textFieldUnderline,
      input: classes.textField,
    },
  }}
  variant="outlined"
  margin="normal"
  fullWidth
  label="Email Address"
  name="email"
  autoComplete="email"
  autoFocus
  value={emailValue}
  onChange={e => setEmailValue(e.target.value)}
/>
</Grid>

<Grid item xs={12} sm={12}>
<div className="my-24 flex items-center justify-center">
      <Typography component="h1" variant="button" style={{textAlign: 'center', fontWeight: 'bold'}}>
        OR
      </Typography>
</div>
</Grid>
            <Grid item xs={12} sm={12}>

<MaterialUiPhoneNumber
  defaultCountry="in"
  onlyCountries={['in']}
  label="Phone Number"
  fullWidth
  margin="normal"
  variant="outlined"
  value={phoneNumber}
  onChange={value => {
    const phone = value.replace(/[^\d]/g, "");
    setPhoneNumber(`+${phone}`)
  }}
/>
</Grid>
  <Grid item xs={12} sm={6}>
    {isLoading ? (
        <CircularProgress size={26} className={classes.loginLoader} />
      ) : (
        <Button
          disabled={
            emailValue.length === 0 && phoneNumber.length === 0
          }
          onClick={() =>
            loginUser(
              userDispatch,
              emailValue,
              phoneNumber,
              props.history,
              setIsLoading,
              setError,
            )
          }
          variant="contained"
          color="primary"
          size="large"
          >
            LOGIN
        </Button>
      )
    }
  </Grid>
  <Grid item xs={12} sm={6}>
    <Link style={{ textDecoration: "none" }} color="primary" to="/register"> <Button color="primary">Create an account</Button></Link>
</Grid>
</Grid>
</CardContent>
</Card>
        </div>
    </Grid>
  );
}

export default withRouter(Login);