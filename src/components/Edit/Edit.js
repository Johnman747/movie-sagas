import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import {Button, TextField, Grid} from "@material-ui/core";

class Edit extends Component {
    state = {
        movie:{
            id: '',
            title: '',
            description: ''
        }
    }
    componentDidMount(){
        this.getDetails()
        .then(()=>{this.set()});
    }
    getDetails = ()=>{
        this.props.dispatch({type: 'FETCH_DETAILS', payload: this.props.match.params.id})
    }

    set = ()=>{
        console.log("set");
        this.props.reduxState.details.map((movie)=>{
            return(
                this.setState({
                    movie:{
                        id: movie.id,
                        title: movie.title,
                        description: movie.description
                    }
                    
                })
            )
        })    
    }
    handelChange=(e,propertyName)=>{
        this.setState({
            movie:{
                ...this.state.movie,
                [propertyName]: e.target.value
            }
        })
    }

    handelUpdate=()=>{
        this.props.dispatch({type: 'UPDATE_MOVIE', payload: this.state.movie});
        this.setState({
            state: this.state
        })
        this.props.history.push(`/details/${this.props.match.params.id}`);
    }

    cancelEdit = ()=>{
        this.props.history.push(`/details/${this.props.match.params.id}`)
    }

    handleDelete = (id)=>{
        if(window.confirm("Are you Sure?")){
            console.log("confirm",id);
            this.props.dispatch({type:'DELETE_GENRE', payload: id})
            this.getDetails();
        }else{
            console.log("Reject",id);
        }
    }
    render() {
        return (
            <>
            <Grid container justify="center" spacing={40}>
                <Grid item  md={6}>
                <h3>Edit</h3>
                <TextField  label="Title" variant="filled" value={this.state.movie.title} onChange={(e)=>this.handelChange(e,"title")}/>
                <br/>
                <TextField multiline fullWidth label="Description" value={this.state.movie.description} variant="filled" onChange={(e)=>this.handelChange(e,"description")}></TextField>
                <br/>
                <p>Add Genre</p>
                <select>
                    <option>Adventure</option>
                    <option>Animation</option>
                    <option>Biographical</option>
                    <option>Comedy</option>
                    <option>Disaster</option>
                    <option>Drama</option>
                    <option>Epic</option>
                    <option>Fanasy</option>
                    <option>Musical</option>
                    <option>Romantic</option>
                    <option>Science Fiction</option>
                    <option>Space-Opera</option>
                    <option>Superhero</option>
                </select>
                <br/>
                {this.props.reduxState.genres.map((genre)=>{
                    return(
                        <div key={genre.id}>
                            <p>{genre.name}<button onClick={()=>this.handleDelete(genre.id)}>Delete</button></p>
                            
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