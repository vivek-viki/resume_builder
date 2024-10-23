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
import Loading  from '../../shared/loading';


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
      skills: this.props.userSkills || [],
      New_Skills : [],
      loading:false,
      skillData: this.props.skillsList || [],
      id : this.props.id
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
      skills: prevState.skills.filter((skill) => skill !== chipToDelete) // Remove the selected skill
    }));
  };

  onSelectSkill = (selectedSkill) => {
    this.setState((prevState) => {
      // Ensure skills is an array and check if the skill is already present
      const updatedSkills = (prevState.skills || []).includes(selectedSkill)
        ? prevState.skills // If skill already exists, keep array unchanged
        : [...(prevState.skills || []), selectedSkill]; // Add skill if it doesn't exist

      return {
        skills: updatedSkills, // Update the skills array in the state
      };
    });
  };

  handleFieldChange = (fieldName, event) => {
    this.setState({ New_Skills : event.target.value });
  }

  submitSkills = () => {

    this.setState((prevState) => {
      // Avoid duplicates
      const updatedSkills = prevState.skills.includes(this.state.New_Skills)
        ? prevState.skills
        : [...prevState.skills, this.state.New_Skills];
      
      return { skills: updatedSkills, New_Skills : "" }; // Update Skills directly
    });
  }

  submitSkillsData = () => {
    debugger;
        let skills = {...this.state.skills};
        let id = this.state.id;
        if(skills){
          const payload = {
            "userId": 1, 
            "id" : id,
            "skillData" : Object.values(skills)
          };
          this.setState({ loading: true })
          axios.post(`http://localhost:5151/experience/addSkills`, payload)
          .then(data => {
            if(this.state.id === 0){
              this.setState({id: data.data.id, skills: data.data.skillData});
              if (this.props.enqueueSnackbar) {
                this.props.enqueueSnackbar('Skills added successfully', {
                  variant: 'success',
                }); }
                this.props.navigate('/language');
               } else if(this.state.id === data.data.id){
                this.setState({id: data.data.id, skills: data.data.skillData});
                if (this.props.enqueueSnackbar) {
                  this.props.enqueueSnackbar('skills updated successfully', {
                    variant: 'success',
                  }); }
                  this.props.navigate('/language');
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
  }

  componentDidUpdate(prevProps) {
    if (prevProps.skillsList !== this.props.skillsList) {
      this.setState({
        skillData: this.props.skillsList,
        skills : this.props.userSkills,
        id : this.props.id,
        // loading : this.props.loading
      });
    }
  }

  render() {
    const { open , skills,skillData } = this.state;
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
          {skills.map((skill, index) => (
            <Chip
              key={index}
              label={skill}
            />
          ))}
          </Box>
          </div>
          </TableCell>
          <TableCell align="right">
          <Tooltip title={skills.length == 0 ? "Please Enter Skills" : "Submit"}>
          <span>
          <IconButton aria-label="fingerprint" color="success"   disabled={!skills.length}>
        <Fingerprint onClick={this.submitSkillsData } 
        />
      </IconButton>
      </span>
      </Tooltip>
      <Loading loading={this.state.loading} {...this.props}/>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8} className={this.props.classes.tableForm}>
            <Collapse in={open} timeout="auto" unmountOnExit>
                &nbsp;
            <Stack direction="row" spacing={1}>
          {skillData.map((skill, index) => (
          <Chip
            key={index}          
            label={skill}      
            onClick={() => this.onSelectSkill(skill)}
          />
        ))}
         </Stack>
         <Box mt={2} sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {skills.map((skill, index) => (
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
      activeStep : 4,
      skillsList : [],
      userSkills : [],
      id : 0,
      // loading : true
    }
  }

  getSkills = () => {
    this.setState({ loading: true });
    axios.get(`http://localhost:5151/experience/getSkills`)
    .then(response => {
      this.setState({ skillsList: response.data});
    })
    .catch(error => {
      const errorMessage = error.response?.data || 'An error occurred';
      this.props.enqueueSnackbar(errorMessage, {
        variant: 'error',
      });
    }) .finally(() => {
      this.setState({ loading: false });
    });
  }


  componentDidMount(){
    this.setState({ loading: true });
    this.getSkills();
    axios.get(`http://localhost:5151/experience/getSkillData/1`)
    .then(response => {
      this.setState({ userSkills: (response.data.skillData || []), id:response.data.id });
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
    const {skillsList,userSkills,id,loading} = this.state;
    return (
      <Card >
      {/* <CardActionArea > */}
      <CardContent sx={{maxWidth: '100%', width: '93%', height: '65%', boxShadow: 10, marginLeft : '2%', marginTop: '3%', position:'fixed', overflowY: 'auto'}}>
        <LinearStepper  activeStep={this.state.activeStep}/>
        {/* <Loading loading={loading} {...this.props}/> */}
      <TableContainer component={Paper} >
        <Table aria-label="collapsible table">
          <TableHead  sx = {{backgroundColor : '#e0e0d1'}} >
            <TableRow >
            <TableCell colSpan={8} align="center"  className={` ${this.props.classes.tableHeaderCells}`}><div className={this.props.classes.iconWrapper}> </div>
      <Tooltip title="Skills">
        <AddRoadIcon sx={{ color: 'grey' }} />
      </Tooltip>
    </TableCell>
    <Loading loading={this.state.loading} {...this.props}/>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.name} row={row} 
              skillsList = {skillsList}
              userSkills = {userSkills}
              id = {id}
              // loading = {loading}
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