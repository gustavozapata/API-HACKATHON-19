import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ConnectBank extends Component {
    state = {
        banks: [
            {
                bankName: 'Chase',
                image: 'chase',
                selected: false
            },
            {
                bankName: 'Wells Fargo',
                image: 'fargo',
                selected: false
            },
            {
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

    selectBank(e) {
        this.setState({
            isBankSelected: true
        })
    }

    render() {
        return (
            <div>
                <Link onClick={() => { window.history.back() }} style={{ color: 'white' }}>&lt; Back</Link>
                <p>Connect to your Bank</p>
                <section className="chooseBank">
                    {this.state.banks.map(bank => (
                        <div onClick={() => this.selectBank()} className={bank.selected ? 'active' : 'inactive'}>
                            <img src={require(`./images/${bank.image}.png`)} alt={bank.bankName} />
                            <h3>{bank.bankName}</h3>
                        </div>
                    ))}
                </section>
                <Link to="/login-bank" className={this.toggleSelected()}>
                    <button className={this.toggleSelected()}>Connect</button>
                </Link>
            </div>
        )
    }
}

export default ConnectBank