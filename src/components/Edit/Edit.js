import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import { Button, TextField, Grid } from "@material-ui/core";

class Edit extends Component {
    state = {
        movie: {
            id: '',
            title: '',
            description: ''
        },
        genre: '1'
    }
    componentDidMount() {
        this.getDetails()
        // this.set();
    }
    getDetails = () => {
        this.props.dispatch({ type: 'FETCH_DETAILS', payload: this.props.match.params.id });
        this.props.dispatch({ type: 'FETCH_GENRES', payload: this.props.match.params.id })
    }

    set = () => {
        console.log("set");
        this.props.reduxState.details.map((movie) => {
            return (
                this.setState({
                    movie: {
                        id: movie.id,
                        title: movie.title,
                        description: movie.description
                    }

                })
            )
        })
    }
    handelChange = (e, propertyName) => {
        this.setState({
            movie: {
                ...this.state.movie,
                [propertyName]: e.target.value
            }
        })
    }

    handelUpdate = () => {
        this.props.dispatch({ type: 'UPDATE_MOVIE', payload: this.state.movie });
        this.setState({
            state: this.state
        })
        this.props.history.push(`/details/${this.props.match.params.id}`);
    }

    SelectGenre = (e)=>{
        this.setState({
            genre: e.target.value
        })
    }

    addGenre = ()=>{
        this.props.dispatch({type: 'ADD_GENRE', payload: {genre: this.state.genre, id: this.props.match.params.id}})
        this.getDetails();
    }
    cancelEdit = () => {
        this.props.history.push(`/details/${this.props.match.params.id}`)
    }

    handleDelete = (id) => {
        if (window.confirm("Are you Sure?")) {
            console.log("confirm", id);
            this.props.dispatch({ type: 'DELETE_GENRE', payload: id })
            this.getDetails();
        } else {
            console.log("Reject", id);
        }
    }
    render() {
        return (
            <>
                <Grid container justify="center" spacing={40}>
                    <Grid item md={6}>
                        <h3>Edit</h3>
                        <TextField label="Title" variant="filled" value={this.state.movie.title} onChange={(e) => this.handelChange(e, "title")} />
                        <br />
                        <TextField multiline fullWidth label="Description" value={this.state.movie.description} variant="filled" onChange={(e) => this.handelChange(e, "description")}></TextField>
                        <br />
                        <p>Add Genre</p>
                        <select onChange={(e)=>this.SelectGenre(e)}>
                            <option value="1">Adventure</option>
                            <option value="2">Animation</option>
                            <option value="3">Biographical</option>
                            <option value="4">Comedy</option>
                            <option value="5">Disaster</option>
                            <option value="6">Drama</option>
                            <option value="7">Epic</option>
                            <option value="8">Fanasy</option>
                            <option value="9">Musical</option>
                            <option value="10">Romantic</option>
                            <option value="11">Science Fiction</option>
                            <option value="12">Space-Opera</option>
                            <option value="13">Superhero</option>
                        </select>
                        <button onClick={this.addGenre}>Add Genre</button>
                        <br />
                        {this.props.reduxState.genres.map((genre) => {
                            return (
                                <div key={genre.id}>
                                    <p>{genre.name}<button onClick={() => this.handleDelete(genre.id)}>Delete</button></p>

                                </div>
                            )
                        })}
                        <Button variant="contained" onClick={this.cancelEdit}>Cancel</Button>
                        <Button variant='contained' onClick={this.handelUpdate}>Update</Button>
                    </Grid>
                </Grid>
            </>
        )
    }

}
const mapStateToProps = reduxState => ({
    reduxState,
});

export default withRouter(connect(mapStateToProps)(Edit));