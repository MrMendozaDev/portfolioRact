// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  safelist: [
    // === Background colors ===
    {
      pattern: /bg-(red|green|blue|yellow|purple|pink|gray|stone|emerald|teal|cyan|sky|indigo|violet|orange)-(100|200|300|400|500|600|700|800|900)/,
    },

    // === Text colors ===
    {
      pattern: /(sm|md|lg|xl|2xl):text-(red|green|blue|yellow|purple|pink|gray|stone|emerald|teal|cyan|sky|indigo|violet|orange)-(100|200|300|400|500|600|700|800|900)/,
    },

    // === Font sizes ===
    {
      pattern: /(sm|md|lg|xl|2xl):text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)/,
    },

    // === Padding & Margin ===
    {
      pattern: /(p|pt|pr|pb|pl|px|py|m|mt|mr|mb|ml|mx|my)-(0|1|2|3|4|5|6|8|10|12|16|20|24|32|40|48|56|64)/,
    },

    // === Flex & Grid ===
    'flex',
    'inline-flex',
    'items-center',
    'justify-center',
    'justify-between',
    'gap-2',
    'gap-4',
    'grid',
    'grid-cols-1',
    'grid-cols-2',
    'grid-cols-3',
    'grid-cols-4',

    // === Width & Height ===
    {
      pattern: /(sm|md|lg|xl|2xl):(w|h)-(1|2|4|6|8|10|16|20|24|32|40|48|56|64|full|screen|lvh|svh)/,
    },

    // === Borders & Radius ===
    {
      pattern: /border(-(2|4|8))?/,
    },
    {
      pattern: /rounded(-(none|sm|md|lg|xl|2xl|3xl|full))?/,
    },

    // === Shadows ===
    {
      pattern: /shadow(-(sm|md|lg|xl|2xl|inner|outline|none))?/,
    },

    // === Position & Z-Index ===
    'relative',
    'absolute',
    'fixed',
    'sticky',
    {
      pattern: /z-(0|10|20|30|40|50)/,
    },

    // === Display & Visibility ===
    'hidden',
    'block',
    'inline-block',
    'inline',
    'flex',
    'grid',
    'contents',
    'list-item',
    'visible',
    'invisible',

    // === States (hover, focus) ===
    {
      pattern: /hover:(bg|text|border)-(red|green|blue|gray|yellow|purple)-(500|600|700)/,
    },
    {
      pattern: /focus:(ring|border)-(red|green|blue|gray|yellow|purple)-(500|600|700)/,
    },

    // === Transitions ===
    'transition',
    'duration-150',
    'duration-300',
    'ease-in',
    'ease-out',
    'ease-in-out',

    // === Overflow ===
    'overflow-hidden',
    'overflow-scroll',
    'overflow-auto',

    // === Text alignment & transform ===
    'text-left',
    'text-center',
    'text-right',
    'uppercase',
    'lowercase',
    'capitalize',

    // === Opacity ===
    {
      pattern: /opacity-(0|25|50|75|100)/,
    },
     // === Justify ===
    {
      pattern: /(sm|md|lg|xl|2xl)?:justify-(start|end|center|between|around|evenly)/,
    }
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
