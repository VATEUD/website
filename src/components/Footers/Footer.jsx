import React from "react";

import '../../assets/styles/footer.scss';

export default function Footer() {
  return (
    <>
      <div className="prefooter">
	    	<div className="grid flexy">
	    		<div className = "row flexy">
	    			<div className="down col col-6 col-sm-12 col-md-12">
	    				<p className ="magic">{process.env.REACT_APP_DIVISION_NAME}</p>
	    				<p className ="moremagic">{process.env.REACT_APP_DIVISION_CODE}</p>
	    				<h2>This content is for hobby use only. None of the displayed or linked material is intended for the use in real aviation. All material is (c) by their creators.
                For any questions please contact us directly.</h2>
	    			</div>
            <div className="down col col-2 col-sm-12 col-md-12">
              <a href ="/staff" ><p className ="magic">Our Staff</p></a>
	    			</div>
            <div className="down col col-2 col-sm-12 col-md-12">
            <a href ="/policies" ><p className ="magic">Policies and regulations</p></a>
	    			</div>
	    		</div>
	    	</div>
	    </div>
	    <div className="footer col-12">
	    	<div className="down">
	    		<p>Find us in our social media</p>
	    		<div className="spread">
	    			<a href="https://www.facebook.com/VATEUD/"><img  src={require("../../assets/img/f_logo_RGB-Black_58.png").default} alt=""></img></a>
	    			<a href="https://twitter.com/vateud"><img  src = {require("../../assets/img/2021 Twitter logo - black.png").default} alt=""></img></a>
	    			<a href="https://github.com/VATEUD"><img  src = {require("../../assets/img/GitHub-Mark-120px-plus.png").default} alt=""></img><br></br></a>
	    		</div>
	    		<a href="/">vateud.net</a>
	    	</div>
	    </div>
    </>
  );
}
