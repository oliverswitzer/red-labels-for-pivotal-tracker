import React from 'react'

export default class OnboardingSection extends React.Component {
  constructor() {
    super();


    this.styles = {
      subheader: {
        marginBottom: '55px',
        textAlign: 'center'
      },
      numberIcon: {
        fontSize: '2em',
        margin: '0 auto',
        backgroundColor: 'rgba(19, 128, 120, 0.74902)',
        color: '#FFFFFF',
        borderRadius: '50%',
        height: '100px',
        width: '100px',
        textAlign: 'center',
        lineHeight: '100px'
      },
      howTo: {
        textAlign: 'center'
      },
      howToImage: {
        margin: '0 auto'
      }
    }
  }

  render() {
    return (
      <div className="ui three column grid">
        <div className="column">
          <div style={this.styles.howTo}>
            <div style={this.styles.numberIcon}>1</div>
            <h2 style={this.styles.subheader}>Finish a story and enter a learning.</h2>
            <img style={this.styles.howToImage} src="static/create-a-learning.gif"
                 className="ui wireframe image rounded how-to"/>
          </div>
        </div>
        <div className="column">
          <div style={this.styles.howTo}>
            <div style={this.styles.numberIcon}>2</div>
            <h2 style={this.styles.subheader}>We add the learning to an auto-generated chore for that week.</h2>
            <img style={this.styles.howToImage} src="static/add-it-to-story.gif"
                 className="ui wireframe image rounded how-to"/>
          </div>
        </div>
        <div className="column">
          <div style={this.styles.howTo}>
            <div style={this.styles.numberIcon}>3</div>
            <h2 style={this.styles.subheader}>Finish the chore and the tool composes your WWLTW email.</h2>

            <img style={this.styles.howToImage} src="static/send-the-email.gif"
                 className="ui wireframe image rounded how-to"/>
          </div>
        </div>
      </div>
    )
  }
}



