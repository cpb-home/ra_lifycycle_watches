import React, { useEffect, useState } from 'react';
import './App.css';
import Clock from './Clock/Clock';

interface IForm {
  title: string;
  timezone: string;
}

interface IClockList {
  title: string;
  timezone: string;
}

function App() {
  const [clockList, setclockList] = useState<IClockList[]>([{ title: 'aaa', timezone: '11' }]);
  const [form, setForm] = useState<IForm>({
    title: "",
    timezone: "",
  });
  const { title, timezone } = form;

  const [time, setTime] = useState<string>('');

  function getTime(): void {
    const currentTime = new Date();

    const hours = currentTime.getUTCHours() < 10 ? '0' + currentTime.getUTCHours() : currentTime.getUTCHours();
    const minutes = currentTime.getUTCMinutes() < 10 ? '0' + currentTime.getUTCMinutes() : currentTime.getUTCMinutes();
    const seconds = currentTime.getUTCSeconds() < 10 ? '0' + currentTime.getUTCSeconds() : currentTime.getUTCSeconds();

    const stringedTime = `${hours}:${minutes}:${seconds}`;
    setTimeout(() => setTime(() => stringedTime), 1000);
  }
  
  useEffect(getTime, [time]);

  function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (form.timezone && form.title) {
      setclockList([...clockList, { title: form.title, timezone: form.timezone }]);
    }
  }

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value
    })
  )}

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value
    })
  )}

  function removeHandler(id: number) {
    const updatedClockList: IClockList[] = clockList.filter((e, ind) => {
      if (ind !== id) {
        return e;
      }
    });
    setclockList([...updatedClockList]);
  }


  return (
    <div className='watches'>
      <h1 className='whatchesH1'>Часы</h1>
      <form className='form' onSubmit={handleOnSubmit}>
        <div className='formInnerContainer'>
          <label htmlFor="title">Укажите название</label>
          <input id='title'name='title' maxLength={11} type='text'onChange={handleChangeInput} value={title} required/>
        </div>
        <div className='formInnerContainer'>
          <label htmlFor="timezone">Выберите временную зону</label>
          <select name='timezone' id='timezone' onChange={handleChangeSelect} value={timezone} required>
            <option value=''>Выберите зону</option>
            <option value={-12}>-12</option>
            <option value={-11}>-11</option>
            <option value={-10}>-10</option>
            <option value={-9}>-9</option>
            <option value={-8}>-8</option>
            <option value={-7}>-7</option>
            <option value={-6}>-6</option>
            <option value={-5}>-5</option>
            <option value={-4}>-4</option>
            <option value={-3}>-3</option>
            <option value={-2}>-2</option>
            <option value={-1}>-1</option>
            <option value={0}>0</option>
            <option value={1}>+1</option>
            <option value={2}>+2</option>
            <option value={3}>+3</option>
            <option value={4}>+4</option>
            <option value={5}>+5</option>
            <option value={6}>+6</option>
            <option value={7}>+7</option>
            <option value={8}>+8</option>
            <option value={9}>+9</option>
            <option value={10}>+10</option>
            <option value={11}>+11</option>
            <option value={12}>+12</option>
          </select>
        </div>
        <div className='formInnerContainer'>
          <button type='submit'>Добавить</button>
        </div>
      </form>
      <div className='clocks'>
        {clockList?.map((e, ind) => <Clock key={ind} removeHandler={removeHandler} number={ind} title={e.title} timezone={e.timezone} time={time} />)}
      </div>
    </div>
  )
}

export default App
