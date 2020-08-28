import React, { Component } from "react";
import { Container, Grid, GridSpacing, Paper, Typography, Input, InputLabel, TextField, FormGroup, FormLabel, FormControlLabel, FormHelperText, FormControl, MenuItem, Select, Checkbox, CheckboxProps, Button, Collapse } from '@material-ui/core';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import {
  spacing,
  typography,
} from '@material-ui/system';
import axios from 'axios'
import Autocomplete from '@material-ui/lab/Autocomplete';
import API from '../../../../services/index'
const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing(),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
});

let values = [];
let feeFull;

class AddProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options : [],
      items:[],
      inputValue:'',
      servicevsfee : []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleChangeautocomplete = this.handleChangeautocomplete.bind(this);
    this.handleChangeinterms = this.handleChangeinterms.bind(this);
    this.setOpen = this.setOpen.bind(this);
    
  }
  state = {
    category: "",
    description: "",
    services: "",
    fees: "",
    payment: [],
    options : [],
    items:[],
    paymentTypesList:[],
    EngagmentTermsitemsList:[],
    inputValue:'', 
    servicevsfee: []
  };
  handleChangeinterms(e, row, frequency){
    if(e.target.checked){
      row.paymentStructure.push( {id: frequency.id, value: frequency.value, fee:""} )
    }
    else{
      let temp = row.paymentStructure.filter(item => item.id !== frequency.id)
      row.paymentStructure = temp;
    }
    this.setState({servicevsfee : this.state.servicevsfee});
  }
  setOpen(row){
    row.open = ! row.open;
    this.setState({servicevsfee : this.state.servicevsfee});
  }
  async componentDidMount() {
    
    let itemsList = [];
    const elements = await API.fetchAllCategories();
    if(elements){
    for (let value of elements) {
      itemsList.push(<MenuItem value={value.id}>{value.value}</MenuItem>)
      }
      this.setState({items: itemsList})}

      let paymentTypesList = [];
      const paymentTypesListTerms = await API.fetchpaymentTypes();
      if(paymentTypesListTerms){
      for (let value of paymentTypesListTerms) {
        
        paymentTypesList.push(
          <FormControlLabel
          control={<Checkbox onChange={this.handleChange} name="payment" value={value.id} color="primary" />}
          label={value.value}
        />)
        }
        this.setState({paymentTypesList: paymentTypesList})}
        const elementsEngagmentTerms = await API.fetchServicesEngagmentTerms();
        if(elementsEngagmentTerms){
          this.setState({EngagmentTermsitemsList: elementsEngagmentTerms})}
  }
  async handleSearchChange(e, element){
    console.log(e.target.value, this.state, element)
    let categoryselected = 0;
    if( this.state.category){
      categoryselected = this.state.category;
    }
    const elements = await API.searchbase();
    if(elements){
      this.setState({options: elements})
    }

  }
  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    if (e.target.type === "checkbox") {
      values.push(value);
      this.setState({ [name]: values });
      return;
    }

    this.setState({ [name]: value });
  }
  handleChangeautocomplete(e, newInputValue){
      let itemadded = true;
      if( this.setState.services && this.setState.services.length > newInputValue.length ){
        itemadded = false;
      }
      this.setState({  services : newInputValue });
      // check, newly added item already exists ?
      let check = false;
      let lastitem = newInputValue[ newInputValue.length - 1];
      if ( newInputValue.length >= 1){
      for(let i = 0; i <= newInputValue.length - 2; i++)
        {
          if( newInputValue[i].id ===  lastitem.id){
            check = true;
          }
        }
        if(check){
          newInputValue.pop();
        }
    }

      // add or remove rows to servicevsfee
      let servicevsfeearray = []
      for(let i = 0; i < newInputValue.length; i++)
      { let isexists = false;
        for( let j=0;j < this.state.servicevsfee.length; j++ ){
          if( this.state.servicevsfee[j].id === newInputValue[i].id){
            servicevsfeearray.push( this.state.servicevsfee[j] );    
            isexists = true;}
        }
        if( !isexists)
        servicevsfeearray.push (   new createData( newInputValue[i], this.state.EngagmentTermsitemsList ) ); 
      }
      this.setState({servicevsfee : servicevsfeearray});
      return newInputValue;
    
  }
  handleSubmit(event) {
    console.log("==================DATA==============", this.state);
    event.preventDefault();
      this.props.addProfile(
        this.state
      )
  }

  render() {
    const { classes } = this.props;
    const { selected, hasError, options, items } = this.state;
    
    return (
      <main>
        <Container style={{ marginTop: 80 }}>
        <Paper elevation={3} p={2} style={{ padding: 20 }}>
            
              <Typography variant="h5" align="center" component="h2" gutterBottom>
                Register your profile
              </Typography>
              <form
                onSubmit={this.handleSubmit}
              >
              <Grid container spacing={5}>
              <Grid item xs={12} sm={4}>
                <FormControl className={classes.formControl} error={hasError} fullWidth>
                  <InputLabel htmlFor="category">Select Category</InputLabel>
                  <Select
                    name="category"
                    value={selected}
                    defaultValue= "-1"
                    onChange={this.handleChange}
                    input={<Input id="-1" />}
                    
                  >
                    {this.state.items}
                  </Select>
                  {hasError && (
                    <FormHelperText>This is required!</FormHelperText>
                  )}
                </FormControl>
                </Grid>
                <Grid item xs={12} sm={8}>
                <Autocomplete
                    name="services"
                    multiple
                    fullWidth
                    value={selected}
                    onChange={this.handleChangeautocomplete}
                    input={<Input id="" />}
                    filterSelectedOptions
                    onInputChange={this.handleSearchChange}
                    id="controllable-states-demo"
                    options={this.state.options}
                    getOptionLabel={(option) => option.value}
                    renderInput={(params) => (
                      <TextField {...params} label="Services" placeholder="" />
                    )}
                  />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      name="description"
                      id="exampleFormControlTextarea1"
                      multiline
                      rows={2}
                      fullWidth
                      placeholder="Describe your service not more than 200 words"
                      value={this.state.description}
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                  <TableContainer >
                    <Table aria-label="collapsible table">
                    <TableBody>
                  {this.state.servicevsfee.map((row) => (
                    <React.Fragment>
                        <TableRow className={classes.root}>
                            <TableCell>
                              <IconButton aria-label="expand row" size="small" onClick={() => this.setOpen(row)} >
                                {row.open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                              </IconButton>
                            </TableCell>
                            <TableCell align="right">{row.value}</TableCell>
                            <TableCell align="right">Category : {row.categoryValue}</TableCell>
                            <TableCell align="right" colSpan="{3}"> 
                            
                            { this.state.EngagmentTermsitemsList.map( (listelement ) =>(
                              <React.Fragment>
                              <FormControlLabel control={
                   <Checkbox onChange={ (e)=> this.handleChangeinterms(e,row,listelement)} name="payment" value={listelement.id} color="primary" />}
                             label={listelement.value} />        
                          </React.Fragment>
                            ))
                            }

                            
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={6}>
                              <Collapse in={row.open} timeout="auto" unmountOnExit>
                                <Box margin={1}>
                                  <Table size="small" aria-label="purchases">
                                    <TableBody>
                                       {row.paymentStructure.map((payment) => (
                                        <TableRow >
                                          <TableCell component="th" scope="row">
                                            {payment.value}
                                          </TableCell>
                                          <TableCell>
                                          <TextField
                                              placeholder="Fee"
                                              // value={payment.fee}
                                              // onChange={this.handleChange}
                                            />
                                          </TableCell>
                                        </TableRow>
                                      ))} 
                                    </TableBody>
                                  </Table>
                                </Box>
                              </Collapse>
                            </TableCell>
                          </TableRow>

                          </React.Fragment>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <FormControl component="fieldset" className={classes.formControl}>
                      <FormLabel component="legend">Select payment method</FormLabel>
                      <FormGroup row>
                        {this.state.paymentTypesList} 
                      </FormGroup>
                    </FormControl>
                  </Grid>
                </Grid>  
                  
                <Button variant="contained" color="primary">Submit</Button>
              </form>
          
          </Paper>
        </Container>
      </main>
    );
  }
}

AddProfile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AddProfile);


function createData(data, term) {

this.categoryId= data.categoryId;
this.categoryValue= data.categoryValue;
this.id= data.id;
this.value= data.value;
term.forEach(function (element) {
  element.Active = "false";
});

this.term = term;
this.paymentStructure= [];
//{frequency:"", fee:""}
this.open = false;
  
}