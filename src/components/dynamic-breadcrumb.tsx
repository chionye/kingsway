/** @format */

import * as React from "react";
import { Link, useLocation } from "react-router-dom";

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useMediaQuery } from "@/hooks/use-media-query";
import Icons from "@/constants/icons";

const MAX_VISIBLE_LINKS = 5;
const IGNORED_SEGMENTS = ["admin", "dashboard"]; // Add any other roles or segments here

export function DynamicBreadcrumb() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const location = useLocation();

  const pathSegments = location.pathname
    .split("/")
    .filter((segment) => segment !== "");

  const allLinks = pathSegments.reduce(
    (acc, segment, index) => {
      // Check if the segment should be ignored
      if (!IGNORED_SEGMENTS.includes(segment)) {
        const href = "/" + pathSegments.slice(0, index + 1).join("/");
        const label = segment.charAt(0).toUpperCase() + segment.slice(1);
        acc.push({ href, label });
      }
      return acc;
    },
    [{ href: "/", label: "Home" }]
  );

  const showEllipsis = allLinks.length > MAX_VISIBLE_LINKS;
  const lastLink = allLinks[allLinks.length - 1];
  const linksToDisplay = showEllipsis
    ? [allLinks[0], ...allLinks.slice(-3)]
    : allLinks.slice(0, -1);
  const hiddenLinks = allLinks.slice(1, -2);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {allLinks.length > 1 && (
          <BreadcrumbItem>
            <BreadcrumbLink
              onClick={() => window.history.back()}
              className='cursor-pointer bg-white px-4 h-[46px] flex items-center gap-2 rounded-[8px]'>
              <Icons.backArrow />
              <span>Go Back</span>
            </BreadcrumbLink>
            <BreadcrumbSeparator>
              <Icons.slash />
            </BreadcrumbSeparator>
          </BreadcrumbItem>
        )}

        {showEllipsis ? (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={allLinks[0].href} className='flex items-center gap-2'>
                  {allLinks[0].label === "Home" ? (
                    <Icons.home />
                  ) : (
                    <Icons.bricks />
                  )}
                  {allLinks[0].label.replace("-", " ")}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <Icons.slash />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              {isDesktop ? (
                <DropdownMenu open={open} onOpenChange={setOpen}>
                  <DropdownMenuTrigger
                    className='flex items-center gap-1'
                    aria-label='Toggle menu'>
                    <BreadcrumbEllipsis className='size-4' />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='start'>
                    {hiddenLinks.map((item, index) => (
                      <DropdownMenuItem key={index}>
                        <Link
                          to={item.href}
                          className='flex items-center gap-2'>
                          {item.label === "Home" ? (
                            <Icons.home />
                          ) : (
                            <Icons.bricks />
                          )}
                          {item.label.replace("-", " ")}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Drawer open={open} onOpenChange={setOpen}>
                  <DrawerTrigger aria-label='Toggle Menu'>
                    <BreadcrumbEllipsis className='h-4 w-4' />
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader className='text-left'>
                      <DrawerTitle>Navigate to</DrawerTitle>
                      <DrawerDescription>
                        Select a page to navigate to.
                      </DrawerDescription>
                    </DrawerHeader>
                    <div className='grid gap-1 px-4'>
                      {hiddenLinks.map((item, index) => (
                        <Link
                          key={index}
                          to={item.href}
                          className='py-1 text-sm'>
                          {item.label.replace("-", " ")}
                        </Link>
                      ))}
                    </div>
                    <DrawerFooter className='pt-4'>
                      <DrawerClose asChild>
                        <Button variant='outline'>Close</Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              )}
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <Icons.slash />
            </BreadcrumbSeparator>
            {linksToDisplay.slice(-2).map((item, index) => (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to={item.href} className='flex items-center gap-2'>
                      {item.label === "Home" ? (
                        <Icons.home />
                      ) : (
                        <Icons.bricks />
                      )}
                      {item.label.replace("-", " ")}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {index < 1 && (
                  <BreadcrumbSeparator>
                    <Icons.slash />
                  </BreadcrumbSeparator>
                )}
              </React.Fragment>
            ))}
          </>
        ) : (
          linksToDisplay.map((item, index) => (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to={item.href} className='flex items-center gap-2'>
                    {item.label === "Home" ? <Icons.home /> : <Icons.bricks />}
                    {item.label.replace("-", " ")}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <Icons.slash />
              </BreadcrumbSeparator>
            </React.Fragment>
          ))
        )}

        {lastLink && (
          <BreadcrumbItem>
            <BreadcrumbPage className='flex items-center gap-2'>
              {lastLink.label === "Home" ? <Icons.home /> : <Icons.bricks />}
              {lastLink.label.replace("-", " ")}
            </BreadcrumbPage>
          </BreadcrumbItem>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
