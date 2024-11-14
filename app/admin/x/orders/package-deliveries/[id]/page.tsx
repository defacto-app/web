import React from "react";
function Page({ params }: { params: { id: string } }) {

	return <div>Page one package {JSON.stringify(params)}</div>;
}
export default Page;
