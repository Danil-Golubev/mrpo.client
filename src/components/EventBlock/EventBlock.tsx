import { event } from "../../types";
import style from "./EventBlock.module.css";
import { Link } from "react-router-dom";
export const EventBlock = ({ title, description, _id, imageUrl }:event) => {
  return (
    <>
      <Link to={`/events/${_id}`}>
        <div className={style.mainBlock}>
          <div className={style.imageBlock}>
            <img className={style.image} src={imageUrl} alt = {title}/>
          </div>
          <div className={style.textBlock}>
            <div className={style.date}>{description}</div>
            <div className={style.title}>{title}</div>
          </div>
        </div>
      </Link>
    </>
  );
};