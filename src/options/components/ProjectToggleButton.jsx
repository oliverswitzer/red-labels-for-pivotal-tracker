import React from 'react'
import {Radio} from 'semantic-ui-react';
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
      <Radio toggle
             label={this.props.project.name}
             onChange={this._handleProjectToggle}
             checked={!this.props.project.disabled}/>
    </div>)
  }
}

ProjectToggleButton.propTypes = {
  project: PropTypes.object.isRequired,
  handleProjectToggle: PropTypes.func.isRequired
};