import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function ValentineWebsite() {
  const canvasRef = useRef(null);
  const [noPosition, setNoPosition] = useState({ top: "60%", left: "55%" });
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let hearts = [];
    const heartCount = 80;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const createHearts = () => {
      hearts = [];
      for (let i = 0; i < heartCount; i++) {
        hearts.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 20 + 10,
          speed: Math.random() * 0.5 + 0.2,
        });
      }
    };

    const drawHeart = (x, y, size) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(size / 20, size / 20);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(0, -3, -5, -3, -5, 0);
      ctx.bezierCurveTo(-5, 3, 0, 5, 0, 7);
      ctx.bezierCurveTo(0, 5, 5, 3, 5, 0);
      ctx.bezierCurveTo(5, -3, 0, -3, 0, 0);
      ctx.fillStyle = "rgba(255,105,180,0.8)";
      ctx.fill();
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      hearts.forEach((heart) => {
        heart.y -= heart.speed;
        if (heart.y < -10) heart.y = canvas.height + 10;
        drawHeart(heart.x, heart.y, heart.size);
      });

      requestAnimationFrame(animate);
    };

    createHearts();
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createHearts();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const moveNoButton = () => {
    const randomTop = Math.random() * 70 + 10;
    const randomLeft = Math.random() * 70 + 10;
    setNoPosition({ top: `${randomTop}%`, left: `${randomLeft}%` });
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-gradient-to-br from-pink-100 to-rose-200 flex items-center justify-center">
      <canvas ref={canvasRef} className="absolute inset-0" />

      {!accepted ? (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-10 text-center max-w-md"
        >
          <h1 className="text-3xl font-bold text-pink-600 mb-4">
            Will you be my Valentine? ❤️
          </h1>

          <p className="text-gray-600 mb-8">
            Warning: Clicking "Yes" may cause extreme happiness 😌
          </p>

          <div className="flex justify-center gap-6 relative h-24">
            <button
              onClick={() => setAccepted(true)}
              className="px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-2xl shadow-lg transition"
            >
              Yes 💘
            </button>

            <button
              onMouseEnter={moveNoButton}
              style={{ position: "absolute", ...noPosition }}
              className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-2xl shadow transition"
            >
              No 🙈
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1.2, opacity: 1 }}
          className="text-center z-10"
        >
          <h1 className="text-5xl font-extrabold text-pink-600 drop-shadow-lg">
            YAY!!! ❤️❤️❤️
          </h1>
          <p className="text-xl mt-4 text-gray-700">
            Best decision ever 😌✨
          </p>
        </motion.div>
      )}
    </div>
  );
}
