import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import LoginBank from './LoginBank'

class ConnectBank extends Component {
    state = {
        user: 'gustavozapata',
        banks: [
            {
                id: 1,
                bankName: 'Chase',
                image: 'chase',
            },
            {
                id: 2,
                bankName: 'Wells Fargo',
                image: 'fargo',
            },
            {
                id: 3,
                bankName: 'Capital One',
                image: 'capital',
            }
        ],
        isBankSelected: false,
        bankSelected: ''
    }

    selectBank(item) {
        const elItem = this.state.banks.find(bank => bank.id === item)
        this.setState({
            isBankSelected: true,
            bankSelected: elItem.image
        })
    }

    toggleSelect() {
        this.setState({
            isBankSelected: false
        })
    }

    render() {
        if (!this.state.isBankSelected) {
            return (
                <div>
                    <a href="#" onClick={() => { window.history.back() }} style={{ color: 'white' }}>&lt; Back</a>
                    <p>Connect to your Bank</p>
                    <section className="chooseBank">
                        {this.state.banks.map(bank => (
                            <div key={bank.id} onClick={() => this.selectBank(bank.id)} >
                                <img src={require(`./images/${bank.image}.png`)} alt={bank.bankName} />
                                <h3>{bank.bankName}</h3>
                            </div>
                        ))}
                    </section>
                </div>
            )
        } else {
            return (
                <LoginBank user={this.state.user} banks={this.state.banks} bankSelected={this.state.bankSelected} toggleSelect={this.toggleSelect} />
            )
        }
    }
}

export default ConnectBank 