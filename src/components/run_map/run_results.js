import React, { Component } from 'react';
import RunHeader from '../nav_folder/run_nav';
import axios from 'axios';
import ResultsChart from './results_chart';
import MyMapComponent from './map';
import apiKey from '../googlemap';
import './run_results.scss';

class RunResult extends Component {
  constructor(props) {
    super(props);

    this.state = {
      time: 0,
      distance: 0,
      calories: 0,
      pace: 0,
      id: 0,
      date: '',
      totalDistance: 0,
      chartData: {},
      options: {},
      currentLatLng: {
        lat: 33,
        lng: -117
      },
    }
  }

  componentDidMount() {
    this.getChartData();
  }

  // getId(){
  //   let {id} = this.state;
  //   if(this.props.match.params){
  //     id = this.props.match.params;
  //     console.log('this.props.match.params', id);
  //   }else{
  //     axios.get(`/api/get_last_runsession_results.php`).then((resp) => {
  //         console.log('getID', resp);
  //         id = resp['sessionData']['id']['id'];
  //     })
  //   }
  //   this.setState({
  //     id
  //   })
  // }

  async getChartData() {
    const {id} = this.props.match.params
    const resp = await axios.get(`/api/get_runsession_results.php?id=${id}`);
    console.log('resp: ', resp)
    const { sessionData, date, distance } = resp.data;
    console.log('session data:', sessionData)
    const miles = sessionData.map(mile => mile.perMile.currentMile);
    const time = sessionData.map(minutes => (minutes.perMile.perMileTime/60).toFixed(2));

    this.setState({
      time: 0,
      distance: 0,
      calories: 0,
      pace: 0,
      date,
      totalDistance: distance,
      chartData: {
        labels: [...miles],
        datasets: [
          {
            label: 'Time',
            fill: false,
            data: [...time],
            borderColor: 'blue',
            backgroundColor: '#1E90FF',

          }
        ]
      },
    })
  }

  render() {

    return(
    <div className="postRunBody">
      <RunHeader />
      <div>
        {this.state.date.date} at {this.state.date.time}
      </div>
      <div className="postRunMap">
        <MyMapComponent
        isMarkerShown
        // googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDtWT-ZM2l21GJnuT7cjNZYmbQa0flwL6c&v=3.exp&libraries=geometry,drawing,places"
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.exp&libraries=geometry,drawing,places`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        currentLocation = {this.state.currentLatLng}
        />
      </div>
    <div className="progressContainer">
      <div className="graphContainer">
        <div className="graph">
          <ResultsChart
            chartData={this.state.chartData}
            distance={this.state.totalDistance}
          />
        </div>
      </div>
      <div className="row">
        <div className="pieContainer col-md-6">
          <div className="offset-3 col-2 col-sm-3 col-md-6">
            <div className="progress" data-percentage="100">
              <span className="progress-left">
                <span className="progress-bar1"></span>
              </span>
              <span className="progress-right">
                <span className="progress-bar1"></span>
              </span>
            <div className="col-12 progress-value">
            Distance
              {/* <span>completed</span> */}
            </div>
            </div>
            </div>
          </div>
          <div className="pieContainer col-md-6">
          <div className="offset-2 col-2 col-sm-3 col-md-2">
            <div className="progress" data-percentage="100">
              <span className="progress-left">
                <span className="progress-bar2"></span>
              </span>
              <span className="progress-right">
                <span className="progress-bar2"></span>
              </span>
            <div className="col-12 progress-value">
            Time
            </div>
            </div>
            </div>
          </div>
          <div className="pieContainer col-md-6">
          <div className="offset-3 col-2 col-sm-3 col-md-2">
            <div className="progress" data-percentage="100">
              <span className="progress-left">
                <span className="progress-bar3"></span>
              </span>
              <span className="progress-right">
                <span className="progress-bar3"></span>
              </span>
            <div className="col-12 progress-value">
            Calories
            </div>
            </div>
            </div>
          </div>
          <div className="pieContainer col-md-6">
          <div className="offset-2 col-2 col-sm-3 col-md-2">
            <div className="progress" data-percentage="100">
              <span className="progress-left">
                <span className="progress-bar4"></span>
              </span>
              <span className="progress-right">
                <span className="progress-bar4"></span>
              </span>
            <div className="col-12 progress-value">
            Pace
            </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    )
  }
}

export default RunResult;
