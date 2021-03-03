import React from 'react';
import s from './style.module.scss';
import Button from 'react-bootstrap/Button';
import {PlusCircle, TrashFill, PencilSquare} from 'react-bootstrap-icons';
import * as actions from '../../action/action.js';
import { connect } from "react-redux";
import firebase from 'firebase';

const Controls = (props) =>{

    const{showButtonsDelete, showBtnDel, showAdd, showAddControls, showEdit, showEditControls} = props;
    
    const showAddControl = () =>{  
        showAdd();
        if(showButtonsDelete){showBtnDel()}
        if(showEditControls){showEdit()}
    }

    const showBtnDelete = () =>{
        showBtnDel();
        if(showAddControls){showAdd()}
        if(showEditControls){showEdit()}
    }

    const deleteAll = () =>{
        firebase.database().ref('Users').remove();
        props.setData([]); // Обновляем стор
    }

    const edit = () => {
        showEdit();
        if(showButtonsDelete){showBtnDel()}
        if(showAddControls){showAdd()}
    }

    return(
        <div className={s.wrapper}>
            <div>
                <Button className={s.button} variant="success" onClick={()=>showAddControl()}><PlusCircle className={s.iconS}/>{showAddControls ? 'Отмена' : 'Добавить'}</Button>
                <Button className={s.button} variant="warning"onClick={()=>edit()}><PencilSquare className={s.iconS}/>{showEditControls ? 'Отмена' : 'Редактировать'}</Button>
                <Button className={s.button} variant="danger"onClick={()=>showBtnDelete()}><TrashFill className={s.iconS}/>{showButtonsDelete ? 'Отмена' : 'Удалить'}</Button>
            </div>
          <Button className={s.button} variant="danger" onClick={()=>{deleteAll()}}>Удалить все <TrashFill className={s.iconS}/></Button>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
      showButtonsDelete: state.showButtonsDelete,
      showAddControls: state.showAddControls,
      showEditControls: state.showEditControls,
    };
  };
  
export default connect(mapStateToProps, actions)(Controls);