import  { useCallback, useEffect, useState } from 'react';

import './Event.css';
import { user, event } from '../../types';
import { fetchCheckReg, fetchGetEvent, fetchPostUser } from '../../api';
import { QRCodeCanvas } from "qrcode.react"; // Импорт компонента для QR-кода
import { useParams } from 'react-router-dom';

export const Event = ()=> {
  const [event, setEvent] = useState<event>({} as event);
  const [loading, setLoading] = useState<Boolean>(false);
  const [isReg, setIsReg] = useState<Boolean>(false);
  const [isScanned, setIsScanned] = useState<Boolean>(false);
const [userName, setUserName] = useState<string>('')
 const [telegramId, setTelegramId] = useState<string>('124142'); //124142
  const [firstName, setFirstName] = useState<string>('');
  const [secondName, setSecondName] = useState<string>('');
   const {id} = useParams()

const regPerson = async () => {
  const user:user = {
    tgId :telegramId,
    firstName : firstName,
    secondName: secondName
  }
  const event = {
    id:id as string
  }
  fetchPostUser({user, event})
 
};

const handleEvent = async()=>{
  const data = await fetchGetEvent(id as string)
  setEvent(data)
  setLoading(true)
}


const checkReg =  useCallback(async ()=>{
  const obj = { tgId: telegramId, id:id as string }
const result = await fetchCheckReg(obj)

if(Boolean(result.found)){
  setIsReg(true)
  setUserName(result.item.firstName)
  if(result.item.isScanned){
    setIsScanned(true)
  }
}

},[telegramId])


useEffect(()=>{
  handleEvent()
},[])


useEffect(() => {
  

  const getData =()=>{
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
  }
  getData()
  const interval  = setInterval(() => {
    getData()
  
  }, 3*1000);
  return ()=>clearInterval(interval)

}, [checkReg, isReg]); 


if(isScanned === true){
  return(<div>
 <p className='mainTitle'>Кажется твой QR код отсканирован</p>

  </div>)
}

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

if(loading === false){
  return(<div>123</div>)
}

  return (
    <div className="App">

<div className='regList'>
  <div>
<p className='mainTitle'>Регистрация на мероприятие {event.title as string}</p>
<p className='secondTitle'>Описание:{event.description}</p>

</div>

  <div>
  <p>Введи имя</p>
      <input onChange={(value)=>setFirstName(value.target.value as unknown as string)} className='input'></input></div>
      <div>
  
      <p>Введи Фамилию</p>
      <input onChange={(value)=>setSecondName(value.target.value as unknown as string)} className='input'></input>
      </div>
      <button onClick={()=>regPerson()} className='button'>Зарегестрироваться</button>
      <p className='secondTitle'>Количество участников:{event.members.length}</p>
      </div>
    </div>
  );
}

