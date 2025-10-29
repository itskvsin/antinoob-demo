"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export default function HeroSequence() {
  // ✅ Explicit ref types
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameCount = 201;

  const [currentFrame, setCurrentFrame] = useState<number>(0);
  const [imagesLoaded, setImagesLoaded] = useState<number>(0);

  const requestRef = useRef<number | null>(null);
  const targetFrameRef = useRef<number>(0);
  const currentFrameRef = useRef<number>(0);

  // ✅ Add type for parameter
  const files = (index: number): string => {
    return `/BG/BG_${String(index).padStart(5, "0")}.png`;
  };

  // ✅ Explicit parameter types
  const scaleImage = useCallback((img: HTMLImageElement, ctx: CanvasRenderingContext2D) => {
    const canvas = ctx.canvas;
    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    const ratio = Math.max(hRatio, vRatio);
    const centerShiftX = (canvas.width - img.width * ratio) / 2;
    const centerShiftY = (canvas.height - img.height * ratio) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShiftX,
      centerShiftY,
      img.width * ratio,
      img.height * ratio
    );
  }, []);

  // ✅ Add frameIndex type
  const render = useCallback(
    (frameIndex: number) => {
      const images = imagesRef.current;
      const context = contextRef.current;
      const canvas = canvasRef.current;

      if (!images.length || !context || !canvas) return;

      const img = images[frameIndex];
      if (!img || !img.complete) return;

      scaleImage(img, context);
    },
    [scaleImage]
  );

  // ✅ Smooth frame interpolation using lerp
  const animate = useCallback(() => {
    const ease = 0.1;
    const current = currentFrameRef.current;
    const target = targetFrameRef.current;

    const newFrame = current + (target - current) * ease;

    if (Math.abs(newFrame - current) > 0.01) {
      currentFrameRef.current = newFrame;
      const frameIndex = Math.round(newFrame);
      setCurrentFrame(frameIndex);
      render(frameIndex);
    }

    requestRef.current = requestAnimationFrame(animate);
  }, [render]);

  const handleScroll = useCallback(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollFraction = Math.min(1, Math.max(0, scrollTop / maxScroll));

    const frameIndex = Math.min(frameCount - 1, scrollFraction * (frameCount - 1));

    targetFrameRef.current = frameIndex;
  }, [frameCount]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [animate]);

  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loaded = 0;

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.onload = () => {
        loaded++;
        setImagesLoaded(loaded);
        if (loaded === 1) render(0);
      };
      img.onerror = () => {
        loaded++;
        setImagesLoaded(loaded);
      };
      img.src = files(i);
      images.push(img);
    }
    imagesRef.current = images;

    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        contextRef.current = context;
      }
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        render(Math.round(currentFrameRef.current));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [frameCount, render, handleScroll]);

  return (
    <>
      {/* Fixed Canvas */}
      <div className="fixed top-0 left-0 w-full h-screen z-0">
        <canvas ref={canvasRef} className="w-full h-full bg-black"></canvas>
      </div>

      {/* Loading Indicator */}
      {imagesLoaded < frameCount && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <div className="bg-black/80 backdrop-blur-sm px-8 py-6 rounded-2xl border border-white/10">
            <div className="text-white text-2xl font-bold mb-3 text-center">Loading</div>
            <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ease-out"
                style={{ width: `${(imagesLoaded / frameCount) * 100}%` }}
              ></div>
            </div>
            <div className="text-white/60 text-sm mt-2 text-center">
              {Math.round((imagesLoaded / frameCount) * 100)}%
            </div>
          </div>
        </div>
      )}

      {/* Spacer for scrolling */}
      <div style={{ height: `${frameCount * 50}px` }} className="relative z-10"></div>
    </>
  );
}
