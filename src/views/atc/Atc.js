import React from 'react';

import s from './Atc.module.scss';

export default function Atc() {
  return(
      <section className={s.atc}>
        <ul>
          <li><a href ="/atc/policies">Policies</a></li>
          <li><a href ="/atc/division/examiners">Division Examiners</a></li>
          <li><a href ="/atc/division/instructors">Division Instructors</a></li>
          <li><a href ="/atc/vacc/instructors">vACC Instructors</a></li>
        </ul>
      </section>
  );
}