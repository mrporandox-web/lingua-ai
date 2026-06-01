import type { Metadata } from "next";
import { DeviceLab } from "@/components/dev/DeviceLab";

export const metadata: Metadata = {
  title: "Lyra Device Lab",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DeviceLabPage() {
  return <DeviceLab />;
}
