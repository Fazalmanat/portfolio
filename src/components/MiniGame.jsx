import React, { useState, useEffect, useRef } from 'react';

export default function MiniGame() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('fazal_game_highscore') || '0', 10);
  });
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationId;
    let playerX = canvas.width / 2;
    const playerWidth = 44;
    const playerHeight = 12;
    const playerY = canvas.height - 24;

    let items = [];
    let spawnTimer = 0;
    let currentScore = score;
    let currentLives = lives;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      playerX = (e.clientX - rect.left) * scaleX;
      playerX = Math.max(playerWidth / 2, Math.min(canvas.width - playerWidth / 2, playerX));
    };

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a') {
        playerX = Math.max(playerWidth / 2, playerX - 24);
      } else if (e.key === 'ArrowRight' || e.key === 'd') {
        playerX = Math.min(canvas.width - playerWidth / 2, playerX + 24);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    canvas.addEventListener('mousemove', handleMouseMove);

    const gameLoop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw grid lines in canvas background
      ctx.strokeStyle = 'rgba(232, 163, 61, 0.05)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Spawn falling items
      spawnTimer++;
      if (spawnTimer % 45 === 0) {
        const isBug = Math.random() < 0.35;
        items.push({
          x: Math.random() * (canvas.width - 30) + 15,
          y: -10,
          speed: 2.2 + Math.random() * 1.8,
          isBug,
          size: isBug ? 11 : 9,
          color: isBug ? '#FF5555' : Math.random() > 0.3 ? '#5FA8A0' : '#E8A33D'
        });
      }

      // Update and draw items
      for (let i = items.length - 1; i >= 0; i--) {
        const item = items[i];
        item.y += item.speed;

        // Draw item
        ctx.fillStyle = item.color;
        ctx.beginPath();
        if (item.isBug) {
          // Draw bug icon / diamond
          ctx.rect(item.x - 5, item.y - 5, 10, 10);
        } else {
          // Draw energy node circle with glow
          ctx.arc(item.x, item.y, item.size / 2, 0, Math.PI * 2);
        }
        ctx.fill();

        // Check collision with player paddle
        if (
          item.y + item.size / 2 >= playerY &&
          item.y - item.size / 2 <= playerY + playerHeight &&
          item.x >= playerX - playerWidth / 2 &&
          item.x <= playerX + playerWidth / 2
        ) {
          if (item.isBug) {
            currentLives--;
            setLives(currentLives);
            if (currentLives <= 0) {
              setGameOver(true);
              setIsPlaying(false);
              return;
            }
          } else {
            currentScore += item.color === '#E8A33D' ? 25 : 10;
            setScore(currentScore);
            if (currentScore > highScore) {
              setHighScore(currentScore);
              localStorage.setItem('fazal_game_highscore', String(currentScore));
            }
          }
          items.splice(i, 1);
          continue;
        }

        // Remove off-screen
        if (item.y > canvas.height + 20) {
          items.splice(i, 1);
        }
      }

      // Draw Player Paddle
      ctx.fillStyle = '#E8A33D';
      ctx.shadowColor = 'rgba(232, 163, 61, 0.5)';
      ctx.shadowBlur = 12;
      ctx.fillRect(playerX - playerWidth / 2, playerY, playerWidth, playerHeight);

      // Reset shadow
      ctx.shadowBlur = 0;

      // Draw Player Center Beam
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(playerX - 2, playerY - 3, 4, 3);

      animationId = requestAnimationFrame(gameLoop);
    };

    animationId = requestAnimationFrame(gameLoop);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('keydown', handleKeyDown);
      if (canvas) canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isPlaying, gameOver, highScore, lives, score]);

  const startGame = () => {
    setScore(0);
    setLives(3);
    setGameOver(false);
    setIsPlaying(true);
  };

  return (
    <section 
      id="arcade" 
      className="minigame-section"
      data-achievement-icon="🕹️"
      data-achievement-title="Arcade Explorer"
      data-achievement-body="Discovered the interactive terminal lab."
    >
      <div className="wrap">
        <div className="eyebrow">
          <span className="num mono">MINI-GAME</span>
          <span className="rule"></span>
          <span className="label">Debug Catcher // Arcade Lab</span>
        </div>

        <div className="sheet minigame-box">
          <div className="minigame-header">
            <div>
              <h3 style={{ margin: 0, fontSize: '20px', fontFamily: 'Fraunces, serif' }}>
                Cyber Catcher <em>v1.0</em>
              </h3>
              <p className="mono" style={{ margin: '4px 0 0', fontSize: '12px', color: 'var(--paper-dim)' }}>
                Move mouse or A/D keys to catch Energy Nodes (●) and dodge Corrupted Bugs (■).
              </p>
            </div>

            <div className="minigame-stats mono">
              <span className="game-stat">XP: <strong style={{ color: 'var(--amber)' }}>{score}</strong></span>
              <span className="game-stat">BEST: <strong>{highScore}</strong></span>
              <span className="game-stat">LIVES: <strong style={{ color: lives <= 1 ? '#FF5555' : 'var(--teal)' }}>{'❤️'.repeat(Math.max(0, lives))}</strong></span>
            </div>
          </div>

          <div className="canvas-wrapper">
            <canvas 
              ref={canvasRef} 
              width={600} 
              height={260} 
              className="game-canvas"
            />

            {!isPlaying && (
              <div className="game-overlay">
                {gameOver ? (
                  <div className="game-overlay-content">
                    <div className="mono" style={{ color: '#FF5555', fontSize: '18px', fontWeight: 600 }}>SYSTEM OVERCHARGE</div>
                    <div className="mono" style={{ fontSize: '14px', margin: '8px 0 16px', color: 'var(--paper-dim)' }}>Final Score: {score} XP</div>
                    <button className="btn btn-primary" onClick={startGame}>
                      ↺ Play Again
                    </button>
                  </div>
                ) : (
                  <div className="game-overlay-content">
                    <div className="mono" style={{ color: 'var(--amber)', fontSize: '16px', marginBottom: '8px' }}>[ INTERACTIVE MODULE ]</div>
                    <p style={{ margin: '0 0 16px', fontSize: '14px', color: 'var(--paper-dim)', maxWidth: '38ch' }}>
                      Test your reflexes in this lightweight interactive simulation built right into the browser.
                    </p>
                    <button className="btn btn-primary" onClick={startGame}>
                      ▶ Start Drill
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
