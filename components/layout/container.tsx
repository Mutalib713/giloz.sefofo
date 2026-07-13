import { cn } from "@/lib/cn";
import type { ElementType, ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  size?: "default" | "wide" | "narrow";
}

const sizes = {
  narrow: "max-w-3xl",
  default: "max-w-[1200px]",
  wide: "max-w-[1400px]",
};

export function Container({ children, className, as: Tag = "div", size = "default" }: ContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full px-5 sm:px-8", sizes[size], className)}>{children}</Tag>
  );
}
