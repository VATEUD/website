import React, { useState } from "react";
import { useScrollPosition } from '@n8tb1t/use-scroll-position'

import s from './Navbar.module.scss';


export default function Navbar({ color, path }) {
  const [down, setDropDown] = useState(true);

  function dropDown(){
    if(down){
      const burgerMenu = document.getElementById('burger-menu');
      burgerMenu.style.visibility = "visible";
      burgerMenu.style.opacity = "1";
      const body = document.getElementById('body');
      body.style.overflow = "hidden";
    }else{
      const burgerMenu = document.getElementById('burger-menu');
      burgerMenu.style.visibility = "hidden";
      burgerMenu.style.opacity = "0";
      const body = document.getElementById('body');
      body.style.overflow = "visible";
    }
    setDropDown(!down);
  }

  useScrollPosition(({ prevPos, currPos }) => {
    if(!color) {
      if(currPos.y == 0){
        const myHeader = document.getElementById('myHeader');
        myHeader.style.backgroundColor = 'rgba(0,0,0,0)';
      }else{
        const myHeader = document.getElementById('myHeader');
        myHeader.style.backgroundColor = '#000';
      }
    }
  })

  return (
    <>
      <header id="myHeader" className = {color  && ( s.black )}>
        <div className="grid">
          {/*Navbar in the top */}
          <div className = {s.navigation}>
            <div className = {s.navigation__logo}>
            <a href="/"><img src={require("../../../assets/img/vateud.png").default } alt ="" ></img></a>
            </div>
            { color &&  <h1>{ path }</h1>}
            <nav className={s.navigation__links}>
              <ul>
                <a href='#' onClick={()=> dropDown()}><li>Menu</li><img onClick={()=> dropDown()} src={require("../../../assets/img/burgermenu.png").default } alt = ""></img></a>
              </ul>
            </nav>
          </div>
        </div>
     </header>

     {/* Nav page appear over */}
     <nav className={s.burger_menu} id="burger-menu"> 
      <div className={s.burger_menu__shape}>
        <div className={s.burger_menu__shape__triangle}></div>
          <div id="dropdownLinks" className={s.burger_menu__shape__rectangle}>
          <div className={s.burger_menu__shape__rectangle__list}>
            <a href='#' onClick={()=> dropDown()}><img className={s.burger_menu__shape__rectangle__list__close} src={require("../../../assets/img/Close-Icon@1x.png").default } alt =""></img></a>
            <a href="https://api.vateud.net/oauth/connect/login"><img className={s.burger_menu__shape__rectangle__list__eudLogo} src={require("../../../assets/img/vateud.png").default } alt=""></img></a>
            <a href="/staff">Staff</a>
            <a href="/policies">Policies and Regulations</a>
            <a href="http://members.vateud.net/">Members Departament</a>
            <div className={s.burger_menu__shape__rectangle__list__training}>
              <a href ="/atc">Training Departament</a>
              <div className={s.burger_menu__shape__rectangle__list__training__sub}>
                <a href ="/atc/policies">Policies</a><br></br>
                <a href ="/atc/division/examiners">Division Examiners</a><br></br>
                <a href ="/atc/division/instructors">Division Instructors</a><br></br>
                <a href ="/atc/vacc/instructors">vACC Instructors</a>
              </div>
            </div>
           </div>
         </div>
        </div> 
      </nav>
    </>
  );
}