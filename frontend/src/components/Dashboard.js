import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import userData from '../userData';

export class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userFinance: [],
            dataUser: userData,
            topExpenses: [],
            user: 'gustavozapata'
        };
    }

    componentDidMount() {
        this.fetchUserData();
        this.getUserData();
    }

    getUserData() {
        const entries = Object.entries(this.state.dataUser);

        let sortEntries = entries.sort((a, b) => a[1] - b[1]);
        sortEntries.reverse();

        const topCategories = []
        let total = 0

        for (let i = 2; i < 7; i++) {
            topCategories[i - 2] = {
                id: i - 1,
                category: sortEntries[i][0],
                value: +(sortEntries[i][1]).toFixed(2)
            }
            total += +(sortEntries[i][1]).toFixed(2)
        }

        this.setState({
            topExpenses: [...topCategories],
            total: total
        })
    }

    fetchUserData = () => {
        const gzApi = `https://gustavozapata.me/api/get-vendors.php`

        axios.get(gzApi)
            .then((res) => {
                this.setState({
                    userFinance: [...res.data]
                })
            }, (error) => {
                console.error('An error occurred when making the request...')
            })
    };

    render() {
        return (
            <div>
                <Link to='/' style={{ color: 'white', float: 'right', fontSize: '.9em' }}>
                    Log out
                </Link>
                <p style={{ fontWeight: 'bold' }}>Welcome <span style={{ color: '#18C4ED' }}>{this.state.user}</span></p>
                <div className="bar-container">
                    <div className="elBar">
                        {this.state.topExpenses.map(item => (  //TODO: HARDCODED JSON DATA
                            <div className="lasBars">
                                <p>&#36; {item.value}</p>
                                <span className={`bar bar-${item.id}`}>{item.category}</span>
                            </div>
                        ))}
                    </div>
                    <h2>Total Expenses: &#36;{this.state.total}</h2>
                </div>

                {/* {this.state.userFinance.map(item => (  //TODO: FETCH DATA
                    <a>{item.browser}</a>
                ))} */}
            </div>
        )
    }
}

export default Dashboard
