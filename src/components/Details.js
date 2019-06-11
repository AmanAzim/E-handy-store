import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {ButtonContainerDark} from './Button';
import {connect} from 'react-redux';
import * as actions from "../store/actions";

class Details extends Component {

    render() {
        const {id, title, company, info, imgUrl, price, inCart}=this.props.detailProduct;
        return (
            <div className="container py-2">
                {/*Title*/}
                <div className="row">
                    <div className="col-10 mx-auto my-5 text-center text-red">
                        <h1>{title}</h1>
                    </div>
                </div>

                {/*Product details*/}
                <div className="row">
                    <div className="col-10 mx-auto my-3 col-md-6">
                        <img src={imgUrl} alt="Product image" className="img-fluid"/>
                    </div>

                    <div className="col-10 mx-auto my-3 col-md-6 text-capitalize">
                        <h4 className="text-title mt-3 mb-2">Made by: {company}</h4>
                        <h4 className="text-muted">Price: €{price}</h4>
                        <p className="mt-3 mb-0"><u><b>Product Info:</b></u></p>
                        <p className="text-muted">{info}</p>
                        {/*Buttons*/}
                        <div>
                            <NavLink to="/"><ButtonContainerDark>Back to Products</ButtonContainerDark></NavLink>
                            <ButtonContainerDark cart disabled={inCart} onClick={()=>{this.props.onAddToCart(id);  this.props.onOpenModal(id);}}>{/*We can also pass props to styled components like "cart" here*/}
                                {inCart? 'In Cart':'Add to Cart'}
                            </ButtonContainerDark>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps=(state)=>{
    return {
        detailProduct:state.detailProduct
    }
};
const mapDispatchToProps=(dispatch)=>{
    return {
        onAddToCart:(id)=>dispatch(actions.asyn_addToCart(id)),
        onOpenModal:(id)=>dispatch(actions.openModal(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Details);
