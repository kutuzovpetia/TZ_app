import React, {useState} from "react";
import s from "./style.module.scss";
import Tab from "react-bootstrap/Table";
import Spinner from 'react-bootstrap/Spinner';
import {Button, FormControl} from 'react-bootstrap';
import {TrashFill, PencilSquare} from 'react-bootstrap-icons';
import { connect } from "react-redux";
import * as actions from "../../action/action.js";
import DataService from '../../dataService';

const Table = (props) => {

  const [id, setId] = useState(null); // Id выбраного юзера при редактировании
  
  const reset = () => {
    props.setFullName('');
    props.setEmail('');
    props.setAge('');
  }

  const Add = () => {
    const newUser = {fullName: props.fullName, email: props.email, age: props.age} // Обьект с новым юзером
    const service = new DataService();
    service.createUser(newUser).then(()=>{                                         // Кидаем юзера в базу
      service.getUsers().then((res)=>props.setData(res));                          // Обновляем стор
      reset();                                                                     // Очистка полей
      props.showAdd();
    })                         
  }

  const Delete = (id) => {
    const service = new DataService();
    service.deleteUser(id).then(()=>{
      service.getUsers().then((res)=>props.setData(res));                           // Обновляем стор
    })
  }

  const edit = (f,e,a) => {                                                         
    const {setFullName, setEmail, setAge, showAdd} = props;
    setFullName(f);
    setEmail(e);
    setAge(a);
    if(!props.showAddControls){
      showAdd();
    }
  }

  const update = (id) =>{
      const {fullName, email, age} = props;
      const service = new DataService();
      service.updateUser(id,fullName, email, age).then(()=>{
        service.getUsers().then((res)=>props.setData(res));
        reset();
        props.showAdd();
      })
  }

  return (
     <div className={!props.showSpiner ? s.wrapper : s.load}>
      {
        !props.showSpiner ?
        <Tab striped bordered hover variant="dark">

        <thead>
          <tr>
            <th>№</th>
            <th>Имя</th>
            <th>Email</th>
            <th>Возраст</th>
          </tr>
        </thead>

        <tbody>
          {
           props.showAddControls ?
            <tr>
              <td className={'d-flex justify-content-center'}><Button className={s.button} variant="success" onClick={()=>{props.showEditControls ? update(id) : Add()}}> {props.showEditControls ? 'Изменить': 'Добавить'}</Button></td>
              <td><FormControl value={props.fullName} onChange={(e)=>{props.setFullName(e.target.value)}}/></td>
              <td><FormControl value={props.email} onChange={(e)=>{props.setEmail(e.target.value)}}/></td>
              <td><FormControl value={props.age} onChange={(e)=>{props.setAge(e.target.value)}}/></td>
            </tr> : null
          }
              {
                props.data.map((item, i) => {
                  return (
                    <tr key={item.id}>
                      <td>{i+1}</td>
                      <td onClick={(e)=>{console.log(e.target.outerText)}}>{item.fullName}</td>  
                      <td>{item.email}</td>
                      <td>{item.age}</td>
                      {
                        props.showButtonsDelete ? 
                        <td className={s.btnDelete}>
                        <Button className={s.button} variant="danger" onClick={()=>{Delete(item.id)}}><TrashFill className={s.iconStyle}/></Button>
                        </td> : null
                      }
                      {
                        props.showEditControls ?
                        <td className={s.btnDelete}>
                        <Button className={s.button} variant="warning" onClick={()=>{edit(item.fullName, item.email, item.age); setId(item.id);}}><PencilSquare className={s.iconStyle}/></Button>
                        </td> : null
                      }
                    </tr>
                  );
                })
              }
        </tbody>
      </Tab> : <Spinner animation="border" variant="info" />
      }
     </div>
  );
};

const mapStateToProps = (state) => {
  return {
    showSpiner: state.showSpiner,
    data: state.data,
    showButtonsDelete: state.showButtonsDelete,
    showAddControls: state.showAddControls,
    showEditControls: state.showEditControls,
    fullName: state.fullName,
    email: state.email,
    age: state.age,
  };
};

export default connect(mapStateToProps, actions)(Table);
