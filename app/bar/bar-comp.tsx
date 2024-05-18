'use client';

import { useCallback, useEffect, useState } from "react";
import BarFunc from "./bar-func";

export default function BarComp() {

    const [barCompContent, setBarCompContent] = useState('');

    const fetchBarFunc = useCallback(async function () {
        const barFuncResult = await BarFunc();
        setBarCompContent(barFuncResult);
    }, []);

    useEffect(() => {
        fetchBarFunc();
    }, [fetchBarFunc]);

    return (
        <h1>{barCompContent}</h1>
    )
}

