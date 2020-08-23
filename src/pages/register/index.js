
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
import { useUserDispatch, registerUser } from "../../context/UserContext";

function Login(props) {
  var classes = useStyles();

  // global
  var userDispatch = useUserDispatch();

  // local
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);
  var [activeTabId, setActiveTabId] = useState(0);
  var [firstName, setFirstName] = useState("");
  var [lastName, setLastName] = useState("");
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
  <Typography component="h1" variant="h5" style={{textAlign: 'center', marginTop: '15px', marginBottom: '15px'}}>
   Sign up
 </Typography>
 <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}              
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                value={lastName}
                onChange={e => setLastName(e.target.value)}       
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
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
<Grid item xs={12}>
<Typography component="h1" variant="button" style={{textAlign: 'center', fontWeight: 'bold'}}>
        OR
      </Typography>
</Grid>
<Grid item xs={12}>
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
            <Grid item xs={6}>

      <Link style={{ textDecoration: "none" }} color="primary" to="/login"> <Button color="primary">Back To Login</Button></Link>
      </Grid>
      <Grid item xs={6}>
        <Button
            variant="contained" color="primary"
            className="w-224 mx-auto mt-16"
            aria-label="LOG IN"
            onClick={() =>
              registerUser(
                userDispatch,
                emailValue,
                phoneNumber,
                firstName,
                lastName,
                props.history,
                setIsLoading,
                setError,
              )
            }
        >
            Enter GharPe
        </Button>
        </Grid>
</Grid>
</CardContent>
</Card>
        </div>
    </Grid>
  );
}

export default withRouter(Login);