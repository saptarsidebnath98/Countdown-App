import { useRef } from "react";
import { useState } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({title, targetTime}){
    let timer = useRef();
    let dialog = useRef();

    // const [timerStarted, setTimerStared] = useState(false);
    // const [timerExpired, SetTimerExpired] = useState(false);

    
    const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);

    const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

    if(timeRemaining <= 0){
        clearInterval(timer.current);
        dialog.current.open();
    }

    function handleReset(){
        setTimeRemaining(targetTime * 1000);
    }
    function handleStart(){
        timer.current = setInterval(()=> {
            setTimeRemaining(prevTimeRemaining => prevTimeRemaining - 10);
        }, 10);
    }

    function handleStop(){
        clearInterval(timer.current);
        dialog.current.open();
    }
    return (
        <>
        <ResultModal 
        ref={dialog} 
        targetTime={targetTime} 
        remainingTime={timeRemaining}
        onReset={handleReset}/>
        <section className="challenge">
           <h2>{title}</h2> 
           <p className="challenge-time">
                {targetTime} second{targetTime > 1 ? 's' : ''}
           </p>
           <p>
               <button onClick={timerIsActive? handleStop : handleStart}>
                {timerIsActive ? 'Stop' : 'Start'} Challenge
               </button>
           </p>
           <p className={timerIsActive ? 'active' : undefined}>
                {timerIsActive ? 'Time is running...' : ' Timer inactive'}
           </p>
        </section>
        </>
    )
}