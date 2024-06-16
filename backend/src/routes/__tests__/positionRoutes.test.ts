import request from 'supertest';
import { server } from '../../index';

describe('GET /positions/:id/candidates', () => {

    afterEach(() => {
        server.close();
    });

    it('should return a list of candidates for a valid position ID', async () => {
        const res = await request(server).get('/positions/1/candidates');
        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
    });

    it('should return a 404 error for an invalid position ID', async () => {
        const res = await request(server).get('/positions/9999/candidates');
        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body.length).toBe(0);
    });
});

describe('GET /positions/:id/interviewflow', () => {
    it('should return the interview flow for a valid position ID', async () => {
        const res = await request(server).get('/positions/1/interviewflow');
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('interviewFlow');
    });

    it('should return a 404 error for an invalid position ID', async () => {
        const res = await request(server).get('/positions/9999/interviewflow');
        console.log(res.body);
        expect(res.status).toBe(404);
    });
});
