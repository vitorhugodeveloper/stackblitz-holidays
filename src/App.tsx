import React, { useState, useEffect } from 'react';
import './style.css';

const holidays2023 = [
  { name: 'Proclamação da Independência', date: '2023-09-07' },
  { name: 'Nossa Sr.a Aparecida', date: '2023-10-12' },
  { name: 'Finados', date: '2023-11-02' },
  { name: 'Proclamação da República', date: '2023-11-15' },
  { name: 'Natal', date: '2023-12-25' },
  { name: 'Ano Novo', date: '2024-01-01' },
];

export default function App() {
  const [counters, setCounters] = useState([]);

  useEffect(() => {
    const today = new Date();

    const newCounters = holidays2023.map((holiday) => {
      const holidayDate: Date = new Date(holiday.date);
      const timeRemaining: number =
        holidayDate > today ? holidayDate - today : 0;
      return {
        name: holiday.name,
        timeRemaining,
        date: formatDateToDDMMYYYY(holidayDate),
      };
    });

    setCounters(newCounters);
  }, []);

  function formatDateToDDMMYYYY(date) {
    if (!(date instanceof Date)) {
      return 'Invalid Date';
    }

    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are 0-based
    const year = date.getFullYear();

    const formattedDay = day < 10 ? `0${day}` : `${day}`;
    const formattedMonth = month < 10 ? `0${month}` : `${month}`;

    return `${formattedDay}/${formattedMonth}/${year}`;
  }

  return (
    <div className="App">
      <h1>Contagem regressiva para os feriados de 2024</h1>
      <div className="counters">
        {counters.map((counter, index) => (
          <div className="counter" key={index}>
            <h2>{counter.name}</h2>
            <p>
              {Math.floor(counter.timeRemaining / (1000 * 60 * 60 * 24))} dias
            </p>
            <span>{counter.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
