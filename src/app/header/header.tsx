import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ToggleTheme } from "@/feature/toggle-theme";
import { useLocation, Link } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);

  return (
    <header className="flex sticky top-0 z-50 w-full justify-between px-4 h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear bg-[var(--header)]">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Breadcrumb>
          <BreadcrumbList>
            {pathnames.length === 0 ? (
              <BreadcrumbItem>
                <BreadcrumbPage>Home</BreadcrumbPage>
              </BreadcrumbItem>
            ) : (
              pathnames.map((name, index) => {
                const routeTo = "/" + pathnames.slice(0, index + 1).join("/");
                const isLast = index === pathnames.length - 1;
                const formattedName = name
                  .replace(/-/g, " ")
                  .replace(/\b\w/g, (c) => c.toUpperCase());

                return (
                  <BreadcrumbItem key={routeTo}>
                    {isLast ? (
                      <BreadcrumbPage>{formattedName}</BreadcrumbPage>
                    ) : (
                      <>
                        <BreadcrumbLink asChild>
                          <Link to={routeTo}>{formattedName}</Link>
                        </BreadcrumbLink>
                        <BreadcrumbSeparator />
                      </>
                    )}
                  </BreadcrumbItem>
                );
              })
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <ToggleTheme />
    </header>
  );
};

export default Header;
