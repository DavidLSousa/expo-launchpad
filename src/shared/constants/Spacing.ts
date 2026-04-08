export const Spacing = {
  /** 2 */
  s2: 2,
  /** 4 */
  s4: 4,
  /** 8 */
  s8: 8,
  /** 12 */
  s12: 12,
  /** 16 — padding/margem mais comum */
  s16: 16,
  /** 24 — seções principais */
  s24: 24,
  /** 32 */
  s32: 32,
  /** 48 — bottom padding de página */
  s48: 48,
  /** 64 */
  s64: 64,
  /** 80 */
  s80: 80,
  /** 100 */
  s100: 100,

  /** Daqui para baixo n precisa mexer */

  /** 160 */
  footer: 160,

  /** 1200 - maxWidth */
  maxWidth: 1200,

  absoluteBottomTabBarIOS: {
    position: 'absolute',
    bottom: 85,
    left: 0,
    right: 0,
  },
  absoluteBottomTabBarAndroid: {
    position: 'absolute',
    bottom: 95,
    left: 0,
    right: 0,
  },
} as const;
