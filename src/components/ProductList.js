import React, {Component} from 'react';
import Product from './Product'
import Title from './title';
import {connect} from 'react-redux';
import * as actions from '../store/actions';

class ProductList extends Component {

    componentDidMount() {
        this.props.onSetProducts();
    }

    render() {
        //console.log(this.props.products);
        return (
            <React.Fragment>
                <div className="py-5">
                    <div className="container">

                        <Title name="Our" title="Products"/>

                        <div className="row">
                            {this.props.products.map((product)=>{
                                    return <Product key={product.id} product={product}></Product>
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
const mapDispatchToProps=(dispatch)=>{
    return {
        onSetProducts:()=>dispatch(actions.asyn_setProducts())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);

