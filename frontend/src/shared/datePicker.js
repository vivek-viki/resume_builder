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
      selectedDate: dayjs('YYYY-MM-DD'),
    };
  }

  handleChange = (newValue) => {
    this.setState({ selectedDate: newValue });
    this.props.handleDate(this.state.selectedDate, this.props.label);
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
            <MobileDatePicker value={selectedDate} label={this.props.label} onChange={this.handleChange} />
          </DemoItem>
        </DemoContainer>
      </LocalizationProvider>
    );
  }
}

export default ResponsiveDatePickers;