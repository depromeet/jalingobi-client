async function initMocks() {
  if (typeof window === 'undefined') {
    console.log('🎸server msw ');
    const { server } = await import('./server');
    server.listen();
  } else {
    const { worker } = await import('./browser');
    worker.start();
  }
}

initMocks();

export {};
