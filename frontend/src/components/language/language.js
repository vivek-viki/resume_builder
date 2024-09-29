import * as React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import MinHeightTextarea from '../../shared/textArea';
import Fingerprint from '@mui/icons-material/Fingerprint';
import Tooltip from '@mui/material/Tooltip';
import axios from 'axios';
import {withSharedSnackbar  } from '../../shared/snackBar';
import LinearStepper from '../../shared/linearStepper';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import {TextField } from '@mui/material';
import { useStyles } from '../../shared/styles/defaultStyle';
import LanguageIcon from '@mui/icons-material/Language';
import SsidChartIcon from '@mui/icons-material/SsidChart';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';


class Row extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      loading: false,
      value: 10,
      row : {
        open: props.row.Id === 0 ? true : false,
        Id : props.row.Id,
        Language: props.row.Language,
        Level: props.row.Level,
        Validations: {
          "IsLanguage": true,
          "IsLevel": true,
        }
      },
      ErrorMsg: {
        Language: "",
        Level: ""
      }
    };
    this.valueMap = {
        10: 'Beginner',
        20: 'Intermediate',
        30: 'Proficient',
        40: 'Fluent',
        50: 'Native',
      };
    
  }

  handleClick = (event) => {
    let row = { ...this.state.row }
    row.open = event;
    // if (row.Id !== 0)
    this.setState({ row  });
  };

  handleFieldChange = (fieldName, event) => {
    let row = { ...this.state.row };
    let ErrorMsg = { ...this.state.ErrorMsg };
    row[fieldName] = event.target.value.trimStart();
  
    if (event.target.value) {
      row.Validations[`Is${fieldName}`] = true;
      ErrorMsg[fieldName] = "";
    } else {
      row.Validations[`Is${fieldName}`] = false;
      ErrorMsg[fieldName] = `${fieldName} cannot be empty`;
    }
  
    this.setState({ row, ErrorMsg });
  }

  handleDate = (date, type) => {
    let row = { ...this.state.row };
    row[type] = date;
    this.setState({ row });
  }
  
  submitLanguage = () => {
    let row = {...this.state.row};
    let ErrorMsg = {...this.state.ErrorMsg};
    debugger;
    if(row.Language && row.Level)
    {
      row.Id = 1;
      if (this.props.enqueueSnackbar) {
        this.props.enqueueSnackbar('Language added successfully', {
          variant: 'success',
          row
        }); }
      this.props.submitLanguageParent(row);
      row.open = false; // Set open to false to collapse the row
      this.setState({ row }); // Update the state to reflect the change
    }
    else{
      if (row.Language === "" || row.Language === null) {
        row.Validations.IsLanguage = false;
        ErrorMsg.Language = "Language cannot be empty";
      }
      if(row.Level === "" || row.Level === null){
        row.Validations.IsLevel = false;
        ErrorMsg.Level = "Level cannot be empty";
      }
      this.setState({ row });
    }
    this.setState({ ErrorMsg });
  }

  valuetext = (value) => {
    return this.valueMap[value] || value;  // Return the mapped label or the value itself if not found
  };

  handleChange = (event, newValue) => {
    let row = {...this.state.row};
    row.Level = this.valuetext(newValue);
    this.setState({ value: newValue, row });
  };

  render() {
    const { row, ErrorMsg, value } = this.state;
    debugger;
    return (
      <React.Fragment>
        
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => this.handleClick(!row.open)}>
              {row.open ? <Tooltip title="Close"><KeyboardArrowUpIcon /></Tooltip> : <Tooltip title="Expand"><KeyboardArrowDownIcon /></Tooltip>}
            </IconButton>
          </TableCell>
          <TableCell colSpan={2} className={this.props.classes.tableCell}><div className={this.props.classes.iconWrapper}> {row.Language}</div></TableCell>
          <TableCell colSpan={2} className={this.props.classes.tableCell}><div className={this.props.classes.iconWrapper}> {row.Level}</div></TableCell>
          <TableCell align="right" className={this.props.classes.tableCell}>
          <Tooltip title="Delete">
            <span>
        <IconButton aria-label="fingerprint" color="secondary">
          <Fingerprint onClick={() => this.props.DeleteLanguage(row.Id)} />
        </IconButton>
        </span>
        </Tooltip>
          <Tooltip title={"Save"}>
          <span>
          <IconButton aria-label="fingerprint" color="success" >
        <Fingerprint onClick={ this.submitLanguage} 
        />
      </IconButton>
      </span>
      </Tooltip>

          </TableCell>
        </TableRow>
        <TableRow>
        <TableCell colSpan={9}  className={this.props.classes.tableForm}>
  <Collapse in={row.open} timeout="auto" unmountOnExit>
    <Box component="form" sx={{ margin: 1 }}>
       <div className="row" style={{ display: 'flex', flexWrap: 'wrap', gap: '200px' }}>
            <div className="col-md-2 pull-left">
          <TextField
            error={!this.state.row.Validations.IsLanguage}
            required
            id="component-error"
            variant="standard"
            label="Language Name"
            sx={{ width: 250 }}
            value={row.Language}
            // helperText={ErrorMsg.Language}
            onChange={(e) => this.handleFieldChange("Language", e)}
            inputProps={{ maxLength: 15 }}
          />
          </div>
        <div className="col-md-4 pull-left">
        <Box sx={{ width: 300 }}>
        <Typography gutterBottom>
          Level
        </Typography>
        <Slider
          aria-label="Label"
          value={value}
           valueLabelFormat={this.valuetext}
          getAriaValueText={this.valuetext}
          valueLabelDisplay="auto"
          step={10}
          min={10}
          max={50}
          onChange={this.handleChange}
        />
        </Box>
        </div>
        </div>
    </Box>
  </Collapse>
</TableCell>
        </TableRow>
        
      </React.Fragment>
    );
  }
}



