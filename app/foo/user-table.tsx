'use client';

import { User } from "./user-type";
import UserRow from "./user-row";
import { Key, useEffect, useState } from "react";
import './user-table.css';

type UserProps = 'city' | 'state' | 'personId' | 'personOrg';
type SortOrder = 'asc' | 'desc' | 'none';

export default function UserTable({ data }: { data: User[] }) {

    const [users, setUsers] = useState<User[]>([]);
    const [dataMyTable, setdataMyTable] = useState<User[]>([]);
    const [sortColumn, setSortColumn] = useState<UserProps>('city');
    const [sortOrder, setSortOrder] = useState<SortOrder>('none');

    useEffect(() => {
        setUsers(data);
    }, [data]);

    useEffect(() => {
        const sortedUsers = getsortedUsers();
        setdataMyTable(sortedUsers as never[]);
    }, [users, sortColumn, sortOrder]);

    function handleHeaderClick(columnName: UserProps) {
        console.log(`${columnName} header clicked`);
        if (sortColumn === columnName) {
            switch (sortOrder) {
                case 'none':
                    setSortOrder('asc');
                    break;
                case 'asc':
                    setSortOrder('desc');
                    break;
                case 'desc':
                    setSortOrder('none');
                    break;
            }
        } else {
            setSortColumn(columnName);
            setSortOrder('asc');
        }
    };

    function getsortedUsers() {
        if (sortOrder === 'none') {
            return users;
        }
        return [...users].sort((a, b) => {
            if (a[sortColumn] < b[sortColumn]) {
                return sortOrder === 'asc' ? -1 : 1;
            }
            if (a[sortColumn] > b[sortColumn]) {
                return sortOrder === 'asc' ? 1 : -1;
            }
            return 0;
        });
    }

    function getSortSymbol(columnName: UserProps) {
        if (sortColumn === columnName) {
            switch (sortOrder) {
                case 'asc':
                    return '⬆️ ';
                case 'desc':
                    return '⬇️ ';
                case 'none':
                    return '';
            }
        }
        return '';
    }

    return (
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
                <tr>
                    <th className="sortable px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer w-1/4" scope="col" onClick={() => handleHeaderClick('city')}>
                        {getSortSymbol('city')}City
                    </th>
                    <th className="sortable px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer w-1/4" scope="col" onClick={() => handleHeaderClick('state')}>
                        {getSortSymbol('state')}State
                    </th>
                    <th className="sortable px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer w-1/4" scope="col" onClick={() => handleHeaderClick('personId')}>
                        {getSortSymbol('personId')}Person ID
                    </th>
                    <th className="sortable px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer w-1/4" scope="col" onClick={() => handleHeaderClick('personOrg')}>
                        {getSortSymbol('personOrg')}Person Org
                    </th>
                </tr >
            </thead >
            <tbody className="bg-white divide-y divide-gray-200">
                {(dataMyTable as User[]).map((user: User, index: Key) => (
                    <UserRow key={index} data={user}></UserRow>
                ))}
            </tbody>
        </table >
    );
}