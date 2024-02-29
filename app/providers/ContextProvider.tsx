"use client";
import React from 'react'
import { GlobalProvider } from '../context/globalProvider';
import { Toaster } from 'react-hot-toast';
interface Props {
    children: React.ReactNode;
}
//In the above piece of code we have defined a typescript interface which is defining
//the shape of Prop that the contextProvider component expect to recieve.
function ContextProvider({ children }: Props) {
    const [isReady, setIsReady] = React.useState(false);

    React.useEffect(() => {
        setTimeout(() => {
            setIsReady(true);
        }, 250);
    }, []);
    if (!isReady) {
        return (
            <div className='w-full h-full flex items-center justify-center'>
            <span className="loader"></span>
        </div>
        );
    }
    return (
        <GlobalProvider>
            <Toaster />
            {children}
        </GlobalProvider>
    )
}

export default ContextProvider;