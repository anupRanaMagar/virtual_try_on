import { Button } from "@/components/ui/button";
import Image from "next/image";

const Page = () => {
  return (
    <div className="my-24 flex justify-center">
      <div className="flex items-center w-11/12 h-full gap-8">
        {/* Left Side - Text */}
        <div>
          <div className="w-1/2 text-left text-3xl font-bold pb-2">
            Virtual Try On
          </div>
          <p>
            Experience the Future of Shopping – Try On Clothes Virtually with
            Just a Click!
          </p>
          <Button className="bg-[#96816f] mt-2">Try On</Button>
        </div>
        {/* Right Side - Image */}
        <div className="w-1/2 flex justify-center">
          <Image
            src="/hero.webp"
            height={500}
            width={500}
            alt="Virtual Try On"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
