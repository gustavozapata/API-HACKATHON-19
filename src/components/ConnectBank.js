import React from 'react';
import { Link } from 'react-router-dom';

export default function ConnectBank() {
    return (
        <div>
            <Link onClick={() => { window.history.back() }} style={{ color: 'white' }}>&lt; Back</Link>
            <p>Connect to your Bank</p>
            <Link to="/login-bank">
                <button>Connect</button>
            </Link>
        </div>
    )
}
