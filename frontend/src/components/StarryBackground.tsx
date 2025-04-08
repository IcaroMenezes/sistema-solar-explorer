
import React, { useEffect, useState } from 'react';
import { cn } from "@/lib/utils";

type Star = {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
};

const generateStars = (count: number): Star[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    delay: Math.random() * 3,
  }));
};

interface StarryBackgroundProps {
  className?: string;
  starCount?: number;
}

const StarryBackground: React.FC<StarryBackgroundProps> = ({
  className,
  starCount = 100,
}) => {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    setStars(generateStars(starCount));
  }, [starCount]);

  return (
    <div className={cn("fixed inset-0 z-[-1] overflow-hidden", className)}>
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default StarryBackground;
