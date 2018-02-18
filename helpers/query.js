module.exports = () => {
  return [
    {
      $project: {
        _id: 0,
        name: 1,
        itemLimit: 1,
        weightLimit: 1,
        location: 1,
        travelDate: 1,
        arrivalDate: 1
      }
    }
  ];
};
