

import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import '../../assets/css/app.scss'
import { Link } from 'react-router-dom';
class Sidebar extends Component {

    constructor(props) {
        super(props);
        const arr = [false, false, false];
        this.state = {
            showMenu: arr
        };

        this.handleTabMenuClick = (tabMenus, tabMenu, index) => {
            const $ = document.querySelector.bind(document);
            const isOpen = $('.parent.open');
            const isOpenMenu = Array.from(tabMenus).indexOf(isOpen);

            const newShowMenu = [...this.state.showMenu];
            if (isOpenMenu == index) {
                isOpen.classList.remove('open');
                newShowMenu[index] = false;
            } else {
                if (isOpen) {
                    isOpen.classList.remove('open');
                    newShowMenu[isOpenMenu] = false;
                }
                tabMenu.classList.add('open')
                newShowMenu[index] = true;
            }
            this.setState({ showMenu: newShowMenu });
        }

    }

    componentDidMount() {
        const $$ = document.querySelectorAll.bind(document);
        const tabMenus = $$('.parent')
        Array.from(tabMenus).forEach((tabMenu, index) => {
            tabMenu.addEventListener('click', this.handleTabMenuClick.bind(this, tabMenus, tabMenu, index));
        });
    }

    componentWillUnmount() {
        const tabMenus = document.querySelectorAll('.parent');
        Array.from(tabMenus).forEach(tabMenu => {
            tabMenu.removeEventListener('click', this.handleTabMenuClick);

        });
    }

    render() {
        const { processLogout, userInfo } = this.props;
        return (

            <div class="be-wrapper be-fixed-sidebar">
                <div className="be-left-sidebar">
                    <div className="left-sidebar-wrapper">
                        <a className="left-sidebar-toggle" href="#">Dashboard</a>
                        <div className="left-sidebar-spacer">
                            <div className="left-sidebar-scroll">
                                <div className="left-sidebar-content">
                                    <ul className="sidebar-elements">
                                        <li className="divider">Menu</li>
                                        <li className="active">
                                            <a href="index.html">
                                                <i class="fas fa-home"></i>
                                                <span style={{ marginLeft: "12px" }}>Dashboard</span>
                                            </a>
                                        </li>
                                        <li className="parent">
                                            <a href="#">
                                                <i class="fas fa-user-graduate" style={{ fontSize: "110%" }}></i>
                                                <span style={{ marginLeft: "13px", fontSize: "15px" }}>Users</span>
                                                <span style={{ marginLeft: "110px", fontSize: "120%" }}>{this.state.showMenu[0] ? <i class="fas fa-caret-up"></i> : <i class="fas fa-caret-down"></i>}</span>
                                            </a>
                                            <ul className="sub-menu">
                                                <Link to='/system/user-manage'>
                                                    <li><a>Manage users</a></li>
                                                </Link>
                                            </ul>
                                        </li>

                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
