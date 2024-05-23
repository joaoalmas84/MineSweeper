import { useState, useEffect } from "react";

function Timer(props: any) {

    const {timeout, onTimer} = props;

    const [seconds, setSeconds] = useState(timeout);
    const [idInterval, setIdInterval] = useState(0);

    useEffect(() => {
        const interval:any = setInterval(() => {
            setSeconds((prevSeconds:number) => prevSeconds - 1);
        }, 1000);

        setIdInterval(interval);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        onTimer(seconds);
        if (seconds === 0) { clearInterval(idInterval); }
    }, [seconds,onTimer,idInterval]);

    return <>{seconds}</>;
}

export default Timer;