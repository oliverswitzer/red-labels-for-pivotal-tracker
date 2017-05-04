import React from 'react'
import {Radio, Segment} from 'semantic-ui-react';
import PropTypes from 'prop-types';

export default class ProjectToggleButton extends React.Component {
  constructor(props) {
    super(props);

    this._handleProjectToggle = this._handleProjectToggle.bind(this);
  }

  _handleProjectToggle() {
    this.props.handleProjectToggle(this.props.project.name)
  }

  render() {
    return (<div>
      <Segment compact size='large' color='green'>
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