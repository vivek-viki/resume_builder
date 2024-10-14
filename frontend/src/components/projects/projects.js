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
import Loading from '../../shared/loading';
import dayjs from 'dayjs';


class Row extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      row : {
        open: props.row.id === 0 ? true : false,
        id: props.row.id,
        projectName: props.row.projectName,
        startDate: props.row.startDate,
        endDate: props.row.endDate,
        description : props.row.description,
      },
      Validations: {
        "IsProjectName": true,
        "IsStartDate": true,
        "IsEndDate": true,
        "IsDescription": true
      },
      ErrorMsg: {
        projectName: "",
        startDate: "",
        endDate: "",
        description: ""
      },
    };
    
  }

  handleClick = (event) => {
    let row = { ...this.state.row }
    row.open = event;
    // if (row.Id !== 0)
    this.setState({ row  });
  };


  formatDateToYYYYMMDD = (date) => {
    if (!date) {
      return null; // If date is empty, return null
    }
  
    const parsedDate = new Date(date);
  
    // Check if the date is valid
    if (isNaN(parsedDate.getTime())) {
      console.error("Invalid date:", date);
      return null; // Return null for invalid date
    }
  
    const year = parsedDate.getFullYear();
    const month = ('0' + (parsedDate.getMonth() + 1)).slice(-2); // Add leading 0 if needed
    const day = ('0' + parsedDate.getDate()).slice(-2); // Add leading 0 if needed
  
    return `${year}-${month}-${day}`; // Format as YYYY-MM-DD
  }
  

  submitProjects = () => {
    let row = {...this.state.row};
    let ErrorMsg = {...this.state.ErrorMsg};
    let Validations = {...this.state.Validations};
    debugger;
    if(row.projectName && row.startDate && row.endDate && row.description)
    {
      const payload = {
        "userId": 1, 
        "id" : row.id,
        "projectName": row.projectName,
        "startDate": row.startDate ? this.formatDateToYYYYMMDD(row.startDate) : null, // Format date to DD-MM-YYYY
        "endDate" : row.endDate ? this.formatDateToYYYYMMDD(row.endDate) : null,
        "description" : row.description
      };
      this.setState({ loading: true })
      axios.post(`http://localhost:5153/projects/addProject`, payload)
      .then(data => {
        if(row.id === 0){
          row.open = false;
          row.id = data.data.id;
          row.projectName = data.data.projectName;
          row.startDate = data.data.startDate;
          row.endDate = data.data.endDate;
          row.description = data.data.description;
          this.setState({row});
          if (this.props.enqueueSnackbar) {
            this.props.enqueueSnackbar('project added successfully', {
              variant: 'success',
            }); }
          this.props.updateTableData(row);
           } else if(row.id === data.data.id){
            row.open = false;
            row.id = data.data.id;
            row.projectName = data.data.projectName;
            row.startDate = data.data.startDate;
            row.endDate = data.data.endDate;
            row.description = data.data.description;
            this.setState({row});
            if (this.props.enqueueSnackbar) {
              this.props.enqueueSnackbar('project updated successfully', {
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
    }
    else{
      if (row.projectName === "" || row.projectName === null) {
        Validations.IsProjectName = false;
        ErrorMsg.projectName = "ProjectName cannot be empty";
      }
      if(row.startDate === "" || row.startDate === null){
        Validations.IsStartDate = false;
        ErrorMsg.startDate = "StartDate cannot be empty";
      }
      if(row.endDate === "" || row.endDate === null){
        Validations.IsEndDate = false;
        ErrorMsg.endDate = "EndDate cannot be empty";
      }
      if(row.description === "" || row.description === null){
        Validations.IsDescription = false;
        ErrorMsg.description = "Description cannot be empty";
      }
      this.setState({ row, Validations });
    }
    this.setState({ ErrorMsg });
  }

  handleFieldChange = (fieldName, event) => {
    debugger;
    let row = { ...this.state.row };
    let ErrorMsg = { ...this.state.ErrorMsg };
    let Validations = {...this.state.Validations};
    const value = event.target.value; // Store full value (including spaces)
  const trimmedValue = value.trim(); // Trimmed value for validation purposes
  row[fieldName] = value;
  
    if (trimmedValue) {
      Validations[`Is${fieldName}`] = true;
      ErrorMsg[fieldName] = "";
    } else {
      Validations[`Is${fieldName}`] = false;
      ErrorMsg[fieldName] = `${fieldName} cannot be empty`;
    }
  
    this.setState({ row, ErrorMsg, Validations });
  }


  handleOnTaskChange = (description) => {
    let row = {...this.state.row};
    row.description = description;
    this.setState({ row});
  }

  handleDate = (date, type) => {
    const formattedDate = dayjs(date).format('YYYY-MM-DD');
    let row = { ...this.state.row };
    row[type] = formattedDate;
    this.setState({ row });
  }

  render() {
    const { row, ErrorMsg, Validations } = this.state;
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
          <TableCell  className={this.props.classes.tableCell}><div className={this.props.classes.iconWrapper}>{row.projectName}</div></TableCell>
          <TableCell  className={this.props.classes.tableCell}><div className={this.props.classes.iconWrapper}>
          {row.startDate && (
              <Chip
                label={row.startDate ? (
                  <Moment format={"YYYY-MM-DD"}>
                    {row.startDate}
                  </Moment>
                ) : ''}
                variant="filled"
              />
            )}
              </div>
          </TableCell>
          <TableCell  className={this.props.classes.tableCell}> <div className={this.props.classes.iconWrapper}>
          {row.endDate && (
            <Chip
              label={row.endDate ? (
                <Moment format={"YYYY-MM-DD"}>
                  {row.endDate}
                </Moment>
              ) : ''}
              variant="filled"
            />
          )}
              </div>
            </TableCell>
          <TableCell  className={this.props.classes.tableCell}><div className={this.props.classes.iconWrapper}>{row.description}</div></TableCell>
          <TableCell align="right">
          <Tooltip title="Delete">
            <span>
        <IconButton aria-label="fingerprint" color="secondary">
          <Fingerprint onClick={() => this.props.DeleteProject(row.id) } />
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
      <Loading loading={this.state.loading} {...this.props}/>
          </TableCell>
        </TableRow>
        <TableRow>
        <TableCell colSpan={8}  className={this.props.classes.tableForm}>
  <Collapse in={row.open} timeout="auto" unmountOnExit>
    <Box component="form" sx={{ margin: 1 }}>
       <div className="row" style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
            <div className="col-md-2 pull-left">
            <TextField
            error={!Validations.IsProjectName}
            required
            id="component-error"
            variant="standard"
            label="Project Name"
            sx={{ width: 250 }}
            value={row.projectName}
            // helperText={ErrorMsg.projectName}
            onChange={(e) => this.handleFieldChange("projectName", e)}
            inputProps={{ maxLength: 50 }}
          />
                </div>
                <div className="col-md-2 pull-left">
            <DatePicker
            label = {"startDate"}
            handleDate = {this.handleDate}
            date = {row.startDate}
            {...this.props}
            />
            </div>
            <div className="col-md-2 pull-left">
            <DatePicker
            label = {"endDate"}
            handleDate = {this.handleDate}
            date = {row.endDate}
            minDate={row.startDate ? dayjs(row.startDate) : null}
            {...this.props}
            />
                </div>
                </div>
                &nbsp;
                <div className="row" >
                <MinHeightTextarea 
        //  error={!this.state.row.Validations.IsTasks}
         required
         text={"Please Enter Description & Skills"}
          id="component-error"
          variant="standard"
          label="Description"
          // sx={{ width: '100%' }}
          value={row.description}
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
      activeStep : 7
    } 
  }

  updateTableData = updatedRow => {
  
    // Copy the current state rows to data
    let data = [...this.state.rows];
  
    // Map through the rows and update the row with id === 0 or matching id with updatedRow
    const updatedData = data.map(row => 
      row.id === 0 || row.id === updatedRow.id ? updatedRow : row
    );
  
    // Update the state with the modified rows
    this.setState({
      rows: updatedData
    });
  };

  componentDidMount(){
    this.setState({ loading: true });
    axios.get(`http://localhost:5153/projects/getProject/1`)
    .then(response => {
      this.setState({ rows: response.data});
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
  }


  DeleteProject = (id) => {
    this.setState({ loading: true });
    axios.delete(`http://localhost:5153/projects/deleteProject/${id}`)
    .then(response => {
      if (this.props.enqueueSnackbar) {
        this.props.enqueueSnackbar('Project deleted successfully', {
          variant: 'success',
        }); }
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
    this.setState((prevState) => {
      const updatedRows = prevState.rows.filter(row => row.id !== id);
      return { rows: updatedRows };
  }, () => {
      this.forceUpdate(); // Force update (not recommended for regular use)
  });
  };

  addNewRow = event => {
      let row = {
        open: true,
        id : 0,
        projectName: "",
        startDate: "",
        endDate: "",
        description : ""
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
              <TableCell className={` ${this.props.classes.tableHeaderCells}`}> <div className={this.props.classes.iconWrapper}>
            <Button variant="contained" 
            onClick={(e) => this.addNewRow(e)} 
            className={this.props.classes.containedbutton}
            disabled = {(rows[0]?.id === 0)}
            >add projects</Button>
            </div>
          </TableCell>
            </TableRow>
            <Loading loading={this.state.loading} {...this.props}/>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.id} row={row} 
              DeleteProject = {this.DeleteProject}
              updateTableData = {this.updateTableData}
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