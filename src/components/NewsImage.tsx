"use client";
import { useState } from "react";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import clsx from "clsx";

type Props = {
  src: string;
  accent: string;
  Icon: LucideIcon;
  iconSize?: number;
  className?: string;
  alt?: string;
  priority?: boolean;
};

export function NewsImage({
  src,
  accent,
  Icon,
  iconSize = 28,
  className,
  alt = "",
  priority,
}: Props) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={clsx("relative overflow-hidden bg-card", className)}
      style={{
        backgroundImage: `linear-gradient(135deg, ${accent}88, ${accent}22)`,
      }}
    >
      {!failed && (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 420px"
          className="object-cover"
          priority={priority}
          unoptimized
          onError={() => setFailed(true)}
        />
      )}
      {failed && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon size={iconSize} className="text-white/85" />
        </div>
      )}
    </div>
  );
}
