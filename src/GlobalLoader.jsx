import { DNA } from "react-loader-spinner";

export default function GlobalLoader({ fullPage = false }) {
  return (
    <div
      className={`flex items-center justify-center ${
        fullPage ? "min-h-screen" : "min-h-[300px]"
      }`}
    >
      <DNA
        visible={true}
        height="80"
        width="80"
        ariaLabel="dna-loading"
      />
    </div>
  );
}
