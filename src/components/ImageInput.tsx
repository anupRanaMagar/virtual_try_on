interface InputImageProps {
  ref: React.RefObject<HTMLInputElement | null>;
}

const InputImage = ({ ref }: InputImageProps) => {
  return (
    <input
      type="file"
      accept="image/*"
      className="h-52 w-80 border-dotted "
      ref={ref}
    />
  );
};

export default InputImage;
