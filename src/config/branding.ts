import type { ImageSourcePropType } from 'react-native';

/**
 * Foto de fundo da tela de login.
 *
 * Atualmente usa a arte enviada para o repositório (branch `main`) via URL
 * pública do GitHub — funciona sem precisar reenviar o arquivo.
 *
 * Para usar uma foto LOCAL (offline, recomendado em produção):
 *   1) Coloque o arquivo em `assets/` (ex.: assets/login-bg.png)
 *   2) Troque por: require('../../assets/login-bg.png')
 *
 * Para voltar ao fundo vetorial (entardecer desenhado), use `null`.
 */
export const loginBackground: ImageSourcePropType | null = {
  uri: 'https://raw.githubusercontent.com/dihh196-max/appagro/main/Story%20do%20instagram%20agroneg%C3%B3cio%20e%20tecnologia%20verde%20e%20moderno.png',
};
