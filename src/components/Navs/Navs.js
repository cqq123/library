import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './navs.scss';

const Navs = () => (
  <div className={style.main}>
    <NavLink to="taxi" key="taxi" className={style.navLine}>
      <span className={style.navIconTaxi} />
    </NavLink>
    <NavLink to="bus" key="bus" className={style.navLine}>
      <span className={style.navIconBus} />
    </NavLink>
    <NavLink to="bicycle" key="bicycle" className={style.navLine}>
      <span className={style.navIconBicycle} />
    </NavLink>
  </div>
);

export default Navs;
