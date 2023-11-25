import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const files = formData.getAll("files");

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (file instanceof File) {
      console.log("File Name:", file.name);
      console.log("File Type:", file.type);
      console.log("File Size:", file.size);

      if (file.type === "application/pdf") {
        await processPDF(file);
      }
    }
  }

  return NextResponse.json({ message: "Files received" });
}

const processPDF = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await fetch("/api/files/process-files/pdf-parse", {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      const { success, parsedText } = await res.json();
      if (success) {
        console.log(parsedText);
        return NextResponse.json({ parsedText });
      }
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error, message: "Failed to parse PDF" });
  }
};
