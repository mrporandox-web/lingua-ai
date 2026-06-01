// Роут профиля ученика — витрина движка памяти (уровень/навыки/концепция).
import { ProfileScreen } from "@/components/profile/ProfileScreen";
import { LyraBottomNav, LyraShell } from "@/components/lyra";

export default function ProfilePage() {
  return (
    <LyraShell withBottomNav={<LyraBottomNav />}>
      <ProfileScreen />
    </LyraShell>
  );
}
