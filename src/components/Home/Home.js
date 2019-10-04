import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router'

class Home extends Component {
    // Renders the entire app on the DOM
    componentDidMount(){
        this.getMovies();
    }

    getMovies = ()=>{
        this.props.dispatch({type: 'FETCH_MOVIES'});
    }

    handelClick = (id)=>{
        this.props.history.push(`/details/${id}`)
    }

    render() {
      return (
        <div className="App">
          <p>home page</p>
          <ul>
          {this.props.reduxState.movies.map((movie)=>{
              return(
                  <div key={movie.id}>
                  <p>Title: {movie.title}</p>
                  <img alt={movie.title} src={movie.poster} onClick={()=>this.handelClick(movie.id)}/>
                  <p>Description: {movie.description}</p>
                  </div>
              )
          })}
          </ul>
        </div>
      );
    }
  }
  const mapStateToProps = reduxState => ({
    reduxState,
});
  export default withRouter(connect(mapStateToProps)(Home));