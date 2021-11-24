const { Matchup, Tech } = require('../models');

const resolvers = {
  Query: {
    matchups: async () => {
      const allMatchups = await Matchup.find({});

      if (!allMatchups) {
        return new Error('error');
      }

      return allMatchups;
    },
    matchup: async (_parent, { id }) => {
      const matchup = await Matchup.findOne({ _id: id });

      if (!matchup) {
        return new Error('error');
      }

      return matchup;
    },
    tech: async () => {
      const allTech = await Tech.find({});

      if (!allTech) {
        return new Error('error');
      }
      return allTech;
    },
  },
  Mutation: {
    createMatchup: async (_parent, { tech1, tech2 }) => {
      const matchup = await Matchup.create({ tech1, tech2 });

      if (!matchup) {
        return new Error('error');
      }

      return matchup;
    },
    createVote: async (_parent, { id, techNum }) => {
      const vote = await Matchup.findOneAndUpdate(
        { _id: id },
        { $inc: { [`tech${techNum}_votes`]: 1 } },
        { new: true }
      );

      if (!vote) {
        return new Error('error');
      }

      return vote;
    },
  },
};

module.exports = resolvers;
