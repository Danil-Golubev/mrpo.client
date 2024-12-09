import style from "./EventSkeleton.module.css";

export const EventSkeleton = () => {
  return (
    <>
      <div className={style.mainBlock}>
        <div className={style.imageBlock}></div>
        <div className={style.textBlock}>
          <div className={style.date}></div>
          <div className={style.title}></div>
        </div>
      </div>
    </>
  );
};