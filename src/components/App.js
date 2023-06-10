// import React, { useRef, useState } from 'react'
// import '../styles/App.css';
// const App = () => {
//   const startTime = useRef(0);
//   const intervalRef = useRef(0);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [laps, setLaps] = useState([]);

//   return (
//     <div id="main">
//       <section>
//         <h1 className='seconds-elapsed'>Stopwatch Time</h1>
//         <section className='buttons'>
//           <button className="start-btn">START</button>
//           <button className="stop-btn">STOP</button>
//           <button className="lap-btn">LAP</button>
//           <button className="reset-btn">RESET</button>
//         </section>
//       </section>
//       <section className='lap-section'>
//         <h2>Laps</h2>
//         <section className='laps'>
//           <p>lap</p>
//           <p>lap</p>
//           <p>lap</p>
//         </section>
//       </section>
//     </div>
//   )
// }


// export default App;


import React, { useRef, useState, useEffect } from 'react';
import '../styles/App.css';

const App = () => {
const startTime = useRef(0);
const intervalRef = useRef(null);
const [currentTime, setCurrentTime] = useState(0);
const [laps, setLaps] = useState([]);
const [isLapSectionVisible, setIsLapSectionVisible] = useState(false);

useEffect(() => {
return () => {
clearInterval(intervalRef.current);
};
}, []);

const startTimer = () => {
if (!intervalRef.current) {
startTime.current = Date.now() - currentTime;
intervalRef.current = setInterval(() => {
setCurrentTime(Date.now() - startTime.current);
}, 10);
}
};

const stopTimer = () => {
if (intervalRef.current) {
clearInterval(intervalRef.current);
intervalRef.current = null;
}
};

const addLap = () => {
if (intervalRef.current) {
const lapTime = formatTime(currentTime);
setLaps((prevLaps) => [...prevLaps, lapTime]);
setIsLapSectionVisible(true);
}
};

const resetTimer = () => {
stopTimer();
setCurrentTime(0);
setLaps([]);
setIsLapSectionVisible(false);
};

const formatTime = (time) => {
const milliseconds = String(time % 1000).padStart(3, '0');
const seconds = String(Math.floor((time / 1000) % 60)).padStart(2, '0');
const minutes = String(Math.floor((time / 1000 / 60) % 60)).padStart(2, '0');
const hours = String(Math.floor((time / 1000 / 3600) % 24)).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
};

return (
  <div id="main">
    <section>
      <h1 className='seconds-elapsed'>{formatTime(currentTime)}</h1>
        <section className='buttons'>
          <button className="start-btn" onClick={startTimer}>START</button>
          <button className="stop-btn" onClick={stopTimer}>STOP</button>
          <button className="lap-btn" onClick={addLap}>LAP</button>
          <button className="reset-btn" onClick={resetTimer}>RESET</button>
        </section>
    </section>
      {isLapSectionVisible && (
      <section className='lap-section'>
        <h2>Laps</h2>
          <section className='laps'>
            {laps.map((lap, index) => (
            <p key={index}>{lap}</p>
          ))}
      </section>
</section>
)}
</div>
);
};

export default App;
