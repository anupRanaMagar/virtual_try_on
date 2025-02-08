"use client";
import { tryOn } from "@/actions/action";
import { Button } from "@/components/ui/button";
import { clotheExampleImage, personExampleImage } from "@/lib/image";
import { ImageIcon, Upload } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

const Page = () => {
  const [previewClotheImage, setPreviewClotheImage] = useState<string | null>(
    null
  );
  const [previewPersonImage, setPreviewPersonImage] = useState<string | null>(
    null
  );
  const inputClotheImage = useRef<HTMLInputElement>(null);
  const inputPersonImage = useRef<HTMLInputElement>(null);

  const handleExamplePersonClick = () => {};
  const handlePersonDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setPreviewPersonImage(URL.createObjectURL(file));
    } else {
      alert("Please upload an person image file");
    }
  };
  const handleClotheDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setPreviewClotheImage(URL.createObjectURL(file));
    } else {
      alert("Please upload an clothe image file");
    }
  };

  const handlePersonFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    if (file && file.type.startsWith("image/")) {
      setPreviewPersonImage(URL.createObjectURL(file));
    } else {
      alert("Please upload an image file");
    }
  };
  const handleClotheFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    if (file && file.type.startsWith("image/")) {
      setPreviewClotheImage(URL.createObjectURL(file));
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

  return (
    <div className="py-6">
      <form action={tryOn}>
        <div className="flex  flex-col  justify-center items-center space-x-4 ">
          <div className="flex gap-12">
            <div className="relative ">
              <div className="absolute border border-[#e5e7eb] border-solid border-l-0 border-t-0 rounded-tl-md rounded-br-md flex p-1 text-muted-foreground shadow-md ">
                <ImageIcon className="size-6" /> person image
              </div>
              <div
                id="personImage"
                onDrop={handlePersonDrop}
                onDragOver={handleDragOver}
                onClick={handlePersonClick}
                className="h-80 bg-[#ffffff] w-80  border-2 border-[#c5c8cf] border-dotted flex justify-center items-center flex-col hover:cursor-pointer rounded-lg mb-2"
              >
                {previewPersonImage ? (
                  <img
                    src={previewPersonImage}
                    alt="Preview"
                    className="max-w-full max-h-full object-cover"
                  />
                ) : (
                  <div className="text-center">
                    <Upload className="ml-12" />
                    <div>Drop image Here</div>
                    <div>-or-</div> <div>Click to Upload</div>
                  </div>
                )}
              </div>
              <div>
                <div>Example</div>
                <div className="grid grid-cols-3 gap-2 content-center">
                  {personExampleImage.map((img, i) => (
                    <Image
                      src={`/model${img}`}
                      width={50}
                      height={80}
                      alt="image"
                      key={`${img}${i}`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute border border-[#e5e7eb] border-solid border-l-0 border-t-0 rounded-tl-md rounded-br-md flex p-1 text-muted-foreground shadow-md ">
                <ImageIcon className="size-6" /> cloth image
              </div>
              <div
                id="clotheImage"
                onDrop={handleClotheDrop}
                onDragOver={handleDragOver}
                onClick={handleClotheClick}
                className="h-80 w-80  border-2 border-[#c5c8cf] border-dotted flex justify-center items-center flex-col hover:cursor-pointer mb-2"
              >
                {previewClotheImage ? (
                  <img
                    src={previewClotheImage}
                    alt="Preview"
                    className="max-w-full max-h-full object-cover"
                  />
                ) : (
                  <div className="text-center">
                    <Upload className="ml-12" />
                    <div>Drop image Here</div>
                    <div>-or-</div> <div>Click to Upload</div>
                  </div>
                )}
              </div>
              <div>
                <div>Example</div>
                <div className="grid grid-cols-3 gap-2 ">
                  {clotheExampleImage.map((img, i) => (
                    <Image
                      src={`/model${img}`}
                      width={50}
                      height={80}
                      alt="image"
                      key={`${img}${i}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <Button className=" mt-6 bg-rose-400">Try On</Button>
        </div>
        <input
          accept="image/*"
          onChange={handlePersonFileChange}
          ref={inputPersonImage}
          type="file"
          className="hidden"
        />
        <input
          accept="image/*"
          onChange={handleClotheFileChange}
          ref={inputClotheImage}
          type="file"
          className="hidden"
        />
      </form>
    </div>
  );
};

export default Page;
