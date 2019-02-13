const request = require('supertest');
const server = require('./server.js');



describe('/notes', () => {
    it('responds with 200', async () => {
        const response = await request(server).get('/notes');

        expect(response.status).toBe(200)
    })

    it('responds with json', async () => {
        const response = await request(server).get('/');

        expect(response.type).toMatch(/json/i)
    })

    it('sends the correct response object', async () => {
        const response = await request(server).get('/');

        expect(typeof response.body).toBe('object');
    })
})
describe('post to /notes', () => {
    it('responds with 201 when body is correct', async () => {
        const body = {
            title: 'test note',
            textBody: 'Put it this way, it took me twenty five years to get these plants, twenty five years of blood sweat and tears, and I’m never giving up, I’m just getting started. Wraith talk. To succeed you must believe. When you believe, you will succeed. I’m up to something. I’m giving you cloth talk, cloth. Special cloth alert, cut from a special cloth. To succeed you must believe.',
        }
        const response = await request(server).post('/').send(body);

        expect(response.status).toBe(201)
    })

    it('responds with 422 when body is missing data', async () => {
        const body = {}
        const response = await request(server).post('/').send(body);

        expect(response.status).toBe(422)
    })
    it('responds with id of created post', async () => {
        const body = {
            title: 'test note 2',
            textBody: 'dffasfdfadsfdfd fasfdsfdsfasf fdsafasdf.',
        }
        const response = await request(server).post('/').send(body);

        expect(response.body).toEqual([5]);

    })
})
describe('retrieve single note', () => {
    it('responds with single note', async () => {
        const response = await request(server).get('/5');
        expect(typeof response.body).toBe('object');


    })

    it('responds with 404 when note cant be found', async () => {
        const response = await request(server).get('/11');
        expect(response.status).toBe(404)
    })
})
describe('delete to /notes', () => {
    it('responds with amount of items deleted', async () => {
        const response = await request(server).del('/5');
        expect(response.body).toBe(1);

    })

    it('responds with 404 when note cant be deleted', async () => {
        const response = await request(server).del('/11');
        expect(response.status).toBe(404)
    })
})