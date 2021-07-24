const app = require('../../app');
const request = require('supertest')(app);

describe('Controller contacts', ()=>{
    
    describe('User connected', ()=>{
        const  user  = {name: 'teste', email: 'teste@teste.com.br'};
        const contact = user;
        let cookie = null;

        beforeEach((done)=>{
            request.post('/entrar')
            .send({user})
            .end((err,res)=>{
                if(err) return done(err);
                cookie = res.headers['set-cookie'];
                done();
            })
        })


        it('GET "/contatos" return status 200', (done)=>{
            const req = request.get('/contatos');
            req.cookies = cookie;
            req.end((err,res)=>{
                if(err) return done(err);
                res.status.should.eql(200);
                done();
            })
        });

        it('POST "/contato" redirect to GET "/contatos"',(done)=>{
            const req = request.post('/contato');
            req.cookies = cookie;
            req.send({contact})
            .end((err,res)=>{
                if(err) return done(res)
                res.headers.location.should.eql('/contatos')
                done();
            })
        })
        //END OF DESCRIBE USER CONNECTED
    });

    describe('User not connected',()=>{
        
        it('GET "/contatos" redirect to GET "/"',(done)=>{
            request.get('/contatos')
            .end((err,res)=>{
                if(err) return done(err);
                res.headers.location.should.eql('/');
                done();
            })
        });

        it('GET "/contato/1" redirect to GET "/"', (done)=>{
            request.get('/contato/1')
            .end((err,res)=>{
                if(err) return done(err);
                res.headers.location.should.eql('/');
                done()
            })
        });

        it('GET "/contato/1/editar" redirect to GET "/"', (done)=>{
            request.get('/contato/1/editar')
            .end((err,res)=>{
                if(err) return done(err);
                res.headers.location.should.eql('/');
                done();
            })
        });

        it('POST "/contato" redirect to GET "/"', (done)=>{
            request.post('/contato')
            .end((err,res)=>{
                if(err) return done(err);
                res.headers.location.should.eql('/')
                done();
            })
        });

        it('DELETE "/contato/1" redirect to GET "/"', (done)=>{
            request.delete('/contato/1')
            .end((err,res)=>{
                if(err) return done(err);
                res.headers.location.should.eql('/');
                done()
            })
        });

        it('PUT "/contato/1" redirect to GET "/"', (done)=>{
            request.put('/contato/1')
            .end((err,res)=>{
                if(err) return done(err);
                res.headers.location.should.eql('/');
                done();
            })
        });

        //END OF DESCRIBE USER NOT CONNECTED
    });

});
