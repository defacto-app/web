import React from "react";
function Page({ params }: { params: { id: string } }) {

	return <div>Page one Restaurant order {JSON.stringify(params)}</div>;
}
export default Page;
