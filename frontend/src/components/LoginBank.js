import React from 'react'
import { Link } from 'react-router-dom';

export default function LoginBank(props) {
    return (
        <div>
            <a href="#" onClick={() => { window.history.back() }} style={{ color: 'white' }}>&lt; Back</a>
            <p>Log into your Bank</p>
            <div className="login">
                <form>
                    <input placeholder="Username" type="text" name="username" /><br />
                    <input placeholder="Password" type="password" name="password" />
                </form>
            </div>
            <Link to="/dashboard">
                <button>Login</button>
            </Link>
        </div>
    )
}
