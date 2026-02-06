import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

export default function ValentineWebsite() {
  const canvasRef = useRef(null);
  const audioRef = useRef(null);

  const [accepted, setAccepted] = useState(false);
  const [noPosition, setNoPosition] = useState({
    top: "65%",
    left: "55%",
    position: "absolute",
  });

   useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let hearts = [];
    let animationId;

    const heartCount = 100;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createHearts();
    };

    const createHearts = () => {
      hearts = Array.from({ length: heartCount }).map(() => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 18 + 8,
        speed: Math.random() * 0.7 + 0.3,
      }));
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

      ctx.fillStyle = "rgba(255,105,180,0.85)";
      ctx.fill();
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      hearts.forEach((heart) => {
        heart.y -= heart.speed;

        if (heart.y < -20) {
          heart.y = canvas.height + 20;
          heart.x = Math.random() * canvas.width;
        }

        drawHeart(heart.x, heart.y, heart.size);
      });

      animationId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    window.addEventListener("resize", resizeCanvas);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

 
  const moveNoButton = () => {
    const randomX = Math.random() * (window.innerWidth - 120);
    const randomY = Math.random() * (window.innerHeight - 60);

    setNoPosition({
      position: "fixed",
      left: randomX + "px",
      top: randomY + "px",
    });
  };

 
  const handleYesClick = () => {
    confetti({
      particleCount: 250,
      spread: 140,
      origin: { y: 0.6 },
    });

   
    audioRef.current?.play();

    setAccepted(true);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden flex items-center justify-center bg-gradient-to-br from-pink-200 via-rose-100 to-pink-300">

     
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 pointer-events-none"
      />

     
      <audio ref={audioRef} loop>
        <source src="/love.mp3" type="audio/mp3" />
      </audio>

      {!accepted ? (
        <motion.div
          initial={{ scale: 0.4, opacity: 0, y: 120 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.9, type: "spring" }}
          className="relative z-10 
          bg-white/90 backdrop-blur-xl 
          rounded-3xl shadow-2xl 
          p-6 sm:p-10
          w-[90%] max-w-md
          text-center"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-pink-600 mb-4">
            Will you be my Valentine? ❤️
          </h1>

          <p className="text-gray-600 mb-8">
            Warning: Clicking YES may cause extreme happiness 😌
          </p>

          <div className="flex justify-center gap-6 relative h-24">
            
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              onClick={handleYesClick}
              className="px-6 py-3 bg-pink-500 hover:bg-pink-600 
              text-white font-semibold rounded-2xl shadow-lg 
              transition"
            >
              Yes 💘
            </motion.button>

          
            <button
              onMouseEnter={moveNoButton}
              style={noPosition}
              className="px-6 py-3 bg-gray-200 text-gray-700 
              font-semibold rounded-2xl shadow"
            >
              No 🙈
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.8 }}
          className="relative z-10 
          bg-white/90 backdrop-blur-xl 
          p-8 rounded-3xl shadow-xl 
          max-w-lg text-center"
        >
          <h2 className="text-4xl font-bold text-pink-600 mb-4">
            YAY!!! ❤️
          </h2>

          <p className="text-gray-700 text-lg">
            From the moment I met you, life became brighter.
            This is just the beginning of our story ✨
          </p>
        </motion.div>
      )}
    </div>
  );
}
