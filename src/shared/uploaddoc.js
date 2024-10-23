import React, { Component } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

// Styling the input element to visually hide it while making it accessible to screen readers.
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)', // Clip the element out of view
  clipPath: 'inset(50%)', // Ensures it remains hidden even in complex layouts
  height: 1,              // Minimal height to preserve space for accessibility
  overflow: 'hidden',     // Ensures that the input isn't visible if clipped incorrectly
  position: 'absolute',   // Positioning absolutely keeps it off the main flow
  bottom: 0,              // Positioned at the bottom (not important due to invisibility)
  left: 0,
  whiteSpace: 'nowrap',   // Prevents text wrapping
  width: 1,
});

class InputFileUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
    selection: []
    }
    // No local state is needed for this component since we're just handling file uploads
  }

  handleFileChange = (event) => {
    const files = Array.from(event.target.files); // Convert FileList to an array
    const newSelection = files.map((file) => ({
      file: file,
      fileName: file.name,
      fileExtension: file.name.split('.').pop(),
      fileSize: file.size // Include size to help distinguish between files
    }));
  
    // Filter out files that are already in the selection
    const filteredNewSelection = newSelection.filter(newFile => {
      return !this.state.selection.some(existingFile =>
        existingFile.fileName === newFile.fileName && existingFile.fileSize === newFile.fileSize
      );
    });
  
    // Update the state with unique new files
    this.setState(prevState => ({
      selection: [...filteredNewSelection, ...prevState.selection]// Combine previous files with unique new ones
    }));
  
    // Pass the updated selection to the parent component
    this.props.handleFileChange(filteredNewSelection); // Pass only the unique new files to the parent
  };
  
  

  // handleFileChange = (event) => {
  //   const files = Array.from(event.target.files); // Convert FileList to an array
  //   const newSelection = files.map((file) => ({
  //     file: file,
  //     fileName: file.name,
  //     fileExtension: file.name.split('.').pop(),
  //   }));
  //   // Append the new selection to the existing state
  // this.setState((prevState) => ({
  //   selection: [...prevState.selection, ...newSelection]  // Combine previous files with new ones
  // }));

  // // Pass the updated selection to the parent component if needed
  // this.props.handleFileChange([...this.state.selection, ...newSelection]);
   
  //  };
  render() {
    return (
      <Button
        component="label"   // Ensures the button behaves like a label for file input
        role={undefined}    // Explicitly making role undefined (default role behavior)
        variant="contained" // Using Material-UI's contained button variant for visual styling
        // tabIndex={-1}       // Removing the button from tab order since it's acting like a label
        startIcon={<CloudUploadIcon />}
        sx={{ width: '100%', transform: 'translateY(-7px)' }}
         // Adding the upload icon at the start of the button text
      >
        Upload
        {/* Visually hidden input field for selecting files */}
        <VisuallyHiddenInput
          type="file"       // Input type for file selection
          onChange={this.handleFileChange} // Handling the file change via the method defined in the class
          multiple          // Allows multiple file selection
        />
      </Button>
    );
  }
}

export default InputFileUpload;
