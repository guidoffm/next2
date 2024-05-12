'use client';

import { User } from "./user-type";
import UserRow from "./user-row";
import { Key, useEffect, useState } from "react";
type UserProps = 'city' | 'state' | 'personId' | 'personOrg';
export default function UserTable({ data }: { data: User[] }) {

    const [users, setUsers] = useState<User[]>([]);
    const [dataMyTable, setdataMyTable] = useState<User[]>([]);
    const [sortColumn, setSortColumn] = useState<UserProps>('city');
    
    useEffect(() => {
        setUsers(data);
    }, [data]);
    
    useEffect(() => {
        const sortedUsers = getsortedUsers();
        setdataMyTable(sortedUsers as never[]);
    }, [users, sortColumn]);

    function handleHeaderClick(columnName: UserProps) {
        // console.log(`${columnName} header clicked`);
        setSortColumn(columnName);
    };

    function getsortedUsers() {
        return [...users].sort((a, b) => {
            if (a[sortColumn] < b[sortColumn]) {
                return -1;
            }
            if (a[sortColumn] > b[sortColumn]) {
                return 1;
            }
            return 0;
        });
    }

    return (
        <table>
            <thead>
                <tr>
                    <th scope="col" onClick={()=>handleHeaderClick('city')}>City</th>
                    <th scope="col" onClick={()=>handleHeaderClick('state')}>State</th>
                    <th scope="col" onClick={()=>handleHeaderClick('personId')}>Person ID</th>
                    <th scope="col" onClick={()=>handleHeaderClick('personOrg')}>Person Org</th>
                </tr >
            </thead >
            <tbody>
                {(dataMyTable as User[]).map((user: User, index: Key) => (
                    <UserRow key={index} data={user}></UserRow>
                ))}
            </tbody>
        </table >
    );
}