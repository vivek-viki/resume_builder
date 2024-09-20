import React, { Component } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const steps = ['Summary', 'Experenice','Education', 'Skills','certificates','Projects'];

class LinearStepper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: this.props.activeStep,
      skipped: new Set(),
    };
  }

  isStepOptional = (step) => {
    return step === 1;
  };

  isStepSkipped = (step) => {
    return this.state.skipped.has(step);
  };

  handleNext = () => {
    let newSkipped = this.state.skipped;
    if (this.isStepSkipped(this.state.activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(this.state.activeStep);
    }

    this.setState((prevState) => ({
      activeStep: prevState.activeStep + 1,
      skipped: newSkipped,
    }));
  };

  handleBack = (num) => {
    this.setState((prevState) => ({
      activeStep: prevState.activeStep - 1,
    }));
  };

  handleSkip = () => {
    if (!this.isStepOptional(this.state.activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    this.setState((prevState) => {
      const newSkipped = new Set(prevState.skipped.values());
      newSkipped.add(this.state.activeStep);
      return {
        activeStep: prevState.activeStep + 1,
        skipped: newSkipped,
      };
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
      skipped: new Set(),
    });
  };

  render() {
    const { activeStep } = this.state;

    return (
      <Box sx={{ width: '100%' }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            // if (this.isStepOptional(index)) {
            //   labelProps.optional = (
            //     <Typography variant="caption">Optional</Typography>
            //   );
            // }
            // if (this.isStepSkipped(index)) {
            //   stepProps.completed = false;
            // }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            {/* <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={this.handleReset}>Reset</Button>
            </Box> */}
          </React.Fragment>
        ) : (
          <React.Fragment>
            {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              {/* <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={this.handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button> */}
              <Box sx={{ flex: '1 1 auto' }} />
              {/* {this.isStepOptional(activeStep) && (
                <Button color="inherit" onClick={this.handleSkip} sx={{ mr: 1 }}>
                  Skip
                </Button>
              )} */}

              {/* <Button onClick={this.handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button> */}
            </Box>
          </React.Fragment>
        )}
      </Box>
    );
  }
}

export default LinearStepper;
