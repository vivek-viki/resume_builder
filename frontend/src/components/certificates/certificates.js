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
import Fingerprint from '@mui/icons-material/Fingerprint';
import Tooltip from '@mui/material/Tooltip';
import axios from 'axios';
import {withSharedSnackbar  } from '../../shared/snackBar';
import LinearStepper from '../../shared/linearStepper';
import { useNavigate, useParams } from 'react-router-dom';
import GppGoodIcon from '@mui/icons-material/GppGood';
import { useStyles } from '../../shared/styles/defaultStyle';
import Chip from '@mui/material/Chip';
import InputFileUpload from '../../shared/uploaddoc';


function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      {
        date: '2020-01-05',
        customerId: '11091700',
        amount: 3,
      },
      {
        date: '2020-01-02',
        customerId: 'Anonymous',
        amount: 1,
      },
    ],
  };
}

class Row extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      New_Skills : [],
      loading: false,
      selection : [],
    };
  }

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  handleSummaryChange = (summary) => {
    this.setState({ summary: summary });
  }

  handleDelete = (chipToDelete) => {
    this.setState((prevState) => ({
      Skills: prevState.Skills.filter((skill) => skill !== chipToDelete) // Remove the selected skill
    }));
  };

  handleCertificateDelete = (fileNameToDelete) => {
    // Filter out the file with the matching file name
    const updatedSelection = this.state.selection.filter(
      (chip) => chip.fileName !== fileNameToDelete
    );
  
    // Update the state with the new selection array
    this.setState({ selection: updatedSelection });
  };

  onSelectSkill = (event) => {
    const selectedSkill = event.target.innerText;

    this.setState((prevState) => {
      // Avoid duplicates
      const updatedSkills = prevState.Skills.includes(selectedSkill)
        ? prevState.Skills
        : [...prevState.Skills, selectedSkill];
      
      return { Skills: updatedSkills }; // Update Skills directly
    });
  };

  handleFieldChange = (fieldName, event) => {
    debugger;
    this.setState({ New_Skills : event.target.value });
  }

  submitSkills = () => {

    this.setState((prevState) => {
      // Avoid duplicates
      const updatedSkills = prevState.Skills.includes(this.state.New_Skills)
        ? prevState.Skills
        : [...prevState.Skills, this.state.New_Skills];
      
      return { Skills: updatedSkills, New_Skills : "" }; // Update Skills directly
    });
  }

  submitCertificates = () => {
        let selection = {...this.state};
        if(selection){
            this.props.submitCertificatesParent();
        }
  }

  handleFieldChange = (files) => {
    let selection = {...this.state};
    const updatedFiles = files.map((file) => ({
        file: file.file,                  // Store the actual file object if needed
        fileName: file.fileName,          // Store the file name
        fileExtension: file.fileExtension // Store the file extension
    }));

    selection = updatedFiles;

    this.setState({ selection });
  }

  handleFileView = (file) => {
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL, '_blank'); // Open the file in a new tab
  };

  render() {
    const { open,selection } = this.state;

    return (
      <React.Fragment>
        
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={this.handleClick}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
          </TableCell>
          <TableCell align="right"></TableCell>
          <TableCell align="right"></TableCell>
          <TableCell align="right"></TableCell>
          <TableCell align="right">
          <Box mt={2} sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {this.state.selection.map((chip) => (
       <Chip sx={{ marginLeft: "1%" }} 
       className={`mx-3 ${this.props.classes.formField}`} 
       variant="outlined" 
       hidden={!chip.fileName} 
       label={chip.fileName} 
       onClick={() => this.handleFileView(chip.file)}
       color="primary" />
      ))}
          
          </Box>
          </TableCell>
          <TableCell align="right"></TableCell>
          <TableCell align="right">
          {/* <Tooltip title="Back">
            <span>
        <IconButton aria-label="fingerprint" color="secondary" disabled='true'>
          <Fingerprint onClick={this.props.backSummary } />
        </IconButton>
        </span>
        </Tooltip> */}
          <Tooltip title={selection.length == 0 ? "Please upload Certificates": "Submit"}>
          <span>
          <IconButton aria-label="fingerprint" color="success"   disabled={!selection.length}>
        <Fingerprint onClick={this.submitCertificates } 
        />
      </IconButton>
      </span>
      </Tooltip>

          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8} className={this.props.classes.tableForm}>
            <Collapse in={open} timeout="auto" unmountOnExit>
                &nbsp;
            <InputFileUpload 
            handleFileChange = {this.handleFieldChange}
            {...this.props}/>
              {this.state.selection.map((chip) => (
       <Chip sx={{ marginLeft: "1%" }} className={`mx-3 ${this.props.classes.formField}`} variant="outlined" hidden={!chip.fileName} label={chip.fileName} color="primary" onDelete={() => this.handleCertificateDelete(chip.fileName)}/>
      ))}
          
            </Collapse>
          </TableCell>
        </TableRow>
        
      </React.Fragment>
    );
  }
}


const rows = [
  createData(),
];

class Certificates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep : 6
    }
  }

  backSummary = () => {
    this.stepperRef.current.handleBack();
  }

  submitCertificatesParent = () => {
   if (this.props.enqueueSnackbar) {
      this.props.enqueueSnackbar('Certificates added successfully', {
        variant: 'success',
      }); }
      this.props.navigate('/projects');
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

  render() {
    return (
      <Card >
      {/* <CardActionArea > */}
      <CardContent sx={{maxWidth: '100%', width: '93%', height: '65%', boxShadow: 10, marginLeft : '2%', marginTop: '3%', position:'fixed', overflowY: 'auto'}}>
        <LinearStepper  activeStep={this.state.activeStep}/>
      <TableContainer component={Paper} >
        <Table aria-label="collapsible table">
          <TableHead  sx = {{backgroundColor : '#e0e0d1'}} >
            <TableRow >
            <TableCell colSpan={8} align="center"  className={` ${this.props.classes.tableHeaderCells}`}>
      <Tooltip title="Certificates">
        <GppGoodIcon sx={{ color: 'grey' }} />
      </Tooltip>
    </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.name} row={row} 
              submitCertificatesParent = {this.submitCertificatesParent}
              backSummary = {this.backSummary}
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
    <Certificates {...props} classes={classes} routeParams={params} navigate={navigate} />
  );
}


export default withSharedSnackbar(WithNavigate);