import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function Redirect() {
    const history = useHistory();
    useEffect(() =>{
        history.push('/');
    });

    return(
        <div></div>
    );
}