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
import AddRoadIcon from '@mui/icons-material/AddRoad';
import { useStyles } from '../../shared/styles/defaultStyle';
import {TextField } from '@mui/material';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';



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
      Skills: [],
      New_Skills : [],
      loading: false,
      skillData: [
        { key: 1, label: 'React' },
        { key: 2, label: 'JavaScript' },
        { key: 3, label: 'Node.js' },
        { key: 4, label: 'MongoDB' },
        { key: 5, label: 'Oracle' },
        { key: 6, label: 'Spring Boot' },
        { key: 7, label: 'Spring Framework' }
      ]
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

  submitSkillsData = () => {
        let Skills = {...this.Skills};
        if(Skills){
            this.props.submitSkillsDataParent();
        }
  }

  render() {
    const { open , Skills } = this.state;

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
          <TableCell className={this.props.classes.tableCell} align="center"><div className={this.props.classes.iconWrapper}> 
          <Box mt={2} sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {Skills.map((skill, index) => (
            <Chip
              key={index}
              label={skill}
            />
          ))}
          </Box>
          </div>
          </TableCell>
          <TableCell align="right">
          <Tooltip title={Skills.length == 0 ? "Please Enter Skills" : "Submit"}>
          <span>
          <IconButton aria-label="fingerprint" color="success"   disabled={!Skills.length}>
        <Fingerprint onClick={this.submitSkillsData } 
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
          {this.state.Skills.map((skill, index) => (
            <Chip
              key={index}
              label={skill}
              onDelete={() => this.handleDelete(skill)} // Handle deletion
            />
          ))}
        </Box>
              <Box sx={{ margin: 1 }}>
              <TextField
            // error={!this.state.row.Validations.IsSkills}
            required
            id="component-error"
            variant="standard"
            label="Skills"
            sx={{ width: '100%'}}
            value={this.state.New_Skills}
            // helperText={ErrorMsg.College}
            onChange={(e) => this.handleFieldChange("Skills", e)}
            inputProps={{ maxLength: 50 }}
            InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.submitSkills}
                      disabled = {this.state.New_Skills == ""}  // Define what happens on click
                      sx={{ transform: 'translateY(-7px)' }}
                    >
                      Add Skills
                    </Button>
                  </InputAdornment>
                ),
              }}
          />
              </Box>
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

class Skills extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep : 4
    }
  }

  backSummary = () => {
    this.stepperRef.current.handleBack();
  }

  submitSkillsDataParent = () => {
   if (this.props.enqueueSnackbar) {
      this.props.enqueueSnackbar('Skills added successfully', {
        variant: 'success',
      }); }
      this.props.navigate('/language');
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
            <TableCell colSpan={8} align="center"  className={` ${this.props.classes.tableHeaderCells}`}><div className={this.props.classes.iconWrapper}> </div>
      <Tooltip title="Skills">
        <AddRoadIcon sx={{ color: 'grey' }} />
      </Tooltip>
    </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.name} row={row} 
              submitSkillsDataParent = {this.submitSkillsDataParent}
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
    <Skills {...props} classes={classes} routeParams={params} navigate={navigate} />
  );
}


export default withSharedSnackbar(WithNavigate);