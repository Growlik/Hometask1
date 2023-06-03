import request from 'supertest'
import {app} from "../src";

describe('/hometask', () => {
    beforeAll(async () => {
        await request(app).delete('/testing')
    })

    it('should return 204', async () => {
        await request(app)
            .delete('/testing')
            .expect(204)
    })

    it('should return 200 and videos array', async () => {
        await request(app)
            .get('/videos')
            .expect(200)
    })

    it('should create videos array', async () => {
        await request(app)
            .post('/videos')
            .expect(201)
    })

    it('should return video by id', async () => {
        await request(app)
            .get('/videos/:id')
            .expect(200)
    })
})