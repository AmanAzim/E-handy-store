import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import logo from '../logo.svg'
import {ButtonContainer} from "./Button";
import styled from 'styled-components';
import '../App.css';

const NavWrapper=styled.nav`
    background:var(--mainRed);
    .nav-link{
        color:var(--mainWhite) !important;
        font-size:1.4rem;
    }   
`;


export default class Navbar extends Component {

    render() {
        return (
          <NavWrapper className="navbar navbar-expand-sm navbar-dark px-sm-5">

              <NavLink to="/" ><img src={logo} alt="E-Handy Shop" className="navbar-brand"/></NavLink>

              <ul className="navbar-nav align-items-center">
                  <li className="nav-item ml-5">
                      <NavLink to="/" className="nav-link">Products</NavLink>
                  </li>
              </ul>

              <NavLink to="/cart" className="ml-auto">
                  <ButtonContainer><span className="mr-2"><i className="fas fa-cart-plus"/></span> My Cart</ButtonContainer>
              </NavLink>
          </NavWrapper>
        );
    }
}


