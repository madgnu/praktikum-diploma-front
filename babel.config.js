const presets = [
  [
    '@babel/env',
    {
      targets: {
        edge: '17',
        firefox: '50',
        chrome: '64',
        safari: '11.1',
      },
      useBuiltIns: 'usage',
      corejs: '3.7.0',
    },
  ],
];

const plugins = [
  '@babel/plugin-proposal-class-properties',
]

module.exports = { presets, plugins };
