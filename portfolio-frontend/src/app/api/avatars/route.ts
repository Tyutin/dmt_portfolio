import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import { randomUUID } from "crypto";

export async function GET() {
  const data = { sas: "sas" };

  return Response.json({ data });
}

export async function POST(req: Request) {
  const formData = await req.formData();

  const file = formData.get("file");
  if (!file) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }
  // @ts-expect-error sdasaddas
  const buffer = Buffer.from(await file.arrayBuffer());
  // @ts-expect-error sdasaddas
  const ext = file.name.split('.').pop()
  const filename =  `/images/avatars/${randomUUID()}.${ext}`
  try {
    await writeFile(
      path.join(process.cwd(), "public" + filename),
      buffer
    );
    return NextResponse.json({ imageName: filename, status: 201 });
  } catch (error) {
    console.log("Error occured ", error);
    return NextResponse.json({ Message: "Failed", status: 500 });
  }
}
