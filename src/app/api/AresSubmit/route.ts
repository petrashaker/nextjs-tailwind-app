import { NextResponse } from "next/server";

export async function POST(request: Request) {
  if(request.method === "POST") {
    const postData = await request.json()
    const { obchodniJmeno } = postData;
    const { ico } = postData;
    const requestBody = postData.hasOwnProperty("ico") ? 
      { ico, start: 0, pocet: 10, razeni: [] }
      :
      { obchodniJmeno, start: 0, pocet: 10, razeni: [] };
    const url = "https://ares.gov.cz/ekonomicke-subjekty-v-be/rest/ekonomicke-subjekty/vyhledat"

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
      })

      if (response.ok) {
        const data = await response.text();
        console.log({
          status: "success",
          message: "Data loaded successfully.",
          data: data,
        });
        return NextResponse.json(data);
      } else {
        const errorData = await response.text();
        console.error({
          url: url,
          function: "AREShandler",
          errorStack: errorData,
        }, `Error submitting the ARES enquiry form.`);

        console.error({
          status: "failure",
          message: "Error submitting the ARES enquiry form",
          errorData: errorData,
        });

        return NextResponse.json({ success: false });
      }
    } catch (error) {
      console.error({
        url: url,
        function: "AREShandler",
        errorStacK: error
      }, `Error submitting the ARES enquiry form.`);

      console.error({
        status: "failure",
        message: "Error submitting the ARES enquiry form"
      });

      return Response.json({ success: false });
    }
  }

  return NextResponse.error();

}