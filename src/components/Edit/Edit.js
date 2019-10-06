import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import { Button, TextField, Grid,Select,MenuItem,FormControl } from "@material-ui/core";

class Edit extends Component {
    state = {
        movie: {
            id: '',
            title: '',
            description: ''
        },
        genre: ''
    }
    componentDidMount() {
        this.getDetails();
    }
   
    getDetails = async () => {
        this.props.dispatch({ type: 'FETCH_DETAILS', payload: this.props.match.params.id });
        this.props.dispatch({ type: 'FETCH_GENRES', payload: this.props.match.params.id });
        this.set();
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

    loadDetails = ()=>{
        this.getDetails();
    }
    render() {
        return (
            <>
                <Grid container justify="center" spacing={40}>
                    <Grid item md={6}>
                        <h3>Edit</h3>
                        <Button onClick={this.loadDetails}>Load Details</Button>
                        <br/>
                        <br/>
                        <TextField label="Title" variant="filled" value={this.state.movie.title} onChange={(e) => this.handelChange(e, "title")} />
                        <br />
                        <TextField multiline fullWidth label="Description" value={this.state.movie.description} variant="filled" onChange={(e) => this.handelChange(e, "description")}></TextField>
                        <br />
                        <p>Add Genre</p>
                        <FormControl>
                        <Select value={this.state.genre} onChange={(e)=>this.SelectGenre(e)}>
                            <MenuItem value={''}>None</MenuItem>
                            <MenuItem value={1}>Adventure</MenuItem>
                            <MenuItem value={2}>Animation</MenuItem>
                            <MenuItem value={3}>Biographical</MenuItem>
                            <MenuItem value={4}>Comedy</MenuItem>
                            <MenuItem value={5}>Disaster</MenuItem>
                            <MenuItem value={6}>Drama</MenuItem>
                            <MenuItem value={7}>Epic</MenuItem>
                            <MenuItem value={8}>Fanasy</MenuItem>
                            <MenuItem value={9}>Musical</MenuItem>
                            <MenuItem value={10}>Romantic</MenuItem>
                            <MenuItem value={11}>Science Fiction</MenuItem>
                            <MenuItem value={12}>Space-Opera</MenuItem>
                            <MenuItem value={13}>Superhero</MenuItem>
                        </Select>
                        </FormControl>
                        <button onClick={this.addGenre}>Add Genre</button>
                        <br/>
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