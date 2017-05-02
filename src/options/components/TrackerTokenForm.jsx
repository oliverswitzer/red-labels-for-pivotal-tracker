import React from 'react'
import { Button, Form, Message } from 'semantic-ui-react'

export default class TrackerTokenForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      trackerApiToken: this.props.trackerApiToken,
      tokenSaved: false
    };

    this.styles = {
      submit: {
        background: '#138078',
        color:  '#FFFFFF'
      }
    };

    this.handleTokenChange = this.handleTokenChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      trackerApiToken: nextProps.trackerApiToken
    })
  }

  handleFormSubmit(e) {
    e.preventDefault();

    this.props.handleTokenSubmit(this.state.trackerApiToken);
    this.setState({tokenSaved: true});

  };

  handleTokenChange(e) {
    this.setState({trackerApiToken: e.target.value});
  };

  render() {
    return (
      <Form onSubmit={this.handleFormSubmit} success={this.state.tokenSaved}>
        <Form.Input onChange={this.handleTokenChange} value={this.state.trackerApiToken} label='Tracker API Token' />
        <Message
          success
          header='Saved token successfully'
          content="You're ready to start using the WWLTW plugin"
        />
        <Button style={this.styles.submit}>Submit</Button>
      </Form>
    )
  }
}