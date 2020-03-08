import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Link} from 'react-router-dom';
import {fetchAllTopics} from '../Services/API'
import useFetchData from '../Services/useFetchData'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default (props) => {
  const classes = useStyles();
  const { data, loading } = useFetchData(fetchAllTopics())

  return <>
    <Button to='/topics/add' component={Link} >Add Topic</Button>
    {loading? <CircularProgress /> :
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell align="left">Topic</TableCell>
            <TableCell align="right">Created By</TableCell>
            <TableCell align="right">Created At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.data && data.data.map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="left"><Link to={`/topics/${row.id}`}>{row.title}</Link></TableCell>
              <TableCell align="right">{row.createdBy}</TableCell>
              <TableCell align="right">{new Date(Date.parse(row.createdAt)).toLocaleTimeString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    }
    </>
}