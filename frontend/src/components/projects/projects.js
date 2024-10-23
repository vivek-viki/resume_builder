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
import AddRoadIcon from '@mui/icons-material/AddRoad';
import Stack from '@mui/material/Stack';
import InputAdornment from '@mui/material/InputAdornment';


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
        skills : props.row.skills,
      },
      Validations: {
        "IsprojectName": true,
        "IsstartDate": true,
        "IsendDate": true,
        "Isdescription": true,
        "Isskills" : true,
      },
      ErrorMsg: {
        projectName: "",
        startDate: "",
        endDate: "",
        description: "",
        skills : "",
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
    if(row.projectName && row.startDate && row.skills && row.description)
    {
      const payload = {
        "userId": 1, 
        "id" : row.id,
        "projectName": row.projectName,
        "startDate": row.startDate ? this.formatDateToYYYYMMDD(row.startDate) : null, // Format date to DD-MM-YYYY
        "endDate" : row.endDate ? this.formatDateToYYYYMMDD(row.endDate) : null,
        "skills" : row.skills,
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
          row.skills = data.data.skills;
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
            row.skills = data.data.skills;
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
        Validations.IsprojectName = false;
        ErrorMsg.projectName = "ProjectName cannot be empty";
      }
      if(row.startDate === "" || row.startDate === null){
        Validations.IsstartDate = false;
        ErrorMsg.startDate = "StartDate cannot be empty";
      }
      if(row.endDate === "" || row.endDate === null){
        Validations.IsendDate = false;
        ErrorMsg.endDate = "EndDate cannot be empty";
      }
      if(row.skills.length === 0){
        Validations.Isskills = false;
        ErrorMsg.skills = "skills cannot be empty";
      }
      if(row.description === "" || row.description === null){
        Validations.Isdescription = false;
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

  componentDidUpdate(prevProps) {
    if (prevProps.skillsList !== this.props.skillsList) {
      this.setState({
        skillData: this.props.skillsList,
      });
    }
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
            error={!Validations.IsprojectName}
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
            required={!Validations.IsstartDate}
            error={!row.startDate}
            {...this.props}
            />
            </div>
            <div className="col-md-2 pull-left">
            <DatePicker
            label = {"endDate"}
            handleDate = {this.handleDate}
            date = {row.endDate}
            minDate={row.startDate ? dayjs(row.startDate) : null}
            required={false}
            error={false}
            {...this.props}
            />
                </div>
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
      skillsList : [],
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
        description : "",
        skills : [],
      }
      this.state.rows.unshift(row)
      this.setState({
        rows: [...this.state.rows],
      });
    }

    ResumeGenerator = () => {
      debugger;
      this.setState({ loading: true })
      axios.post(`http://localhost:5155/resume/generateResume/1`,  {},{
        responseType: 'blob', // Set response type to blob
    })
    .then(response => {
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      
      // Open the PDF in a new tab
      window.open(url, '_blank');

      // Clean up the URL object (optional, but a good practice)
      window.URL.revokeObjectURL(url);
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
  

  render() {
   const {rows, skillsList} = this.state;
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
              <TableCell className={` ${this.props.classes.tableHeaderCells}`}><div className={this.props.classes.iconWrapper}><Tooltip title="Skills"><AddRoadIcon sx={{ color: 'grey' }}/></Tooltip></div></TableCell>
              <TableCell className={` ${this.props.classes.tableHeaderCells}`}><div className={this.props.classes.iconWrapper}><Tooltip title="Description"><DescriptionIcon sx={{ color: 'grey' }}/></Tooltip></div></TableCell>
              <TableCell className={` ${this.props.classes.tableHeaderCells}`}> <div className={this.props.classes.iconWrapper}>
            <Button variant="contained" 
            onClick={(e) => this.addNewRow(e)} 
            className={this.props.classes.containedbutton}
            disabled = {(rows[0]?.id === 0)}
            >add projects</Button>
             <Tooltip title={"Generate Resume"}>
    <IconButton aria-label="fingerprint" color="success"  disabled={!rows.length || rows[0]?.id === 0}>
        <Fingerprint onClick={ this.ResumeGenerator} 
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
              DeleteProject = {this.DeleteProject}
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
    <Projects {...props} classes={classes} routeParams={params} navigate={navigate} />
  );
}


export default withSharedSnackbar(WithNavigate);