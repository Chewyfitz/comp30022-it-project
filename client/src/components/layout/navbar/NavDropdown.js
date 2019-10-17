import React from "react";
import { render } from "react-dom";
import Picky from "react-picky";
import "./NavDropdown.css";


const bigList = [];


for (var i = 1; i <= 50; i++) {
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
  selectOption(value) {
    console.log("Vals", value);
    this.setState({ value });
  }

  // pushPhoto(value){
  //   axios.post('/user', {
  //     firstName: 'Fred',
  //     lastName: 'Flintstone'
  //   })
  //   .then(function (response) {
  //     console.log(response);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
  // }
  
  render() {
    return (
      
      <Picky
          value={this.state.arrayValue}
          options={bigList}
          onChange={this.selectMultipleOption}
          open={true}
          valueKey="id"
          labelKey="name"
          multiple={true}
          includeSelectAll={false}
          includeFilter={true}
          placeholder={"No albums selected"}
          allSelectedPlaceholder={"All albums selected"}
          manySelectedPlaceholder={"%s albums selected"}
          filterPlaceholder={"search albums..."}
          dropdownHeight={200}
          keepOpen={true}
          getFilterValue={this.getFilterValue}            

          render={({
              style,
              isSelected,
              item,
              selectValue,
              labelKey,
              valueKey,
              multiple,
          }) => {
              return (                    
              <li
                  style={{ ...style}} // required
                  className={isSelected ? 'selected' : ''} // required to indicate is selected
                  key={item[valueKey]} // required
                  onClick={() => selectValue(item)}
              >
                {/* <input type="checkbox" className=" button-format" checked={isSelected} readOnly />

                <span style={{fontWeight: isSelected ? "bold" : "normal", fontSize: '16px'}}>
                  {item[labelKey]}
                </span> */}

                <form>
                  <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" checked={isSelected} name="checkthis" readOnly/>
                    <label className="custom-control-label" >
                      <span style={{fontWeight: isSelected ? "bold" : "normal", fontSize: '16px'}}>
                        {item[labelKey]}
                      </span>
                    </label>
                  </div>
                </form>

              </li>
            );
        }}
      />
    );
  }
}

export default NavDropdown; 

