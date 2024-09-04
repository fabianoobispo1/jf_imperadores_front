//import { getTokenApiFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const reqBody = await request.json();
  const { endpoint, method, body, isprivate } = reqBody;
  console.log("apiExterna");
  //campos obrigatorios
  if (endpoint == "" || method == "" || isprivate == "") {
    return NextResponse.json(
      { message: "falha nos campos", success: false },
      { status: 400 },
    );
  }
  let headers;
  if (isprivate == "true") {
    //const tokenApi = await getTokenApiFromToken(request);
    headers = {
      "Content-Type": "application/json",
     // Authorization: `Bearer ${tokenApi}`,
    };
  } else {
    headers = {
      "Content-Type": "application/json",
    };
  }

  let responseapi;
  if (method == "GET") {
    try {
      responseapi = await fetch(
        `${process.env.NEXT_PUBLIC_API_MINHA_BASE}` + endpoint,
        {
          method: "GET",
          headers: headers,
        },
      );

      console.log(responseapi);
      const responseBody = await responseapi.json();
      console.log(responseBody);
      return NextResponse.json(
        { message: responseBody, success: true },
        { status: 200 },
      );
    } catch (error) {
      console.log("aqui");
      console.log(error);
    }
  } else if (method == "DELETE") {
    responseapi = await fetch(
      `${process.env.NEXT_PUBLIC_API_MINHA_BASE}` + endpoint,
      {
        method: "DELETE",
        headers: headers,
        body,
      },
    );
    const responseBody = await responseapi.json();
    return NextResponse.json(
      { message: responseBody, success: true },
      { status: 200 },
    );
  } else if (method == "PATCH") {
    responseapi = await fetch(
      `${process.env.NEXT_PUBLIC_API_MINHA_BASE}` + endpoint,
      {
        method: "PATCH",
        headers: headers,
        body,
      },
    );

    const responseBody = await responseapi.json();
    console.log(responseapi.status);

    if (responseapi.status == 200 || responseapi.status == 201) {
      console.log(responseBody);
      return NextResponse.json(
        { message: responseBody, success: true },
        { status: 200 },
      );
    } else {
      return NextResponse.json(
        { message: responseBody, success: false },
        { status: 200 },
      );
    }
  }else{
    {
      responseapi = await fetch(
        `${process.env.NEXT_PUBLIC_API_MINHA_BASE}` + endpoint,
        {
          method: "POST",
          headers: headers,
          body,
        },
      );
  
      const responseBody = await responseapi.json();
      console.log(responseapi.status);
  
      if (responseapi.status == 200 || responseapi.status == 201) {
        console.log(responseBody);
        return NextResponse.json(
          { message: responseBody, success: true },
          { status: 200 },
        );
      } else {
        return NextResponse.json(
          { message: responseBody, success: false },
          { status: 200 },
        );
      }
    }
  }
}
