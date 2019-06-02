import React, {Component} from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import './Modal.css';
import {ProductContext} from '../../context';
import {ButtonContainerDark} from '../Button';
import Styled from 'styled-components';
import {connect} from 'react-redux';
import * as actions from "../../store/actions";

class Modal extends Component {

    static contextType=ProductContext;

    render() {
        //https://medium.freecodecamp.org/hitchhikers-guide-to-react-router-v4-4b12e369d10
        //console.log(this.props.location);//Will give the full path address of current route
        //console.log(this.props.match);//Will give the path address that matches to all the paths
        //console.log(this.props.history);
        const {img, title, price}=this.props.modalProduct;

        let modal=null;

        if(this.props.modalOpen){
            modal=(
                <div className="ModalContainer">
                    <div className="container">
                        <div className="row">
                            <div className="col-8 col-md-6 col-lg-4 p-5 mx-auto text-center" id="modal">
                                <h5>Item added to the cart</h5>
                                <img src={img} className="img-fluid" alt="Product Image"></img>
                                <h5>{title}</h5>
                                <h5 className="text-muted">Price: ${price}</h5>

                                <NavLink to={this.props.location.pathname}>
                                    <ButtonContainerDark onClick={()=>this.props.onCloseModal()}>Continue Shopping</ButtonContainerDark>
                                </NavLink>

                                <NavLink to="/cart"><ButtonContainerDark cart onClick={()=>this.props.onCloseModal()}>Go to Cart</ButtonContainerDark></NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return (modal);
    }
}

const mapStateToProps=(state)=>{
    return {
        modalProduct:state.modalProduct,
        modalOpen:state.modalOpen
    }
};
const mapDispatchToProps=(dispatch)=>{
    return {
        onCloseModal:()=>dispatch(actions.closeModal())
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Modal));
