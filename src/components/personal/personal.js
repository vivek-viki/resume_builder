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
import PersonIcon from '@mui/icons-material/Person';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import HomeIcon from '@mui/icons-material/Home';
import LinkIcon from '@mui/icons-material/Link';
import DatePicker from '../../shared/datePicker';
import Moment from "react-moment";

class Row extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      loading: false,
      row : {
        open: true,
        Id : props.row.Id,
        Name: props.row.Name,
        Designation: props.row.Designation,
        Number: props.row.Number,
        MailId: props.row.MailId,
        Address : props.row.Address,
        Links: props.row.Links,
        Validations: {
          "IsName": true,
          "IsDesignation": true,
          "IsNumber": true,
          "IsMailId": true,
          "IsAddress": true,
          "IsLinks": true,
        }
      },
      ErrorMsg: {
        Name: "",
        Designation: "",
        Number:"",
        MailId: "",
        Address : "",
        Links: "",
      }
    };
    
  }

  handleClick = () => {
    this.setState({ open: !this.state.open });
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
  
  submitPerson = () => {
    let row = {...this.state.row};
    let ErrorMsg = {...this.state.ErrorMsg};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(row.Name && row.Designation && row.Number.length == 10 && emailRegex.test(row.MailId) && row.Address && row.Links)
    {
      if (this.props.enqueueSnackbar) {
        this.props.enqueueSnackbar('Personal details added successfully', {
          variant: 'success',
        }); }
      this.props.submitPersonParent();
    }
    else{
      if (row.Name === "" || row.Name === null) {
        row.Validations.IsName = false;
        ErrorMsg.Name = "Name cannot be empty";
      }
      if(row.Designation === "" || row.Designation === null){
        row.Validations.IsDesignation = false;
        ErrorMsg.Designation = "Designation cannot be empty";
      }
      if(row.Number === "" || row.Number === null || row.Number.length < 10){
        row.Validations.IsNumber = false;
        ErrorMsg.Number = "Number cannot be empty";
      }
      if(row.MailId === "" || row.MailId === null || !emailRegex.test(row.MailId)){
        row.Validations.IsMailId = false;
        ErrorMsg.MailId = "MailId cannot be empty";
      }
      if(row.Address === "" || row.Address === null){
        row.Validations.IsAddress = false;
        ErrorMsg.Address = "Address cannot be empty";
      }
      if(row.Links === "" || row.Links === null){
        row.Validations.IsLinks = false;
        ErrorMsg.Links = "Links cannot be empty";
      }
      this.setState({ row });
    }
    this.setState({ ErrorMsg });
  }

  render() {
    const { row, ErrorMsg, open } = this.state;
    return (
      <React.Fragment>
        
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => this.handleClick()}>
              {open ? <Tooltip title="Close"><KeyboardArrowUpIcon /></Tooltip> : <Tooltip title="Expand"><KeyboardArrowDownIcon /></Tooltip>}
            </IconButton>
          </TableCell>
          <TableCell  className={this.props.classes.tableCell}><div className={this.props.classes.iconWrapper}>{row.Name}</div></TableCell>
          <TableCell  className={this.props.classes.tableCell}><div className={this.props.classes.iconWrapper}>{row.Designation}</div></TableCell>
          <TableCell  className={this.props.classes.tableCell}><div className={this.props.classes.iconWrapper}>{row.Number}</div></TableCell>
          <TableCell  className={this.props.classes.tableCell}><div className={this.props.classes.iconWrapper}>{row.MailId}</div></TableCell>  
          <TableCell  className={this.props.classes.tableCell}><div className={this.props.classes.iconWrapper}>{row.Address}</div></TableCell>
          <TableCell className={this.props.classes.tableCell}><div className={this.props.classes.iconWrapper}>{row.Links}</div></TableCell>
          <TableCell align="right" className={this.props.classes.tableCell}>
          <Tooltip title={"Save"}>
          <span>
          <IconButton aria-label="fingerprint" color="success" >
        <Fingerprint onClick={ this.submitPerson} 
        />
      </IconButton>
      </span>
      </Tooltip>

          </TableCell>
        </TableRow>
        <TableRow>
        <TableCell colSpan={8}  className={this.props.classes.tableForm}>
  <Collapse in={open} timeout="auto" unmountOnExit>
    <Box component="form" sx={{ margin: 1 }}>
       <div className="row" style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
            <div className="col-md-2 pull-left">
          <TextField
            error={!this.state.row.Validations.IsName}
            required
            id="component-error"
            variant="standard"
            label="Name"
            sx={{ width: 250 }}
            value={row.Name}
            // helperText={ErrorMsg.Name}
            onChange={(e) => this.handleFieldChange("Name", e)}
            inputProps={{ maxLength: 30 }}
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
            onChange={(e) => this.handleFieldChange("Designation", e)}
            inputProps={{ maxLength: 30 }}
          />
        </div>
        <div className="col-md-2 pull-left">
          <TextField
           error={!this.state.row.Validations.IsNumber}
           required
            id="component-error"
            variant="standard"
            label="Number"
            sx={{ width: 250 }}
            value={row.Number}
            // helperText={ErrorMsg.Number}
            onChange={(e) => {
              const { value } = e.target;
              // Allow input only if it's a number or empty (to allow deletion)
              if (/^\d*$/.test(value)) {
                this.handleFieldChange("Number", e);  // Update only if valid
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
           error={!this.state.row.Validations.IsMailId}
           required
            id="component-error"
            variant="standard"
            label="MailId"
            sx={{ width: 250 }}
            value={row.MailId}
            // helperText={ErrorMsg.MailId}
            onChange={(e) => this.handleFieldChange("MailId", e)}
            inputProps={{ maxLength: 20 }}
          />
        </div>
        <div className="col-md-2 pull-left">
          <TextField
           error={!this.state.row.Validations.IsAddress}
           required
            id="component-error"
            variant="standard"
            label="Address"
            sx={{ width: 250 }}
            value={row.Address}
            // helperText={ErrorMsg.Address}
            onChange={(e) => this.handleFieldChange("Address", e)}
            inputProps={{ maxLength: 100 }}
          />
        </div>
        <div className="col-md-2 pull-left">
          <TextField
           error={!this.state.row.Validations.IsLinks}
           required
            id="component-error"
            variant="standard"
            label="Links"
            sx={{ width: 250 }}
            value={row.Links}
            // helperText={ErrorMsg.Links}
            onChange={(e) => this.handleFieldChange("Links", e)}
            inputProps={{ maxLength: 50 }}
          />
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



class Personal extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        rows : [],
        activeStep : 0
      } 
    }
  
    backSummary = () => {
      this.stepperRef.current.handleBack();
    }

    submitPersonParent = () => {
      this.props.navigate('/links');
    }

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
  
    componentDidMount() {
      if (this.state.rows.length === 0) {
      let row = {
        open: true,
        Id : 0,
        Name: "",
        Designation: "",
        Number:"",
        MailId: "",
        Address : "",
        Links: ""
      }
      this.state.rows.unshift(row)
      this.setState({
        rows: [...this.state.rows],
      });
    }
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
              <TableCell className={` ${this.props.classes.tableHeaderCells}`} ><div className={this.props.classes.iconWrapper}> <Tooltip title="Name"><PersonIcon sx={{ color: 'grey' }}/></Tooltip></div></TableCell>
              <TableCell className={` ${this.props.classes.tableHeaderCells}`}><div className={this.props.classes.iconWrapper}><Tooltip title="Designation"><ContactEmergencyIcon sx={{ color: 'grey' }}/></Tooltip></div></TableCell>
              <TableCell className={` ${this.props.classes.tableHeaderCells}`}><div className={this.props.classes.iconWrapper}><Tooltip title="Number"><ContactPhoneIcon sx={{ color: 'grey' }}/></Tooltip></div></TableCell>
              <TableCell className={` ${this.props.classes.tableHeaderCells}`}><div className={this.props.classes.iconWrapper}><Tooltip title="MailId"><AlternateEmailIcon sx={{ color: 'grey' }}/></Tooltip></div></TableCell>
              <TableCell className={` ${this.props.classes.tableHeaderCells}`}><div className={this.props.classes.iconWrapper}><Tooltip title="Address"><HomeIcon sx={{ color: 'grey' }}/></Tooltip></div></TableCell>
              <TableCell className={` ${this.props.classes.tableHeaderCells}`}><div className={this.props.classes.iconWrapper}><Tooltip title="Social Links"><LinkIcon sx={{ color: 'grey' }}/></Tooltip></div></TableCell>
              <TableCell className={` ${this.props.classes.tableHeaderCells}`}><div className={this.props.classes.iconWrapper}></div></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.name} row={row} 
              submitPersonParent = {this.submitPersonParent}
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
      <Personal {...props} classes={classes} routeParams={params} navigate={navigate} />
    );
  }
  
  
  export default withSharedSnackbar(WithNavigate);