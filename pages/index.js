import { useCallback, useEffect } from 'react';

import { useRouter } from 'next/router';

import { useSelector, useDispatch } from 'react-redux';

import { isSignedIn } from '../store/auth-actions';

function Index(){

    const auth = useSelector(state => state.auth);
    const router = useRouter();
    const dispatch = useDispatch();
  
    const a = useCallback(()=>{
        dispatch(isSignedIn());
        console.log(auth.userIsSignedIn)
        if(auth.userIsSignedIn === false)
            router.push('/sign-in');
        else if(auth.userIsSignedIn === true)
            router.push('/home');
    },[]);

    useEffect(()=>{
        a();
    },[])

    return <div className='index-page'></div>; 
}

export default Index;