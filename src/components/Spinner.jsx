import "./Spinner.css";
import { Film } from "lucide-react";

export default function Spinner() {
  return (
    <div className="flex flex-col items-center justify-center h-64">
      <div className="loader"></div>
      <Film className="text-red-500 mt-4 w-8 h-8 animate-pulse" />
      <p className="mt-2 text-gray-400">Loading movies...</p>
    </div>
  );
}
