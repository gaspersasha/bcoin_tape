import React from 'react';
import { useSelector } from 'react-redux';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { getGameTimerMs } from '@utils';
import { appConfig } from '@config';
import { usePageVisibility } from 'react-page-visibility';

const renderTime = ({ remainingTime }) => {

  if (remainingTime > appConfig.ROULETTE_SPIN_TIMEOUT_MS) {
    return <div className="timer">Spining...</div>;
  }

  let minutes = Math.trunc(remainingTime / 60);
  let seconds = remainingTime % 60;
  
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  return (
    <div className="timer">
      <div className="value">{`${minutes}:${seconds}`}</div>
    </div>
  );
};

export const Timer = () => {

  const isVisible = usePageVisibility();
  const { startAt, status } = useSelector(state => state.game);

  if (!isVisible || !startAt || status !== appConfig.GAME_PROGRESS_STATUS) return <></>; 

  //because startAt is local timw
  const time = new Date().getTime();

  const timeout = getGameTimerMs(time, startAt);
  console.log('timeoutSec', timeout);

  return (
    <div className="timer-wrapper">
      <CountdownCircleTimer
        isPlaying
        size={70}
        strokeWidth={4}
        trailColor="#004777"
        color="#004777"
        colors={[
          ['#004777', 0.33],
          ['#F7B801', 0.33],
          ['#A30000', 0.33],
        ]}
        strokeLinecap="round"
        initialRemainingTime={(appConfig.ROULETTE_SPIN_TIMEOUT_MS - timeout) / 1000}
        duration={appConfig.ROULETTE_SPIN_TIMEOUT_MS / 1000}
        // onComplete={() => [true, 1000]}
      >
        {renderTime}
      </CountdownCircleTimer>
    </div>
  );
};

export default Timer;
