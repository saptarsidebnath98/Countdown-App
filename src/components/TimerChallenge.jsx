import { useRef } from "react";
import { useState } from "react";

export default function TimerChallenge({title, targetTime}){
    const [timerStarted, setTimerStared] = useState(false);
    const [timerExpired, SetTimerExpired] = useState(false);

    let timer = useRef();

    function handleStart(){
        timer.current = setTimeout(()=> {
            SetTimerExpired(true);
        }, targetTime * 1000);

        setTimerStared(true);
    }

    function handleStop(){
        clearTimeout(timer.current);
    }
    return (
        <section className="challenge">
           <h2>{title}</h2> 
           {timerExpired && <p>You Lost!</p>}
           <p className="challenge-time">
                {targetTime} second{targetTime > 1 ? 's' : ''}
           </p>
           <p>
               <button onClick={timerStarted? handleStop : handleStart}>
                {timerStarted ? 'Stop' : 'Start'} Challenge
               </button>
           </p>
           <p className={timerStarted ? 'active' : undefined}>
                {timerStarted ? 'Time is running...' : ' Timer inactive'}
           </p>
        </section>
    )
}