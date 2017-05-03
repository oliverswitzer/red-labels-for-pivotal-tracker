import React from 'react';
import ReactDOM from 'react-dom'
import OnboardingSection from './components/OnboardingSection.jsx';
import TokenInputAndToggleProjectContainer from './containers/TokenInputAndToggleProjectContainer.jsx';
import ChromeStorageWrapper from '../content_scripts/utilities/chrome_storage_wrapper';

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
      <div style={this.styles.container}>
        <div className="ui grid">
          <div className="row">
            <div className="one wide column"/>
            <div className="fourteen wide column">
              <h1 style={this.styles.mainHeader}>What We Learned This Week for Pivotal Tracker</h1>
              <OnboardingSection/>
            </div>
          </div>
        </div>

        <TokenInputAndToggleProjectContainer chromeStorageWrapper={this.props.chromeStorageWrapper}/>
      </div>
    )
  }
}

ReactDOM.render(
  <Main chromeStorageWrapper={new ChromeStorageWrapper(chrome)}/>,
  document.getElementById('container')
);
