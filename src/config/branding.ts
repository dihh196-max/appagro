import type { ImageSourcePropType } from 'react-native';

/**
 * Foto de fundo da tela de login.
 *
 * Para usar uma FOTO REAL do agro:
 *   1) Coloque o arquivo na pasta `assets/` (ex.: assets/login-bg.jpg)
 *   2) Troque a linha abaixo por:
 *        export const loginBackground: ImageSourcePropType | null =
 *          require('../../assets/login-bg.jpg');
 *
 * Enquanto for `null`, o login usa o fundo vetorial (entardecer no campo).
 */
export const loginBackground: ImageSourcePropType | null = null;
