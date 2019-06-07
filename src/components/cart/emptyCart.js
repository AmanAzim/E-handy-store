import React from 'react'

const EmptyCart=(props)=>{
    return (
        <div className="container mt-5">
            <div className="row pt-5 mt-5">
                <div className="col-10 mx-auto text-center text-title pt-5 mt-5">
                    <h1>Your cart is currently empty</h1>
                </div>
            </div>
        </div>
    );
}

export default EmptyCart;
