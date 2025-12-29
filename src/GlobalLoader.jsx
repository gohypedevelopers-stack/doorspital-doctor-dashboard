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
        height="190"
        width="190"
          color="#7c3aed"
        ariaLabel="dna-loading"
      />
    </div>
  );
}


