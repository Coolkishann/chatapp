"use client";
import { Card  } from "@/components/ui/card";
import {  Button } from "@/components/ui/button";
import { useNavigation } from "@/hooks/useNavigation";
import { UserButton } from "@clerk/nextjs";
import { Tooltip, TooltipContent, TooltipTrigger } from "@radix-ui/react-tooltip";
import Link from "next/link";
const DesktopNav = () => {
  const paths = useNavigation();
  return;
  <Card className="hidden lg:flexlg:flex-col lg:justify-between1g:items-center lg:h-full lg:w-161g:px-2 1g:py-4">
    <nav>
    <ul className="flex flex-col
items-center gap-4">{paths.map((path, id) => {
return (
<li key={id}
className="relative">
<Link href={path.href}>
<Tooltip>
<TooltipTrigger>
<Button
size="icon"
variant={path.
active? "default"
: "outline"}
>
{path.icon}
</Button>
</TooltipTrigger>
<TooltipContent>
    <p>
        {path.name}
    </p>
</TooltipContent>
</Tooltip>
</Link>
</li>);
})};
</ul>
    </nav>
    <div>
        <UserButton></UserButton>
    </div>
  </Card>;
};
export default DesktopNav;