class Language extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        rows : [],
        activeStep : 5
      } 
    }
  
    backSummary = () => {
      this.stepperRef.current.handleBack();
    }

    submitLanguage = () => {
        this.props.navigate('/certificates');
      }

    submitLanguageParent = (row) => {
        let rows = [...this.state.rows];
        rows[0].Id = row.Id;
            this.setState({rows});
    }

    DeleteLanguage = (id) => {
      this.setState((prevState) => ({
        rows: prevState.rows.filter(row => row.Id !== id) // Filter out the row with the matching id
      }));
    };
    // submitExperience = (row) => {
    //   debugger;
    //   if(row.company && row.Designation && row.Location && row.Experience && row.skill && row.task)
    //   {
  
    //   }
    //   else{
    //     if (row.company === "" || row.company === null) {
    //       console.log("hi");
    //       // row.Validations.IsValidAddress_Line_1 = false;
    //       // ErrorMsg.Address = "Address cannot be empty"
    //     }
    //     if(row.Designation === "" || row.Designation === null){
    //       row.Validations.IsDesignation = false;
  
    //     }
    //   }
  
    //   this.stepperRef.current.handleNext();
    //  if (this.props.enqueueSnackbar) {
    //     this.props.enqueueSnackbar('This is a shared notification message!', {
    //       variant: 'success',
    //     }); }
    //   // axios.put(`https://api.example.com/data/`, this.state.summary)
    //   // .then(response => {
  
    //   //   this.setState({ data: response.data, loading: false });
    //   //   console.log('Data updated successfully:', response.data);
    //   // })
    //   // .catch(error => {
    //   //   // // Handle error
    //   //   // this.setState({ error: error.message, loading: false });
    //   //   // console.error('Error updating data:', error);
    //   // });
    // }
  
    addNewRow = event => {
        let row = {
          open: true,
          Id : 0,
          Language: "",
          Level: "",
        }
        
        this.state.rows.unshift(row)
        this.setState({
          rows: [...this.state.rows],
        });
      }
  
  
    render() {
     const {rows } = this.state;
      return (  
        <Card >
        {/* <CardActionArea > */}
          <CardContent sx={{maxWidth: '100%', width: '93%', height: '65%', boxShadow: 10, marginLeft : '2%', marginTop: '3%', position:'fixed', overflowY: 'auto'}}>
          <LinearStepper activeStep={this.state.activeStep}/>
          <TableContainer component={Paper} >
        <Table  aria-label="collapsible table">
          <TableHead className={` ${this.props.classes.tableHeaderRow}`}>
            <TableRow >
              <TableCell className={` ${this.props.classes.tableHeaderCells}`}></TableCell>
              <TableCell colSpan={2} className={` ${this.props.classes.tableHeaderCells}`} ><div className={this.props.classes.iconWrapper}> <Tooltip title="Language"><LanguageIcon sx={{ color: 'grey' }}/></Tooltip></div></TableCell>
              <TableCell colSpan={2} className={` ${this.props.classes.tableHeaderCells}`} ><div className={this.props.classes.iconWrapper}><Tooltip title="Level"><SsidChartIcon sx={{ color: 'grey' }}/></Tooltip></div></TableCell>
              <TableCell className={` ${this.props.classes.tableHeaderCells}`}> 
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <Button variant="contained"
               onClick={(e) => this.addNewRow(e)} 
              className={this.props.classes.containedbutton}
              disabled = {(rows[0]?.Id === 0)}
            //   sx={{ width: "40%" }}
              >
                add Language</Button>
    <Tooltip title={"Next"}>
    <IconButton aria-label="fingerprint" color="success"  disabled={!rows.length || rows[0]?.Id === 0}>
        <Fingerprint onClick={ this.submitLanguage} 
        />
      </IconButton>
      </Tooltip>
  </div>
          </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.name} row={row} 
              submitLanguageParent = {this.submitLanguageParent}
              DeleteLanguage = {this.DeleteLanguage}
              rows = {rows}
              {...this.props}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
        </CardContent>
        {/* </CardActionArea> */}
      </Card>
      );
    }
  }
  
  function WithNavigate(props) {
    const navigate = useNavigate();
    // const {t} = useTranslation();
    const params = useParams();
    const classes = useStyles();
    return (
      <Language {...props} classes={classes} routeParams={params} navigate={navigate} />
    );
  }
  
  
  export default withSharedSnackbar(WithNavigate);