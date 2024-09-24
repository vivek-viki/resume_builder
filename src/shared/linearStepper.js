import React, { Component } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import {withSharedSnackbar  } from '../shared/snackBar';
import { useStyles } from '../shared/styles/defaultStyle';
import { useNavigate, useParams } from 'react-router-dom';


const steps = ['Personal Details','Summary', 'Experenice','Education', 'Skills','certificates','Projects'];

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
    debugger;
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

  handleStepClick = (stepIndex) => {
    if(stepIndex == 0){
      this.props.navigate('/personal');
    }
    if(stepIndex == 1){
      this.props.navigate('/links');
    }
    if(stepIndex == 2){
      this.props.navigate('/expereince');
    }
    if(stepIndex == 3){
      this.props.navigate('/education');
    }
    if(stepIndex == 4){
      this.props.navigate('/skills');
    }
    if(stepIndex == 5){
      this.props.navigate('/certificates');
    }
    this.setState({ activeStep: stepIndex });
  };


  render() {
    const { activeStep } = this.state;

    return (
      <Box sx={{ width: '100%' }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {
              onClick: index <= activeStep ? () => this.handleStepClick(index) : null,
               style: { cursor: 'pointer' }, // Change the cursor to pointer
            };
  
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
            </Box>
          </React.Fragment>
        )}
      </Box>
    );
  }
}

function WithNavigate(props) {
  const navigate = useNavigate();
  // const {t} = useTranslation();
  const params = useParams();
  const classes = useStyles();
  return (
    <LinearStepper {...props} classes={classes} routeParams={params} navigate={navigate} />
  );
}


export default withSharedSnackbar(WithNavigate);
