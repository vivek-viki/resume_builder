import React, { Component } from 'react';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
import Typography from '@mui/material/Typography';

class MinHeightTextarea extends Component {
  constructor(props) {
    super(props);
    this.state = {
        summary: "",
        charCount: 0
    }

    this.blue = {
      100: '#DAECFF',
      200: '#b6daff',
      400: '#3399FF',
      500: '#007FFF',
      600: '#0072E5',
      900: '#003A75',
    };

    this.grey = {
      50: '#F3F6F9',
      100: '#E5EAF2',
      200: '#DAE2ED',
      300: '#C7D0DD',
      400: '#B0B8C4',
      500: '#9DA8B7',
      600: '#6B7A90',
      700: '#434D5B',
      800: '#303740',
      900: '#1C2025',
    };

    this.Textarea = styled(BaseTextareaAutosize)(
      ({ theme, error }) => `
        box-sizing: border-box;
        width: 100%;
        font-family: 'IBM Plex Sans', sans-serif;
        font-size: 0.875rem;
        font-weight: 400;
        line-height: 1.5;
        padding: 8px 12px;
        border-radius: 8px;
        color: ${theme.palette.mode === 'dark' ? this.grey[300] : this.grey[900]};
        background: ${theme.palette.mode === 'dark' ? this.grey[900] : '#fff'};
        border: 1px solid ${error ? 'red' : (theme.palette.mode === 'dark' ? this.grey[700] : this.grey[200])};
        box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? this.grey[900] : this.grey[50]};

        &:hover {
          border-color: ${this.blue[400]};
        }

        &:focus {
          border-color: ${this.blue[400]};
          box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? this.blue[600] : this.blue[200]};
        }

        // firefox
        &:focus-visible {
          outline: 0;
        }
      `,
    );
  }

  handleSummary = event => {
    const summary = event.target.value;

    // Limit the characters to a maximum of 350
    if (summary.length <= 350) {
      this.setState({
        summary: summary,
        charCount: summary.length
      });
      this.props.onSummaryChange(summary); // Update parent component
    }
  }

  render() {
    const { Textarea } = this;
    const { summary, charCount } = this.state;
    const isSummaryEmpty = summary.length === 0;

    return (
      <React.Fragment>
        <Textarea
          aria-label="minimum height"
          minRows={3}
          value={summary}
          onChange={this.handleSummary}
          error={isSummaryEmpty}
          sx={{ resize: 'none' }}
        />
        {isSummaryEmpty && (
          <Typography color="error" variant="caption" display="block" gutterBottom>
            Please enter your summary.
          </Typography>
        )}
        <Typography variant="caption" display="block" gutterBottom>
          {charCount}/350 characters
        </Typography>
      </React.Fragment>
    );
  }
}

export default MinHeightTextarea;
