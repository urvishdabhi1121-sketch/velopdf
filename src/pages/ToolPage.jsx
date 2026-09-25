import { useParams, Navigate } from "react-router-dom";
import { getTool } from "@/lib/tools";
import MergePDF from "./tool/MergePDF";
import SplitPDF from "./tool/SplitPDF";
import RemovePages from "./tool/RemovePages";
import ExtractPages from "./tool/ExtractPages";
import RotatePDF from "./tool/RotatePDF";
import JpgToPdf from "./tool/JpgToPdf";
import PageNumbers from "./tool/PageNumbers";
import Watermark from "./tool/Watermark";
import CropPDF from "./tool/CropPDF";
import ProtectPDF from "./tool/ProtectPDF";
import UnavailableTool from "./tool/UnavailableTool";

const READY = {
  merge: MergePDF,
  split: SplitPDF,
  remove: RemovePages,
  extract: ExtractPages,
  rotate: RotatePDF,
  "jpg-to-pdf": JpgToPdf,
  "page-numbers": PageNumbers,
  watermark: Watermark,
  crop: CropPDF,
  protect: ProtectPDF,
};

export default function ToolPage() {
  const { toolId } = useParams();
  const tool = getTool(toolId);
  if (!tool) return <Navigate to="/tools" replace />;
  if (tool.status !== "ready") return <UnavailableTool tool={tool} />;
  const Comp = READY[tool.id];
  if (!Comp) return <UnavailableTool tool={{ ...tool, reason: "This tool isn't wired up yet." }} />;
  return <Comp />;
}