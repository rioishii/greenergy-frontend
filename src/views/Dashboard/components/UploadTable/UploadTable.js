import React, { useContext } from "react";
import { AuthContext } from "../../../../App";
import PropTypes from "prop-types";
import { withStyles, makeStyles, useTheme } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Alert from "@material-ui/lab/Alert";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import DeleteIcon from "@material-ui/icons/Delete";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import { Typography } from "@material-ui/core";
import { DataStore } from "@aws-amplify/datastore";
import { FoodScore } from "../../../../models";

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    color: theme.palette.secondary.main,
    fontSize: 18,
  },
}))(TableCell);

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
});

const UploadTable = (props) => {
  const { className, ...rest } = props;
  const { state } = useContext(AuthContext);
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);
  const [toDelete, setToDelete] = React.useState("");
  const [isLoading, setIsLoading] = React.useState("");

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, state.foodScores.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClickOpen = (row) => {
    setOpen(true);
    setToDelete(row.id);
  };

  const handleClose = () => {
    setOpen(false);
    setToDelete("");
  };

  async function handleDelete() {
    setIsLoading(true);
    if (toDelete) {
      await DataStore.delete(FoodScore, (c) => c.id("eq", toDelete));
    }
    setToDelete("");
    setOpen(false);
    setIsLoading(false);
  }

  return (
    <Card {...rest} className={className}>
      <CardHeader
        action={
          <Button color="primary" size="small" variant="contained" startIcon={<AddToPhotosIcon />}>
            <Link to="/app/upload" style={{ color: "#fff" }}>
              New entry
            </Link>
          </Button>
        }
        title="Recent Meals"
      />
      <Divider />
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell align={"right"}>Food Name</StyledTableCell>
              <StyledTableCell align={"right"}>
                Score (Co2 kg per 1lb sering)
              </StyledTableCell>
              <StyledTableCell align={"right"}>
                Equivalent Car Miles
              </StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {(rowsPerPage > 0
              ? state.foodScores
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : state.foodScores
            ).map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.createdAt}</TableCell>
                <TableCell align={"right"}>{row.name}</TableCell>
                <TableCell align={"right"}>{row.score}</TableCell>
                <TableCell align={"right"}>{row.carMiles}</TableCell>
                <TableCell>
                  <IconButton
                    color="secondary"
                    onClick={() => handleClickOpen(row)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={3}
                count={state.foodScores.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { "aria-label": "rows per page" },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <Alert severity="error">
            <Typography variant="h5">
              Are you sure you want to delete?
            </Typography>
          </Alert>
        </DialogContent>
        {isLoading ? (
          <div style={{ textAlign: "center" }}>
            <CircularProgress color="secondary" />{" "}
          </div>
        ) : (
          ""
        )}
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} style={{ color: "#F32016" }}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default UploadTable;
