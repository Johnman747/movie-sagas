import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'

class Details extends Component {
    componentDidMount(){
       this.getDetails()
    }

    getDetails = ()=>{
        this.props.dispatch({type: 'FETCH_DETAILS', payload: this.props.match.params.id})
    }
    handelClick= ()=>{
        this.props.history.push('/');
    }
    render() {
        return (
            <>
            <button onClick={this.handelClick}>Return to list</button>
            {this.props.reduxState.details.map((movie)=>{
                return(
                    <div key={movie.id}>
                        <p>{movie.title}</p>
                        <img alt={movie.title} src={movie.poster}></img>
                        <p>{movie.description}</p>
                    </div>
                )
            })}
            </>
        )
    }

}
const mapStateToProps = reduxState => ({
    reduxState,
});
export default withRouter(connect(mapStateToProps)(Details));