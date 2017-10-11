
const TournamentController = require('../app/controllers/tournament');

describe("tournament controller", function() {

    let tournamentController;

	it("has a showTournamentArcherScore method", () => {
        const tournamentController = getController();
        expect(typeof tournamentController.showTournamentArcherScore).toEqual("function");
	});


    it("renders no-info.html when there is no archer info", (done) => {

        const renderer = getMockRenderer();

        // assert on render
        spyOn(renderer, 'render').and.callFake((res, template, config) => {
            expect(template).toBe('no-info.html');
            done();
        });

        // arrange
        const tournamentController = getController([], [], renderer);
        const req = getReqMock();

        //act
        tournamentController.showTournamentArcherScore(req, {});
    });



    // UTILS
    // Some of the more generic of these could be extracted into a test helpers library

    function getController(archerScore, arrowTotal, renderer){
        const logger = getLoggerMock();
        const tournamentData = getDataMock(archerScore, arrowTotal);
        return TournamentController(logger, renderer, tournamentData);
    }

    function getReqMock(){
        return {
            params: {
                tid: 1,
                aid: 5
            }
        };
    }

    function getLoggerMock(){
        return { log: ()=>{} };
    }

    function getDataMock(archerScore, arrowTotal){

        let tournamentData = {
            getTournamentArcherScore: () => {}
        };

        spyOn(tournamentData, 'getTournamentArcherScore').and.callFake((tid, aid, cb) => {
            cb(archerScore, arrowTotal);
        });

        return tournamentData;
    }

    function getMockRenderer(){
        return {
            render: ()=>{}
        };
    }

});
