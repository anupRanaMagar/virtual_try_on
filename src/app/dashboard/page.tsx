"use client";
import { Button } from "@/components/ui/button";
import { clotheExampleImage, personExampleImage } from "@/lib/image";
import { ImageIcon, Upload, Download, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { ScaleLoader } from "react-spinners";

const Page = () => {
  const [previewClotheImage, setPreviewClotheImage] = useState<string | null>(
    null
  );
  const [previewPersonImage, setPreviewPersonImage] = useState<string | null>(
    null
  );
  const [outputImage, setOutputImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const inputClotheImage = useRef<HTMLInputElement>(null);
  const inputPersonImage = useRef<HTMLInputElement>(null);
  const [personFile, setPersonFile] = useState<File | null>(null);
  const [clotheFile, setClotheFile] = useState<File | null>(null);
  const [selectedPersonExample, setSelectedPersonExample] = useState<
    string | undefined
  >(undefined);

  const handleExamplePersonClick = (img: string) => {
    const cleanImg = img.startsWith("/") ? img.slice(1) : img;
    setPreviewPersonImage(`/model/${cleanImg}`); // Ensure consistent path
    setPersonFile(null);
    setSelectedPersonExample(cleanImg);
  };

  const handleExampleClotheClick = (img: string) => {
    const cleanImg = img.startsWith("/") ? img.slice(1) : img;
    setPreviewClotheImage(`/model/${cleanImg}`); // Ensure consistent path
    setClotheFile(null);
  };

  const handlePersonDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setPreviewPersonImage(URL.createObjectURL(file));
      setPersonFile(file);
      setSelectedPersonExample(undefined);
    } else {
      alert("Please upload a person image file");
    }
  };

  const handleClotheDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setPreviewClotheImage(URL.createObjectURL(file));
      setClotheFile(file);
    } else {
      alert("Please upload a clothe image file");
    }
  };

  const handlePersonFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setPreviewPersonImage(URL.createObjectURL(file));
      setPersonFile(file);
    } else {
      alert("Please upload an image file");
    }
  };

  const handleClotheFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setPreviewClotheImage(URL.createObjectURL(file));
      setClotheFile(file);
    } else {
      alert("Please upload an image file");
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handlePersonClick = () => {
    inputPersonImage.current?.click();
  };

  const handleClotheClick = () => {
    inputClotheImage.current?.click();
  };

  const handleDownload = () => {
    if (!outputImage) return;
    const link = document.createElement("a");
    link.href = outputImage;
    link.download = "try-on-result.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleReset = () => {
    if (previewPersonImage) URL.revokeObjectURL(previewPersonImage);
    if (previewClotheImage) URL.revokeObjectURL(previewClotheImage);
    if (outputImage) URL.revokeObjectURL(outputImage);
    setPreviewPersonImage(null);
    setPreviewClotheImage(null);
    setOutputImage(null);
    setPersonFile(null);
    setClotheFile(null);
    setIsLoading(false);
    if (inputPersonImage.current) inputPersonImage.current.value = "";
    if (inputClotheImage.current) inputClotheImage.current.value = "";
  };

  const handleTryOn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!previewPersonImage || !previewClotheImage) {
      alert("Please upload both images");
      return;
    }

    setIsLoading(true);

    const formData = new FormData();

    if (personFile) {
      formData.append("human_image", personFile);
    } else {
      const personResponse = await fetch(previewPersonImage);
      const personBlob = await personResponse.blob();
      formData.append(
        "human_image",
        personBlob,
        selectedPersonExample || "person_image.jpg"
      );
    }

    if (clotheFile) {
      formData.append("cloth_image", clotheFile);
    } else {
      const clotheResponse = await fetch(previewClotheImage);
      const clotheBlob = await clotheResponse.blob();
      formData.append("cloth_image", clotheBlob, "cloth_image.jpg");
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/tryon", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Network response was not ok");

      const blob = await res.blob();
      const imageUrl = URL.createObjectURL(blob);
      setOutputImage(imageUrl);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred during the try-on process");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-6 px-4 bg-[#f5f6f0]">
      <form onSubmit={handleTryOn}>
        {!outputImage && (
          <div className="flex items-center justify-center space-y-8 md:space-y-0 md:space-x-8 md:flex-row">
            <div className="aspect-[768/1024] w-full max-w-xs">
              <div className="absolute  border border-[#e5e7eb] border-solid border-l-0 border-t-0 rounded-tl-md rounded-br-md flex p-1 text-muted-foreground shadow-md z-10">
                <ImageIcon className="size-6" /> person image
              </div>
              <div
                id="personImage"
                onDrop={handlePersonDrop}
                onDragOver={handleDragOver}
                onClick={handlePersonClick}
                className="relative aspect-[768/1024] h-96 border-2 border-[#c5c8cf] border-dotted flex justify-center items-center flex-col hover:cursor-pointer rounded-lg mb-4 overflow-hidden"
              >
                {previewPersonImage ? (
                  <Image
                    src={previewPersonImage}
                    alt="Preview"
                    fill
                    className="object-contain rounded-lg"
                  />
                ) : (
                  <div className="text-center">
                    <Upload className="mx-auto mb-2" />
                    <div>Drop image Here</div>
                    <div>-or-</div>
                    <div>Click to Upload</div>
                  </div>
                )}
              </div>
              <div>
                <div className="text-center">Example</div>
                <div className="grid grid-cols-3 gap-1 mt-2">
                  {personExampleImage.map((img) => (
                    <div key={img} className="">
                      <Image
                        src={`/model${img}`}
                        width={75}
                        height={80}
                        alt="image"
                        onClick={() => handleExamplePersonClick(img)}
                        className="rounded-sm aspect-[768/1024] cursor-pointer hover:opacity-75 transition-opacity m-auto border border-[#c5c8cf] border-solid"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-full max-w-xs">
              <div className="absolute border border-[#e5e7eb] border-solid border-l-0 border-t-0 rounded-tl-md rounded-br-md flex p-1 text-muted-foreground shadow-md z-10">
                <ImageIcon className="size-6" /> cloth image
              </div>
              <div
                id="clotheImage"
                onDrop={handleClotheDrop}
                onDragOver={handleDragOver}
                onClick={handleClotheClick}
                className="relative aspect-[768/1024] h-96 border-2 border-[#c5c8cf] border-dotted flex justify-center items-center flex-col hover:cursor-pointer rounded-lg mb-4 overflow-hidden"
              >
                {previewClotheImage ? (
                  <Image
                    src={previewClotheImage}
                    alt="Preview"
                    fill
                    className="object-contain rounded-lg"
                  />
                ) : (
                  <div className="text-center">
                    <Upload className="mx-auto mb-2" />
                    <div>Drop image Here</div>
                    <div>-or-</div>
                    <div>Click to Upload</div>
                  </div>
                )}
              </div>
              <div>
                <div className="text-center">Example</div>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {clotheExampleImage.map((img, i) => (
                    <Image
                      src={`/model${img}`}
                      width={75}
                      height={80}
                      alt="image"
                      key={`${img}${i}`}
                      onClick={() => handleExampleClotheClick(img)}
                      className="rounded-sm aspect-[768/1024] cursor-pointer hover:opacity-75 transition-opacity m-auto border border-[#e5e7eb] shadow-md"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {outputImage && (
          <div className="flex flex-col items-center mt-1 h-full">
            <h2 className="text-xl mb-4">Result</h2>
            <Image
              src={outputImage}
              alt="Try On Result"
              width={300} // Explicit width for result
              height={450} // Adjust based on your needs
              className="w-full max-w-md h-auto object-contain rounded-lg"
            />
            <div className="flex gap-4 mt-6">
              <Button
                onClick={handleDownload}
                className="bg-green-500 hover:bg-green-600"
              >
                <Download className="mr-2 h-4 w-4" /> Download
              </Button>
              <Button
                onClick={handleReset}
                className="bg-red-500 hover:bg-red-600"
              >
                <X className="mr-2 h-4 w-4" /> Reset
              </Button>
            </div>
          </div>
        )}

        {!outputImage && (
          <div className="flex justify-center mt-6">
            <Button
              type="submit"
              className="bg-rose-400 h-10 w-full max-w-xs"
              disabled={!previewPersonImage || !previewClotheImage || isLoading}
            >
              {isLoading ? (
                <ScaleLoader height={20} color="#ffff" loading={true} />
              ) : (
                <span>Try On</span>
              )}
            </Button>
          </div>
        )}

        <input
          accept="image/*"
          onChange={handlePersonFileChange}
          ref={inputPersonImage}
          type="file"
          className="hidden"
          name="human_image"
        />
        <input
          accept="image/*"
          onChange={handleClotheFileChange}
          ref={inputClotheImage}
          type="file"
          className="hidden"
          name="cloth_image"
        />
      </form>
    </div>
  );
};

export default Page;
