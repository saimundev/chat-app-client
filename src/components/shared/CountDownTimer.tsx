import { useEffect, useState } from "react";
import { Button } from "../ui/button";

type TimerCounterProps = {
    initialMinute: number
    initialSeconds: number
}

const CountDownTimer = ({ initialMinute = 0, initialSeconds = 0 }: TimerCounterProps) => {

    const [minutes, setMinutes] = useState(initialMinute);
    const [seconds, setSeconds] = useState(initialSeconds);
    
    useEffect(() => {
        let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(myInterval)
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            }
        }, 1000)
        return () => {
            clearInterval(myInterval);
        };
    });

    const resentOTP = ()=>{
        setMinutes(1)
        setSeconds(20)
    }

    return (
        <div>
            {minutes === 0 && seconds === 0
                ? <Button onClick={resentOTP}>Resent OTP</Button>
                : <h1 className="text-bgColor font-semibold"> Resent OTP 0{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
            }
        </div>
    )
}

export default CountDownTimer;