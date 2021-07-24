const app = require('../../app');
const request = require('supertest')(app);

describe('Home Controller', ()=>{
    
    it('GET "/" return status 200', (done)=>{
        request.get('/').end((err,res)=>{
            res.status.should.eql(200);
            done();
        })
    });

    it('GET "/sair" redirect to GET "/"',(done)=>{
        request.get('/sair')
        .end((err,res)=>{
            if(err) return done(err)
            res.headers.location.should.eql('/');
            done();
        })
    });

    it('POST "entrar" valid redirect to GET "/contatos"', (done)=>{
        const user = { name: 'teste', email:'teste@teste.com.br'}
        request
        .post('/entrar')
        .send({user})
        .end((err,res)=>{
            if(err) return done(err);
            res.headers.location.should.eql('/contatos')
            done()
        })
    });

    it('POST "entrar" invalid redirect to GET "/contatos"', (done)=>{
        const user = { name: '', email:''}
        request
        .post('/entrar')
        .send({user})
        .end((err,res)=>{
            if(err) return done(err);
            res.headers.location.should.eql('/')
            done()
        })
    })

})