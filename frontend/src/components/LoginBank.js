import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export class LoginBank extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isBankSelected: props.isBankSelected
        }
    }

    render() {
        return (
            <div>
                <a href="#" onClick={() => { window.history.back() }} style={{ color: 'white' }}>&lt; Home</a>
                <p>Log into your Bank</p>
                <div className="login"><br />
                    <img src={require(`./images/${this.props.bankSelected}.png`)} alt="Bank Logo" style={{ width: '150px' }} />
                    <form>
                        <input placeholder="Username" type="text" name="username" value='gustavozapata' /><br />
                        <input placeholder="Password" type="password" name="password" value='apiworld' /><br />
                    </form>
                </div>
                <Link to="/dashboard">
                    <button>Login</button>
                </Link>
            </div>
        )
    }
}

export default LoginBank

