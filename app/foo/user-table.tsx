'use client';

import { User } from "./user-type";
import UserRow from "./user-row";
import { Key, useEffect, useState } from "react";
export default function UserTable({ data }: { data: User[] }) {
    // introduce useEffect and useState
    const [users, setUsers] = useState<any[]>([]);
    useEffect(() => {
        // fetch data
        setUsers(data);
    }, []);

    const handleHeaderClick = (columnName: string) => () => {
        console.log(`${columnName} header clicked`);
    };
    // console.log(users);
    return (
        <table>
            <thead>
                <tr>
                    <th scope="col" onClick={handleHeaderClick('city')}>City</th>
                    <th scope="col" onClick={handleHeaderClick('state')}>State</th>
                    <th scope="col" onClick={handleHeaderClick('personId')}>Person ID</th>
                    <th scope="col" onClick={handleHeaderClick('personOrg')}>Person Org</th>
                </tr >
            </thead >
            <tbody>
                {users && (users as any).map((user: any, index: Key | null | undefined) => (
                    <UserRow key={index} data={user}></UserRow>
                ))}
            </tbody>
        </table >
    );
}