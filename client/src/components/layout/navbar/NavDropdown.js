import React from "react";
import { render } from "react-dom";
import Picky from "react-picky";
import "react-picky/dist/picky.css";

const bigList = [];

for (var i = 1; i <= 1000; i++) {
  bigList.push({ id: i, name: `Item ${i}` });
}
class NavDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
      arrayValue: []
    };
    this.selectMultipleOption = this.selectMultipleOption.bind(this);
  }

  selectMultipleOption(value) {
    console.count('onChange')
    console.log("Val", value);
    this.setState({ arrayValue: value });
  }

  render() {
    return (
      <div className="container">
        <Picky
            value={this.state.arrayValue}
            options={bigList}
            onChange={this.selectMultipleOption}
            open={true}
            valueKey="id"
            labelKey="name"
            multiple={true}
            includeSelectAll={true}
            includeFilter={true}
            dropdownHeight={200}
        />
      </div>
    );
  }
}

export default NavDropdown; 

