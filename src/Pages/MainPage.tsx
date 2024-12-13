import { useCallback, useEffect, useState } from "react";
import { fetchGetIsReg } from "../api"
import { EventList } from "./EventList/EventList";
import { Registration } from "./Registration/Registration";


export const MainPage = ()=>{
    const [telegramId, setTelegramId] = useState<string>(''); //124142
    const [isReg, setIsReg] = useState<boolean>(false); //124142
    const handleIsReg = useCallback(async()=>{
        const data = await fetchGetIsReg({tgId:telegramId})
        setIsReg(data)
    },[telegramId])

    useEffect(() => {
      window.Telegram.WebApp.BackButton.hide();
  
    }, []);
    


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

        
      
      }, []); 


      useEffect(()=>{
        handleIsReg()
      },[handleIsReg]

      )
      
if(!isReg){
    return(<Registration/>)
}
    

    return(<EventList/>)
}