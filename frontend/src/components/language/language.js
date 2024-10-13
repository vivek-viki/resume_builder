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
import LanguageIcon from '@mui/icons-material/Language';
import SsidChartIcon from '@mui/icons-material/SsidChart';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import Loading from "../../shared/loading";

class Row extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      value: 10,
      row : {
        open: props.row.id === 0 ? true : false,
        id : props.row.id,
        language: props.row.language,
        level: props.row.level,
      },
      Validations: {
        "Islanguage": true,
        "Islevel": true,
      },
      ErrorMsg: {
        language: "",
        level: ""
      }
    };
    this.valueMap = {
        10: 'Beginner',
        20: 'Intermediate',
        30: 'Proficient',
        40: 'Fluent',
        50: 'Native',
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
    let row = { ...this.state.row };
    row[type] = date;
    this.setState({ row });
  }
  
  submitLanguage = () => {
    let row = {...this.state.row};
    let ErrorMsg = {...this.state.ErrorMsg};
    let Validations = {...this.state.Validations};
    if(row.language && row.level)
    {
      const payload = {
        "userId": 1, 
        "id" : row.id,
        "language": row.language,
        "level": row.level,
      };
      this.setState({ loading: true })
      axios.post(`http://localhost:5153/language/addLanguage`, payload)
      .then(data => {
        if(row.id === 0){
          row.open = false;
          row.id = data.data.id;
          row.language = data.data.language;
          row.level = data.data.level;
          this.setState({row});
          if (this.props.enqueueSnackbar) {
            this.props.enqueueSnackbar('language added successfully', {
              variant: 'success',
            }); }
          this.props.updateTableData(row);
           } else if(row.id === data.data.id){
            row.open = false;
            row.id = data.data.id;
            row.language = data.data.language;
            row.level = data.data.level;
            this.setState({row});
            if (this.props.enqueueSnackbar) {
              this.props.enqueueSnackbar('language updated successfully', {
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
      if (row.language === "" || row.language === null) {
        Validations.Islanguage = false;
        ErrorMsg.language = "Language cannot be empty";
      }
      if(row.level === "" || row.level === null){
        Validations.Islevel = false;
        ErrorMsg.level = "Level cannot be empty";
      }
      this.setState({ row, Validations });
    }
    this.setState({ ErrorMsg });
  }

  valuetext = (value) => {
    return this.valueMap[value] || value;  // Return the mapped label or the value itself if not found
  };

  handleChange = (event, newValue) => {
    debugger;
    let row = {...this.state.row};
    row.level = this.valuetext(newValue);
    this.setState({ value: newValue, row });
  };

  render() {
    const { row, ErrorMsg, value, Validations } = this.state;
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
          <TableCell colSpan={2} className={this.props.classes.tableCell}><div className={this.props.classes.iconWrapper}> {row.language}</div></TableCell>
          <TableCell colSpan={2} className={this.props.classes.tableCell}><div className={this.props.classes.iconWrapper}> {row.level || 'Beginner'}</div></TableCell>
          <TableCell align="right" className={this.props.classes.tableCell}>
          <Tooltip title="Delete">
            <span>
        <IconButton aria-label="fingerprint" color="secondary">
          <Fingerprint onClick={() => this.props.DeleteLanguage(row.id)} />
        </IconButton>
        </span>
        </Tooltip>
          <Tooltip title={"Save"}>
          <span>
          <IconButton aria-label="fingerprint" color="success" >
        <Fingerprint onClick={ this.submitLanguage} 
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
       <div className="row" style={{ display: 'flex', flexWrap: 'wrap', gap: '200px' }}>
            <div className="col-md-2 pull-left">
          <TextField
            error={!Validations.Islanguage}
            required
            id="component-error"
            variant="standard"
            label="Language Name"
            sx={{ width: 250 }}
            value={row.language}
            // helperText={ErrorMsg.language}
            onChange={(e) => this.handleFieldChange("language", e)}
            inputProps={{ maxLength: 15 }}
          />
          </div>
        <div className="col-md-4 pull-left">
        <Box sx={{ width: 300 }}>
        <Typography gutterBottom>
          Level
        </Typography>
        <Slider
          aria-label="Label"
          value={value}
           valueLabelFormat={this.valuetext}
          getAriaValueText={this.valuetext}
          valueLabelDisplay="auto"
          step={10}
          min={10}
          max={50}
          onChange={this.handleChange}
        />
        </Box>
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



class Language extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        rows : [],
        activeStep : 5
      } 
    }

    submitLanguage = () => {
        this.props.navigate('/certificates');
      }

    submitLanguageParent = (row) => {
        let rows = [...this.state.rows];
        rows[0].Id = row.Id;
            this.setState({rows});
    }

    componentDidMount(){
      this.setState({ loading: true });
      axios.post(`http://localhost:5153/language/getLanguage/1`)
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

    DeleteLanguage = (id) => {
      this.setState({ loading: true });
      axios.delete(`http://localhost:5153/language/deleteLanguage/${id}`)
      .then(response => {
        // this.setState({ loading: false })
        if (this.props.enqueueSnackbar) {
          this.props.enqueueSnackbar('Language deleted successfully', {
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
  
    addNewRow = event => {
        let row = {
          open: true,
          id : 0,
          language: "",
          level: "",
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
              <TableCell colSpan={2} className={` ${this.props.classes.tableHeaderCells}`} ><div className={this.props.classes.iconWrapper}> <Tooltip title="Language"><LanguageIcon sx={{ color: 'grey' }}/></Tooltip></div></TableCell>
              <TableCell colSpan={2} className={` ${this.props.classes.tableHeaderCells}`} ><div className={this.props.classes.iconWrapper}><Tooltip title="Level"><SsidChartIcon sx={{ color: 'grey' }}/></Tooltip></div></TableCell>
              <TableCell className={` ${this.props.classes.tableHeaderCells}`}> 
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <Button variant="contained"
               onClick={(e) => this.addNewRow(e)} 
              className={this.props.classes.containedbutton}
              disabled = {(rows[0]?.id === 0)}
            //   sx={{ width: "40%" }}
              >
                add Language</Button>
    <Tooltip title={"Next"}>
    <IconButton aria-label="fingerprint" color="success"  disabled={!rows.length || rows[0]?.id === 0}>
        <Fingerprint onClick={ this.submitLanguage} 
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
              submitLanguageParent = {this.submitLanguageParent}
              DeleteLanguage = {this.DeleteLanguage}
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
      <Language {...props} classes={classes} routeParams={params} navigate={navigate} />
    );
  }
  
  
  export default withSharedSnackbar(WithNavigate);