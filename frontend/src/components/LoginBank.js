import React from 'react'
import { Link } from 'react-router-dom';

export default function LoginBank() {
    return (
        <div>
            <Link onClick={() => { window.history.back() }} style={{ color: 'white' }}>&lt; Back</Link>
            <p>Log into your Bank</p>
            <Link to="/dashboard">
                <button>Login</button>
            </Link>
        </div>
    )
}
