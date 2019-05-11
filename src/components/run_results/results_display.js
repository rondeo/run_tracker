import React, {Fragment} from 'react';
import './run_results.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFire, faClock, faRoad, faStopwatch } from '@fortawesome/free-solid-svg-icons'
library.add( faFire, faClock, faRoad, faStopwatch )

export default props => {

  const {minutesSecondsRan, distance, pace, calories} = props;
  const paceWithInfinityCheck = /Infinity/.test(pace) ? pace.replace(/Infinity/gi, '0') : pace;
  const paceWithNaNCheck = /NaN/.test(pace) ? paceWithInfinityCheck.replace(/NaN/gi, '0') : pace;
  return (
    <Fragment>
      <div className="row">
        <div className="col-6">
          <div className="results-display-container">
            <p className="runtitle"><i><FontAwesomeIcon icon="clock" color="rgba(107, 185, 240, 1)"/></i> Duration (min:sec)</p>
            <p>{minutesSecondsRan}</p>
          </div>
        </div>
        <div className="col-6">
          <div className="results-display-container">
            <p className="runtitle"><i><FontAwesomeIcon icon="road" color="grey"/></i> Distance</p>
            <p>{distance} miles</p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <div className="results-display-container">
            <p className="runtitle"><i><FontAwesomeIcon icon="stopwatch" color="rgba(130, 82, 0.8)"/></i> Avg Pace (min/mile)</p>
            <p>{paceWithNaNCheck}</p>
          </div>
        </div>
        <div className="col-6">
          <div className="results-display-container">
            <p className="runtitle"><i><FontAwesomeIcon icon="fire" color="rgba(226,88,34,0.8)"/></i> Calories</p>
            <p>{calories}</p>
          </div>
        </div>
      </div>
    </Fragment>
  )
}
