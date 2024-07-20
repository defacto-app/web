import React from "react";

import {columns, Payment} from "./columns"
import {DataTable} from "./data-table"
import {getAllUsers} from "@/app/lib";


async function getData(): Promise<Payment[]> {


    return await getAllUsers()
}

export default async function AllUsers() {

    const data = await getData()

    return (
        <div className="container mx-auto py-10">
            {JSON.stringify(data.length)}
            {/*// sen to tables*/}
            <DataTable columns={columns} data={data}/>
        </div>
    )
}


export const runtime = 'edge';