import React from 'react'
import { Link } from 'react-router-dom';
import home_img from './images/home.png';

export default function Home() {
    return (
        <div className="Home">
            <p>Connect to your bank, get finance recommendations and learn about the latest trends in the market</p>
            <img src={home_img} alt="Banca Finance" /><br />
            <Link to="/connect-bank">
                <button>Get Started</button>
            </Link>
        </div>
    )
}
