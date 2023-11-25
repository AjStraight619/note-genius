export const readFileContent = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(event.target?.result as string);
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsText(file);
  });
};

export const isPDF = (file: File): boolean => {
  return file.type === "application/pdf";
};
export const isHEIC = (file: File): boolean => {
  return (
    file.name.toLowerCase().endsWith(".heic") ||
    file.name.toLowerCase().endsWith(".heif")
  );
};

export const isImageType = (file: File): boolean => {
  return (
    file.type.startsWith("image/") ||
    /\.(jpeg|jpg|gif|png|bmp|tiff|webp|heic)$/i.test(file.name.toLowerCase())
  );
};

export const handleProcessFiles = async (formData: FormData) => {
  console.log("handleProcess files is called");
  const res = await fetch("/api/files/process-files", {
    method: "POST",
    body: formData,
  });
  const data = await res.json();
  console.log(data);
};
