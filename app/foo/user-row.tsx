'use client';
export default function UserRow({ data }: { data: any }) {

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