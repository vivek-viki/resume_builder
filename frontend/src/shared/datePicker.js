// import React from 'react';
// import dayjs from 'dayjs';
// import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; 
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';


// class ResponsiveDatePickers extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       // selectedDate: dayjs(), // Initialize with the current date
//       selectedDate: (this.props.date ? dayjs(this.props.date) : dayjs('YYYY-MM-DD')),
//       error: false,
//     };
//   }

//   // handleChange = (newValue) => {
//   //   const formattedDate = newValue ? dayjs(newValue).format('YYYY-MM-DD') : null; // Format the date to 'YYYY-MM-DD'
//   //   this.setState({ selectedDate: newValue });
//   //   this.props.handleDate(formattedDate, this.props.label); // Pass the formatted date to parent
//   // };

//   handleChange = (newValue) => {
//     const formattedDate = newValue ? dayjs(newValue).format('YYYY-MM-DD') : null;
    
//     // Update selected date and propagate the change upwards
//     this.setState({ selectedDate: newValue }, () => {
//       // If required and no date is selected, set error state
//       if (this.props.required && !newValue) {
//         this.setState({ error: true });
//       } else {
//         this.setState({ error: false });
//       }
//       this.props.handleDate(formattedDate, this.props.label); // Send the formatted date to the parent
//     });
//   };

//   render() {
//     const { selectedDate, error } = this.state;
//     const { required, label, minDate } = this.props;

//     return (
//       <LocalizationProvider dateAdapter={AdapterDayjs}>
//         <DemoContainer
//           components={[
//             'MobileDatePicker'
//           ]}
//         >
//           <DemoItem>
//             <MobileDatePicker 
//             value={selectedDate} 
//             label={label} 
//             // onChange={this.handleChange}  
//             onChange={(newValue) => {
//               this.handleChange(newValue); // Update state and props with selected date
//             }}  
//             format="YYYY-MM-DD"
//             minDate={minDate} // Disable dates before minDate
//             error={error || this.props.error}
//             required={required}
//             slotProps={{
//               textField: {
//                 helperText: error ? `${label} is required` : '',  // Show helper text if there's an error
//               },
//             }}
//             />
//           </DemoItem>
//         </DemoContainer>
//       </LocalizationProvider>
//     );
//   }
// }

// export default ResponsiveDatePickers;


import React from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; 
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

class ResponsiveDatePickers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: this.props.date ? dayjs(this.props.date) : null, // Initialize with the provided date or null
      error: true,  // Error state for required fields
      dateChanged: false, // Track if a date change occurred
    };
  }

  handleChange = (newValue) => {
    // If newValue is null (e.g. on clear), set the state and propagate the empty string
    const formattedDate = newValue ? dayjs(newValue).format('YYYY-MM-DD') : ''; // Format or set to empty string if cleared

    // Update selectedDate and mark that a date was changed
    this.setState({ 
      selectedDate: newValue || null,
      dateChanged: true, // Mark that a date was changed
    }, () => {
      // If required and no date is selected, set the error state
      if (this.props.required && !newValue) {
        this.setState({ error: true });
      } else {
        this.setState({ error: false });
      }

      // Pass formatted date (or empty string if cleared) to the parent component
      this.props.handleDate(formattedDate, this.props.label); // Pass "" if date is cleared
    });
  };

  handleClose = () => {
    // Only reset the date if no date was changed, meaning it was likely a cancel action
    if (!this.state.dateChanged) {
      console.log('Date picker canceled');
      this.setState({
        selectedDate: null, // Reset the selected date on cancel
      });
      this.props.handleDate(null, this.props.label); // Pass empty string if canceled
    }

    // Reset the dateChanged flag for the next time the picker opens
    this.setState({ dateChanged: false });
  };

  componentDidUpdate(prevProps) {
    // Sync the selectedDate state with the parent prop (if it changes)
    if (prevProps.date !== this.props.date) {
      this.setState({
        selectedDate: this.props.date ? dayjs(this.props.date) : null, // Set state to null if the date prop is cleared
      });
    }
  }

  render() {
    const { selectedDate, error } = this.state;
    const { required, label, minDate } = this.props;
debugger;
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['MobileDatePicker']}>
          <DemoItem>
            <MobileDatePicker 
              value={selectedDate} // Make sure this value gets cleared properly
              label={label} 
              onChange={(newValue) => {
                this.handleChange(newValue || null); // Handle the date change or clear
              }}  
              format="YYYY-MM-DD"
              onClose={this.handleClose}  // Handle the close event (to check if Cancel was clicked)
              minDate={minDate} // Disable dates before minDate
              error={required && error}  // Show error only if required and there's an issue
              required={required} // Pass the required prop
              slotProps={{
                textField: {
                  error: required && error,
                },
              }}
            />
          </DemoItem>
        </DemoContainer>
      </LocalizationProvider>
    );
  }
}

export default ResponsiveDatePickers;
