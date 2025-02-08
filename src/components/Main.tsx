"use client";
import { useRef } from "react";
import InputImage from "./ImageInput";

const Main = () => {
  const clotheRef = useRef<null | HTMLInputElement>(null);
  const peopleRef = useRef<null | HTMLInputElement>(null);
  return (
    <div className="">
      <div className="">
        <InputImage ref={clotheRef} />
        <InputImage ref={peopleRef} />
      </div>
    </div>
  );
};

export default Main;
