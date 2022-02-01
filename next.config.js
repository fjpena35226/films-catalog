module.exports = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    API_URL: process.env.API_URL || 'https://swapi.dev/api/films/?format=json',
  },
}
