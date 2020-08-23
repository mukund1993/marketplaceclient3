import React, { Component } from "react";

class File extends Component {
  render() {
    return (
         <div className="form-group" style={{marginTop:50}}>
            <label htmlFor="exampleFormControlFile1">{this.props.label}</label>
            <input type="file" className="form-control-file" id="exampleFormControlFile1" />
        </div>
    );
  }
}

export default File;
