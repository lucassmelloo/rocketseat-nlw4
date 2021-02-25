import request from 'supertest';
import {app} from '../app';
import createConnection from '../database';



describe ("Surveys", async() =>{
    beforeAll(async()=>{
        const connection = await createConnection();
        await connection.runMigrations();
    })
    it("Should be able to create a new Survey",  async()=>{
        const response = await request(app).post("/surveys").send({
        title: "Titulo teste",
        description: "Exemplo de descricao"
        }); 
    expect(response.status).toBe(201); 
    expect(response.body).toHaveProperty("id");     
    });

    it("Should be able to get all surveys", async () => {
         await request(app).post("/surveys").send({
            title: "Title Example2",
            description: "Exemplo de descricao 2",
        });
        const response = await request(app).get("/surveys");
        expect(response.body.length).toBe(2);
    })
});