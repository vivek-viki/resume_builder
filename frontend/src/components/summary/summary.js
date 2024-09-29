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
import { useStyles } from '../../shared/styles/defaultStyle';
import BookIcon from '@mui/icons-material/Book';
import Loading from '../../shared/loading';

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
      summary: '',
      loading: false  
     
    };
  }

  componentDidMount(){
    debugger;
    this.setState({ loading: true });
    const payload = {
      "userId": 1, 
    };
    axios.post(`http://localhost:5150/summary/getSummary`, payload)
    .then(response => {
      this.setState({ summary: response.data, loading: false });
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

  handleSummaryChange = (updatedSummary) => {
    this.setState({ summary: updatedSummary });
  }

  submitSummary = () => {
    debugger;
    const payload = {
      "userId": 1, 
      "summary": this.state.summary 
    };
    this.setState({ loading: true })
    axios.post(`http://localhost:5150/summary/addSummary`, payload)
    .then(response => {
      this.setState({ data: response.data, loading: false });
      if (this.props.enqueueSnackbar) {
        this.props.enqueueSnackbar('Summary added successfully', {
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

  render() {
    const { open , summary } = this.state;
    const isSummaryEmpty = !summary;

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
          {/* <TableCell className={this.props.classes.tableCell}></TableCell> */}
          {/* <TableCell className={this.props.classes.tableCell}></TableCell> */}
          <TableCell className={this.props.classes.tableCell}><div className={this.props.classes.iconWrapper}>{summary}</div></TableCell>
          {/* <TableCell className={this.props.classes.tableCell}></TableCell> */}
          {/* <TableCell className={this.props.classes.tableCell}></TableCell> */}
          <TableCell className={this.props.classes.tableCell} align = "right">
          {/* <Tooltip title="Back">
            <span>
        <IconButton aria-label="fingerprint" color="secondary" disabled='true'>
          <Fingerprint onClick={this.props.backSummary } />
        </IconButton>
        </span>
        </Tooltip> */}
          <Tooltip title={isSummaryEmpty ? "Please Enter Summary" : "Submit"}>
          <span>
          <IconButton aria-label="fingerprint" color="success"   disabled={!summary}>
        <Fingerprint onClick={this.submitSummary } 
        />
        
      </IconButton>
      </span>
      </Tooltip>
      <Loading loading={this.state.loading} {...this.props}/>

          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7} className={this.props.classes.tableForm}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <MinHeightTextarea onSummaryChange={this.handleSummaryChange} 
                 summary={summary}
                text={"Please Enter Summary"}
                enable = {true}
                {...this.props}
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

class Summary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep : 1
    }
  }

  backSummary = () => {
    this.stepperRef.current.handleBack();
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
            <TableCell colSpan={8} align="center"  className={` ${this.props.classes.tableHeaderCells}`}> <div className={this.props.classes.iconWrapper}>
      <Tooltip title="Summary">
        <BookIcon sx={{ color: 'grey' }} />
      </Tooltip>
      </div>
      </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.name} row={row} 
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
    <Summary {...props} classes={classes} routeParams={params} navigate={navigate} />
  );
}


export default withSharedSnackbar(WithNavigate);