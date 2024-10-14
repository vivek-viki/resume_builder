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
import Loading from "../../shared/loading";
import dayjs from 'dayjs';


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
        specialization: props.row.specialization,
      },
      Validations: {
        "Iscollege": true,
        "Iscourse": true,
        "Isprogram": true,
        "IsstartDate": true,
        "IsendDate": true,
        "Iscgpa": true,
        "Isspecialization": true
      },
      ErrorMsg: {
        college: "",
        course: "",
        program: "",
        startDate: "",
        endDate: "",
        cgpa: "",
        specialization: "",
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
    let Validations = {...this.state.Validations};
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
  
  submitEducation = () => {
    let row = {...this.state.row};
    let ErrorMsg = {...this.state.ErrorMsg};
    let Validations = {...this.state.Validations};
    debugger;
    if(row.college && row.course && row.program && row.startDate && row.endDate && row.cgpa && row.specialization)
    { const payload = {
      "userId": 1, 
      "id" : row.id,
      "college": row.college,
      "course": row.course,
      "program" : row.program,
      "startDate": row.startDate ? this.formatDateToYYYYMMDD(row.startDate) : null, // Format date to DD-MM-YYYY
      "endDate" : row.endDate ? this.formatDateToYYYYMMDD(row.endDate) : null,
      "cgpa" : row.cgpa,
      "specialization" : row.specialization
    };
    this.setState({ loading: true })
    axios.post(`http://localhost:5152/education/addEducation`, payload)
    .then(data => {
      if(row.id === 0){
        row.open = false;
        row.id = data.data.id;
        row.college = data.data.college;
        row.course = data.data.course;
        row.program = data.data.program;
        row.startDate = data.data.startDate;
        row.endDate = data.data.endDate;
        row.cgpa = data.data.cgpa;
        row.specialization = data.data.specialization;
        this.setState({row});
        if (this.props.enqueueSnackbar) {
          this.props.enqueueSnackbar('education added successfully', {
            variant: 'success',
          }); }
        this.props.updateTableData(row);
         } else if(row.id === data.data.id){
          row.open = false;
          row.id = data.data.id;
          row.college = data.data.college;
          row.course = data.data.course;
          row.program = data.data.program;
          row.startDate = data.data.startDate;
          row.endDate = data.data.endDate;
          row.cgpa = data.data.cgpa;
          row.specialization = data.data.specialization;
          this.setState({row});
          if (this.props.enqueueSnackbar) {
            this.props.enqueueSnackbar('education updated successfully', {
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
      // this.props.submitEducationParent(row);
    }
    else{
      if (row.college === "" || row.college === null) {
        Validations.Iscollege = false;
        ErrorMsg.college = "college cannot be empty";
      }
      if(row.course === "" || row.course === null){
        Validations.Iscourse = false;
        ErrorMsg.course = "course cannot be empty";
      }
      if(row.program === "" || row.program === null){
        Validations.Isprogram = false;
        ErrorMsg.program = "program cannot be empty";
      }
      if(row.startDate === "" || row.startDate === null){
        Validations.IsstartDate = false;
        ErrorMsg.startDate = "startDate cannot be empty";
      }
      if(row.endDate === "" || row.endDate === null){
        Validations.IsendDate = false;
        ErrorMsg.endDate = "endDate cannot be empty";
      }
      if(row.cgpa === "" || row.cgpa === null){
        Validations.Iscgpa = false;
        ErrorMsg.cgpa = "cgpa cannot be empty";
      }
      if(row.specialization === "" || row.specialization === null){
        Validations.Isspecialization = false;
        ErrorMsg.specialization = "specialization cannot be empty";
      }
      this.setState({ row, Validations });
    }
    this.setState({ ErrorMsg });
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
          <TableCell  className={this.props.classes.tableCell}><div className={this.props.classes.iconWrapper}> {row.college}</div></TableCell>
          <TableCell  className={this.props.classes.tableCell}><div className={this.props.classes.iconWrapper}> {row.course}</div></TableCell>
          <TableCell  className={this.props.classes.tableCell}><div className={this.props.classes.iconWrapper}> {row.program}</div></TableCell>
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
          <TableCell className={this.props.classes.tableCell}><div className={this.props.classes.iconWrapper}> {row.cgpa}</div></TableCell>
          <TableCell  className={this.props.classes.tableCell}><div className={this.props.classes.iconWrapper}> {row.specialization}</div></TableCell>
          <TableCell align="right" className={this.props.classes.tableCell}>
          <Tooltip title="Delete">
            <span>
        <IconButton aria-label="fingerprint" color="secondary">
          <Fingerprint onClick={() => this.props.DeleteEducation(row.id)} />
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
      <Loading loading={this.state.loading} {...this.props}/>

          </TableCell>
        </TableRow>
        <TableRow>
        <TableCell colSpan={9}  className={this.props.classes.tableForm}>
  <Collapse in={row.open} timeout="auto" unmountOnExit>
    <Box component="form" sx={{ margin: 1 }}>
       <div className="row" style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
            <div className="col-md-2 pull-left">
          <TextField
            error={!Validations.Iscollege}
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
            error={!Validations.Iscourse}
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
           error={!Validations.Isprogram}
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
        <div className="col-md-2 pull-left">
          <TextField
           error={!Validations.Iscgpa}
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
           error={!Validations.Isspecialization}
           required
            id="component-error"
            variant="standard"
            label="specialization"
            sx={{ width: 250 }}
            value={row.specialization}
            // helperText={ErrorMsg.specialization}
            onChange={(e) => this.handleFieldChange("specialization", e)}
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


    componentDidMount(){
      this.setState({ loading: true });
      axios.get(`http://localhost:5152/education/getEducation/1`)
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
  
    DeleteEducation = (id) => {
      this.setState({ loading: true });
      axios.delete(`http://localhost:5152/education/deleteEducation/${id}`)
      .then(response => {
        if (this.props.enqueueSnackbar) {
          this.props.enqueueSnackbar('Education deleted successfully', {
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
          college: "",
          course: "",
          program: "",
          startDate: "",
          endDate: "",
          cgpa: "",
          specialization: ""
        }
        this.state.rows.unshift(row)
        this.setState({
          rows: [...this.state.rows],
        });
      }
  
    submitEducation = () => {
      this.props.navigate('/skills');
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
              <TableCell className={` ${this.props.classes.tableHeaderCells}`}><div className={this.props.classes.iconWrapper}><Tooltip title="specialization"><FolderSpecialIcon sx={{ color: 'grey' }}/></Tooltip></div></TableCell>
              {/* <TableCell className={` ${this.props.classes.tableHeaderCells}`}><Tooltip title="Tasks"></Tooltip></TableCell> */}
              <TableCell className={` ${this.props.classes.tableHeaderCells}`}> 
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <Button variant="contained"
               onClick={(e) => this.addNewRow(e)} 
              className={this.props.classes.containedbutton}
              disabled = {(rows[0]?.id === 0)}
              >
                add education</Button>
    <Tooltip title={"Next"}>
    <IconButton aria-label="fingerprint" color="success"  disabled={!rows.length || rows[0]?.id === 0}>
        <Fingerprint onClick={ this.submitEducation} 
        />
      </IconButton>
      </Tooltip>
  </div>
  <Loading loading={this.state.loading} {...this.props}/>

          </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.id} row={row} 
              updateTableData = {this.updateTableData}
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