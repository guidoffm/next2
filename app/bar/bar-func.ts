'use server';
export default async function BarFunc() {
    const res = await Promise.resolve('Hello from BarFunc');
    return res;
}