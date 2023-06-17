const prisma = require("../../prisma");
const { createStreaming } = require("../helpers/streamingSources");
const { FormateData } = require("../utils");
const { APIError } = require("../utils/app-error");

//Create a new match

const CreateMatch = async (matchInfo) => {
  const { matchData } = matchInfo;
  try {
    //Calling Streaming
    const finalStreamingData = createStreaming(matchData);

    //Create Match
    const createdMatch = await prisma.Match.create({
      data: { 
        matchTime: matchData?.matchTime,
        matchTitle: matchData?.matchTitle,
        teamOneName: matchData?.teamOneName,
        teamOneImage: matchData?.teamOneImage,
        teamTwoName: matchData?.teamTwoName,
        teamTwoImage: matchData?.teamTwoImage,
        matchStatus: matchData?.matchStatus,
        streamingSources: {
          createMany: {
            data: finalStreamingData,
          },
        },
      },
    });
    return FormateData(createdMatch);
  } catch (error) {
    console.error(error);
    throw new APIError("Match has not been created!", error);
  }
};

//Get all matches

const GetAllMatch = async () => {
  try {
    const matches = await prisma.Match.findMany();
    return FormateData(matches);
  } catch (error) {
    console.error(error);
    throw new APIError("No matches found!", error);
  }
};

//Get a single match
const GetSingleMatch = async (id) => {
  try {
    const match = await prisma.Match.findUnique({
      where: {
        id: id,
      },
      include: {
        streamingSources: true
      }
    });
    return FormateData(match);
  } catch (error) {
    console.error(error);
    throw new APIError("Failed to find!", error);
  }
};

const UpdateMatch = async (updatedMatchInfo) => {
  const { updatedMatchData, id } = updatedMatchInfo;

  try {

    const updatedMatch = await prisma.Match.update({
      where: { id: id }, // Provide the match ID you want to update
      data: {
        matchTime: updatedMatchData.matchTime,
        matchTitle: updatedMatchData.matchTitle,
        teamOneName: updatedMatchData.teamOneName,
        teamOneImage: updatedMatchData.teamOneImage,
        teamTwoName: updatedMatchData.teamTwoName,
        teamTwoImage: updatedMatchData.teamTwoImage,
        matchStatus: updatedMatchData.matchStatus,
        streamingSources: {
          updateMany: updatedMatchData.streamingSources.map(
            (matchStreamingData) => ({
              where: {
                id: matchStreamingData.id,
              },

              data: {
                streamTitle: matchStreamingData?.streamTitle,
                streamType: matchStreamingData?.streamType,
                resulation: matchStreamingData?.resulation,
                platform: matchStreamingData?.platform,
                isPremium: matchStreamingData?.isPremium,
                portraitWatermark: matchStreamingData?.portraitWatermark,
                landscapeWatermark: matchStreamingData?.landscapeWatermark,
                streamUrl: matchStreamingData?.streamUrl,
                streamKey: matchStreamingData?.streamKey,
                headers: matchStreamingData?.headers
              },
            })
          ),
        },
      },
    });

    return FormateData(updatedMatch);

  } catch (error) {
    console.error(error);
    throw new APIError("Failed to update match!", error);
  }
};

//Delete a match
const DeleteMatch = async (id) => {
  try {
    const match = await prisma.Match.delete({
      where: {
        id: id,
      },
    });
    return FormateData(match);
  } catch (error) {
    console.error(error);
    throw new APIError("Failed to delete!", error);
  }
};

module.exports = {
  CreateMatch,
  GetAllMatch,
  GetSingleMatch,
  DeleteMatch,
  UpdateMatch,
};
