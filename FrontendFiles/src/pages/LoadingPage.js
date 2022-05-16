import React from 'react';
import Logo from '../components/Logo';

const LoadingPage = () => {
    return (
        <>
            <Logo spinning={true}/>
            <p>
                Connecting to L.U.C.A.S....
            </p>
        </>
    );
}

export default LoadingPage;