import { ShooterGame } from './game.js';

document.addEventListener('DOMContentLoaded', (): void => {
  // Elementos do DOM
  const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
  const startBtn = document.getElementById('startBtn') as HTMLButtonElement;
  const pauseBtn = document.getElementById('pauseBtn') as HTMLButtonElement;
  const restartBtn = document.getElementById('restartBtn') as HTMLButtonElement;
  const fullscreenBtn = document.getElementById('fullscreenBtn') as HTMLButtonElement;
  const closeWelcomeBtn = document.getElementById('closeWelcome') as HTMLButtonElement;
  const welcomeMessage = document.getElementById('welcomeMessage') as HTMLDivElement;
  const gameMessages = document.getElementById('gameMessages') as HTMLDivElement;
  
  // Inicializar o jogo
  const game = new ShooterGame(canvas);
  
  // Configurar botões de arma
  document.querySelectorAll('.weapon-btn').forEach(btn => {
    btn.addEventListener('click', (e: Event) => {
      const target = e.currentTarget as HTMLButtonElement;
      const weapon = target.getAttribute('data-weapon') as 'basic' | 'spread' | 'laser';
      
      // Remover classe active de todos os botões
      document.querySelectorAll('.weapon-btn').forEach(b => {
        b.classList.remove('active');
      });
      
      // Adicionar classe active ao botão clicado
      target.classList.add('active');
      
      // Mudar arma no jogo
      game.setWeapon(weapon);
    });
  });
  
  // Configurar botão de iniciar
  startBtn.addEventListener('click', (): void => {
    game.start();
    welcomeMessage.classList.add('hidden');
    setTimeout(() => {
      gameMessages.classList.add('hidden');
    }, 300);
  });
  
  // Configurar botão de pausar/continuar
  pauseBtn.addEventListener('click', (): void => {
    game.togglePause();
  });
  
  // Configurar botão de reiniciar
  restartBtn.addEventListener('click', (): void => {
    game.restart();
    welcomeMessage.classList.add('hidden');
    setTimeout(() => {
      gameMessages.classList.add('hidden');
    }, 300);
  });
  
  // Configurar botão de tela cheia
  fullscreenBtn.addEventListener('click', (): void => {
    game.toggleFullscreen();
  });
  
  // Configurar botão de fechar mensagem de boas-vindas
  closeWelcomeBtn.addEventListener('click', (): void => {
    welcomeMessage.classList.add('hidden');
    setTimeout(() => {
      gameMessages.classList.add('hidden');
    }, 300);
  });
  
  // Configurar tecla P para pausar
  document.addEventListener('keydown', (e: KeyboardEvent): void => {
    if (e.key === 'p' || e.key === 'P') {
      game.togglePause();
    }
    
    // Tecla ESC para sair da tela cheia
    if (e.key === 'Escape') {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
    }
  });
  
  // Configurar tela cheia ao dar double click no canvas
  canvas.addEventListener('dblclick', (): void => {
    game.toggleFullscreen();
  });
  
  // Carregar recorde salvo
  const highScore = localStorage.getItem('shooterHighScore') || '0';
  const highScoreElement = document.getElementById('highScore');
  if (highScoreElement) {
    highScoreElement.textContent = highScore;
  }
  
  // Mostrar mensagem de boas-vindas inicialmente
  welcomeMessage.classList.remove('hidden');
  gameMessages.classList.remove('hidden');
  
  // Configurar redimensionamento da janela
  window.addEventListener('resize', (): void => {
    // Ajustar tamanho do canvas se necessário
    const container = canvas.parentElement;
    if (container) {
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight - 100; // Considerar controles
      
      // Manter proporção 4:3
      const targetWidth = Math.min(containerWidth, containerHeight * (4/3));
      const targetHeight = targetWidth * (3/4);
      
      canvas.style.width = `${targetWidth}px`;
      canvas.style.height = `${targetHeight}px`;
    }
  });
  
  // Disparar evento de redimensionamento inicial
  window.dispatchEvent(new Event('resize'));
  
  console.log('Jogo Space Shooter inicializado!');
  console.log('Controles: WASD/Setas para mover, ESPAÇO para atirar, P para pausar');
});