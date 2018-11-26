import React , { Component } from 'react';
import { Link } from 'react-router-dom';

class Gallery extends Component{
    render(){
        return(
            <div className={"ui inverted vertical masthead aligned segment"}>
                <div className={'ui middle aligned stackable grid container'}>
                    <div className={'eight wide column'}>
                        <h1 className={"ui inverted header"}>
                            lpsum dolor sit amet consectetur adipiscing
                        </h1>
                        <br/><br/>
                        <Link to="/">
                            <div className={"ui huge primary button"}>Try For Free</div>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}
export default Gallery;