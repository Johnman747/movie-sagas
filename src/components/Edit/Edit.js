import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'

class Edit extends Component {
    state = {
        movie:{
            id: '',
            title: '',
            description: ''
        }
    }
    componentDidMount(){
         this.set();
    }
    getDetails = ()=>{
        this.props.dispatch({type: 'FETCH_DETAILS', payload: this.props.match.params.id});
    }

    set = ()=>{
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
                [propertyName]: e.target.value
            }
        })
    }

    handelUpdate=()=>{
        this.props.dispatch({type: 'UPDATE_MOVIE', payload: this.state.movie});
        this.props.history.push(`/details/${this.state.movie.id}`);
    }
    cancelEdit = ()=>{
        this.props.history.push(`/details/${this.state.movie.id}`)
    }
    render() {
        return (
            <>
                <h3>Edit</h3>
                <input value={this.state.movie.title} onChange={(e)=>this.handelChange(e,"title")}/>
                <br/>
                <textarea value={this.state.movie.description} onChange={(e)=>this.handelChange(e,"description")}></textarea>
                <br/>
                <button onClick={this.cancelEdit}>Cancel</button>
                <button onClick={this.handelUpdate}>Update</button>
            </>
        )
    }

}
const mapStateToProps = reduxState => ({
    reduxState,
});
export default withRouter(connect(mapStateToProps)(Edit));