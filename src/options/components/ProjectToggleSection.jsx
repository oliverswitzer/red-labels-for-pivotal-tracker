import React from 'react'
import ProjectToggleButton from './ProjectToggleButton.jsx'
import {Grid} from 'semantic-ui-react';

export default class ProjectToggleSection extends React.Component {
  constructor(props) {
    super(props);


    this.styles = {
      grid: {
        marginTop: '25px',
        paddingBottom: '50px'
      },
      container: {
        marginTop: '25px'
      },
      header: {
        textAlign: 'center'
      }
    };
    this.state = {
      projects: []
    };

    this.props.projectRepository.findAll().then(projects => {
      this.setState({projects: projects});
    });

    this.handleProjectToggle = this.handleProjectToggle.bind(this);
    this._toggleProjectDisabledStatus = this._toggleProjectDisabledStatus.bind(this);
    this._renderColumn = this._renderColumn.bind(this);
  }

  handleProjectToggle(projectName) {
    this.props.projectRepository.findAll()
      .then(allProjects =>
        allProjects.find(project => project.name === projectName)
      )
      .then(this._toggleProjectDisabledStatus)
      .then(this.props.projectRepository.update)
      .then(() => this.props.projectRepository.findAll())
      .then((updatedProjects) => {
        this.setState({projects: updatedProjects});
      })
  };

  _toggleProjectDisabledStatus(projectToToggle) {
    projectToToggle.disabled = !projectToToggle.disabled;
    return projectToToggle;
  }

  _renderColumn(project, index) {
    return (
      <Grid.Column key={index}>
        <ProjectToggleButton project={project} handleProjectToggle={this.handleProjectToggle} key={index}/>
      </Grid.Column>
    )
  }

  render() {
    return (
      <div style={this.styles.container}>
        <h2 style={this.styles.header}>Enable the plugin for the projects you want to use it for:</h2>
        <Grid style={this.styles.grid} columns='three'>
          {
            _.chunk(this.state.projects, 3).map((projectsByTwo, rowIndex) => {
              return (
                <Grid.Row key={rowIndex}>
                  { projectsByTwo.map((project, columnIndex) => this._renderColumn(project, columnIndex)) }
                </Grid.Row>
              )
            })
          }
        </Grid>
      </div>
    )
  }
}
