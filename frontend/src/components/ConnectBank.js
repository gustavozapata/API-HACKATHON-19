import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ConnectBank extends Component {
    state = {
        banks: [
            {
                id: 1,
                bankName: 'Chase',
                image: 'chase',
                selected: false
            },
            {
                id: 2,
                bankName: 'Wells Fargo',
                image: 'fargo',
                selected: false
            },
            {
                id: 3,
                bankName: 'Capital One',
                image: 'capital',
                selected: false
            }
        ],
        isBankSelected: false
    }

    toggleSelected() {
        return (
            this.state.isBankSelected ? 'active' : 'inactive'
        )
    }

    selectBank() {
        this.setState({
            isBankSelected: true
        })
    }

    render() {
        return (
            <div>
                <a href="#" onClick={() => { window.history.back() }} style={{ color: 'white' }}>&lt; Back</a>
                <p>Connect to your Bank</p>
                <section className="chooseBank">
                    {this.state.banks.map(bank => (
                        <div key={bank.id} onClick={() => this.selectBank()} >
                            <img src={require(`./images/${bank.image}.png`)} alt={bank.bankName} />
                            <h3>{bank.bankName}</h3>
                        </div>
                    ))}
                </section>
                <Link banks={this.state.banks} to="/login-bank" className={this.toggleSelected()} >
                    <button className={this.toggleSelected()}>Connect</button>
                </Link>
            </div>
        )
    }
}

export default ConnectBank 