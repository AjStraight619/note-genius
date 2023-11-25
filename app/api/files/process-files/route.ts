import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const fileEntries = formData.getAll("files");
  const fileIds = formData.getAll("fileIds");

  let processedFiles = [];

  for (let i = 0; i < fileEntries.length; i++) {
    const file = fileEntries[i];
    if (file instanceof File) {
      const fileResult = await processFile(file);
      processedFiles.push({ id: fileIds[i], ...fileResult });
    }
  }

  return NextResponse.json({ processedFiles });
}

const processFile = async (file: File) => {
  if (file.type === "application/pdf") {
    return await parsePDF(file);
  }
  // Add other file type processing logic here if needed

  // Default response for unprocessed file types
  return { name: file.name, status: "Unprocessed" };
};

const parsePDF = async (file: File) => {
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
        return { parsedText, status: "Processed" };
      }
    }
  } catch (error) {
    console.error(error);
    return { error, status: "Error" };
  }
};
