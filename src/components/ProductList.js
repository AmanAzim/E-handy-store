import React, {Component} from 'react';
import Product from './Product'
import Title from './title';
import {connect} from 'react-redux';


class ProductList extends Component {


    render() {
        return (
            <React.Fragment>
                <div className="py-5">
                    <div className="container">

                        <Title name="Our" title="Products"/>

                        <div className="row">
                            {this.props.products.map((product, index)=>{
                                    return <Product key={product.id} index={index} product={product}></Product>
                            })}
                        </div>

                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps=(state)=>{
    return {
        products:state.products
    }
};

export default connect(mapStateToProps)(ProductList);

