import React from 'react'
import {Button, Form, Message, Segment} from 'semantic-ui-react'
import PropTypes from 'prop-types';

export default class TrackerTokenForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      trackerApiToken: this.props.trackerApiToken,
      tokenSaved: false
    };

    this.styles = {
      container: {
        boxShadow: '3px 8px 34px -10px rgba(0,0,0,0.75)'
      },
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
      <Segment style={this.styles.container}>
        <Form onSubmit={this.handleFormSubmit} success={this.state.tokenSaved}>
          <Form.Input data-test='tracker-api-token' onChange={this.handleTokenChange} value={this.state.trackerApiToken} label='Tracker API Token' />
          <Message
            success
            header='Saved token successfully'
            content="You're ready to start using the WWLTW plugin"
          />
          <Button fluid style={this.styles.submit}>Submit</Button>
        </Form>
      </Segment>
    )
  }
}


TrackerTokenForm.propTypes = {
  trackerApiToken: PropTypes.string,
  handleTokenSubmit: PropTypes.func.isRequired
};