import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    updateStartTime,
    updateTime,
    updateOnOff,
    reset,
    decrementSession,
    incrementSession,
    decrementBreak,
    incrementBreak,
    turnOffSound,
    selectTime,
    selectOnOff,
    selectBreakTime,
    selectSessionTime,
    selectOnSession,
    selectSound
} from './timerSlice';
import styles from './Timer.module.css';


export function Timer() {
    const time = useSelector(selectTime);
    const onOff = useSelector(selectOnOff);
    const onSession = useSelector(selectOnSession);
    const breakTime = useSelector(selectBreakTime);
    const sessionTime = useSelector(selectSessionTime);
    const sound = useSelector(selectSound);
    const dispatch = useDispatch();
    const clipURI = "https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav";

    function startTime() {
        return Math.floor((new Date().getTime()) / 1000);
    }

    useEffect(() => {
        let timerID = setInterval(
            () => {
                if (sound) {
                    ;
                    playSound();
                    dispatch(turnOffSound());
                }
                tick();
            },
            1000
        );
        return function cleanup() {
            clearInterval(timerID);
        };
    });
    function tick() {
        if (onOff) {
            dispatch(updateTime(((time.min * 60) + time.sec) - 1));
        }
    };
    const playSound = () => {
        const sound = document.getElementById('beep');
        sound.currentTime = 0;
        sound.play();
    };

    return (
        <div>
            <div id="timer-label" className={styles.timerLabel}>
                {onSession ? "Session" : "Break"}
            </div>
            <div id="time-left" className={styles.display}>
                {
                    ((time.min >= 10) ? time.min : ("0" + time.min))
                    + ":" +
                    ((time.sec >= 10) ? time.sec : ("0" + time.sec))
                }
            </div>
            <div>
                <button
                    id="start_stop"
                    className={styles.controlButton}
                    aria-label="Start timer"
                    onClick={() => {
                        dispatch(updateStartTime(startTime()));
                        dispatch(updateOnOff());
                    }}
                >
                    Play/Pause
                </button>
                <button
                    id="reset"
                    className={styles.controlButton}
                    aria-label="Stop timer"
                    onClick={() => {
                        dispatch(reset());
                        const sound = document.getElementById('beep');
                        sound.currentTime = 0;
                        sound.pause();
                    }}
                >
                    Stop
                </button>
                <div className={styles.actionDisplay}>
                    <div id="session-label" className={styles.label}>
                        Session Length
                    </div>
                    <div className={styles.displayButtons}>
                        <button
                            id="session-decrement"
                            className={styles.button}
                            aria-label="session decrement"
                            onClick={() => {
                                if (sessionTime > 60) {
                                    dispatch(decrementSession(
                                        sessionTime - 60
                                    ));
                                    if (onSession) {
                                        dispatch(updateTime(
                                            sessionTime - 60 + time.sec
                                        ));
                                    }
                                }
                            }}
                        >
                            -
                        </button>

                        <div id="session-length" className={styles.displayOne}>
                            {sessionTime === 1 
                            ? sessionTime 
                            : Math.floor(sessionTime / 60
                            )}
                        </div>
                        <button
                            id='session-increment'
                            className={styles.button}
                            aria-label="Increment value"
                            onClick={() => {
                                if (sessionTime <= 3598) {
                                    dispatch(incrementSession(
                                        sessionTime + 60
                                        ));
                                    if (onSession) {
                                        dispatch(updateTime(
                                            sessionTime + 60 + time.sec
                                            ));
                                    }
                                }
                            }}
                        >
                            +
                        </button>
                    </div>
                </div>
                <div className={styles.actionDisplay}>
                    <div id="break-label" className={styles.label}>
                        Break Length
                    </div>
                    <div className={styles.displayButtons}>
                        <button
                            id="break-decrement"
                            className={styles.button}
                            aria-label="break decrement"
                            onClick={() => {
                                if (breakTime > 60) {
                                    dispatch(decrementBreak(breakTime - 60));
                                    if (!onSession) {
                                        dispatch(updateTime(
                                            breakTime - 60 + time.sec
                                            ));
                                    }
                                }
                            }}
                        >
                            -
                        </button>

                        <div id="break-length" className={styles.displayOne}>
                            {breakTime === 1 
                            ? breakTime 
                            : Math.floor(breakTime / 60)
                            }
                        </div>

                        <button
                            id='break-increment'
                            className={styles.button}
                            aria-label="Increment value"
                            onClick={() => {
                                if (breakTime <= 3598) {
                                    dispatch(incrementBreak(breakTime + 60));
                                    if (!onSession) {
                                        dispatch(updateTime(
                                            breakTime + 60 + time.sec
                                            ));
                                    }
                                }
                            }}
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>
            <audio
                className='clip'
                id="beep"
                src={clipURI}
            />
        </div>
    );
}
