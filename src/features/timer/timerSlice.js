import { createSlice } from '@reduxjs/toolkit';
// import { round, evaluate } from 'mathjs';

const initialState = {
    start: 0,
    time: { min: 25, sec: 0 },
    started: false,
    onOff: false,
    breakTime: (5 * 60 ),
    sessionTime: (25 * 60),
    onSession: true,
    sound: false,
    status: 'idle',
};

export const timerSlice = createSlice({
    name: 'timer',
    initialState,
    reducers: {
        updateStartTime: (state, action) => {
            state.start = action.payload;
        },
        updateTime: (state, action) => {
            console.log("action.payload " + action.payload);
            console.log("before");
            console.log("min: " + state.time.min);
            console.log("sec: " + state.time.sec);
            console.log("state.onSession: " + state.onSession);
            console.log("state.sessionTime: " + state.sessionTime);
            console.log("state.breakTime: " + state.breakTime);

            
            if(action.payload >= 0){
                    state.time.min = Math.floor(action.payload / 60);
                    state.time.sec = action.payload - (state.time.min * 60);
            } else {
                state.sound = true;
                if (state.onSession) {
                    state.time.min = Math.floor(state.breakTime / 60);
                    state.time.sec = state.breakTime - (state.time.min * 60);
                } else {
                    state.time.min = Math.floor(state.sessionTime / 60);
                    state.time.sec = state.breakTime - (state.time.min * 60);
                }
                state.onSession = !state.onSession;
                // state.start = Math.floor((new Date().getTime()) / 1000);
            }
            console.log("after");
            console.log("min: " + state.time.min);
            console.log("sec: " + state.time.sec);
            console.log("state.onSession: " + state.onSession);
            console.log("state.sessionTime: " + state.sessionTime);
            console.log("state.breakTime: " + state.breakTime);
        },
        reset: (state) => {
            state.onOff = false;
            state.started = false;
            state.onSession = true;
            state.time.min = 25;
            state.time.sec = 0;
            state.breakTime = 5 * 60;
            state.sessionTime = 25 * 60;
        },
        updateOnOff: (state) => {
            state.onOff = !state.onOff;
        },
        updateStarted: (state, action) => {
            state.started = action.payload;
        },
        updateOnSession: (state) => {
            state.onSession = !(state.onSession);
        },
        decrementSession: (state, action) => {
            // console.log(state.sessionTime);

            if(action.payload > 60) {
                state.sessionTime = action.payload;
            } else {
                state.sessionTime = 60;
            }
            if (state.onSession) {
                state.time.min = Math.floor((state.sessionTime)  / 60);
                state.time.sec = state.sessionTime - (state.time.min * 60) + state.time.sec;
            }
            // console.log(state.sessionTime);

        },
        incrementSession: (state, action) => {
            if(action.payload < 3598) {
                state.sessionTime = action.payload;
            } else {
                state.sessionTime = 3600;
            }
            if (state.onSession) {
                state.time.min = Math.floor((state.sessionTime)  / 60);
                state.time.sec = state.sessionTime - (state.time.min * 60) + state.time.sec;
            }
            // console.log(state.sessionTime /60);
        },
        decrementBreak: (state, action) => {
            if(action.payload > 60) {
                state.breakTime = action.payload;
            } else {
                state.breakTime = 60;
            }
            if (!state.onSession) {
                state.time.min = Math.floor((state.breakTime) / 60);
                state.time.sec = state.breakTime - (state.time.min * 60)  + state.time.sec;
            }
                // console.log(state.breakTime );
        },
        incrementBreak: (state, action) => {
            if(action.payload < 3600) {
                state.breakTime = action.payload;
            } else {
                state.breakTime = 3600;
            }
            if (!state.onSession) {
                state.time.min = Math.floor((state.breakTime) / 60);
                state.time.sec = state.breakTime - (state.time.min * 60)  + state.time.sec;
            }
            // console.log(state.breakTime );
        },
        resetOnSession: (state) => {
            // state.onSession = true;
        },
        resetBoth: (state, action) => {
            state.breakTime = 5;
            state.sessionTime = 25;
            state.time.min = 25;
            state.time.sec = 0;
        },
        startStopUpdateTimes: (state) => {
            state.time.min = (state.onSession) ? state.sessionTime : state.breakTime ;
            state.time.sec = 0;
        },
        turnOffSound: (state) => {
            state.sound = false;
        },
    }
});

export const { 
    updateStartTime,
    updateTime, 
    reset,
    updateOnOff,
    updateOnSession,
    resetOnSession,
    updateStarted, 
    updateDiff, 
    resetBoth, 
    startStopUpdateTimes,
    decrementSession, 
    decrementBreak, 
    incrementSession, 
    incrementBreak, 
    turnOffSound,
    incrementByAmount 
} = timerSlice.actions;

export const selectStartTime = (state) => state.timer.start;
export const selectDiff = (state) => state.timer.diff;
export const selectTime = (state) => state.timer.time;
export const selectStarted = (state) => state.timer.started;
export const selectOnOff = (state) => state.timer.onOff;
export const selectBreakTime = (state) => state.timer.breakTime;
export const selectSessionTime = (state) => state.timer.sessionTime;
export const selectOnSession = (state) => state.timer.onSession;
export const selectSound = (state) => state.timer.sound;


export default timerSlice.reducer;
