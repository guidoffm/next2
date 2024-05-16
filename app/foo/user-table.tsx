'use client';

import { User } from "./user-type";
import UserRow from "./user-row";
import { useCallback, useEffect, useState } from "react";
import './user-table.css';

type SortOrder = 'asc' | 'desc' | 'none';

export default function UserTable({ data }: { data: User[] }) {

    const [users, setUsers] = useState<User[]>([]);
    const [dataMyTable, setdataMyTable] = useState<User[]>([]);
    const [sortColumn, setSortColumn] = useState<keyof User>('city');
    const [sortOrder, setSortOrder] = useState<SortOrder>('none');

    useEffect(() => {
        setUsers(data);
    }, [data]);

    const getsortedUsers = useCallback(() => {
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
    }, [users, sortColumn, sortOrder]);

    useEffect(() => {
        const sortedUsers = getsortedUsers();
        setdataMyTable(sortedUsers);
    }, [users, sortColumn, sortOrder, getsortedUsers]);

    function handleHeaderClick(columnName: keyof User) {

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



    useEffect(() => {
        const sortedUsers = getsortedUsers();
        setdataMyTable(sortedUsers);
    }, [getsortedUsers]);
    function getSortSymbol(columnName: keyof User) {
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
        dataMyTable.length > 0 ? (
            <table className="min-w-full divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="sortable px-6 py-3 text-left text-xs text-black uppercase tracking-wider cursor-pointer w-1/4 font-bold" scope="col" onClick={() => handleHeaderClick('city')}>
                            {getSortSymbol('city')}City
                        </th>
                        <th className="sortable px-6 py-3 text-left text-xs text-black uppercase tracking-wider cursor-pointer w-1/4 font-bold" scope="col" onClick={() => handleHeaderClick('state')}>
                            {getSortSymbol('state')}State
                        </th>
                        <th className="sortable px-6 py-3 text-left text-xs text-black uppercase tracking-wider cursor-pointer w-1/4 font-bold" scope="col" onClick={() => handleHeaderClick('personId')}>
                            {getSortSymbol('personId')}Person ID
                        </th>
                        <th className="sortable px-6 py-3 text-left text-xs text-black uppercase tracking-wider cursor-pointer w-1/4 font-bold" scope="col" onClick={() => handleHeaderClick('personOrg')}>
                            {getSortSymbol('personOrg')}Person Org
                        </th>
                    </tr >
                </thead >
                <tbody className="bg-white divide-gray-200">
                    {(dataMyTable as User[]).map((user: User, index: number) => (
                        <UserRow key={index} data={user}></UserRow>
                    ))}
                </tbody>
            </table >
        ) : (
            <div>Loading...</div>
        )
    );
}