module.exports = () => {
  return [
    {
      $project: {
        _id: 0,
        location: 1
      }
    }
  ];
};
