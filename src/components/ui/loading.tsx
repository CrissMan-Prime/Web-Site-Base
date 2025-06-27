import { AiOutlineLoading } from "react-icons/ai";

export default function Loading() {
  return (
    <main className="w-full h-full">
      <div className="flex size-full justify-center items-center">
        <AiOutlineLoading
          className="flex animate-spin text-primary"
          size={50}
        />
      </div>
    </main>
  );
}
