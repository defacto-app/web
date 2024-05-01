import React from "react";

import {columns, Payment} from "./columns"
import {DataTable} from "./data-table"
import {getAllUsers} from "@/app/lib";

async function getUsers() {
    return await getAllUsers()

}

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  // const response = await getAllUsers()

  // console.log(response, "getAllUsers response")
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "mSW@example.com",
    },
  ]
}

export default async function DemoPage() {
  const data = await getData()

   const _result=  await getUsers()

  return (
      <div className="container mx-auto py-10">
          {JSON.stringify(_result)}
          {/*// sen to tables*/}
        <DataTable columns={columns} data={data} />
      </div>
  )
}


export const runtime = 'edge';