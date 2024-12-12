"use client";

import React from 'react';
import Homepage from './pages/Homepage';
import { SessionProvider } from 'next-auth/react';

const Page = () => {
    return (
        <SessionProvider>
            <div>
                <Homepage />
            </div>
        </SessionProvider>
    );
};

export default Page;