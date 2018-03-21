const deployed = (req, res) => {
  if(process.env.SECRET) {
    res.json({success: true})
  } else {
    res.status(500).json({error: 'Error not deployed'})
  }
};

module.exports = {
  deployed
};