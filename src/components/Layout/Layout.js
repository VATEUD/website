import React from 'react';
import { useLocation } from "react-router-dom";


import Navbar from '../Navbars/Navbar/Navbar';
import HealthBar from '../Navbars/Healthbar/HealthBar';
import Footer from "../Footers/Footer";
import ScrollArea from 'react-scrollbar';

import s from './Layout.module.scss';

export default function Layout({ children }) {
  const path  = useLocation();
  const pages = {
    '/staff': 'Staff',
    '/policies': 'Policies and Regulations',
    '/atc': 'Training Departament',
    '/atc/division/examiners': 'Division Examniers',
    '/atc/division/instructors': 'Division Instructors',
    '/atc/vacc/instructors': 'vACC Instructors',
    '/atc/policies': 'Training Departament Policies',
  }

  return (
    <ScrollArea>
      <div className={s.layout}>
        <HealthBar></HealthBar>
        { !pages[path.pathname] ? (
          <>
            <Navbar color = { false }></Navbar>
            {children}
          </>
        ) : (
          <>
          <Navbar color = { true } path = { pages[path.pathname] }></Navbar>
          <main className={s.layout__main}>
            <div className = "grid">
              {children}
            </div>
          </main>
          </>
        )}        
        <Footer></Footer>
      </div>
    </ScrollArea>
  )
}