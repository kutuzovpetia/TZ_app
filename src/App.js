import React, {useEffect} from 'react';
import s from './app.module.scss';
import "bootstrap/dist/css/bootstrap.min.css";
import Controls from './components/header-controls';
import Table from './components/table';
import { connect } from "react-redux";
import * as actions from "./action/action.js";
import DataService from './dataService.js';

const App = (props) => {
  
useEffect(()=>{
  const data = new DataService(); 
  data.getUsers().then((res)=>{props.setData(res); props.showSpinner()})
},[]);

  return (
    <div className={s.App}>
        <div className={s.wrapper}>
            <Controls/>
            <Table/>
        </div>
    </div>    
  );
}

const mapStateToProps = (state) => {
  return {
    data: state.data,
  };
};

export default connect(mapStateToProps, actions)(App);
