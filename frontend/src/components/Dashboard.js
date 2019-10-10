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
            user: 'gustavozapata',
            score: 75
        };
    }

    componentDidMount() {
        // this.fetchUserData();
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
        // const token_str = '1fb5853d-2f0a-478f-b83d-94b3c8561349_9732a9ea-2191-4180-a657-c5a2c0d19046'
        const token_str = '1fb5853d-2f0a-478f-b83d-94b3c8561349_9732a9ea-2191-4180-a657-c5a2c0d19046'

        axios
            .post(
                'https://dev-api.evenfinancial.com/originator/rateTables/',
                {
                    productTypes: ['credit_card'],
                    personalInformation: {
                        firstName: 'John',
                        lastName: 'Doe',
                        email: 'john@example.com',
                        city: 'New York',
                        state: 'NY',
                        primaryPhone: '2125556789',
                        address1: '45 West 21st Street',
                        address2: '5th Floor',
                        zipcode: '10010',
                        dateOfBirth: '1993-10-09'
                    },
                    creditCardInformation: {
                        allowAnnualFee: true,
                        cardBenefits: ['travel_incentives']
                    },
                    creditInformation: {
                        providedCreditRating: 'excellent',
                        providedNumericCreditScore: 750
                    },
                    financialInformation: {
                        employmentStatus: 'employed',
                        employmentPayFrequency: 'weekly',
                        annualIncome: 120000
                    },
                    legalInformation: {
                        consentsToFcra: true,
                        consentsToTcpa: true,
                        tcpaLanguage:
                            'I agree to be contacted by Even Financial and its partners at the telephone number(s) I have provided above to explore personal loan offers, including contact through automatic dialing systems, artificial or pre-recorded voice messaging, or text message. I understand my consent is not required as a condition to purchasing any goods or services from anyone.'
                    },
                    clientTags: {
                        hello: ['world', 'there'],
                        something: ['else']
                    }
                },
                {
                    headers: {
                        Authorization: `Bearer ${token_str}`
                    }
                }
            )
            .then(res => console.log(res))
            .catch(err => console.error(err))
    }


    fetchUserData2 = () => {
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
                <div className="score">
                    <h2>Your Score</h2>
                    <div className="elScore">
                        <span id='circle'><a>{this.state.score}<span>/100</span></a></span>
                    </div>
                </div>
                <div className="bar-container">
                    <div className="elBar">
                        {this.state.topExpenses.map(item => (  //TODO: HARDCODED JSON DATA
                            <div className="lasBars">
                                <p>&#36; {item.value}</p>
                                <span className={`bar bar-${item.id}`} style={{ width: `${((item.value / this.state.total) * 100) + 60}%` }}>{item.category}</span>
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
