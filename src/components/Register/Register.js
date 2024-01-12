import React from "react";
import 'tachyons';

class Register extends React.Component {
    constructor(props) {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
        }
    }
    
    onNameChange = (event) => {
        this.setState({name: event.target.value});
    }
    
    onEmailChange = (event) => {
        this.setState({email: event.target.value});
    }

    onPasswordChange = (event) => {
        this.setState({password: event.target.value});
    }

    registerUser = () => {
        const apiURL = 'https://54.191.104.56/register';
        const proxyURL = `https://crossorigin.me/${apiURL}`;
        fetch(proxyURL, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Origin': 'https://irjeffro.github.io/FacialRecognition/'
            },
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user.id) {
                    this.props.loadUser(user);
                    this.props.signIn();
                }
            })
    }
    
    render() {
        const { onSignOut } = this.props;
        return (
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">    
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="register" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0 center">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name" placeholder="" onChange={this.onNameChange} />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email" onChange={this.onEmailChange} />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" onChange={this.onPasswordChange} />
                        </div>
                        </fieldset>
                        <div className="">
                            <input onClick={this.registerUser} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register" />
                        </div>
                        <div className="lh-copy mt3">
                            <p onClick={onSignOut} className="f6 link dim black db pointer">Sign In</p>
                        </div>
                    </div>
                </main>
            </article>
        );
    }
   
}

export default Register;
