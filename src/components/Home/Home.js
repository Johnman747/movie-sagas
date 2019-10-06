import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router';
import {Paper, Grid,Button} from '@material-ui/core'

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
    adminPage = ()=>{
        this.props.history.push('/admin');
    }

    render() {
      return (
        <div className="App">
          <p>home page</p>
          <Button variant='contained' onClick={this.adminPage}>Admin Page</Button>
        <Grid container justify="center" spacing={40}>
          {this.props.reduxState.movies.map((movie)=>{
              return(
                  <Grid item md key={movie.id}>
                      <Paper>
                  <p>{movie.title}</p>
                  <img alt={movie.title} src={movie.poster} onClick={()=>this.handelClick(movie.id)}/>
                  </Paper>
                  </Grid>
              )
          })}
          </Grid>
        </div>
      );
    }
  }
  const mapStateToProps = reduxState => ({
    reduxState,
});
  export default withRouter(connect(mapStateToProps)(Home));