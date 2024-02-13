import { existsSync, readFileSync } from "fs";
import { NextResponse } from "next/server";
import path from "path";

export async function GET(request: Request) {
  const filename = request.url.split("/").pop();
  if (!filename) {
    return NextResponse.json({ Message: "Not found", status: 404 });
  }
  const ext = filename.split(".").pop();
  const filetype = ext === "png" ? "image/png" : "image/jpeg";
  const filepath = path.join(process.cwd(), "public/uploads/works/" + filename);
  if(!existsSync(filepath)) {
    return NextResponse.json({ Message: "Not found", status: 404 });
  }
  try {
    const file = readFileSync(filepath);
    return new Response(file, { headers: { "content-type": filetype } });
  } catch (error) {
    console.log("Error occured ", error);
    return NextResponse.json({ Message: "Failed", status: 500 });
  }
}
