const request = require('supertest');
const {Genre} = require('../../models/genre');
let server;

describe('/api/genres', () => {

  beforeEach(() => { server = require('../../server/index'); })
  afterEach( async () => { server.close(); });

  describe('GET /', () => {
    it('should return all genres', async () => {
      const res = await request(server).get('/api/genres');
      expect(res.status).toBe(200);
    });
  });
});
