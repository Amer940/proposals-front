import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

const links = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Proposals",
    link: "/proposals",
  },
  {
    name: "Partners",
    link: "/partner",
  },
  {
    name: "Create partner",
    link: "/partner/create",
  },
  {
    name: "Create proposal",
    link: "/proposals/create",
  },
];

const Navbar = () => {
  return (
    <div className="fixed top-4 flex items-center justify-center w-full">
      <NavigationMenu>
        <NavigationMenuList>
          {links.map((link, idx) => (
            <NavigationMenuItem key={idx}>
              <NavigationMenuLink asChild>
                <Link className="font-semibold" href={link.link}>
                  {link.name}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default Navbar;
