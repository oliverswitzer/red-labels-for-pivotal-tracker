import React from 'react';
import ReactDOM from 'react-dom'
import TrackerTokenForm from './components/TrackerTokenForm.jsx';
import OnboardingSection from "./components/OnboardingSection.jsx";

class Main extends React.Component {
  constructor() {
    super();

    this.styles = {
      container: {
        marginTop: '50px'
      },
      mainHeader: {
        marginBottom: '55px',
        textAlign: 'center'
      }
    }
  }

  render() {
    return (
      <div style={this.styles.container} className="ui grid">
        <div className="row">
          <div className="one wide column"/>
          <div className="fourteen wide column">
            <h1 style={this.styles.mainHeader}>What We Learned This Week for Pivotal Tracker</h1>
            <OnboardingSection/>
          </div>
        </div>

        <div className="row centered">
          <h2>To get started, we need your Pivotal Tracker token.</h2>
        </div>
        <div className="row centered">
          <h4>You can find your token at the bottom of <a href="https://www.pivotaltracker.com/profile">your profile</a>.
            We only use it to make new WWLTW chores every week.</h4>
        </div>
        <div className="row centered">
          <div className="five wide column">
            <TrackerTokenForm/>
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <Main/>,
  document.getElementById('container')
);
