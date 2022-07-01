import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { getGameTimerMs } from '@utils';
import { gameActions } from '@flow';
import { appConfig } from '@config';

const CircularProgressBar = ({ strokeWidth, sqSize, percentage, remainingTime }) => {

  // if (remainingTime > appConfig.ROULETTE_SPIN_TIMEOUT_MS) {
  //   return <div className="timer">Spining...</div>;
  // }

  // sqSize -- Size of the enclosing square

  // SVG centers the stroke width on the radius, subtract out so circle fits in square
  const radius = (sqSize - strokeWidth) / 2;
  // Enclose cicle in a circumscribing square
  const viewBox = `0 0 ${sqSize} ${sqSize}`;
  // Arc length at 100% coverage is the circle circumference
  const dashArray = radius * Math.PI * 2;
  // Scale 100% coverage overlay with the actual percent
  const dashOffset = dashArray - dashArray * percentage / 100;


  //time calculations
  let minutes = Math.trunc(remainingTime / 60);
  let seconds = Math.trunc(remainingTime % 60);
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }


  return (
    <svg
      width={sqSize}
      height={sqSize}
      viewBox={viewBox}>
      <circle
        className="circle-background"
        cx={sqSize / 2}
        cy={sqSize / 2}
        r={radius}
        strokeWidth={`${strokeWidth}px`} />
      <circle
        className="circle-progress"
        cx={sqSize / 2}
        cy={sqSize / 2}
        r={radius}
        strokeWidth={`${strokeWidth}px`}
        // Start progress marker at 12 O'Clock
        transform={`rotate(-90 ${sqSize / 2} ${sqSize / 2})`}
        style={{
          strokeDasharray: dashArray,
          strokeDashoffset: dashOffset
        }} />
      <text
        className="circle-text"
        x="50%"
        y="50%"
        dy=".3em"
        textAnchor="middle">
        {/* {`${minutes}:${seconds}`} */}
      </text>
      </svg>
  );
};

export const Timer = () => {


  


  const { startAt, status, time } = useSelector(state => state.game);

  if (!time || !startAt || status !== appConfig.GAME_PROGRESS_STATUS) return <></>; 


  



  const timeout = getGameTimerMs(time, startAt);
  const remainingTime = (appConfig.ROULETTE_SPIN_TIMEOUT_MS - timeout) / 1000;

  const percentage = (timeout / (appConfig.ROULETTE_SPIN_TIMEOUT_MS / 100)).toFixed(2);

  console.log('remainingTime', remainingTime);

  return (
    <div className="time-wrapper">
      <CircularProgressBar
        strokeWidth="6"
        sqSize="80"
        percentage={percentage}
        remainingTime={remainingTime}
      />
    </div>
  );
};

export default Timer;


// to check https://codepen.io/search/pens?q=countdown
