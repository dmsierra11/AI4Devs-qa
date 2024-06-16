import request from 'supertest';
import app from '../../index';

describe('POST /candidates', () => {
    it('should responde with 400 if email already exists', async () => {
        const candidateData = { "firstName": "Dani", "lastName": "Sierra", "email": "test.dani@email.com", "phone": "", "address": "", "educations": [], "workExperiences": [], "cv": null };
        const res = await request(app).post('/candidates').send(candidateData);
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toBe('The email already exists in the database');
    });

    it('should return 400 for bad input data', async () => {
        const candidateData = {}; // Empty data should fail
        const res = await request(app).post('/candidates').send(candidateData);
        expect(res.status).toBe(400);
    });
});

describe('PUT /candidates/:id', () => {
    it('should update candidate stage and return 200 status', async () => {
        const updateData = { applicationId: 4, currentInterviewStep: 3 };
        const responseData = {
            "id": 4,
            "positionId": 1,
            "candidateId": 3,
            "applicationDate": "2024-06-14T11:21:01.251Z",
            "currentInterviewStep": 3,
            "notes": null,
            "interviews": []
        }
        const candidateId = 3;
        const res = await request(app).put(`/candidates/${candidateId}`).send(updateData);
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('message');
        expect(res.body).toHaveProperty('data');
        expect(res.body.data).toEqual(responseData);
    });

    it('should return 404 for non-existing candidate', async () => {
        const updateData = { applicationId: 4, currentInterviewStep: 3 };
        const candidateId = 9999; // Non-existing ID
        const res = await request(app).put(`/candidates/${candidateId}`).send(updateData);
        expect(res.status).toBe(404);
    });
});

describe('GET /candidates/:id', () => {
    it('should retrieve candidate data and return 200 status', async () => {
        const candidateId = 1;
        const res = await request(app).get(`/candidates/${candidateId}`);
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('id', candidateId);
    });

    it('should return 404 for non-existing candidate', async () => {
        const candidateId = 9999;
        const res = await request(app).get(`/candidates/${candidateId}`);
        expect(res.status).toBe(404);
    });
});
