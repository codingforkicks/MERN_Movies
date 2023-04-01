import HeaderBar from "./HeaderBar";
import oops from '../../images/oops.png';

const Unauthorized = () => {
    return(
        <div className='Unauthorized'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-11'>
                        <HeaderBar />
                        <div className="unauthImg">
                            <img src={oops} alt='oops' />
                        </div>
                        <h2 className='display-4 text-center'>403 Restricted</h2>
                        <h3 className='text-center'>You are <span className='restricted'>not</span> authorized to view this resource</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Unauthorized;