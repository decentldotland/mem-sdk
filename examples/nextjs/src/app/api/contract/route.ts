import { MEMResponseObject, Mem } from "mem-sdk";
import { NextResponse } from "next/server";

import { haikuContract } from "../../constants";

export async function GET(request: Request) {
  const generateHaiku = async () => {
    const mem = new Mem({
      network: "mainnet"
    });
    const inputs = { function: "generate" };
    const response = (await mem.write(
      haikuContract,
      inputs
    )) as MEMResponseObject;
    // console.log(response);
    return response;
  };
  try {
    const result = await generateHaiku();
    return NextResponse.json(result, { status: 200 });
  } catch (e) {
    return NextResponse.json({ result: {} }, { status: 500 });
  }
}

export async function HEAD(request: Request) {}

export async function POST(request: Request) {}

export async function PUT(request: Request) {}

export async function DELETE(request: Request) {}

export async function PATCH(request: Request) {}

export async function OPTIONS(request: Request) {}
