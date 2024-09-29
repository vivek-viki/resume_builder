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
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import SchoolIcon from '@mui/icons-material/School';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import StarIcon from '@mui/icons-material/Star';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';
import DatePicker from '../../shared/datePicker';
import Moment from "react-moment";

class Row extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      loading: false,
      row : {
        open: props.row.Id === 0 ? true : false,
        Id : props.row.Id,
        College: props.row.College,
        Course: props.row.Course,
        Program: props.row.Program,
        StartDate: props.row.StartDate,
        EndDate : props.row.EndDate,
        CGPA: props.row.CGPA,
        Specalization: props.row.Specalization,
        Validations: {
          "IsCollege": true,
          "IsCourse": true,
          "IsProgram": true,
          "IsStartDate": true,
          "IsEndDate": true,
          "IsCGPA": true,
          "IsSpecalization": true
        }
      },
      ErrorMsg: {
        College: "",
        Course: "",
        Program: "",
        StartDate: "",
        EndDate: "",
        CGPA: "",
        Specalization: ""
      }
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
  
  submitEducation = () => {
    let row = {...this.state.row};
    let ErrorMsg = {...this.state.ErrorMsg};
    debugger;
    if(row.College && row.Course && row.Program && row.StartDate && row.EndDate && row.CGPA && row.Specalization)
    {
      row.Id = 1;
      if (this.props.enqueueSnackbar) {
        this.props.enqueueSnackbar('Education added successfully', {
          variant: 'success',
          row
        }); }
      this.props.submitEducationParent(row);
      row.open = false; // Set open to false to collapse the row
      this.setState({ row }); // Update the state to reflect the change
    }
    else{
      if (row.College === "" || row.College === null) {
        row.Validations.IsCollege = false;
        ErrorMsg.College = "College cannot be empty";
      }
      if(row.Course === "" || row.Course === null){
        row.Validations.IsCourse = false;
        ErrorMsg.Course = "Course cannot be empty";
      }
      if(row.Program === "" || row.Program === null){
        row.Validations.IsProgram = false;
        ErrorMsg.Program = "Program cannot be empty";
      }
      if(row.StartDate === "" || row.StartDate === null){
        row.Validations.IsStartDate = false;
        ErrorMsg.StartDate = "StartDate cannot be empty";
      }
      if(row.EndDate === "" || row.EndDate === null){
        row.Validations.IsEndDate = false;
        ErrorMsg.EndDate = "EndDate cannot be empty";
      }
      if(row.CGPA === "" || row.CGPA === null){
        row.Validations.IsCGPA = false;
        ErrorMsg.CGPA = "CGPA cannot be empty";
      }
      if(row.Specalization === "" || row.Specalization === null){
        row.Validations.IsSpecalization = false;
        ErrorMsg.Specalization = "Specalization cannot be empty";
      }
      this.setState({ row });
    }
    this.setState({ ErrorMsg });
  }

  render() {
    const { row, ErrorMsg } = this.state;
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
          <TableCell  className={this.props.classes.tableCell}><div className={this.props.classes.iconWrapper}> {row.College}</div></TableCell>
          <TableCell  className={this.props.classes.tableCell}><div className={this.props.classes.iconWrapper}> {row.Course}</div></TableCell>
          <TableCell  className={this.props.classes.tableCell}><div className={this.props.classes.iconWrapper}> {row.Program}</div></TableCell>
          <TableCell  className={this.props.classes.tableCell}><div className={this.props.classes.iconWrapper}> 
          <Chip
              label={row.StartDate ?
                <Moment format={"DD-MMM-YYYY"}>
                  {row.StartDate}
                </Moment>
                : ''}
              variant="filled" />
              </div>
          </TableCell>  
          <TableCell  className={this.props.classes.tableCell}><div className={this.props.classes.iconWrapper}> 
          <Chip
              label={row.EndDate ?
                <Moment format={"DD-MMM-YYYY"}>
                  {row.EndDate}
                </Moment>
                : ''}
              variant="filled" />
              </div>
          </TableCell>
          <TableCell className={this.props.classes.tableCell}><div className={this.props.classes.iconWrapper}> {row.CGPA}</div></TableCell>
          <TableCell  className={this.props.classes.tableCell}><div className={this.props.classes.iconWrapper}> {row.Specalization}</div></TableCell>
          <TableCell align="right" className={this.props.classes.tableCell}>
          <Tooltip title="Delete">
            <span>
        <IconButton aria-label="fingerprint" color="secondary">
          <Fingerprint onClick={() => this.props.DeleteEducation(row.Id)} />
        </IconButton>
        </span>
        </Tooltip>
          <Tooltip title={"Save"}>
          <span>
          <IconButton aria-label="fingerprint" color="success" >
        <Fingerprint onClick={ this.submitEducation} 
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
       <div className="row" style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
            <div className="col-md-2 pull-left">
          <TextField
            error={!this.state.row.Validations.IsCollege}
            required
            id="component-error"
            variant="standard"
            label="College Name"
            sx={{ width: 250 }}
            value={row.College}
            // helperText={ErrorMsg.College}
            onChange={(e) => this.handleFieldChange("College", e)}
            inputProps={{ maxLength: 50 }}
          />
          </div>
        <div className="col-md-2 pull-left">
          <TextField
            error={!this.state.row.Validations.IsCourse}
            required
            id="component-error"
            variant="standard"
            label="Course"
            sx={{ width: 250 }}
            value={row.Course}
            // helperText={ErrorMsg.Course}
            onChange={(e) => this.handleFieldChange("Course", e)}
            inputProps={{ maxLength: 50 }}
          />
        </div>
        <div className="col-md-2 pull-left">
          <TextField
           error={!this.state.row.Validations.IsProgram}
           required
            id="component-error"
            variant="standard"
            label="Program"
            sx={{ width: 250 }}
            value={row.Program}
            // helperText={ErrorMsg.Program}
            onChange={(e) => this.handleFieldChange("Program", e)}
            inputProps={{ maxLength: 50 }}
          />
        </div>
        <div className="col-md-2 pull-left">

        <DatePicker
        label = {"StartDate"}
        handleDate = {this.handleDate}
        {...this.props}
      />
        </div>
        <div className="col-md-2 pull-left">
        <DatePicker
        label = {"EndDate"}
        handleDate = {this.handleDate}
        {...this.props}
      />
          {/* <TextField
           error={!this.state.row.Validations.IsEndDate}
           required
            id="component-error"
            variant="standard"
            label="End Date"
            sx={{ width: 250 }}
            value={row.EndDate}
            helperText={ErrorMsg.IsEndDate}
            onChange={(e) => this.handleFieldChange("EndDate", e)}
            inputProps={{ maxLength: 15 }}
          /> */}
        </div>
        <div className="col-md-2 pull-left">
          <TextField
           error={!this.state.row.Validations.IsCGPA}
           required
            id="component-error"
            variant="standard"
            label="CGPA"
            sx={{ width: 250 }}
            value={row.CGPA}
            // helperText={ErrorMsg.CGPA}
            onChange={(e) => {
              const { value } = e.target;
              // Allow input only if it's a number or empty (to allow deletion)
              if (/^\d*\.?\d*$/.test(value)) {
                this.handleFieldChange("CGPA", e);  // Update only if valid
              }
            }}
            inputProps={{
              maxLength: 10, 
              inputMode: 'numeric',  // This prompts mobile devices to show a numeric keypad
              pattern: '[0-9]*'      // This ensures only digits are accepted
            }}
          />
        </div>
        <div className="col-md-2 pull-left">
          <TextField
           error={!this.state.row.Validations.IsSpecalization}
           required
            id="component-error"
            variant="standard"
            label="Specalization"
            sx={{ width: 250 }}
            value={row.Specalization}
            // helperText={ErrorMsg.Specalization}
            onChange={(e) => this.handleFieldChange("Specalization", e)}
            inputProps={{ maxLength: 15 }}
          />
        </div>
        </div>
        &nbsp;
    </Box>
  </Collapse>
</TableCell>
        </TableRow>
        
      </React.Fragment>
    );
  }
}



