import React from 'react';
import styles from './Roads.module.css';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function createData(name, Municipality, Reports, Irregularities, RoadHealth) {
  return {
    name,
    Municipality,
    Reports,
    Irregularities,
    RoadHealth,
    history: [
      { date: '2020-01-05', customerId: '11091700', amount: 3 },
      { date: '2020-01-02', customerId: 'Anonymous', amount: 1 },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.Municipality}</TableCell>
        <TableCell align="right">{row.Reports}</TableCell>
        <TableCell align="right">{row.Irregularities}</TableCell>
        <TableCell align="right">{row.RoadHealth}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Complainant </TableCell>
                    
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    Irregularities: PropTypes.number.isRequired,
    Municipality: PropTypes.string.isRequired,
    Reports: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    RoadHealth: PropTypes.number.isRequired,
  }).isRequired,
};

const rows = [
  createData('Road1', "BMC", 6.0, 24, 4.0),
  createData('Road2', "BMC", 9.0, 37, 4.3),
  createData('Road3', "BMC", 16.0, 24, 6.0),
  createData('Road4', "BMC", 3.7, 67, 4.3),
  createData("Road5", "BMC", 16.0, 49, 3.9),
  createData('Road1', "BMC", 6.0, 24, 4.0),
  createData('Road2', "BMC", 9.0, 37, 4.3),
  createData('Road3', "BMC", 16.0, 24, 6.0),
  createData('Road4', "BMC", 3.7, 67, 4.3),
  createData("Road5", "BMC", 16.0, 49, 3.9),
];

export default function RoadTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Road</TableCell>
            <TableCell align="right">Municipality</TableCell>
            <TableCell align="right">Reports</TableCell>
            <TableCell align="right">Irregularity</TableCell>
            <TableCell align="right">Road Health</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}