export const getLinkFile = async(file)=>{
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "yylewyo1");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/insight-byte/raw/upload",
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await res.json();
    return data;

}