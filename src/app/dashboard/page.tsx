import { ProfileCard } from "@/components/dashboard/profile-cards"
import { SiteHeader } from "@/components/dashboard/site-header"

export default function Dashboard() {
  return (
    <div
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <ProfileCard />
            </div>
          </div>
        </div>
    </div>
  )
}
