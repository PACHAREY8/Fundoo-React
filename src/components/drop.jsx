import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

const styles = {
  root: {
    maxWidth: 400,
    flexGrow: 1,
  },
};

class Dropp extends Component {
  state = {
    activeStep: 0,
  };

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };

  render() {
    const { classes, theme } = this.props;

    return (
      <MobileStepper
        variant="progress"
        steps={3}
        position="static"
        activeStep={this.state.activeStep}
        className={classes.root}
        nextButton={
          <Button size="small" onClick={this.handleNext} disabled={this.state.activeStep === 2}>
            Next
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>
        }
      />

    );
  }
}

Dropp.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Dropp);

