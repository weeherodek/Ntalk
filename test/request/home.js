const app = require('../../app');
const should = require('should');
const supertest = require('supertest');
const request = supertest(app);


describe('Controller home', ()=>{
    
    it('GET "/" return status 200', (done)=>{
        request.get('/')
        .expect(200,done);
    });
    
    it('GET "/sair" redirect to GET "/"', (done)=>{
        request.get('/sair')
        .end((err,res)=>{
            res.headers.location.should.eql('/');
            done()
        })
    });
    
    // it('POST "/entrar" valid redirect to GET "/contatos"', async (done)=>{
    //     const user = {name:"testName",email:"teste@teste"};
    //     await request.post('/entrar')
    //     .send({user})
    //     .serverAddress(app,'/contatos').should.containEql('/contatos',done)
        
    // });

    // it('POST "/entrar" invalid redirect to GET "/"', (done)=>{

    // })
});
