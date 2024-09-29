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
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Button from '@mui/material/Button';
import {TextField } from '@mui/material';
import { useStyles } from '../../shared/styles/defaultStyle';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import DatePicker from '../../shared/datePicker';
import DescriptionIcon from '@mui/icons-material/Description';
import Moment from "react-moment";
import Chip from '@mui/material/Chip';


class Row extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      loading: false,
      task : '',
      row : {
        open: props.row.Id === 0 ? true : false,
        Id: props.row.Id,
        Project_Name: props.row.Project_Name,
        StartDate: props.row.StartDate,
        EndDate: props.row.EndDate,
        Description : props.row.Description,
        Validations: {
          "IsProject_Name": true,
          "IsStartDate": true,
          "IsEndDate": true,
          "IsDescription": true
        }
      },
      ErrorMsg: {
        Project_Name: "",
        StartDate: "",
        EndDate: "",
        Description: ""
      },
    };
    
  }

  handleClick = (event) => {
    let row = { ...this.state.row }
    row.open = event;
    if (row.Id !== 0)
    this.setState({ row  });
  };


  handleDelete = (chipToDelete) => {
    this.setState((prevState) => ({
      row: {
        ...prevState.row,
        Skills: prevState.row.Skills.filter((skill) => skill !== chipToDelete) // Filter by skill
      }
    }));
  };

  onSelectSkill = (chips) => {
    let selectedSkill = chips.target.innerText;
    this.setState((prevState) => ({
      row: {
        ...prevState.row,
        Skills: prevState.row.Skills.includes(selectedSkill)
          ? prevState.row.Skills
          : [...prevState.row.Skills, selectedSkill] // Avoid duplicates
      }
    }));
  }

  handleOnTaskChange = (task) => {
    let row = {...this.state.row};
    row.Tasks = task;
    this.setState({ row});
  }

  submitProjects = () => {
    let row = {...this.state.row};
    let ErrorMsg = {...this.state.ErrorMsg};
    debugger;
    if(row.Project_Name && row.StartDate && row.EndDate && row.Description)
    {
        row.Id = 1;
        if (this.props.enqueueSnackbar) {
          this.props.enqueueSnackbar('Experience added successfully', {
            variant: 'success',
            row
          }); }
        this.props.submitProjectsParent(row);
        row.open = false; // Set open to false to collapse the row
        this.setState({ row }); // Update the state to reflect the change
    }
    else{
      if (row.Project_Name === "" || row.Project_Name === null) {
        row.Validations.IsProject_Name = false;
        ErrorMsg.Project_Name = "ProjectName cannot be empty";
      }
      if(row.StartDate === "" || row.StartDate === null){
        row.Validations.IsStartDate = false;
        ErrorMsg.StartDate = "StartDate cannot be empty";
      }
      if(row.EndDate === "" || row.EndDate === null){
        row.Validations.IsEndDate = false;
        ErrorMsg.EndDate = "StartDate cannot be empty";
      }
      if(row.Description === "" || row.Description === null){
        row.Validations.IsDescription = false;
        ErrorMsg.Description = "Description cannot be empty";
      }
      this.setState({ row });
    }
    this.setState({ ErrorMsg });
  }

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


  handleOnTaskChange = (description) => {
    let row = {...this.state.row};
    row.Description = description;
    this.setState({ row});
  }

  handleDate = (date, type) => {
    let row = { ...this.state.row };
    row[type] = date;
    this.setState({ row });
  }

  render() {
    const { row, ErrorMsg } = this.state;
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
          <TableCell  className={this.props.classes.tableCell}><div className={this.props.classes.iconWrapper}>{row.Project_Name}</div></TableCell>
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
          <TableCell  className={this.props.classes.tableCell}> <div className={this.props.classes.iconWrapper}>
          <Chip
              label={row.EndDate ?
                <Moment format={"DD-MMM-YYYY"}>
                  {row.EndDate}
                </Moment>
                : ''}
              variant="filled" />
              </div>
            </TableCell>
          <TableCell  className={this.props.classes.tableCell}><div className={this.props.classes.iconWrapper}>{row.Description}</div></TableCell>
          <TableCell align="right">
          <Tooltip title="Delete">
            <span>
        <IconButton aria-label="fingerprint" color="secondary">
          <Fingerprint onClick={() => this.props.DeleteProjects(row.Id) } />
        </IconButton>
        </span>
        </Tooltip>
          <Tooltip title={"Save"}>
          <span>
          <IconButton aria-label="fingerprint" color="success" >
        <Fingerprint onClick={ this.submitProjects} 
        />
      </IconButton>
      </span>
      </Tooltip>

          </TableCell>
        </TableRow>
        <TableRow>
        <TableCell colSpan={8}  className={this.props.classes.tableForm}>
  <Collapse in={row.open} timeout="auto" unmountOnExit>
    <Box component="form" sx={{ margin: 1 }}>
       <div className="row" style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
            <div className="col-md-2 pull-left">
            <TextField
            error={!this.state.row.Validations.IsProject_Name}
            required
            id="component-error"
            variant="standard"
            label="Project Name"
            sx={{ width: 250 }}
            value={row.Project_Name}
            // helperText={ErrorMsg.Project_Name}
            onChange={(e) => this.handleFieldChange("Project_Name", e)}
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
                </div>
                </div>
                &nbsp;
                <div className="row" >
                <MinHeightTextarea 
        //  error={!this.state.row.Validations.IsTasks}
         required
         text={"Please Enter Description"}
          id="component-error"
          variant="standard"
          label="Description"
          // sx={{ width: '100%' }}
          value={row.Tasks}
          onSummaryChange={this.handleOnTaskChange}
          // helperText={ErrorMsg.Tasks}
        />
                </div>
                
    </Box>
  </Collapse>
</TableCell>
        </TableRow>
        
      </React.Fragment>
    );
  }
}



