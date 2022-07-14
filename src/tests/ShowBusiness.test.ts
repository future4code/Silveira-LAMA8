// import { ShowData } from './../data/ShowData';
// import { ShowDataMock } from './mocks/ShowDataMock';
// import { BandDataMock } from './mocks/BandDataMock';
// import { ShowBusiness } from './../business/ShowBusiness';
// import { IdGeneratorMock } from './mocks/idGeneratorMock';

// const showBusinessMock = new ShowBusiness(
//     new ShowDataMock(),
//     new BandDataMock(),
//     new IdGeneratorMock()
// )

// describe('Testing how to sign a show up', () => {
//     test("Should be a success", async () => {
        
//         try {
//             const input = {
//                 band_id: "2",
//                 week_day: "saturday",
//                 start_time: 8,
//                 end_time: 10
//             }
//             await showBusinessMock.signUp(input)
//             expect(input.band_id).toBe("2")
//         } catch(error: any) {
//             console.log(error)
//         } finally {
//             expect.assertions(1)
//         }
//     })
// })

// describe('Testing how to get shows from a certain day', () => {

// })