import React from 'react'
import { Button, Form, Message } from 'semantic-ui-react'

export default class TrackerTokenForm extends React.Component {
  constructor() {
    super();

    this.state = {
      trackerApiToken: '',
      tokenSaved: false
    };

    this._setTrackerTokenIfExists();

    this.styles = {
      submit: {
        background: '#138078',
        color:  '#FFFFFF'
      }
    };

    this.handleTokenChange = this.handleTokenChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(e) {
    e.preventDefault();

    window.chrome.storage.sync.set({ trackerApiToken: this.state.trackerApiToken}, () => {
      this.setState({ tokenSaved: true });
    });
  };

  handleTokenChange(e) {
    this.setState({trackerApiToken: e.target.value});
  };

  _setTrackerTokenIfExists() {
    chrome.storage.sync.get('trackerApiToken', function(options) {
      this.setState({ trackerApiToken: options.trackerApiToken || '' })
    }.bind(this));
  };

  render() {
    return (
      <Form onSubmit={this.handleFormSubmit} success={this.state.tokenSaved}>
        <Form.Input onChange={this.handleTokenChange} value={this.state.trackerApiToken} label='Tracker API Token' />
        <Message
          success
          header='Saved successfully'
          content="You're ready to start using the WWLTW plugin"
        />
        <Button style={this.styles.submit}>Submit</Button>
      </Form>
    )
  }
}