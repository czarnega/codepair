import React, { Component } from 'react';
import { reduxForm } from 'redux-form'; 
import * as actions from '../actions';
import { Link } from 'react-router';

const style = {
	profilePic: {
		width: 200,
		height: 200,
	},
	editButton:{
		margin: 5
	}
}
let flag = true;
let prompt = 'Edit info:'

class Profile extends Component {
	constructor(props){
		super(props);

		this.state = {
			email: this.props.profileEmail,
			name:this.props.profileName,
			language:this.props.profileLanguage,
			skill:this.props.profileSkillLevel
		}
	}
	handleFormSubmit(formProps) {
		this.props.updateUserInfo(formProps);
	}

	componentWillMount() {
		console.log('inside componentWillRender in Profile');
		this.props.getUserInfo();
		console.log('inside componentWillMount, state.matches is : ', this.state.matches);
	}

	componentDidUpdate() {
		console.log('inside componentDidUpdate, state.matches is : ', this.state.matches);
	}

	handleEditInfo() {
		flag = !flag;
		prompt = flag ? ' Edit info:':'Cancel';
		//this.setState({name:this.state.name,email:this.state.email,language:this.state.language,skill:this.state.skill})
			this.setState({
			email: this.props.profileEmail,
			name:this.props.profileName,
			language:this.props.profileLanguage,
			skill:this.props.profileSkillLevel
			});
		console.log('in here now',this.state.name);
	}

	componentDidMount() {
		console.log('inside componentDidMount in Profile');
		this.props.getCards();
	}


	handleOnChangeInput(event,field){
		console.log(event.target.value)
		switch(field) {
	    case 'name':
	        this.setState({name:event.target.value});
	        break;
	    case 'email':
	         this.setState({email:event.target.value});
	        break;
	    case 'language':
	    		 this.setState({language:event.target.value});
	    		 break;
	    case 'skill':
	    			this.setState({skill:event.target.value});
	    			break;
			}
	}

	render() {

		const cancel = 'cancel';
		const { handleSubmit, fields: { email, name, language, skillLevel }} = this.props;

		return (
			<div className="container-fluid">
				<div className="row">
					<div className="row-height">
						<div className="col-md-4">
							<div>
								<h3 className="text-xs-center">Profile</h3>
							</div>
				      <div>
				      	<div className="text-xs-center">
				      		<img style={style.profilePic} className="img-rounded center-block" src={this.props.profilePicture} />
				      		<h4>{this.props.profileName}</h4>
				      		<h5>{this.props.profileEmail}</h5>
				      	</div>
				      </div>
				    </div>
				    <div className="col-md-4">
				      <div>
				      	<div style={style.editButton} onClick={() => this.handleEditInfo()} className="btn btn-primary">{prompt}</div>
				      	<div>
				      		<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
				      			<fieldset className="form-group">
				      				<label>Email:</label>
				      				<input {...email} onChange={(event)=> this.handleOnChangeInput(event,'email')}  value={this.state.email} disabled={flag} className="form-control" placeholder={this.props.profileEmail}/>
				      				{email.touched && email.value && <div className="error">{email.error}</div>}
				      			</fieldset>
				      			<fieldset className="form-group">
				      				<label>Name:</label>
				      				<input {...name} value={this.state.name} onChange={(event)=> this.handleOnChangeInput(event,'name')} className="form-control" disabled={flag} placeholder={this.props.profileName}/>
				      				{name.touched && name.error && <div className="error">{name.error}</div>}
				      			</fieldset>
				      			<fieldset className="form-group">
				      				<label>Language:</label>
				      				<input {...language} onChange={(event)=> this.handleOnChangeInput(event,'language')} className="form-control"  value={this.state.language} disabled={flag} placeholder={this.props.profileLanguage}/>
				      				{language.touched && language.error && <div className="error">{language.error}</div>}
				      			</fieldset>
				      			<fieldset className="form-group">
				      				<label>Skill level:</label>
				      				<input {...skillLevel} onChange={(event)=> this.handleOnChangeInput(event,'skill')} className="form-control"  value={this.state.skill} disabled={flag} placeholder={this.props.profileSkillLevel}/>
				      				{skillLevel.touched && skillLevel.error && <div className="error">{skillLevel.error}</div>}
				      			</fieldset>
				      			<button action="submit" className="btn btn-primary" hidden={flag} onClick={()=> this.handleEditInfo()}>Confirm</button>
				      		</form>
				      	</div>
				      </div>
				    </div>
				    <div className="col-md-4">
				      <div>
				      	<h3 className="text-xs-center">Matches</h3>
				      	<Link to="/cards"><button>Match me!</button></Link>
				      </div>
				    </div>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state){
	return { profileEmail: state.profile.email, profileName: state.profile.name, profileLanguage: state.profile.language, profileSkillLevel: state.profile.skillLevel, profileGithub: state.profile.github_handle, profilePicture: state.profile.profile_url, matches: state.cards.matches };
}

function validate(formProps) {
	const errors = {};

	if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(formProps.email)){
		errors.email = 'Please enter a valid email address';
	}

	if (!formProps.email) {
		errors.email = 'Please enter an email';
	}

	if (!formProps.name) {
		errors.name = 'Please enter a name!';
	}

	if (!formProps.language) {
		errors.language = 'Please enter a language!';
	}

	if (!formProps.skillLevel) {
		errors.skillLevel = 'Please enter your skill level!';
	}

	return errors;
}

export default reduxForm({
	form: 'profile',
	fields: ['email', 'name', 'language', 'skillLevel'],
	validate
}, mapStateToProps, actions)(Profile);
