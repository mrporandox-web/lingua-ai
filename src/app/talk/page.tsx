// Экран speaking (прототип): натив — on-device речь, веб — Web Speech API.
import { LyraBottomNav, LyraShell } from "@/components/lyra";
import { SpeakingScreen } from "@/components/talk/SpeakingScreen";

export default function TalkPage() {
  return (
    <LyraShell withBottomNav={<LyraBottomNav />}>
      <SpeakingScreen />
    </LyraShell>
  );
}
