module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    purge: false,
    theme: {
      extend: {
        fontFamily: {
          primaryfont: ['ubuntu', 'sans-serif'],
        },
        colors:{
            primarycolor:'#fffff9'
        },
        fontSize: {
            'body-lg': [
              '1rem',
              {
                lineHeight: '1.25',
                fontWeight: '400',
                letterSpacing: '0',
              },
            ],
            'body-md': [
              '0.875rem',
              {
                lineHeight: '1.28',
                fontWeight: '400',
                letterSpacing: '0',
              },
            ],
            'body-sm': [
              '0.75rem',
              {
                lineHeight: '1.33',
                fontWeight: '400',
                letterSpacing: '0',
              },
            ],
            button: [
              '0.875rem',
              {
                lineHeight: '1.28',
                fontWeight: '700',
                letterSpacing: '0',
              },
            ],
          },
      },
    },
    plugins: [],
    prefix: 'naxatw-',
  };