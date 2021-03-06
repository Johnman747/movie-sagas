import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import { Button, Grid, Paper } from "@material-ui/core";

class Details extends Component {
    componentDidMount() {
        this.getDetails()
    }

    componentDidUpdate(){
        this.getDetails();
    }

    getDetails = () => {
        this.props.dispatch({ type: 'FETCH_DETAILS', payload: this.props.match.params.id })
        this.props.dispatch({ type: 'FETCH_GENRES', payload: this.props.match.params.id })
    }
    handelClick = () => {
        this.props.history.push('/');
    }

    editClick = () => {
        this.props.history.push(`/edit/${this.props.match.params.id}`)
    }
    render() {
        return (
            <>
                <Button variant="contained" onClick={this.handelClick}>Return to list</Button>
                <Button variant="contained" onClick={this.editClick}>Edit</Button>
                <Grid container justify="center" spacing={40}>
                    <Grid item sm={6}>
                        <Paper>
                            {this.props.reduxState.details.map((movie) => {
                                return (
                                    <div key={movie.id}>
                                        <h2>{movie.title}</h2>
                                        <img alt={movie.title} src={movie.poster} />
                                        <h3>Description:</h3>
                                        <p>{movie.description}</p>
                                    </div>
                                )
                            })}
                            <h3>Genres:</h3>
                            {this.props.reduxState.genres.map((genre, i) => {
                                return (
                                    <p key={i}>{genre.name}</p>
                                )
                            })}
                        </Paper>
                    </Grid>
                </Grid>
            </>
        )
    }

}
const mapStateToProps = reduxState => ({
    reduxState,
});
export default withRouter(connect(mapStateToProps)(Details));