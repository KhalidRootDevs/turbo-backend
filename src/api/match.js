const { reset } = require("nodemon");
const { CreateMatch, GetAllMatch, DeleteMatch, UpdateMatch, GetSingleMatch } = require("../services/match-service");
const { userAuth, userAuthorization } = require("./middleware/userAuth");


module.exports = (app) => {

    //Create a new match
    app.post('/match', userAuth, userAuthorization, async (req, res, next) => {
        const matchData = req.body;

        const data = await CreateMatch({ matchData })

        res.json({
            message: "Match created successfully",
            data: data,
        })
    })

    //Get all matches
    app.get('/match', userAuth, userAuthorization, async(req, res, next) => {

        const data = await GetAllMatch();

        res.json({
            message: "All matches fetched successfully",
            data: data,
        })

    })

    //Get a single match
    app.get('/match/:matchId', userAuth, userAuthorization, async (req, res) => {

        const id = req.params.matchId;

        const data = await GetSingleMatch(id);

        res.json({
            message: 'Fetched a single match successfully',
            data: data
        })

    })

    //Delete a match
    app.delete('/match/:matchId', userAuth, userAuthorization, async (req, res) => {

        const id = req.params.matchId;

        const data = await DeleteMatch(id);

        res.json({
            message: 'Match deleted successfully',
            data: data
        })

    })

    //Update a match
    app.put('/match/:matchId', userAuth, userAuthorization, async(req, res) => {
        const id = req.params.matchId;
        

        const updatedMatchData = req.body;

        const data =  await UpdateMatch({
            updatedMatchData,
            id
        });

        res.json({
            message: "Match updated successfully",
            data: data
        })
    })
}