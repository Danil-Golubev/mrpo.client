import  { useEffect, useState } from 'react';

import './App.css';
import { user } from './types';
import { fetchCheckReg, fetchPostUser } from './api';

function App() {

  const [isReg, setIsReg] = useState<Boolean>(false);

 const [telegramId, setTelegramId] = useState<string>('111'); //124142
  const [firstName, setFirstName] = useState<string>('');
  const [secondName, setSecondName] = useState<string>('');


const regPerson = async () => {
  const person:user = {
    tgId :telegramId,
    firstName : firstName,
    secondName: secondName
  }
  fetchPostUser(person);
};


const checkReg = async ()=>{
  const obj = { tgId: telegramId }
const result = fetchCheckReg(obj)
if(Boolean(result)){
  setIsReg(true)
}
}



useEffect(() => {
  // Убедимся, что Telegram WebApp доступен
  if (window.Telegram) {
    const webApp = window.Telegram.WebApp;

    // Инициализация WebApp
    webApp.ready();

    // Получение информации о пользователе
    const user = webApp.initDataUnsafe.user;

    if (user) {
      setTelegramId(String(user.id));
      

    } else {
      console.log("Пользователь не авторизован.");
    }
  } else {
    console.warn("Telegram WebApp API недоступен.");
  }
  checkReg();

}, []); // Пустой массив за


if(isReg === true){
return(<div>123</div>)
}

  return (
    <div className="App">

<div className='regList'>
<p className='mainTitle'>Регистрация на мероприятие</p>
  <div>
    <p>username:{firstName}</p>

      <input onChange={(value)=>setFirstName(value.target.value as unknown as string)} className='input'></input></div>
      <div>
   
      <p>Введи Фамилию</p>
      <p>Введи имя</p>
  
      <input onChange={(value)=>setSecondName(value.target.value as unknown as string)} className='input'></input>
      </div>
      <button onClick={()=>regPerson()} className='button'>Зарегестрироваться</button>
      </div>
    </div>
  );
}

export default App;
