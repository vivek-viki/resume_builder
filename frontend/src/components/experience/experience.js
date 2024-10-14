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
import BusinessIcon from '@mui/icons-material/Business';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import AddRoadIcon from '@mui/icons-material/AddRoad';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import Button from '@mui/material/Button';
import {TextField } from '@mui/material';
import { useStyles } from '../../shared/styles/defaultStyle';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Loading from "../../shared/loading";
import InputAdornment from '@mui/material/InputAdornment';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Moment from "react-moment";
import DatePicker from "../../shared/datePicker";
import dayjs from 'dayjs';


class Row extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false, 
      row : {
        open: props.row.id === 0 ? true : false,
        id : props.row.id,
        company: props.row.company,
        designation: props.row.designation,
        location: props.row.location,
        startDate : props.row.startDate,
        endDate : props.row.endDate,
        experience: props.row.experience,
        skills: props.row.skills,
        tasks: props.row.tasks,
      },
      Validations: {
        "Iscompany": true,
        "Isdesignation": true,
        "Islocation": true,
        "Isexperience": true,
        "IsStartDate" : true,
        "IsEndDate"  :true,
        "Isskills": true,
        "Istasks": true
      },
      ErrorMsg: {
        company: "",
        designation: "",
        location: "",
        experience: "",
        startDate : "",
        endDate : "",
        skills: "",
        tasks: ""
      },
      skillData: this.props.skillsList || [],
      New_Skills : []
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
    let Validations = { ...this.state.Validations };
    let ErrorMsg = { ...this.state.ErrorMsg };
    row[fieldName] = event.target.value.trimStart();
  
    if (event.target.value) {
      Validations[`Is${fieldName}`] = true;
      ErrorMsg[fieldName] = "";
    } else {
      Validations[`Is${fieldName}`] = false;
      ErrorMsg[fieldName] = `${fieldName} cannot be empty`;
    }
    this.setState({ row, ErrorMsg, Validations });
  }

  handleDelete = (chipToDelete) => {
    this.setState((prevState) => {
      const updatedSkills = prevState.row.skills.filter((skill) => skill !== chipToDelete);
  
      return {
        row: {
          ...prevState.row,
          skills: updatedSkills, // Update the skills array
        },
        Validations: {
          ...prevState.Validations,
          Isskills: updatedSkills.length === 0 ? false : true, // Set Isskills to false if no skills left
        },
      };
    });
  };
  

  onSelectSkill = (selectedSkill) => {
    let validations = {...this.state.Validations};
    validations.Isskills = true;
    this.setState((prevState) => ({
      row: {
        ...prevState.row,
        skills: prevState.row.skills.includes(selectedSkill)
          ? prevState.row.skills // If skill already exists, keep the array unchanged
          : [...prevState.row.skills, selectedSkill] // Otherwise, add the new skill
      },
      Validations: validations
    }));
  }


  handleOnTaskChange = (task) => {
    let row = {...this.state.row};
    row.tasks = task;
    this.setState({ row});
  }

  newSkills = () => {
    this.setState((prevState) => {
      // Access skills from prevState.row
      const currentSkills = prevState.row.skills || [];
  
      // Avoid duplicates by checking if New_Skills is already in the array
      const updatedSkills = currentSkills.includes(this.state.New_Skills)
        ? currentSkills
        : [...currentSkills, this.state.New_Skills];
  
      // Update skills inside the row object and reset New_Skills
      return {
        row: {
          ...prevState.row, // Spread the existing properties of row
          skills: updatedSkills, // Update skills
        },
        New_Skills: "", // Reset New_Skills
      };
    });
  };
  

  handleDate = (date, type) => {
    const formattedDate = dayjs(date).format('YYYY-MM-DD');
    let row = { ...this.state.row };
    row[type] = formattedDate;
    this.setState({ row });
  }


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


  submitexperience = () => {
    let row = {...this.state.row};
    let Validations = { ...this.state.Validations };
    let ErrorMsg = {...this.state.ErrorMsg};
    if(row.company && row.designation && row.location && row.experience && row.skills.length > 0 && row.tasks)
    {
      const payload = {
        "userId": 1, 
        "id" : row.id,
        "company": row.company,
        "designation": row.location,
        "location" : row.location,
        "experience" : row.experience,
        "startDate": row.startDate ? this.formatDateToYYYYMMDD(row.startDate) : null, // Format date to DD-MM-YYYY
        "endDate" : row.endDate ? this.formatDateToYYYYMMDD(row.endDate) : null,  
        "skills" : row.skills,
        "tasks" : row.tasks
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
          row.startDate = data.data.startDate;
          row.endDate = data.data.endDate;
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
            row.startDate = data.data.startDate;
            row.endDate = data.data.endDate;
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
    }
    else{
      if (row.company === "" || row.company === null) {
        Validations.Iscompany = false;
        ErrorMsg.company = "Company name be empty";
      }
      if(row.designation === "" || row.designation === null){
        Validations.Isdesignation = false;
        ErrorMsg.designation = "designation cannot be empty";
      }
      if(row.location === "" || row.location === null){
        Validations.Islocation = false;
        ErrorMsg.location = "location cannot be empty";
      }
      if(row.experience === "" || row.experience === null){
        Validations.Isexperience = false;
        ErrorMsg.experience = "experience cannot be empty";
      }
      if(row.skills.length === 0){
        Validations.Isskills = false;
        ErrorMsg.skills = "skills cannot be empty";
      }
      if(row.tasks === "" || row.tasks === null){
        Validations.Istasks = false;
        ErrorMsg.tasks = "tasks cannot be empty";
      }
      this.setState({ row, Validations });
    }
    this.setState({ ErrorMsg });
  }

  handleSkillChange = (fieldName, event) => {
    let validations = {...this.state.Validations};
    let ErrorMsg = { ...this.state.ErrorMsg };
    if (event.target.value) {
      validations.Isskills = true;
      ErrorMsg.skills = "";
    } else {
      validations.Isskills = false;
      ErrorMsg.skills = `${fieldName} cannot be empty`;
    }
    this.setState({ New_Skills : event.target.value, Validations: validations, ErrorMsg });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.skillsList !== this.props.skillsList) {
      this.setState({
        skillData: this.props.skillsList,
      });
    }
  }

  render() {
    const { row, Validations } = this.state;
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
          <TableCell  className={this.props.classes.tableCell}><div className={this.props.classes.iconWrapper}>{row.company}</div></TableCell>
          <TableCell  className={this.props.classes.tableCell}><div className={this.props.classes.iconWrapper}>{row.designation}</div></TableCell>
          <TableCell  className={this.props.classes.tableCell}><div className={this.props.classes.iconWrapper}>{row.location}</div></TableCell>
          <TableCell  className={this.props.classes.tableCell}><div className={this.props.classes.iconWrapper}>{row.experience}</div></TableCell>
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
          <TableCell  className={this.props.classes.tableCell}><div className={this.props.classes.iconWrapper}>
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
          <TableCell className={this.props.classes.tableCell}> 
          <Box mt={2} sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {row.skills.map((skill, index) => (
            <Chip
              key={index}
              label={skill}
            />
          ))}
          </Box>
            </TableCell>
          <TableCell  className={this.props.classes.tableCell}><div className={this.props.classes.iconWrapper}>{row.tasks}</div></TableCell>
          <TableCell align="right">
          <Tooltip title="Delete">
            <span>
        <IconButton aria-label="fingerprint" color="secondary">
          <Fingerprint onClick={() => this.props.DeleteExperience(row.id)} />
        </IconButton>
        </span>
        </Tooltip>
          <Tooltip title={"Save"}>
          <span>
          <IconButton aria-label="fingerprint" color="success" >
        <Fingerprint onClick={ this.submitexperience} 
        />
      </IconButton>
      </span>
      </Tooltip>
      <Loading loading={this.state.loading} {...this.props}/>
          </TableCell>
        </TableRow>
        <TableRow>
        <TableCell colSpan={10}  className={this.props.classes.tableForm}>
  <Collapse in={row.open} timeout="auto" unmountOnExit>
    <Box component="form" sx={{ margin: 1 }}>
       <div className="row" style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
            <div className="col-md-2 pull-left">
          <TextField
            error={!Validations.Iscompany}
            required
            id="component-error"
            variant="standard"
            label="company Name"
            sx={{ width: 250 }}
            value={row.company}
            // helperText={ErrorMsg.company}
            onChange={(e) => this.handleFieldChange("company", e)}
            inputProps={{ maxLength: 50 }}
          />
          </div>
        <div className="col-md-2 pull-left">
          <TextField
            error={!Validations.Isdesignation}
            required
            id="component-error"
            variant="standard"
            label="designation"
            sx={{ width: 250 }}
            value={row.designation}
            // helperText={ErrorMsg.designation}
            onChange={(e) => this.handleFieldChange("designation", e)}
            inputProps={{ maxLength: 50 }}
          />
        </div>
        <div className="col-md-2 pull-left">
          <TextField
           error={!Validations.Islocation}
           required
            id="component-error"
            variant="standard"
            label="location"
            sx={{ width: 250 }}
            value={row.location}
            // helperText={ErrorMsg.location}
            onChange={(e) => this.handleFieldChange("location", e)}
            inputProps={{ maxLength: 50 }}
          />
        </div>
        <div className="col-md-2 pull-left">
          <TextField
           error={!Validations.Isexperience}
           required
            id="component-error"
            variant="standard"
            label="experience"
            sx={{ width: 250 }}
            value={row.experience}
            // helperText={ErrorMsg.experience}
            onChange={(e) => {
              const { value } = e.target;
              // Allow input only if it's a number or empty (to allow deletion)
              if (/^\d*$/.test(value)) {
                this.handleFieldChange("experience", e);  // Update only if valid
              }
            }}
            // onChange={(e) => this.handleFieldChange("experience", e)}
            inputProps={{ maxLength: 10 }}
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
        {/* <Box> */}
        <div className="col-md-2 pull-left">
        <Stack direction="row" spacing={1}>
        {this.state.skillData.map((skill, index) => (
          <Chip
            key={index}          
            label={skill}      
            onClick={() => this.onSelectSkill(skill)}
          />
        ))}
      </Stack>
          <Box mt={2} sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {row.skills.map((skill, index) => (
            <Chip
              key={index}
              label={skill}
              onDelete={() => this.handleDelete(skill)} // Handle deletion
            />
          ))}
        </Box>
      {/* </Box> */}
      </div>
        </div>
        <div className="row" style={{ marginBottom: '10px' }}>
        <TextField
            required
            id="component-error"
            variant="standard"
            label="Skills"
            sx={{ width: '100%'}}
            error={!Validations.Isskills}
            value={this.state.New_Skills}
            // helperText={ErrorMsg.College}
            onChange={(e) => this.handleSkillChange("Skills", e)}
            inputProps={{ maxLength: 50 }}
            InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.newSkills}
                      disabled = {this.state.New_Skills == ""}  // Define what happens on click
                      sx={{ transform: 'translateY(-7px)' }}
                    >
                      Add Skills
                    </Button>
                  </InputAdornment>
                ),
              }}
          />
          </div>
          
        <div className="row">
          
        <MinHeightTextarea 
        //  error={!Validations.Istasks}
         required
         text={"Please Enter tasks"}
          id="component-error"
          variant="standard"
          label="tasks"
          // sx={{ width: '100%' }}
          value={row.tasks}
          onSummaryChange={this.handleOnTaskChange}
          // helperText={ErrorMsg.tasks}
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



