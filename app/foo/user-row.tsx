

import { User } from "./user-type";

export default function UserRow({ data }: { data: User }) {

    return (
        <tr className="bg-white">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{data.city}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.state}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.personId}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.personOrg}</td>
        </tr>
    );
}