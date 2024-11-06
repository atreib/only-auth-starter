import { getAuthService } from "@/lib/auth-service";
import { LogoutBtn } from "./components/logout-btn.client";

export default async function DashboardPage() {
  const user = await getAuthService().requireAuthSession();
  console.log(user);

  return (
    <div className="flex gap-4">
      Dashboard
      <LogoutBtn />
    </div>
  );
}
