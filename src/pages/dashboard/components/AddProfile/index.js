import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import File from "../FileComponent";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";
import axios from 'axios'
import Autocomplete from '@material-ui/lab/Autocomplete';
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
      inputValue:''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleChangeautocomplete = this.handleChangeautocomplete.bind(this);
    
  }
  state = {
    category: "",
    description: "",
    services: "",
    fees: "",
    payment: [],
    options : [],
    items:[],
    inputValue:''
  };
  componentDidMount() {
    
    const requestUrl = "localhost:8080"
    let itemsList = [];
    axios.get(`http://localhost:3000/fetchAllCategories`).then((elements)=>{
    //axios.get(`http://${requestUrl}/gharpe/search/base/fetchAllCategories`).then((elements)=>{
    for (let value of elements.data) {
      itemsList.push(<MenuItem value={value.id}>{value.value}</MenuItem>)
      }
      this.setState({items: itemsList})
    })
  }
  handleSearchChange(e, element){
    console.log(e.target.value, this.state, element)
    let categoryselected = 0;
    if( this.state.category){
      categoryselected = this.state.category;
    }
    axios.get(`http://localhost:3000/base`).then((elements)=>{
    //axios.get(`http://localhost:8080/gharpe/search/base/${categoryselected}/${e.target.value}`).then((elements)=>{
      this.setState({options: elements.data})
    })
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
    // console.log(newInputValue)
    //  let feeFull = newInputValue.categoryId + " " + newInputValue.id;
      this.setState({  services : newInputValue });
      return;
    
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
      <div className="App">
        <div className="container" style={{ padding: 16 }}>
          <div className="row" style={{ paddingTop: 100 }}>
            <main role="main" className="col-lg-7">
              <Typography variant="h5" align="center" component="h2" gutterBottom>
                Register your profile
              </Typography>
              <form
                className="text-left"
                onSubmit={this.handleSubmit}
                style={{ borderRight: "1px solid #000", paddingRight: 50 }}
              >
                <FormControl className={classes.formControl} error={hasError}>
                  <InputLabel htmlFor="category">Select Category</InputLabel>
                  <Select
                    name="category"
                    value={selected}
                    style={{ width: 300 }}
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

                <div className="form-group">
  
                <Autocomplete
                        name="services"
                        multiple
                        value={selected}
                        onChange={this.handleChangeautocomplete}
                        input={<Input id="" />}
                        style={{ width: 300 }}
                        onInputChange={this.handleSearchChange}
                        id="controllable-states-demo"
                        options={this.state.options}
                        getOptionLabel={(option) => option.value}
                        renderInput={(params) => (
                          <TextField {...params} label="Services" placeholder="" />
                        )}
                      />

                      
                </div>
                <div className="form-group">
                  <textarea
                    name="description"
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    placeholder="Describe your service not more than 200 words"
                    value={this.state.description}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="row">
                  
                  <div className="col-lg-6">
                    <FormControl
                      className={classes.formControl}
                      error={hasError}
                    >
                      <InputLabel htmlFor="feesParam">Select</InputLabel>
                      <Select
                        name="feesParam"
                        value={selected}
                        onChange={this.handleChange}
                        input={<Input id="yoga" />}
                      >
                        <MenuItem value="per session group">
                          Per session group
                        </MenuItem>
                        <MenuItem value="per person">Per person</MenuItem>
                      </Select>
                    </FormControl>
                  </div>

                  <div className="col-lg-6">
                    <div className="form-group">
                      <TextField
                        id="outlined-basic1"
                        label="Fees"
                        variant="outlined"
                        name="fees"
                        onChange={this.handleChange}
                        className="form-control"
                        value={this.state.fees}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-12">
                    <p>Select payment method</p>
                    <div className="checkbox">
                      <label>
                        <input
                          type="checkbox"
                          onChange={this.handleChange}
                          name="payment"
                          value="Paytm"
                        />Paytm
                      </label>
                    </div>
                    <div className="checkbox">
                      <label>
                        <input
                          type="checkbox"
                          onChange={this.handleChange}
                          name="payment"
                          value="Google Pay"
                        />Google Pay
                      </label>
                    </div>
                    <div className="checkbox">
                      <label>
                        <input
                          type="checkbox"
                          onChange={this.handleChange}
                          name="payment"
                          value="Paypal"
                        />Paypal
                      </label>
                    </div>
                    <div className="checkbox">
                      <label>
                        <input
                          type="checkbox"
                          onChange={this.handleChange}
                          name="payment"
                          value="Phone Pe"
                        />Phone Pe
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12 submit-button">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </form>
            </main>
            <div className="col-lg-5 optional" style={{marginTop: 50}}>
              <h5 className="text-left">Optional</h5>
              <File label="Upload your pics" />
              <File label="Upload your video" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddProfile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AddProfile);
