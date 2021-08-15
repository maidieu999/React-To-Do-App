import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

const MenuList = [
    {
        name: 'Home',
        to: '/',
        exact: true
    },
    {
        name: 'Product Management',
        to: '/product-list',
        exact: false
    }
]
const MenuLink = ({ label, to, activeOnlyWhenExact }) => {
    return (
        <Route
            path={to}
            exact={activeOnlyWhenExact}
            children={({ match }) => {
                var active = match ? 'active' : '';
                return (
                    <li className={active}>
                        <Link to={to}>
                            {label}
                        </Link>
                    </li>
                )
            }}
        />
    )
}

class Menu extends Component {
    showMenu = (MenuList) => {
        var result = null;
        if(MenuList.length > 0) {
            result = MenuList.map((item, index) => {
                return (
                    <MenuLink
                        key={index}
                        label={item.name}
                        to={item.to}
                        activeOnlyWhenExact={item.exact}
                     />
                )
            })
        }

        return result;
    }
    render() {
        return (
            <div className="navbar navbar-default">
                <div className="container">
                    <Link to="/" className="navbar-brand">CallAPI</Link>
                    <ul className="nav navbar-nav">
                        { this.showMenu(MenuList) }
                    </ul>
                </div>

            </div>
        )
    }
}

export default Menu;