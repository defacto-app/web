import envData from "@/config/envData";




export async function $adminHttp(url: string | URL | Request, options: {
  headers: any;
  body?: BodyInit | null | undefined;
  method: any;
}) {
  // Prepare headers without automatically setting Content-Type to application/json
  const headers = {
    Accept: "application/json",
    Authorization: "Bearer " + localStorage.getItem("auth-token"),
    ...options.headers
  };

  // When sending FormData, do not set the Content-Type header
 /* if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = "application/json";
  }*/

  const response = await fetch(url, {
    method: options.method || 'GET',
    headers: headers,
    body: options.body instanceof FormData ? options.body : JSON.stringify(options.body)
  });
  if (response.status === 201) {
    // If status is 201, return a custom success response
    return {success: true}; // or any other appropriate response object
  } else if (response.ok) {
    return response.json();
  } else {
    return response.json().then(err => {
      throw new Error(err.message);
    });
  }
}