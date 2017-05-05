import React from 'react';
import TrackerTokenForm from '../components/TrackerTokenForm.jsx';
import ProjectToggleSection from '../components/ProjectToggleSection.jsx';
import ProjectRepository from '../../content_scripts/repositories/project_repository';
import PivotalTrackerApiClient from '../../content_scripts/utilities/pivotal_tracker_api_client';
import fetchWrapper from '../../../src/content_scripts/utilities/fetch_wrapper'
import * as _ from 'lodash';
import {Header} from "semantic-ui-react";

export default class TokenInputAndToggleProjectContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      trackerApiToken: ''
    };

    this.styles = {
      container: {
        minHeight: '500px',
        backgroundColor: 'rgba(19, 128, 120, 0.75)',
        color: 'white',
        marginTop: '35px',
        paddingTop: '35px'
      },
      a: {
        color: '#0E538D'
      },
      header: {
        color: 'white'
      },
      subHeader: {
        color: 'white',
        fontSize: '0.7em',
        lineHeight: '1.5'
      }
    };

    this._setAlreadySavedToken();

    this.handleTokenSubmit = this.handleTokenSubmit.bind(this);
  }

  _setAlreadySavedToken() {
    this.props.chromeWrapper.get('trackerApiToken').then(trackerApiToken => {
      this.setState({trackerApiToken})
    });
  }

  handleTokenSubmit(trackerApiToken) {
    this.props.chromeWrapper.set({trackerApiToken}).then(() => {
      this.setState({trackerApiToken});
    });
  }

  render() {
    return (
      <div style={this.styles.container}>
        <div className="ui grid">
          <div className="row centered">
            <Header style={this.styles.header} as='h2'>
              To get started, we need your Pivotal Tracker token.
              <Header.Subheader style={this.styles.subHeader}>
                You can find your token at the bottom of <a style={this.styles.a}
                                                            href="https://www.pivotaltracker.com/profile">your
                profile</a>.
                We only use it to make new WWLTW chores every week.
              </Header.Subheader>
            </Header>
          </div>
          <div className="row centered">
            <div className="five wide column">
              <TrackerTokenForm trackerApiToken={this.state.trackerApiToken}
                                handleTokenSubmit={this.handleTokenSubmit}/>
            </div>
          </div>
          <div className="row centered">
            <div className="ten wide column">
              {
                !_.isEmpty(this.state.trackerApiToken) &&
                <ProjectToggleSection trackerApiToken={this.state.trackerApiToken}
                                      projectRepository={
                                        new ProjectRepository({
                                          trackerApiClient: new PivotalTrackerApiClient(this.state.trackerApiToken, fetchWrapper),
                                          chromeWrapper: this.props.chromeWrapper
                                        })}
                />
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}