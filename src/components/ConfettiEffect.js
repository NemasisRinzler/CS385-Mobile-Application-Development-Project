import confetti from "canvas-confetti";

export const burstConfetti = (particleCount = 60) => {
  confetti({
    particleCount,
    spread: 70,
    origin: { y: 0.6 },
    scalar: 1.1,
  });
};
