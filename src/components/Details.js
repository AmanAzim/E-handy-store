import React, {Component} from 'react';
import {ProductContext} from '../context';
import {NavLink} from 'react-router-dom';
import {ButtonContainerDark} from './Button';

class Details extends Component {

    static contextType=ProductContext;

    render() {
        const {id, title, company, info, img, price, inCart}=this.context.detailProduct;
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
                        <img src={img} alt="Product image" className="img-fluid"/>
                    </div>

                    <div className="col-10 mx-auto my-3 col-md-6 text-capitalize">
                        <h4 className="text-title mt-3 mb-2">Made by: {company}</h4>
                        <h4 className="text-muted">Price: ${price}</h4>
                        <p className="mt-3 mb-0"><u><b>Product Info:</b></u></p>
                        <p className="text-muted">{info}</p>
                        {/*Buttons*/}
                        <div>
                            <NavLink to="/"><ButtonContainerDark>Back to Products</ButtonContainerDark></NavLink>
                            <ButtonContainerDark disabled={inCart} onClick={()=>this.context.addToCart(id)}>{/*We can also pass props to styled components like "cart" here*/}
                                {inCart? 'In Cart':'Add to Cart'}
                            </ButtonContainerDark>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Details;
