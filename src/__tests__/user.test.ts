import request from 'supertest';
import { app } from '../app';
import { connect, disconnect } from '../database/connection';



describe('user', () => {

    beforeAll(() => {
        connect(process.env.URI_TEST as string);
    })
    
    afterAll(() => {
        disconnect();
    })


    it('Should be able to get all users', async (done) => {
        const res = await request(app).post('/').send({ 
            email: "use233213r@example.com", 
            username: "exampleuser", 
            password: "exampletsete", 
            phone_number: "1230923123" 
        })
            

        expect(res.status).toBe(201)
    })
})