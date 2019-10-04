import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'

class Details extends Component {
    componentDidMount(){
       this.getDetails()
    }

    getDetails = ()=>{
        this.props.dispatch({type: 'FETCH_DETAILS', payload: this.props.match.params.id})
        this.props.dispatch({type: 'FETCH_GENRES', payload: this.props.match.params.id})
    }
    handelClick= ()=>{
        this.props.history.push('/');
    }

    editClick = ()=>{
        this.props.history.push(`/edit/${this.props.match.params.id}`)
    }
    render() {
        return (
            <>
            <button onClick={this.handelClick}>Return to list</button>
            <button onClick={this.editClick}>Edit</button>
            {this.props.reduxState.details.map((movie)=>{
                return(
                    <div key={movie.id}>
                        <p>{movie.title}</p>
                        <img alt={movie.title} src={movie.poster}/>
                        <p>{movie.description}</p>
                    </div>
                )
            })}
            <ul>
                {this.props.reduxState.genres.map((genre,i)=>{
                    return(
                        <li key={i}>{genre.name}</li>
                    )
                })}
            </ul>

            </>
        )
    }

}
const mapStateToProps = reduxState => ({
    reduxState,
});
export default withRouter(connect(mapStateToProps)(Details));