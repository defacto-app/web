"use client";
import React, {useEffect} from "react";
import {Dashboard} from "@/app/admin/admin-dash";
import {$adminHttp} from "@/app/config/http";


export default function AdminIndex() {

    const [data, setData] = React.useState<any>(null);

    const [isLoading, setLoading] = React.useState<boolean>(true);

    const [serverError, setServerError] = React.useState<any>(null);

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            const url = "http://localhost:5700/api/admin/dashboard";
            try {
                const res = await $adminHttp(url, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                })

                setData(res);
                setLoading(false);
            } catch (error) {
                setServerError(error);
                setLoading(false);
            }
        };

        getData();
    }, []);
    return (


        <div>
            {/*<Dashboard/>*/}

            {JSON.stringify(data)}
            welcome
        </div>
    );
}

export const runtime = 'edge';