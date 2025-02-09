"use client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigation } from "@/hooks/useNavigation";
import { UserButton } from "@clerk/nextjs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import Link from "next/link";
const MobileNav = () => {
  const paths = useNavigation();
  return;
  <Card className="fixed bottom-4 w-[clac(100vw-32px)] flex items-center h-16 p-2 lg:hidden ">
    <nav className="w-full">
      <ul
        className="flex justify-evenly
items-center "
      >
        {paths.map((path, id) => {
          return (
            <li key={id} className="relative">
              <Link href={path.href}>
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      size="icon"
                      variant={path.active ? "default" : "outline"}
                    >
                      {path.icon}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{path.name}</p>
                  </TooltipContent>
                </Tooltip>
              </Link>
            </li>
          );
        })}
        ;
        <li>
          <UserButton></UserButton>
        </li>
      </ul>
    </nav>
  </Card>;
};
export default MobileNav;
