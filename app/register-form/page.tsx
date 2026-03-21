'use client';

import React from 'react';
import { TypingEffect } from '@/components/generic/TypingEffect';
import { BlurInText } from '@/components/generic/BlurInText';

const RegisterForm = () => {
    return (
        <main className={"main overflow-x-hidden relative z-0 w-full"}>
            <div className="h-[130px]"></div>
            <div className="flex flex-col w-full items-center">
                <div style={{ letterSpacing: "7px" }} className="flex items-center">
                    <div className="text-white text-2xl mr-4 uppercase">Introducing</div>
                    <div>
                        <TypingEffect
                            className="text-[#01E9FE] font-bold text-2xl"
                            text="MADE IN INDIA"
                        />
                    </div>
                </div>
                <BlurInText className="text-white mt-8 text-3xl font-bold flex items-center gap-1">
                    <span>ENTION</span>
                    <sup className="text-xl font-thin">&reg;</sup>
                    <span>COMPUTING DEVICE</span>
                </BlurInText>
            </div>
            <div className="h-[100px]"></div>
            <div
                className="flex flex-col -z-10"
                style={{
                    backgroundImage: `url('/assets/0N1A1389.png')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                <div className="flex justify-center">
                    <iframe
                        src="https://docs.google.com/forms/d/e/1FAIpQLSf7Hi-gxtCDaYVZTXAKijKmoV4FrEG-9B7JYCNpQEbz8RpWeg/viewform?embedded=true"
                        width="540"
                        height="800"
                        className="border-0 shadow-xl rounded-lg bg-white/90"
                        title="Registration Form"
                    >
                        Loading&hellip;
                    </iframe>
                </div>
            </div>
        </main>
    );
};

export default RegisterForm;
