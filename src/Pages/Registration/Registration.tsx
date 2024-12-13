import { useCallback, useEffect, useState } from "react";
import { fetchGetIsReg, fetchPostUser } from "../../api";
import {user} from '../../types'

export const Registration = ()=>{

  const [telegramId, setTelegramId] = useState<string>(''); //124142
  const [isReg, setIsReg] = useState<boolean>(false); //124142
    const [firstName, setFirstName] = useState<string>('');
    const [secondName, setSecondName] = useState<string>('');

    
    const handleIsReg = useCallback(async()=>{
        const data = await fetchGetIsReg({tgId:telegramId})
        setIsReg(data)
    },[telegramId])


    const regPerson = async () => {
        const user:user = {
          tgId :telegramId,
          firstName : firstName,
          secondName: secondName
        }
        fetchPostUser(user)
       
      };
      


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
        handleIsReg();
        }
        getData()
        const interval  = setInterval(() => {
          getData()
        
        }, 3*1000);
        return ()=>clearInterval(interval)
      
      }, [handleIsReg, isReg]); 
      

return(
<div className="App">

<div className='regList'>
  <div>
<p className='mainTitle'>Регистрация на платформе</p>
</div>

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
)
}