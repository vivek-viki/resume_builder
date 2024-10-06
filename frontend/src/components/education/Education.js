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
      loading: false,
      row : {
        open: props.row.id === 0 ? true : false,
        id : props.row.id,
        college: props.row.college,
        course: props.row.course,
        program: props.row.program,
        startDate: props.row.startDate,
        endDate : props.row.endDate,
        cgpa: props.row.cgpa,
        specalization: props.row.specalization,
        Validations: {
          "Iscollege": true,
          "Iscourse": true,
          "Isprogram": true,
          "IsstartDate": true,
          "IsendDate": true,
          "Iscgpa": true,
          "Isspecalization": true
        }
      },
      ErrorMsg: {
        college: "",
        course: "",
        program: "",
        startDate: "",
        endDate: "",
        cgpa: "",
        specalization: ""
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
    if(row.college && row.course && row.program && row.startDate && row.endDate && row.cgpa && row.specalization)
    { const payload = {
      "userId": 1, 
      "id" : row.id,
      "college": row.college,
      "course": row.course,
      "program" : row.program,
      "startDate" : row.startDate,
      "endDate" : row.endDate,
      "cgpa" : row.cgpa,
      "specalization" : row.specalization
    };
    this.setState({ loading: true })
    axios.post(`http://localhost:5151/experience/addExperience`, payload)
    .then(data => {
      if(row.id === 0){
        row.open = false;
        row.id = data.data.id;
        row.company = data.data.company;
        row.designation = data.data.designation;
        row.location = data.data.location;
        row.experience = data.data.experience;
        row.skills = data.data.skills;
        row.tasks = data.data.tasks;
        this.setState({row});
        if (this.props.enqueueSnackbar) {
          this.props.enqueueSnackbar('experience added successfully', {
            variant: 'success',
          }); }
        this.props.updateTableData(row);
         } else if(row.id === data.data.id){
          row.open = false;
          row.id = data.data.id;
          row.company = data.data.company;
          row.designation = data.data.designation;
          row.location = data.data.location;
          row.experience = data.data.experience;
          row.skills = data.data.skills;
          row.tasks = data.data.tasks;
          this.setState({row});
          if (this.props.enqueueSnackbar) {
            this.props.enqueueSnackbar('experience updated successfully', {
              variant: 'success',
            }); }
          this.props.updateTableData(row);
        }
        
    })
    .catch(error => {
      const errorMessage = error.response?.data || 'An error occurred';
      this.props.enqueueSnackbar(errorMessage, {
        variant: 'error',
      });
    })
    .finally(() => {
      this.setState({ loading: false });
    });
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
      if (row.college === "" || row.college === null) {
        row.Validations.Iscollege = false;
        ErrorMsg.college = "college cannot be empty";
      }
      if(row.course === "" || row.course === null){
        row.Validations.Iscourse = false;
        ErrorMsg.course = "course cannot be empty";
      }
      if(row.program === "" || row.program === null){
        row.Validations.Isprogram = false;
        ErrorMsg.program = "program cannot be empty";
      }
      if(row.startDate === "" || row.startDate === null){
        row.Validations.IsstartDate = false;
        ErrorMsg.startDate = "startDate cannot be empty";
      }
      if(row.endDate === "" || row.endDate === null){
        row.Validations.IsendDate = false;
        ErrorMsg.endDate = "endDate cannot be empty";
      }
      if(row.cgpa === "" || row.cgpa === null){
        row.Validations.Iscgpa = false;
        ErrorMsg.cgpa = "cgpa cannot be empty";
      }
      if(row.specalization === "" || row.specalization === null){
        row.Validations.Isspecalization = false;
        ErrorMsg.specalization = "specalization cannot be empty";
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
          <TableCell  className={this.props.classes.tableCell}><div className={this.props.classes.iconWrapper}> {row.college}</div></TableCell>
          <TableCell  className={this.props.classes.tableCell}><div className={this.props.classes.iconWrapper}> {row.course}</div></TableCell>
          <TableCell  className={this.props.classes.tableCell}><div className={this.props.classes.iconWrapper}> {row.program}</div></TableCell>
          <TableCell  className={this.props.classes.tableCell}><div className={this.props.classes.iconWrapper}> 
          <Chip
              label={row.startDate ?
                <Moment format={"DD-MMM-YYYY"}>
                  {row.startDate}
                </Moment>
                : ''}
              variant="filled" />
              </div>
          </TableCell>  
          <TableCell  className={this.props.classes.tableCell}><div className={this.props.classes.iconWrapper}> 
          <Chip
              label={row.endDate ?
                <Moment format={"DD-MMM-YYYY"}>
                  {row.endDate}
                </Moment>
                : ''}
              variant="filled" />
              </div>
          </TableCell>
          <TableCell className={this.props.classes.tableCell}><div className={this.props.classes.iconWrapper}> {row.cgpa}</div></TableCell>
          <TableCell  className={this.props.classes.tableCell}><div className={this.props.classes.iconWrapper}> {row.specalization}</div></TableCell>
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
            error={!this.state.row.Validations.Iscollege}
            required
            id="component-error"
            variant="standard"
            label="college Name"
            sx={{ width: 250 }}
            value={row.college}
            // helperText={ErrorMsg.college}
            onChange={(e) => this.handleFieldChange("college", e)}
            inputProps={{ maxLength: 50 }}
          />
          </div>
        <div className="col-md-2 pull-left">
          <TextField
            error={!this.state.row.Validations.Iscourse}
            required
            id="component-error"
            variant="standard"
            label="course"
            sx={{ width: 250 }}
            value={row.course}
            // helperText={ErrorMsg.course}
            onChange={(e) => this.handleFieldChange("course", e)}
            inputProps={{ maxLength: 50 }}
          />
        </div>
        <div className="col-md-2 pull-left">
          <TextField
           error={!this.state.row.Validations.Isprogram}
           required
            id="component-error"
            variant="standard"
            label="program"
            sx={{ width: 250 }}
            value={row.program}
            // helperText={ErrorMsg.program}
            onChange={(e) => this.handleFieldChange("program", e)}
            inputProps={{ maxLength: 50 }}
          />
        </div>
        <div className="col-md-2 pull-left">

        <DatePicker
        label = {"startDate"}
        handleDate = {this.handleDate}
        {...this.props}
      />
        </div>
        <div className="col-md-2 pull-left">
        <DatePicker
        label = {"endDate"}
        handleDate = {this.handleDate}
        {...this.props}
      />
        </div>
        <div className="col-md-2 pull-left">
          <TextField
           error={!this.state.row.Validations.Iscgpa}
           required
            id="component-error"
            variant="standard"
            label="cgpa"
            sx={{ width: 250 }}
            value={row.cgpa}
            // helperText={ErrorMsg.cgpa}
            onChange={(e) => {
              const { value } = e.target;
              // Allow input only if it's a number or empty (to allow deletion)
              if (/^\d*\.?\d*$/.test(value)) {
                this.handleFieldChange("cgpa", e);  // Update only if valid
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
           error={!this.state.row.Validations.Isspecalization}
           required
            id="component-error"
            variant="standard"
            label="specalization"
            sx={{ width: 250 }}
            value={row.specalization}
            // helperText={ErrorMsg.specalization}
            onChange={(e) => this.handleFieldChange("specalization", e)}
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
          college: "",
          course: "",
          program: "",
          startDate: "",
          endDate: "",
          cgpa: "",
          specalization: ""
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
              <TableCell className={` ${this.props.classes.tableHeaderCells}`} ><div className={this.props.classes.iconWrapper}> <Tooltip title="college"><SchoolIcon sx={{ color: 'grey' }}/></Tooltip></div></TableCell>
              <TableCell className={` ${this.props.classes.tableHeaderCells}`}><div className={this.props.classes.iconWrapper}><Tooltip title="course"><AutoStoriesIcon sx={{ color: 'grey' }}/></Tooltip></div></TableCell>
              <TableCell className={` ${this.props.classes.tableHeaderCells}`}><div className={this.props.classes.iconWrapper}><Tooltip title="program"><LocalLibraryIcon sx={{ color: 'grey' }}/></Tooltip></div></TableCell>
              <TableCell className={` ${this.props.classes.tableHeaderCells}`}><div className={this.props.classes.iconWrapper}><Tooltip title="startDate"><CalendarMonthIcon sx={{ color: 'grey' }}/></Tooltip></div></TableCell>
              <TableCell className={` ${this.props.classes.tableHeaderCells}`}><div className={this.props.classes.iconWrapper}><Tooltip title="endDate"><CalendarMonthIcon sx={{ color: 'grey' }}/></Tooltip></div></TableCell>
              <TableCell className={` ${this.props.classes.tableHeaderCells}`}><div className={this.props.classes.iconWrapper}><Tooltip title="cgpa"><StarIcon sx={{ color: 'grey' }}/></Tooltip></div></TableCell>
              <TableCell className={` ${this.props.classes.tableHeaderCells}`}><div className={this.props.classes.iconWrapper}><Tooltip title="specalization"><FolderSpecialIcon sx={{ color: 'grey' }}/></Tooltip></div></TableCell>
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