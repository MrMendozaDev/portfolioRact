const env = process.env.NODE_ENV || 'development';
let config = {};

export const loadConfig = async (): Promise<any> => {
  try {
    const module = await import(`./${env}`);
    config = module.default;
  } catch (e) {
    console.warn(`No se encontró config para "${env}", usando "development".`);
    const fallback = await import('./development');
    config = fallback.default;
  } 
  return config
}

export function getConfig() {
  if (!config) {
    throw new Error('Config not loaded yet. Call loadConfig(env) first.');
  }
  return config;
}

// (async () => {
//   const env = process.env.NODE_ENV || 'development';
//   await loadConfig(env);
// })();

