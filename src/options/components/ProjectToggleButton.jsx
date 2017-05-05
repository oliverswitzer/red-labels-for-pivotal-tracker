import React from 'react'
import {Radio, Segment} from 'semantic-ui-react';
import PropTypes from 'prop-types';

export default class ProjectToggleButton extends React.Component {
  constructor(props) {
    super(props);

    this.styles = {
      segment: {
        width: '100%',
        boxShadow: '3px 8px 34px -10px rgba(0,0,0,0.75)'
      }
    };

    this.state = {
      isHandlingToggle: false
    };

    this._handleProjectToggle = this._handleProjectToggle.bind(this);
  }

  _handleProjectToggle() {
    this.setState({isHandlingToggle: true});

    this.props.handleProjectToggle(this.props.project.name).then(() => {
      this.setState({isHandlingToggle: false});
    })
  }

  render() {
    return (<div>
      <Segment compact loading={this.state.isHandlingToggle} style={this.styles.segment} size='large'>
        <Radio slider
                  style={{ fontSize: '15px'}}
                  label={this.props.project.name}
                  onChange={this._handleProjectToggle}
                  checked={!this.props.project.disabled}/>
      </Segment>
    </div>)
  }
}

ProjectToggleButton.propTypes = {
  project: PropTypes.object.isRequired,
  handleProjectToggle: PropTypes.func.isRequired
};