class Education extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        rows : [],
        activeStep : 3
      } 
    }
  
    backSummary = () => {
      this.stepperRef.current.handleBack();
    }

    submitEducation = () => {
      this.props.navigate('/skills');
    }
  
    submitEducationParent = (row) => {
      let rows = [...this.state.rows];
      rows[0].Id = row.Id;
          this.setState({rows});
    }
  
    DeleteEducation = (id) => {
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
          College: "",
          Course: "",
          Program: "",
          StartDate: "",
          EndDate: "",
          CGPA: "",
          Specalization: ""
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
              <TableCell className={` ${this.props.classes.tableHeaderCells}`} ><div className={this.props.classes.iconWrapper}> <Tooltip title="College"><SchoolIcon sx={{ color: 'grey' }}/></Tooltip></div></TableCell>
              <TableCell className={` ${this.props.classes.tableHeaderCells}`}><div className={this.props.classes.iconWrapper}><Tooltip title="Course"><AutoStoriesIcon sx={{ color: 'grey' }}/></Tooltip></div></TableCell>
              <TableCell className={` ${this.props.classes.tableHeaderCells}`}><div className={this.props.classes.iconWrapper}><Tooltip title="Program"><LocalLibraryIcon sx={{ color: 'grey' }}/></Tooltip></div></TableCell>
              <TableCell className={` ${this.props.classes.tableHeaderCells}`}><div className={this.props.classes.iconWrapper}><Tooltip title="StartDate"><CalendarMonthIcon sx={{ color: 'grey' }}/></Tooltip></div></TableCell>
              <TableCell className={` ${this.props.classes.tableHeaderCells}`}><div className={this.props.classes.iconWrapper}><Tooltip title="EndDate"><CalendarMonthIcon sx={{ color: 'grey' }}/></Tooltip></div></TableCell>
              <TableCell className={` ${this.props.classes.tableHeaderCells}`}><div className={this.props.classes.iconWrapper}><Tooltip title="CGPA"><StarIcon sx={{ color: 'grey' }}/></Tooltip></div></TableCell>
              <TableCell className={` ${this.props.classes.tableHeaderCells}`}><div className={this.props.classes.iconWrapper}><Tooltip title="Specalization"><FolderSpecialIcon sx={{ color: 'grey' }}/></Tooltip></div></TableCell>
              {/* <TableCell className={` ${this.props.classes.tableHeaderCells}`}><Tooltip title="Tasks"></Tooltip></TableCell> */}
              <TableCell className={` ${this.props.classes.tableHeaderCells}`}> 
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <Button variant="contained"
               onClick={(e) => this.addNewRow(e)} 
              className={this.props.classes.containedbutton}
              disabled = {(rows[0]?.Id === 0)}
              >
                add education</Button>
    <Tooltip title={"Next"}>
    <IconButton aria-label="fingerprint" color="success"  disabled={!rows.length || rows[0]?.Id === 0}>
        <Fingerprint onClick={ this.submitEducation} 
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
              submitEducationParent = {this.submitEducationParent}
              DeleteEducation = {this.DeleteEducation}
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
      <Education {...props} classes={classes} routeParams={params} navigate={navigate} />
    );
  }
  
  
  export default withSharedSnackbar(WithNavigate);