import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';



type user = {
  tgId:string,
  firstName:string,
  secondName:string
}
function App() {
  const [tgId, setIgId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [secondName, setSecondName] = useState('');

const handleReg = ()=>{
  // const object:user= {
  //   // tgId:windo
  // }
}

useEffect(() => {
  // Инициализация WebApp


  const initDataUnsafe = window.Telegram.WebApp.initDataUnsafe;

  if (initDataUnsafe && initDataUnsafe.user && initDataUnsafe.user.username) {
    setFirstName(initDataUnsafe.user.username); // Установка username в состояние
  } else {
    setFirstName("Username не установлен");
  }
}, []);


  return (
    <div className="App">
<div className='regList'>
<p className='mainTitle'>Регистрация на мероприятие</p>
  <div>
      <p>Введи имя</p>
      <input onChange={(value)=>setFirstName(value.target.value as unknown as string)} className='input'></input></div>
      <div>
   
      <p>Введи Фамилию</p>
      <p>Введи имя</p>
      <input onChange={(value)=>setSecondName(value.target.value as unknown as string)} className='input'></input>
      </div>
      <button className='button'>Зарегестрироваться</button>
      </div>
    </div>
  );
}

export default App;
