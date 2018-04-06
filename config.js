const mysecret = process.env.SECRET || `Livin' like a rockstar, smash out on a cop car`;
const dburl = 'mongodb://terriebk:tjsaldi@ds121225.mlab.com:21225/kawaii-notes';
module.exports = {
  mysecret,
  dburl
};