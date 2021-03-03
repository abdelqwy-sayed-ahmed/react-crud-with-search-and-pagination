import React from 'react';


const NavBar = () => {
 

 
  return (
    <div>
      <nav className="navbar navbar fixed-top navbar-expand-lg  navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand text-info font-italic" data-toggle="collapse" data-target=".navbar-collapse.show"href="/">E-Book</a>
          <button className="navbar-toggler" type="button" data-bs-toggle='collapse'  data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"  >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
              
    
              </ul>
          
              </div>
            </div>
      </nav>
    </div>
  );
};

export default NavBar;