import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';

export class Dashboard extends Component {

    state = {
        data: []
    }

    componentDidMount() {
        // const token = '1fb5853d-2f0a-478f-b83d-94b3c8561349_9732a9ea-2191-4180-a657-c5a2c0d19046'
        // const evenApi = 'https://dev-api.evenfinancial.com/leads/'

        const gzApi = `https://gustavozapata.me/api/get-vendors.php`
        // const plaidApi = 'http://localhost:8000/transactions'
        // const plaidApi = 'https://development.plaid.com/transactions/get'

        axios.get(gzApi)
            .then((res) => {
                console.log(res.data)
                console.log(res)
                this.setState({
                    ...this.data,
                    // data: res.data
                })
            }, (error) => {
                console.log('ERROOOW')
            })
    }

    render() {
        return (
            <div>
                <Link to='/' style={{ color: 'white', float: 'right', fontSize: '.9em' }}>
                    Log out
                </Link>
                <p>Welcome to your Dashboard</p>
                {this.state.data.map(item => (
                    <p>{item}</p>
                ))}
            </div>
        )
    }
}

export default Dashboard
