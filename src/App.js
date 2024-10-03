import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import DataTable from './components/DataTable';  // Import the DataTable component
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Define the steps for the stepper
const steps = ['Name', 'Email', 'Parcel Info', 'Address'];

// Define validation schemas for each step using Yup
const validationSchemas = [
  Yup.object().shape({
    name: Yup.string().required('Name is required'),
  }),
  Yup.object().shape({
    email: Yup.string().email('Invalid email format').required('Email is required'),
  }),
  Yup.object().shape({
    parcelInfo: Yup.string().required('Parcel information is required'),
  }),
  Yup.object().shape({
    address: Yup.string().required('Address is required'),
  }),
];

export default function HorizontalLinearStepper() {
  // Manage the active step in the stepper
  const [activeStep, setActiveStep] = React.useState(0);

  // Initial form values for Formik
  const initialValues = {
    name: '',
    email: '',
    parcelInfo: '',
    address: '',
  };

  // Function to handle moving to the next step
  const handleNext = (values) => {
    // Store form data in localStorage on each step
    if (activeStep === 0) {
      localStorage.setItem('name', values.name);
    } else if (activeStep === 1) {
      localStorage.setItem('email', values.email);
    } else if (activeStep === 2) {
      localStorage.setItem('parcelInfo', values.parcelInfo);
    } else if (activeStep === 3) {
      localStorage.setItem('address', values.address);
    }

    // Move to the next step
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  // Function to go back to the previous step
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // Function to reset the stepper and form
  const handleReset = (resetForm) => {
    setActiveStep(0);
    localStorage.clear();  // Clear stored form data
    resetForm();  // Reset Formik form values to initial state
  };

  // Function to render form fields based on the active step
  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Field
            name="name"
            as={TextField}
            label="Enter your name"
            fullWidth
            sx={{ mt: 5 }}
          />
        );
      case 1:
        return (
          <Field
            name="email"
            as={TextField}
            label="Enter your email"
            fullWidth
            sx={{ mt: 5 }}
          />
        );
      case 2:
        return (
          <Field
            name="parcelInfo"
            as={TextField}
            label="Enter parcel info"
            fullWidth
            sx={{ mt: 5 }}
          />
        );
      case 3:
        return (
          <Field
            name="address"
            as={TextField}
            label="Enter your address"
            fullWidth
            sx={{ mt: 5 }}
          />
        );
      default:
        return 'Unknown step';  // Fallback in case of an invalid step
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchemas[activeStep]}  // Dynamic validation based on active step
      onSubmit={(values, { setSubmitting }) => {
        handleNext(values);  // Proceed to next step if validation passes
        setSubmitting(false);  // End the submission state
      }}
    >
      {({ values, handleChange, handleSubmit, resetForm, isSubmitting, isValid }) => (
        <Form onSubmit={handleSubmit}>
          {/* Main container to center the form */}
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', height: '100vh', mt: 10 }}>
            <Box sx={{ width: '50%' }}> {/* Center the content */}
              <Stepper activeStep={activeStep}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>

              {activeStep === steps.length ? (
                // Render the completion message and data table after all steps are completed
                <React.Fragment>
                  <Typography sx={{ mt: 2, mb: 1 }}>
                    All steps completed - here is your data:
                  </Typography>

                  {/* Render the DataTable component */}
                  <DataTable />

                  {/* Reset button */}
                  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 7 }}>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <Button onClick={() => handleReset(resetForm)}>Reset</Button>
                  </Box>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {/* Render the form fields for the current step */}
                  <Box sx={{ mt: 2 }}>
                    {renderStepContent(activeStep)}

                    {/* Error messages for form validation */}
                    {activeStep === 0 && <ErrorMessage name="name" component="div" className="error" />}
                    {activeStep === 1 && <ErrorMessage name="email" component="div" className="error" />}
                    {activeStep === 2 && <ErrorMessage name="parcelInfo" component="div" className="error" />}
                    {activeStep === 3 && <ErrorMessage name="address" component="div" className="error" />}
                  </Box>

                  {/* Navigation buttons (Back and Next/Finish) */}
                  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 7 }}>
                    {/* Back button */}
                    <Button
                      color="inherit"
                      disabled={activeStep === 0}  // Disable if on the first step
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                    >
                      Back
                    </Button>
                    <Box sx={{ flex: '1 1 auto' }} />
                    {/* Next/Finish button */}
                    <Button type="submit" disabled={isSubmitting || !isValid}>
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  </Box>
                </React.Fragment>
              )}
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
}
