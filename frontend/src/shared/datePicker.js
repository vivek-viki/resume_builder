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
      // selectedDate: dayjs(), // Initialize with the current date
      selectedDate: (this.props.date ? dayjs(this.props.date) : dayjs('YYYY-MM-DD')),
    };
  }

  handleChange = (newValue) => {
    const formattedDate = newValue ? dayjs(newValue).format('YYYY-MM-DD') : null; // Format the date to 'YYYY-MM-DD'
    this.setState({ selectedDate: newValue });
    this.props.handleDate(formattedDate, this.props.label); // Pass the formatted date to parent
  };

  render() {
    const { selectedDate } = this.state;

    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer
          components={[
            'MobileDatePicker'
          ]}
        >
          <DemoItem>
            <MobileDatePicker 
            value={selectedDate} 
            label={this.props.label} 
            // onChange={this.handleChange}  
            onChange={(newValue) => {
              this.handleChange(newValue); // Update state and props with selected date
            }}  
            format="YYYY-MM-DD"
            minDate={this.props.minDate} // Disable dates before minDate
            />
          </DemoItem>
        </DemoContainer>
      </LocalizationProvider>
    );
  }
}

export default ResponsiveDatePickers;