class Experience extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows : [],
      skillsList : [],
      activeStep : 2
    } 
  }
  submitexperienceParent = (row) => {
    let rows = [...this.state.rows];
    rows[0].id = row.id;
        this.setState({rows});
        
  }

  getSkills = () => {
    axios.get(`http://localhost:5151/experience/getSkills`)
    .then(response => {
      this.setState({ skillsList: response.data});
    })
    .catch(error => {
      const errorMessage = error.response?.data || 'An error occurred';
      this.props.enqueueSnackbar(errorMessage, {
        variant: 'error',
      });
    })
  }

  componentDidMount(){
    this.setState({ loading: true });
    this.getSkills();
    axios.post(`http://localhost:5151/experience/getExperience/1`)
    .then(response => {
      this.setState({ rows: response.data, loading: false });
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
  

  addNewRow = event => {
      let row = {
        open: true,
        id : 0,
        company: "",
        designation: "",
        location: "",
        experience: "",
        startDate : "",
        endDate : "",
        skills: [],
        tasks: ""
      }
      this.state.rows.unshift(row)
      this.setState({
        rows: [...this.state.rows],
      });
    }

    DeleteExperience = (id) => {
      let rows = [...this.state.rows]
      this.setState({ loading: true });
      axios.delete(`http://localhost:5151/experience/deleteExperience/${id}`)
      .then(response => {
        // this.setState({ loading: false })
        if (this.props.enqueueSnackbar) {
          this.props.enqueueSnackbar('experience deleted successfully', {
            variant: 'success',
          }); }
          // this.setState({ loading: false })
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

    submitExperience = () =>{
      this.props.navigate('/education');
    }

  render() {
   const {rows, skillsList} = this.state;
   debugger;
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
              <TableCell className={` ${this.props.classes.tableHeaderCells}`} ><div className={this.props.classes.iconWrapper}> <Tooltip title="Company"><BusinessIcon sx={{ color: 'grey' }}/></Tooltip></div></TableCell>
              <TableCell className={` ${this.props.classes.tableHeaderCells}`}><div className={this.props.classes.iconWrapper}><Tooltip title="Designation"><ContactEmergencyIcon sx={{ color: 'grey' }}/></Tooltip></div></TableCell>
              <TableCell className={` ${this.props.classes.tableHeaderCells}`}><div className={this.props.classes.iconWrapper}><Tooltip title="Location"><GpsFixedIcon sx={{ color: 'grey' }}/></Tooltip></div></TableCell>
              <TableCell className={` ${this.props.classes.tableHeaderCells}`}><div className={this.props.classes.iconWrapper}><Tooltip title="Experience"><WorkHistoryIcon sx={{ color: 'grey' }}/></Tooltip></div></TableCell>
              <TableCell className={` ${this.props.classes.tableHeaderCells}`}><div className={this.props.classes.iconWrapper}><Tooltip title="StartDate"><CalendarMonthIcon sx={{ color: 'grey' }}/></Tooltip></div></TableCell>
              <TableCell className={` ${this.props.classes.tableHeaderCells}`}><div className={this.props.classes.iconWrapper}><Tooltip title="EndDate"><CalendarMonthIcon sx={{ color: 'grey' }}/></Tooltip></div></TableCell>
              <TableCell className={` ${this.props.classes.tableHeaderCells}`}><div className={this.props.classes.iconWrapper}><Tooltip title="Skills"><AddRoadIcon sx={{ color: 'grey' }}/></Tooltip></div></TableCell>
              <TableCell className={` ${this.props.classes.tableHeaderCells}`}><div className={this.props.classes.iconWrapper}><Tooltip title="Tasks"><TaskAltIcon sx={{ color: 'grey' }}/></Tooltip></div></TableCell>
              <TableCell className={` ${this.props.classes.tableHeaderCells}`}> 
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
    <Button
      variant="contained"
      onClick={(e) => this.addNewRow(e)}
      className={this.props.classes.containedbutton}
      disabled = {(rows[0]?.id === 0)}
    >
      Add experience
    </Button>
    <Tooltip title={"Next"}>
    <IconButton aria-label="fingerprint" color="success"  disabled={!rows.length || rows[0]?.id === 0}>
        <Fingerprint onClick={ this.submitExperience} 
        />
      </IconButton>
      </Tooltip>
      <Loading loading={this.state.loading} {...this.props}/>
  </div>
          </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.id} row={row} 
              submitexperienceParent = {this.submitexperienceParent}
              DeleteExperience = {this.DeleteExperience}
              updateTableData = {this.updateTableData}
              rows = {rows}
              skillsList = {skillsList}
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
    <Experience {...props} classes={classes} routeParams={params} navigate={navigate} />
  );
}


export default withSharedSnackbar(WithNavigate);