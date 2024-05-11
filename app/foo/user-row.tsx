'use client';

import { User } from "./user-type";

export default function UserRow({ data }: { data: User }) {

    // console.log(data);
    return (
        <tr>
            <td>{data.city}</td>
            <td>{data.state}</td>
            <td>{data.personId}</td>
            <td>{data.personOrg}</td>
        </tr>
    );
}