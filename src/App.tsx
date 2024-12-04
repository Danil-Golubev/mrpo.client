import  { useEffect, useState } from 'react';

import './App.css';



// type user = {
//   tgId:string,
//   firstName:string,
//   secondName:string
// }
function App() {
  // const [tgId, setIgId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [secondName, setSecondName] = useState('');

// const handleReg = ()=>{
//   // const object:user= {
//   //   // tgId:windo
//   // }
// }

useEffect(() => {
  // Убедимся, что Telegram WebApp доступен
  if (window.Telegram) {
    const webApp = window.Telegram.WebApp;

    // Инициализация WebApp
    webApp.ready();

    // Получение информации о пользователе
    const user = webApp.initDataUnsafe.user;

    if (user) {
      setFirstName("User ID:"+ user.id);
      setFirstName("Username:"+ user.username);

    } else {
      console.log("Пользователь не авторизован.");
    }
  } else {
    console.warn("Telegram WebApp API недоступен.");
  }
}, []); // Пустой массив за

  return (
    <div className="App">
<div className='regList'>
<p className='mainTitle'>Регистрация на мероприятие</p>
  <div>
    <p>username:{firstName}</p>
      <p>Введи имя</p>
      <input onChange={(value)=>setFirstName(value.target.value as unknown as string)} className='input'></input></div>
      <div>
   
      <p>Введи Фамилию</p>
      <p>Введи имя</p>
      <p>{secondName}</p>
      <input onChange={(value)=>setSecondName(value.target.value as unknown as string)} className='input'></input>
      </div>
      <button className='button'>Зарегестрироваться</button>
      </div>
    </div>
  );
}

export default App;
