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
import OtpInput from 'react-otp-input';

// styles
import useStyles from "./styles";

// context
import { useUserDispatch, validateOTP, useUserState } from "../../context/UserContext";
const { firstName, lastName, email, phoneNumber } = useUserState
console.log(firstName, lastName, email, phoneNumber)
function OTP(props) {
  var classes = useStyles();

  // global
  var userDispatch = useUserDispatch();

  // local
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);
  var [otp, setOTP] = useState("");
  console.log(otp)
  return (
    <Grid container className={classes.container}>
      <div className={classes.formContainer}>
        <Card>

<CardContent className="flex flex-col items-center justify-center p-32">
  <Typography component="h1" variant="h5">
   Enter verification code
 </Typography>
 <Grid container spacing={2}>
              <Grid item xs={12} className={classes.marginTopSmall}>
                <OtpInput
                  required
                  fullWidth
                  inputStyle={classes.inputStyle}
                  containerStyle={classes.containerStyle}
                  numInputs={6}
                  separator={<span>-</span>}
                  value={otp}
                  onChange={(value) => setOTP(value)}
                  shouldAutoFocus
                />
              </Grid>
              <Grid item xs={6} >
            
        <Button
            variant="contained" color="primary"
            className="w-224 mx-auto mt-16"
            aria-label="LOG IN"
            onClick={() => setOTP('')}
        >
            CLEAR
        </Button>
        </Grid>
        <Grid item xs={6} >

        <Button
          disabled={
            otp.length === 0 && otp.length < 4
          }
          onClick={() =>
            validateOTP(
              userDispatch,
              otp,
              props.history,
              setIsLoading,
              setError,
            )
          }
          variant="contained"
          color="primary"
          size="large"
          >
            
            SUBMIT
        </Button>
      </Grid>
</Grid>
</CardContent>
</Card>
        </div>
    </Grid>
  );
}

export default withRouter(OTP);