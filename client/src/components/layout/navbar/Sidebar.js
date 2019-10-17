import React from "react";
import { slide as Menu } from "react-burger-menu";
import "../../../App.css";

export default props => {
  return (
    // Pass on our props
    
    <Menu {...props} customBurgerIcon={ <div> <button type="button" className="btn icon-text">Albums</button> </div>}>
      <a className="menu-item menu-text" href="/album"> Album 1 </a>

      <a className="menu-item menu-text" href="/album"> Album 2 </a>

      <a className="menu-item menu-text" href="/album"> Album 3 </a>

      <a className="menu-item menu-text" href="/album"> Album 4 </a>
    </Menu>
  );
};
