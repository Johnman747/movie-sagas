import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router';
import{Button,TextField} from '@material-ui/core';

class Home extends Component {
    state={
        isAdmin: false,
        userInfo:{
            username: '',
            password: '',
        },
        newGenre:''
    }

    componentDidMount(){
        this.getGenres();
    }

    getGenres = ()=>{
        this.props.dispatch({type: 'GET_ALL_GENRES'})
    }

    handelChange = (e,propertyName)=>{
        this.setState({
            userInfo:{
                ...this.state.userInfo,
                [propertyName]: e.target.value
            }
        })
    }

    verifyUser = ()=>{
        if(this.state.userInfo.username === 'camera' && this.state.userInfo.password === 'action'){
            this.setState({
                isAdmin: true
            })
            return
        }else{
            alert('Wrong username or password');
            return
        }
    }

    newGenre = (e)=>{
        this.setState({
            newGenre: e.target.value
        });
    }
    
    handelAdd = ()=>{
        this.props.dispatch({type:'ADD_NEW_GENRE', payload: this.state.newGenre});
        this.setState({
            newGenre:''
        })
        this.getGenres();

    }

    render() {
      return (
        <div>
            {this.state.isAdmin?
            <div>
            <p>Add Genre</p>
            <TextField variant='outlined' value={this.state.newGenre} onChange={(e)=>this.newGenre(e)}/>
            <br/>
            <Button variant='contained' onClick={this.handelAdd}>Add</Button>
            {this.props.reduxState.genres.map((genre)=>{
                return(
                    <p key={genre.id}>{genre.name}</p>
                )
            })}
            </div>
            :
            <div>
                Username:<br/>
                <TextField variant='outlined' onChange={(e)=>this.handelChange(e,'username')}/>
                <br/>
                Password:<br/>
                <TextField variant='outlined' onChange={(e)=>this.handelChange(e,'password')}/>
                <br/>
                <Button variant='contained' onClick={this.verifyUser}>Submit</Button>
            </div>
        }
        </div>
      );
    }
  }
  const mapStateToProps = reduxState => ({
    reduxState,
});
  export default withRouter(connect(mapStateToProps)(Home));