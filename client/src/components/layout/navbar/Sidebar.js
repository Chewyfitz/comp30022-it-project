import React from "react";
import { slide as Menu } from "react-burger-menu";
import "../../../App.css";

//import images from local
import img1 from '../photolist/temp_images/1.png'
import img2 from '../photolist/temp_images/2.png'
import img3 from '../photolist/temp_images/3.png'
import img4 from '../photolist/temp_images/4.png'

export default props => {
  return (
    // Pass on our props
    
    <Menu {...props} customBurgerIcon={ <div> <button type="button" className="btn icon-text">Albums</button> </div>}>
      <a className="menu-item menu-text" href="/"> Album 1 </a>

      <a className="menu-item menu-text" href="/burgers"> Album 2 </a>

      <a className="menu-item menu-text" href="/pizzas"> Album 3 </a>

      <a className="menu-item menu-text" href="/desserts"> Album 4 </a>
    </Menu>
  );
};
