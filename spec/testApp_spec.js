const utility = require('../app/util/utilities');

describe("Hello", function() {
	it("returns Hello World", function() {
    	expect(1).toEqual(1);
	});
});


const convert = require('../app/data/convertmx')


let mockScoreCard = {score:'10', spider:'1'}
let mockScoreCardWithEnd = [{endCounter:0,endIndex:
            [{arrow:1,score:8,spider:
            {type:Buffer,data:[0]}},
            {arrow:2,score:10,spider:
            {type:Buffer,data:[1]}},
            {arrow:3,score:5,spider:
            {type:Buffer,data:[0]}},
            {arrow:4,score:3,spider:
            {type:Buffer,data:[0]}},
            {arrow:5,score:0,spider:
            {type:Buffer,data:[0]}},
            {arrow:6,score:6,spider:
            {type:Buffer,data:[0]}}]
        }]

describe("Parse Date", function() {
	it("returns formatted date", function() {
    	expect(utility.parseDate("2017-11-12 10:00:00")).toEqual("Sunday 12th November, 2017");
	});
});


// describe("Convert the score to X for 10", function() {
// 	it("returns the score as an X if spider is 1", function() {
//     	expect(convert.convertMX(mockScoreCard)).toEqual({score: 'X', spider: '1'});
// 	});
// });

// console.log(mockScoreCardWithEnd)

// describe("Convert the score to X for 10", function() {
// 	it("returns the score object, and converts scores with a 10 to an X if spider is a 1", function() {
//     	expect(convert.convertMX(mockScoreCardWithEnd)).toEqual({score: 'X', spider: '1'});
// 	});
// });