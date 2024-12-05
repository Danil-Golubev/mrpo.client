import  { useCallback, useEffect, useState } from 'react';

import './App.css';
import { user } from './types';
import { fetchCheckReg, fetchPostUser } from './api';
import { QRCodeCanvas } from "qrcode.react"; // Импорт компонента для QR-кода
function App() {

  const [isReg, setIsReg] = useState<Boolean>(false);
  const [isScanned, setIsScanned] = useState<Boolean>(false);
const [userName, setUserName] = useState<string>('')
 const [telegramId, setTelegramId] = useState<string>(''); //124142
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


const checkReg =  useCallback(async ()=>{
  const obj = { tgId: telegramId }
const result = await fetchCheckReg(obj)

if(Boolean(result.found)){
  setIsReg(true)
  setUserName(result.item.firstName)
}
if(Boolean(result.item.isScanned)){
  setIsScanned(true)

}
},[telegramId])



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

}, [checkReg]); 


if(isReg === true){
return(<div>
<div className="App">
      {/* <div>Helo fren: {username}</div> Отображаем username */}
      <div className='regList'>
      <p className='mainTitle'>Привет, {userName}! покажи этот QR код на входе</p>
 
      <div className='mainBlock'>
          <QRCodeCanvas value={telegramId} size={200} /> 
       
      </div>
      </div>
    </div>

</div>)
}

if(isScanned === true){
  return(<div>
 <p className='mainTitle'>Кажется твой QR код отсканирован</p>

  </div>)
}

  return (
    <div className="App">

<div className='regList'>
<p className='mainTitle'>Регистрация на мероприятие</p>
  <div>

  <p>Введи имя</p>
      <input onChange={(value)=>setFirstName(value.target.value as unknown as string)} className='input'></input></div>
      <div>
  
      <p>Введи Фамилию</p>
      <input onChange={(value)=>setSecondName(value.target.value as unknown as string)} className='input'></input>
      </div>
      <button onClick={()=>regPerson()} className='button'>Зарегестрироваться</button>
      </div>
    </div>
  );
}

export default App;
