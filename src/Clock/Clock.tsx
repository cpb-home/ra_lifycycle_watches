export interface IClock {
  title: string;
  timezone: string;
  time: string;
  number: number;
  removeHandler: (id: number) => void;
}

const Clock = ({ title, timezone, time, number, removeHandler } : IClock) => {

  function getZonedTime(time: string): string {
    if (time == '') {
      return 'загрузка...';
    }
    const splitedTime = time.split(':');
    const hours = splitedTime[0];
    const minutes = splitedTime[1];
    const seconds = splitedTime[2];

    let updatedHours;
    if ((Number(hours) + Number(timezone)) < 0) {
      updatedHours = 24 + (Number(hours) + Number(timezone));
    } else if ((Number(hours) + Number(timezone)) > 23) {
      updatedHours = 24 - (Number(hours) + Number(timezone));
    } else {
      updatedHours = Number(hours) + Number(timezone);
    }

    const zonedTime = `${updatedHours}:${minutes}:${seconds}`;

    return zonedTime;
  }

  const onClickHandler = () => {
    removeHandler(number);
  }

  return (
    <div className="clockContainer">
      <h6>{title}</h6>
      <div className="clock">{getZonedTime(time)}</div>
      <button name="button" type="button" className="remove" onClick={onClickHandler}>Удалить</button>
    </div>
  )
}

export default Clock
