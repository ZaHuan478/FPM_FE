import { Avatar, AvatarFallback, AvatarImage } from "../../atoms/Avatar/Avatar";
import type { User } from "../../../types/dashboard.types";

interface UserProfileProps {
  user: User | null;
  isCollapsed: boolean;
}

export function UserProfile({ user, isCollapsed }: UserProfileProps) {
  if (!user) {
    return null;
  }

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-xl bg-accent ${
        isCollapsed ? "justify-center" : ""
      }`}
    >
      <Avatar className="w-10 h-10 shrink-0">
        <AvatarImage src={user.avatar} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      {!isCollapsed && (
        <div className="flex-1 min-w-0">
          <div className="truncate">{user.name}</div>
          <div className="text-xs text-muted-foreground truncate">
            {user.email}
          </div>
        </div>
      )}
    </div>
  );
}
