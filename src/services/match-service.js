const prisma = require("../../prisma");
const { createStreaming } = require("../helpers/streamingSources");
const { FormateData, APIError } = require("../utils");

const createMatch = async (matchData) => {
  try {
    const finalStreamingData = createStreaming(matchData);

    const createdMatch = await prisma.match.create({
      data: {
        ...matchData,
        streamingSources: {
          createMany: {
            data: finalStreamingData,
          },
        },
      },
    });

    return FormateData(createdMatch);
  } catch (error) {
    throw error;
  }
};

const getAllMatches = async () => {
  try {
    const matches = await prisma.match.findMany();
    return FormateData(matches);
  } catch (error) {
    throw error;
  }
};

const getSingleMatch = async (id) => {
  try {
    const match = await prisma.match.findUnique({
      where: {
        id,
      },
      include: {
        streamingSources: true,
      },
    });

    return FormateData(match);
  } catch (error) {
    throw error;
  }
};

const updateMatch = async (updatedMatchData, id) => {
  try {
    const updatedMatch = await prisma.match.update({
      where: { id },
      data: {
        ...updatedMatchData,
        streamingSources: {
          updateMany: updatedMatchData.streamingSources.map(
            (matchStreamingData) => ({
              where: {
                id: matchStreamingData.id,
              },
              data: matchStreamingData,
            })
          ),
        },
      },
    });

    return FormateData(updatedMatch);
  } catch (error) {
    throw error;
  }
};

const deleteMatch = async (id) => {
  try {
    const match = await prisma.match.delete({
      where: {
        id,
      },
    });

    return FormateData(match);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createMatch,
  getAllMatches,
  getSingleMatch,
  deleteMatch,
  updateMatch,
};
