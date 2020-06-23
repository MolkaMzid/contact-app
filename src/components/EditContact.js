import React, { Component } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
class EditContact extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            name:"",
            email:"",
            phone:"",
         }
    }
    componentDidMount(){
        Axios.get('http://localhost:4000/find_one/'+this.props.match.params.id).then(res=>{
        console.log(res.data)   
        this.setState({
            name:res.data.name,
            email:res.data.email,
            phone:res.data.phone
        })})
    }
    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    EditContact=()=>{
        Axios.put('http://localhost:4000/edit_contact/'+this.props.match.params.id,{name:this.state.name,email:this.state.email,phone:this.state.phone})

    }
    render() { 
        return (<div>
            <input type='text'name="name" value={this.state.name} placeholder="name" onChange={this.handleChange}/>
            <input type='text'name="email" placeholder="email" value={this.state.email} onChange={this.handleChange}/>
            <input type='text' name="phone" placeholder="phone" value={this.state.phone}onChange={this.handleChange}/>
            <Link to='/'> <button onClick={this.EditContact}>Edit Contact</button> </Link>
            </div>)
    }
}
 
export default EditContact;