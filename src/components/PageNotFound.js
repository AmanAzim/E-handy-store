import React, {Component} from 'react';

class PageNotFound extends Component {
    render() {
        console.log(this.props)
        return (
           <div className="container mt-5">
               <div className="row">
                   <div className="col-10 mx-auto pt-5 mt-5 text-center text-title">
                       <h1 className="display-3">404</h1>
                       <h1>ERROR</h1>
                       <h2>THE URL:<span className="text-danger">{this.props.location.pathname}</span> WAS NOT FOUND !</h2>
                   </div>
               </div>
           </div>
        );
    }
}

export default PageNotFound;
