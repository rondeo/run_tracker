import React, { Component } from 'react';
import axios from "axios";
import MapNav from '../nav_folder/map_nav';
import Stopwatch from './stopwatch';

class RunMap extends Component {
    state = {
        distance: 100,
        time: 100,
        pace: 100,
        calories: 100,
        user_id: 2
    }

    startWatch = () => {
        this.refs.child.start();
    }
    stopWatch = () => {
        this.refs.child.stop();
    }
    resetWatch = () => {
        this.refs.child.reset();
        this.postCurrentRun();
    }
    postCurrentRun = () =>{
        const {distance, time, pace, calories, user_id} = this.state;
        axios.get(`/api/addrun.php?user_id=${user_id}&distance=${distance}&time=${time}&pace=${pace}&calories=${calories}`).then((resp) => {
            console.log('this is response:', resp);
        });
    }


    render() {
        return (
            <div className="mapBody">
                <MapNav />
                <div className="h-60 d-inline-block mapContainer">
                    <div className="map"></div>
                    <div className="buttonsContainer">
                        <button onClick={this.startWatch} className="btn btn-info">Start</button>
                        <button onClick={this.stopWatch} className="btn btn-info">Stop</button>
                        <button onClick={this.resetWatch} className="btn btn-info">Reset</button>
                    </div>
                </div>
                <div className="mapStatsContainer">
                    <div className="statContainer">
                        <div className="statTitle">Time</div>
                        <Stopwatch ref="child" className="statResult" />
                    </div>
                    <div className="statContainer">
                        <div className="statTitle">Distance</div>
                        <div className="statResult">100mi</div>
                    </div>
                    <div className="statContainer">
                        <div className="statTitle">Pace</div>
                        <div className="statResult">11:44</div>
                    </div>
                    <div className="statContainer">
                        <div className="statTitle">Calories Burned</div>
                        <div className="statResult">1,600 calories</div>
                    </div>
                </div>
            </div>
        )
    }
}
export default RunMap;
