import UserTable from "@/app/foo/user-table";
import { DaprClient } from "@dapr/dapr";

export default async function Page() {
    const daprClient = new DaprClient();
    const data = await daprClient.state.query('userstore2', {
        filter: {},
        page: {
            limit: 100
        },
        sort: []
    });
    const mappedData = data.results.map((item: any) => {
        return {
            city: item.data.city,
            state: item.data.state,
            personId: item.data.person.id,
            personOrg: item.data.person.org
        };
    });
    return (
        <div>
            <UserTable data={mappedData}></UserTable>
        </div>
    )
};