class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows : [],
      activeStep : 6
    } 
  }

  backSummary = () => {
    this.stepperRef.current.handleBack();
  }

  submitProjectsParent = (row) => {
    let rows = [...this.state.rows];
    rows[0].Id = row.Id;
        this.setState({rows});
        
  }

  DeleteProjects = (id) => {
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
        Project_Name: "",
        StartDate: "",
        EndDate: "",
        Description : ""
      }
      this.state.rows.unshift(row)
      this.setState({
        rows: [...this.state.rows],
      });
    }


  render() {
   const {rows} = this.state;
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
              <TableCell className={` ${this.props.classes.tableHeaderCells}`} ><div className={this.props.classes.iconWrapper}> <Tooltip title="Projects"><AccountTreeIcon sx={{ color: 'grey' }}/></Tooltip></div></TableCell>
              <TableCell className={` ${this.props.classes.tableHeaderCells}`}><div className={this.props.classes.iconWrapper}><Tooltip title="StartDate"><CalendarMonthIcon sx={{ color: 'grey' }}/></Tooltip></div></TableCell>
              <TableCell className={` ${this.props.classes.tableHeaderCells}`}><div className={this.props.classes.iconWrapper}><Tooltip title="EndDate"><CalendarMonthIcon sx={{ color: 'grey' }}/></Tooltip></div></TableCell>
              <TableCell className={` ${this.props.classes.tableHeaderCells}`}><div className={this.props.classes.iconWrapper}><Tooltip title="Description"><DescriptionIcon sx={{ color: 'grey' }}/></Tooltip></div></TableCell>
              <TableCell className={` ${this.props.classes.tableHeaderCells}`}> 
            <Button variant="contained" onClick={(e) => this.addNewRow(e)} className={this.props.classes.containedbutton}>add projects</Button>
          </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.name} row={row} 
              submitProjectsParent = {this.submitProjectsParent}
              DeleteProjects = {this.DeleteProjects}
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
    <Projects {...props} classes={classes} routeParams={params} navigate={navigate} />
  );
}


export default withSharedSnackbar(WithNavigate);