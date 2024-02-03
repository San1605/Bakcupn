import React, { useContext } from 'react';
import './Header.css';
import { Container, Navbar } from 'react-bootstrap';
import ListIcon from '../../assets/images/list-icon.svg';
import logoutIcon from '../../assets/images/log-out.svg';
import { GlobalContext } from '../../context/GlobalState';
import adaniLogo from '../../assets/images/adani-logo.svg';

const Header = ({ type }) => {
    const { navigate, removeAllQNA, toggleAskQuestionStateFun } = useContext(GlobalContext);

    //logout function and remove token
    const logOutFun = () => {
        removeAllQNA();
        localStorage.setItem("userTokenLogin", "");
        toggleAskQuestionStateFun(true);
        navigate("/");
        window.location.reload();
    }
    return (
        <>
            <Navbar className='top-header'>
                <Container fluid>
                    <Navbar.Brand className='navbar-logos'>
                        <img src={adaniLogo} alt="adaniLogo" className='gt20-logo' />
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            {
                                type === 1 ? null :
                                    <div className="dropdown">
                                        <img src={ListIcon} alt="ListIcon" className='listicon-logo' />
                                        <div className="dropdown-content">
                                            <div className="triangle"></div>
                                            <div className='dropdown-content-item' onClick={() => logOutFun()}>
                                                <img src={logoutIcon} alt="logoutIcon" className='logouticon-logo' />
                                                <span>Logout</span>
                                            </div>
                                        </div>
                                    </div>
                            }
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Header