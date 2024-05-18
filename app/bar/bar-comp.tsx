'use client';

import { useEffect, useState } from "react";
import BarFunc from "./bar-func";

export default function BarComp() {

    const [barCompContent, setBarCompContent] = useState('');

    const fetchBarFunc = async function () {
        const barFuncResult = await BarFunc();
        setBarCompContent(barFuncResult);
    }

    useEffect(() => {
        fetchBarFunc();
    }, [fetchBarFunc]);

    return (
        <h1>{barCompContent}</h1>
    )
}

