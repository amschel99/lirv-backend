import supertest from 'supertest'
import {app} from "../src/index"
import { setupDB } from "quick-mongo-seed"
import { fileURLToPath } from 'url'
import { dirname } from 'path';
import {generateAccessToken} from "./generateMockToken"
import { ObjectId } from 'bson'
import {postJobQuery, applyJobQuery} from "./data"




const __dirname = dirname(fileURLToPath(import.meta.url));

const request =supertest(app)

const dummyUser=new ObjectId("658cdd86577f15920dd6ebcc")

setupDB("", true,"mongodb+srv://amschel:i2SgpeVqFSpPGljD@cluster0.z5dsdnf.mongodb.net",__dirname+"/seed")


describe("test the signup endpoint",  ()=>{

  
it("auth works fine", async ()=>{
const signupResponse= await request.post("/api/auth/emailSignup").send(
  {
    email:"1234@mail.com",
    password:"password",
   
    
  }
)
const loginResponse= await request.post("/api/auth/emailLogin").send(
    {
      email:"kariukiamschel9@gmail.com",
      password:"@iamLehcsma9",
     
      
    }
  )
 
 

const postJobResponse = await request
.post('/graphql')
.set('authorization', `Bearer ${generateAccessToken(dummyUser)}`)
.send({
  query: postJobQuery,
}).expect(200);




if (postJobResponse.body.errors) {
console.error('GraphQL Errors:', postJobResponse.body.errors);
}


const ApplyJobResponse = await request
  .post('/graphql')
  .set('authorization', `Bearer ${generateAccessToken(dummyUser)}`)
  .send({
    query: applyJobQuery,
    variables: {
      jobId: "658bdd85577f14920dd6cbcc",
      coverLetter: "Hi, I'm really interested"
    }
  })
  .expect(200);
console.log(ApplyJobResponse.body)

//Assertions
expect(postJobResponse.body.data.postJob.title).toBe("Your Job Title")
expect(ApplyJobResponse.body.data.apply.coverLetter).toBe("Hi, I'm really interested")

  expect(loginResponse.status).toBe(200)
  
expect(signupResponse.status).toBe(201)


})

})
  