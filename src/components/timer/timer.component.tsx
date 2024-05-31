import { useState, useEffect } from "react";

function Timer(props: any) {

    const {onTimer} = props;

    const [seconds, setSeconds] = useState(0);
    const [idInterval, setIdInterval] = useState(0);

    let str: string;

    useEffect(() => {
        const interval:any = setInterval(() => {
            setSeconds((prevSeconds:number) => prevSeconds + 1);
        }, 1000);

        setIdInterval(interval);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        onTimer(seconds);
    }, [seconds,idInterval]);

    str = seconds + " seg."

    return <>{str}</>;
}

export default Timer;