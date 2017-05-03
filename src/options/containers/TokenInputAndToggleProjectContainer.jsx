import React from 'react';
import TrackerTokenForm from '../components/TrackerTokenForm.jsx';
import ProjectToggleSection from '../components/ProjectToggleSection.jsx';
import ProjectRepository from '../../content_scripts/repositories/project_repository';
import PivotalTrackerApiClient from '../../content_scripts/utilities/pivotal_tracker_api_client';
import fetchWrapper from '../../../src/content_scripts/utilities/fetch_wrapper'
import * as _ from 'lodash';

export default class TokenInputAndToggleProjectContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      trackerApiToken: ''
    };

    this._setAlreadySavedToken();

    this.handleTokenSubmit = this.handleTokenSubmit.bind(this);
  }

  _setAlreadySavedToken() {
    this.props.chromeStorageWrapper.get('trackerApiToken').then(trackerApiToken => {
      this.setState({trackerApiToken})
    });
  }

  handleTokenSubmit(trackerApiToken) {
    this.props.chromeStorageWrapper.set({trackerApiToken}).then(() => {
      this.setState({trackerApiToken});
    });
  }

  render() {
    return (
      <div className="ui grid">
        <div className="row centered">
          <h2>To get started, we need your Pivotal Tracker token.</h2>
        </div>
        <div className="row centered">
          <h4>You can find your token at the bottom of <a href="https://www.pivotaltracker.com/profile">your profile</a>.
            We only use it to make new WWLTW chores every week.</h4>
        </div>
        <div className="row centered">
          <div className="five wide column">
            <TrackerTokenForm trackerApiToken={this.state.trackerApiToken}
                              handleTokenSubmit={this.handleTokenSubmit}/>
            {
              !_.isEmpty(this.state.trackerApiToken) && <ProjectToggleSection trackerApiToken={this.state.trackerApiToken}
                                                                            projectRepository={
                                                                              new ProjectRepository({
                                                                                trackerApiClient: new PivotalTrackerApiClient(this.state.trackerApiToken, fetchWrapper),
                                                                                chromeStorageWrapper: this.props.chromeStorageWrapper
                                                                              })}
                                                                        />
            }
          </div>
        </div>
      </div>
    )
  }
}