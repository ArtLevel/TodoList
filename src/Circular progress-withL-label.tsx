import React, {FC, useState} from "react";
import {Box, CircularProgress, Typography} from "@mui/material";

interface ICircularProgressWithLabel {
    value: number
}

const  CircularProgressWithLabel: React.FC<ICircularProgressWithLabel> = (props) => {

    return (
        <Box position="relative" display="inline-flex">
            <CircularProgress variant="determinate" {...props}/>
            <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Typography variant="caption" component="div" color="textSecondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}

interface ICircularStatic{
    isWaiting: boolean
    //interval milliseconds
    timeInterval: number
}

//TASK
//Use redux instead local state

export const  CircularStatic: FC<ICircularStatic> = (props) => {
    const [progress, setProgress] = useState(0);
    const [isWaitingDone, setIsWaitingDone] = useState(true);

    React.useEffect(() => {
        let timer: ReturnType<typeof setInterval>
        if (props.isWaiting && isWaitingDone) {
            timer = setInterval(() => {
                setProgress((prevProgress) => {
                    if (prevProgress === 100) {
                        clearInterval(timer)
                        setIsWaitingDone(false)
                    }
                    return prevProgress >= 100 ? 0 : prevProgress + 10
                });
            }, props.timeInterval);
        } else {
            setProgress(0)
        }

        return () => {
            clearInterval(timer);
        };
    }, [props.isWaiting]);

    return <CircularProgressWithLabel value={progress}/>;
}




