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

// const [skillData, setSkillData] = useState([
//   { key: 1, label: 'React' },
//   { key: 2, label: 'JavaScript' },
//   { key: 3, label: 'Node.js' },
// ]);

class Row extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      summary: '',
      loading: false,
      task : '',
      row : {
        open: props.row.Id === 0 ? true : false,
        Company: props.row.company,
        Designation: props.row.Designation,
        Location: props.row.Location,
        Experience: props.row.Experience,
        Skills: props.row.Skills,
        Tasks: props.row.Tasks,
        Validations: {
          "IsCompany": true,
          "IsDesignation": true,
          "IsLocation": true,
          "IsExperience": true,
          "IsSkills": true,
          "IsTasks": true
        }
      },
      ErrorMsg: {
        Company: "",
        Designation: "",
        Location: "",
        Experience: "",
        Skills: "",
        Tasks: ""
      },
      skillData: [
        { key: 1, label: 'React' },
        { key: 2, label: 'JavaScript' },
        { key: 3, label: 'Node.js' },
        { key: 3, label: 'MongoDB' },
        { key: 3, label: 'Oracle' },
        { key: 3, label: 'Spring Boot' },
        { key: 3, label: 'Spring Framework' }
      ], skillsData : [
        // { key: 1, label: 'React' },
        // { key: 2, label: 'JavaScript' },
        // { key: 3, label: 'Node.js' }
      ]
    };
    
  }

  handleClick = (event) => {
    let row = { ...this.state.row }
    row.open = event;
    if (row.Id !== 0)
    this.setState({ row  });
  };


  setCompany = (event) => {
    let row = { ...this.state.row }
    let ErrorMsg = { ...this.state.ErrorMsg }
    row.Company = event.target.value.trimStart();

    if (event.target.value) {
      row.Validations.IsCompany = true;
      ErrorMsg.Company = "";
    }
    else {
      row.Validations.IsCompany = false;
      ErrorMsg.Company = "Company name cannot be empty";
    }

    this.setState({ row, ErrorMsg });
  }

  setDesignation = (event) => {
    let row = { ...this.state.row }
    let ErrorMsg = { ...this.state.ErrorMsg }
    row.Designation = event.target.value.trimStart();

    if (event.target.value) {
      row.Validations.IsDesignation = true;
      ErrorMsg.Designation = "";
    }
    else {
      row.Validations.IsDesignation = false;
      ErrorMsg.Designation = "Designation name cannot be empty";
    }

    this.setState({ row, ErrorMsg });
  }

  setLocation = (event) => {
    let row = { ...this.state.row }
    let ErrorMsg = { ...this.state.ErrorMsg }
    row.Location = event.target.value.trimStart();

    if (event.target.value) {
      row.Validations.IsLocation = true;
      ErrorMsg.Location = "";
    }
    else {
      row.Validations.IsLocation = false;
      ErrorMsg.Location = "Location name cannot be empty";
    }

    this.setState({ row, ErrorMsg });
  }


  setExperience = (event) => {
    let row = { ...this.state.row }
    let ErrorMsg = { ...this.state.ErrorMsg }
    row.Experience = event.target.value.trimStart();

    if (event.target.value) {
      row.Validations.IsExperience = true;
      ErrorMsg.Experience = "";
    }
    else {
      row.Validations.IsExperience = false;
      ErrorMsg.Experience = "Experience name cannot be empty";
    }

    this.setState({ row, ErrorMsg });
  }

  setSkills = (event) => {
    let row = { ...this.state.row }
    let ErrorMsg = { ...this.state.ErrorMsg }
    row.Skills = event.target.value.trimStart();

    if (event.target.value) {
      row.Validations.IsLocation = true;
      ErrorMsg.Skills = "";
    }
    else {
      row.Validations.IsSkills = false;
      ErrorMsg.Skills = "Skills name cannot be empty";
    }

    this.setState({ row, ErrorMsg });
  }


  setTasks = (event) => {
    let row = { ...this.state.row }
    let ErrorMsg = { ...this.state.ErrorMsg }
    row.Tasks = event.target.value.trimStart();

    if (event.target.value) {
      row.Validations.IsTasks = true;
      ErrorMsg.Tasks = "";
    }
    else {
      row.Validations.IsTasks = false;
      ErrorMsg.Tasks = "Tasks name cannot be empty";
    }

    this.setState({ row, ErrorMsg });
  }

  handleDelete = (chipToDelete) => {
    this.setState((prevState) => ({
      skillsData: prevState.skillsData.filter((chip) => chip.key !== chipToDelete.key), // Filter out the deleted chip
    }));
  };

  onSelectSkill = (chips) => {
    let selectedSkill = chips.target.innerText;  // Get the selected skill
    this.setState((prevState) => ({
      skillsData: [...prevState.skillsData, { key: prevState.skillsData.length + 1, label: selectedSkill }]
    }));
  }

  handleOnTaskChange = (task) => {
    let row = {...this.state.row};
    row.Tasks = task;
    this.setState({ row});
  }

  render() {
    const { row } = this.state;
    const { ErrorMsg , summary, skillsData } = this.state;
    const isSummaryEmpty = !summary;
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
          <TableCell  className={this.props.classes.tableCell}>{row.Company}</TableCell>
          <TableCell  className={this.props.classes.tableCell}>{row.Designation}</TableCell>
          <TableCell  className={this.props.classes.tableCell}>{row.Location}</TableCell>
          <TableCell  className={this.props.classes.tableCell}>{row.Experience}</TableCell>
          {/* <TableCell className={this.props.classes.tableCell}>{row.Skills}</TableCell> */}
          <TableCell className={this.props.classes.tableCell}>
          <Box mt={2} sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {skillsData.map((skill, index) => (
            <Chip
              key={index}
              label={skill.label}
            />
          ))}
          </Box>
            </TableCell>
          <TableCell  className={this.props.classes.tableCell}>{row.Tasks}</TableCell>
          <TableCell align="right">
          <Tooltip title="Back">
            <span>
        <IconButton aria-label="fingerprint" color="secondary" disabled='true'>
          <Fingerprint onClick={this.props.backSummary } />
        </IconButton>
        </span>
        </Tooltip>
          <Tooltip title={isSummaryEmpty ? "Please Enter Expereince" : "Submit"}>
          <span>
          <IconButton aria-label="fingerprint" color="success"   disabled={!summary}>
        <Fingerprint onClick={this.props.submitSummary } 
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
            error={!this.state.row.Validations.IsCompany}
            required
            id="component-error"
            variant="standard"
            label="Company Name"
            sx={{ width: 250 }}
            value={row.Company}
            // helperText={ErrorMsg.Company}
            onChange={(e) => this.setCompany(e)}
            inputProps={{ maxLength: 50 }}
          />
          </div>
        <div className="col-md-2 pull-left">
          <TextField
            error={!this.state.row.Validations.IsDesignation}
            required
            id="component-error"
            variant="standard"
            label="Designation"
            sx={{ width: 250 }}
            value={row.Designation}
            // helperText={ErrorMsg.Designation}
            onChange={(e) => this.setDesignation(e)}
            inputProps={{ maxLength: 50 }}
          />
        </div>
        <div className="col-md-2 pull-left">
          <TextField
           error={!this.state.row.Validations.IsLocation}
           required
            id="component-error"
            variant="standard"
            label="Location"
            sx={{ width: 250 }}
            value={row.Location}
            // helperText={ErrorMsg.Location}
            onChange={(e) => this.setLocation(e)}
            inputProps={{ maxLength: 50 }}
          />
        </div>
        <div className="col-md-2 pull-left">
          <TextField
           error={!this.state.row.Validations.IsExperience}
           required
            id="component-error"
            variant="standard"
            label="Experience"
            sx={{ width: 250 }}
            value={row.Experience}
            // helperText={ErrorMsg.Experience}
            onChange={(e) => this.setExperience(e)}
            inputProps={{ maxLength: 15 }}
          />
        </div>
        {/* <Box> */}
        <div className="col-md-2 pull-left">
        <Stack direction="row" spacing={1}>
        {this.state.skillData.map((chip) => (
        <Chip
          key={chip.key}
          label={chip.label}
          onClick={(chip)=>this.onSelectSkill(chip)}
        />
      ))}
         </Stack>
          <Box mt={2} sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {skillsData.map((skill, index) => (
            <Chip
              key={index}
              label={skill.label}
              onDelete={() => this.handleDelete(skill)} // Handle deletion
            />
          ))}
        </Box>
      {/* </Box> */}
      </div>
        </div>
        &nbsp;
        <div className="row">
          
        <MinHeightTextarea 
        //  error={!this.state.row.Validations.IsTasks}
         required
         text={"Please Enter Tasks"}
          id="component-error"
          variant="standard"
          label="Tasks"
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



class Experience extends React.Component {
  constructor(props) {
    super(props);
    this.stepperRef = React.createRef();
    this.state = {
      rows : []
    } // Create a reference to the child component
  }

  backSummary = () => {
    this.stepperRef.current.handleBack();
  }

  submitSummary = () => {
    this.stepperRef.current.handleNext();
   if (this.props.enqueueSnackbar) {
      this.props.enqueueSnackbar('This is a shared notification message!', {
        variant: 'success',
      }); }
    // axios.put(`https://api.example.com/data/`, this.state.summary)
    // .then(response => {

    //   this.setState({ data: response.data, loading: false });
    //   console.log('Data updated successfully:', response.data);
    // })
    // .catch(error => {
    //   // // Handle error
    //   // this.setState({ error: error.message, loading: false });
    //   // console.error('Error updating data:', error);
    // });
  }

  addNewRow = event => {
      let row = {
        open: true,
        Id : 0,
        Company: "",
        Designation: "",
        Location: "",
        Experience: "",
        Skills: "",
        Tasks: ""
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
        <LinearStepper ref={this.stepperRef}/>
      <TableContainer component={Paper} >
        <Table  aria-label="collapsible table">
          <TableHead className={` ${this.props.classes.tableHeaderRow}`}>
            <TableRow >
              <TableCell className={` ${this.props.classes.tableHeaderCells}`}></TableCell>
              <TableCell className={` ${this.props.classes.tableHeaderCells}`} > <Tooltip title="Company"><BusinessIcon sx={{ color: 'grey' }}/></Tooltip></TableCell>
              <TableCell className={` ${this.props.classes.tableHeaderCells}`}><Tooltip title="Designation"><ContactEmergencyIcon sx={{ color: 'grey' }}/></Tooltip></TableCell>
              <TableCell className={` ${this.props.classes.tableHeaderCells}`}><Tooltip title="Location"><GpsFixedIcon sx={{ color: 'grey' }}/></Tooltip></TableCell>
              <TableCell className={` ${this.props.classes.tableHeaderCells}`}><Tooltip title="Experience"><WorkHistoryIcon sx={{ color: 'grey' }}/></Tooltip></TableCell>
              <TableCell className={` ${this.props.classes.tableHeaderCells}`}><Tooltip title="Skills"><AddRoadIcon sx={{ color: 'grey' }}/></Tooltip></TableCell>
              <TableCell className={` ${this.props.classes.tableHeaderCells}`}><Tooltip title="Tasks"><TaskAltIcon sx={{ color: 'grey' }}/></Tooltip></TableCell>
              <TableCell className={` ${this.props.classes.tableHeaderCells}`}> 
            <Button variant="contained" onClick={(e) => this.addNewRow(e)} className={this.props.classes.containedbutton}>add expereince</Button>
          </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.name} row={row} 
              submitSummary = {this.submitSummary}
              backSummary = {this.backSummary}
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
    <Experience {...props} classes={classes} routeParams={params} navigate={navigate} />
  );
}


export default withSharedSnackbar(WithNavigate);