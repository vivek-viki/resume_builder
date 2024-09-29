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
import Loading from "../../shared/loading";

class Row extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      loading: false,
      row : {
        open: true,
        id : props.row.id,
        name: props.row.name,
        designation: props.row.designation,
        number: props.row.number,
        mailId: props.row.mailId,
        address : props.row.address,
        links: props.row.links,
      },
      Validations: {
        "IsName": true,
        "IsDesignation": true,
        "IsNumber": true,
        "IsMailId": true,
        "IsAddress": true,
        "IsLinks": true,
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

  componentDidMount(){
    this.setState({ loading: true })
    axios.post(`http://localhost:5149/details/getDetails/1`)
    .then(response => {
      this.setState({ row: response.data, loading: false });
        this.setState({ loading: false })
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

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };


  handleFieldChange = (fieldName, event) => {
    debugger;
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
  
    this.setState({ row, ErrorMsg });
  }

  handleDate = (date, type) => {
    let row = { ...this.state.row };
    row[type] = date;
    this.setState({ row });
  }
  
  submitPerson = () => {
    debugger;
    let row = {...this.state.row};
    let ErrorMsg = {...this.state.ErrorMsg};
    let Validations = { ...this.state.Validations };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(row.name && row.designation && row.number.length == 10 && emailRegex.test(row.mailId) && row.address && row.links)
    {
      debugger;
      const payload = {
        "userId": 1, 
        "name": row.name,
        "designation": row.designation,
        "number" : row.number,
        "mailId" : row.mailId,
        "address" : row.address,
        "links" : row.links
      };
      this.setState({ loading: true })
      axios.post(`http://localhost:5149/details/addDetails`, payload)
      .then(response => {
        this.setState({ data: response.data, loading: false });
        if (this.props.enqueueSnackbar) {
          this.props.enqueueSnackbar('Personal Details added successfully', {
            variant: 'success',
          }); }
          this.setState({ loading: false })
        this.props.navigate('/expereince');
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
      if (row.name === "" || row.name === null) {
        Validations.IsName = false;
        ErrorMsg.Name = "Name cannot be empty";
      }
      if(row.designation === "" || row.designation === null){
        Validations.IsDesignation = false;
        ErrorMsg.Designation = "Designation cannot be empty";
      }
      if(row.number === "" || row.number === null || row.number.length < 10){
        Validations.IsNumber = false;
        ErrorMsg.Number = "Number cannot be empty";
      }
      if(row.mailId === "" || row.mailId === null || !emailRegex.test(row.mailId)){
        Validations.IsMailId = false;
        ErrorMsg.MailId = "MailId cannot be empty";
      }
      if(row.address === "" || row.address === null){
        Validations.IsAddress = false;
        ErrorMsg.Address = "Address cannot be empty";
      }
      if(row.links === "" || row.links === null){
        Validations.IsLinks = false;
        ErrorMsg.Links = "Links cannot be empty";
      }
      this.setState({ row });
    }
    this.setState({ ErrorMsg });
  }

  render() {
    const { row, ErrorMsg, open, Validations } = this.state;
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
          <TableCell  className={this.props.classes.tableCell}><div className={this.props.classes.iconWrapper}>{row.name}</div></TableCell>
          <TableCell  className={this.props.classes.tableCell}><div className={this.props.classes.iconWrapper}>{row.designation}</div></TableCell>
          <TableCell  className={this.props.classes.tableCell}><div className={this.props.classes.iconWrapper}>{row.number}</div></TableCell>
          <TableCell  className={this.props.classes.tableCell}><div className={this.props.classes.iconWrapper}>{row.mailId}</div></TableCell>  
          <TableCell  className={this.props.classes.tableCell}><div className={this.props.classes.iconWrapper}>{row.address}</div></TableCell>
          <TableCell className={this.props.classes.tableCell}><div className={this.props.classes.iconWrapper}>{row.links}</div></TableCell>
          <TableCell align="right" className={this.props.classes.tableCell}>
          <Tooltip title={"Save"}>
          <span>
          <IconButton aria-label="fingerprint" color="success" >
        <Fingerprint onClick={ this.submitPerson} 
        />
      </IconButton>
      </span>
      </Tooltip>
      <Loading loading={this.state.loading} {...this.props}/>

          </TableCell>
        </TableRow>
        <TableRow>
        <TableCell colSpan={8}  className={this.props.classes.tableForm}>
  <Collapse in={open} timeout="auto" unmountOnExit>
    <Box component="form" sx={{ margin: 1 }}>
       <div className="row" style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
            <div className="col-md-2 pull-left">
          <TextField
            error={!Validations.IsName}
            required
            id="component-error"
            variant="standard"
            label="Name"
            sx={{ width: 250 }}
            value={row.name}
            // helperText={ErrorMsg.Name}
            onChange={(e) => this.handleFieldChange("name", e)}
            inputProps={{ maxLength: 30 }}
          />
          </div>
        <div className="col-md-2 pull-left">
          <TextField
            error={!Validations.IsDesignation}
            required
            id="component-error"
            variant="standard"
            label="Designation"
            sx={{ width: 250 }}
            value={row.designation}
            // helperText={ErrorMsg.Designation}
            onChange={(e) => this.handleFieldChange("designation", e)}
            inputProps={{ maxLength: 30 }}
          />
        </div>
        <div className="col-md-2 pull-left">
          <TextField
           error={!Validations.IsNumber}
           required
            id="component-error"
            variant="standard"
            label="Number"
            sx={{ width: 250 }}
            value={row.number}
            // helperText={ErrorMsg.Number}
            onChange={(e) => {
              const { value } = e.target;
              // Allow input only if it's a number or empty (to allow deletion)
              if (/^\d*$/.test(value)) {
                this.handleFieldChange("number", e);  // Update only if valid
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
           error={!Validations.IsMailId}
           required
            id="component-error"
            variant="standard"
            label="MailId"
            sx={{ width: 250 }}
            value={row.mailId}
            // helperText={ErrorMsg.MailId}
            onChange={(e) => this.handleFieldChange("mailId", e)}
            inputProps={{ maxLength: 20 }}
          />
        </div>
        <div className="col-md-2 pull-left">
          <TextField
           error={!Validations.IsAddress}
           required
            id="component-error"
            variant="standard"
            label="Address"
            sx={{ width: 250 }}
            value={row.address}
            // helperText={ErrorMsg.Address}
            onChange={(e) => this.handleFieldChange("address", e)}
            inputProps={{ maxLength: 100 }}
          />
        </div>
        <div className="col-md-2 pull-left">
          <TextField
           error={!Validations.IsLinks}
           required
            id="component-error"
            variant="standard"
            label="Links"
            sx={{ width: 250 }}
            value={row.links}
            // helperText={ErrorMsg.Links}
            onChange={(e) => this.handleFieldChange("links", e)}
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
  
  
    componentDidMount() {
      if (this.state.rows.length === 0) {
      let row = {
        open: true,
        id : 0,
        name: "",
        designation: "",
        number:"",
        mailId: "",
        address : "",
        links: ""
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