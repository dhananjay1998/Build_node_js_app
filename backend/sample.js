const {Pool,Client} = require('pg');
const { request, response } = require('express');
const cs = 'postgressql://postgres:djay123@localhost:5432/djay';

const client = new Client({
    cs:cs,
})
client.connect();


const getusers = (request, response) => {
    client.query('SELECT * FROM users', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
    
  }
  const getevents = (request, response) => {
    client.query('SELECT * FROM events', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

const getuserbyid = (request, response) => {
    const id = parseInt(request.params.id)
    
    client.query(`SELECT * FROM users WHERE id = ${id}`, (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows[0])
    })
  }
  const getcities = (request, response) => {
    client.query('SELECT * FROM  cities', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows);
    })
  }

const getcitiesbyid = (request, response) => {
    const id = parseInt(request.params.id)
  
    client.query('SELECT * FROM cities WHERE id = ' + id, (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows[0])
    })
  }

  const getinterest = (request, response) => {
    client.query('SELECT * FROM interests', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

const getinterestbyid = (request, response) => {
    const id = parseInt(request.params.id)
  
    client.query('SELECT * FROM interests WHERE id = ' + id, (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows[0])
    })
  }
  

  const createevent = (request, response) => {
    const {id,cityid,category ,eventname ,eventtype ,startdate,enddate ,hostname ,fee,ishappening} = request.body.data;
    
  const sqlquery = `INSERT INTO events (id,cityid,category,eventname,eventtype,startdate,enddate,hostname,fee,ishappening) VALUES(${id},${cityid},${category},'${eventname}','${eventtype}','${startdate}','${enddate}','${hostname}',${fee},${ishappening}) `;
    client.query( sqlquery,(error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${id}`)
    })
  }
  // const createuserinterest = (request, response) => {
  //   const {userid,type,subtype} = request.body.data;
  // const sqlquery = `INSERT INTO userinterest (userid,interestid) VALUES (${userid},select id from interests where type = ${type} and subtype = ${subtype})`;
  //   client.query( sqlquery,(error, results) => {
  //     if (error) {
  //       throw error
  //     }
  //     response.status(201).send(`Userinterest added`);
  //   })
  // }
  const createuserinterest = (request, response) => {
    const {userid,type,subtype} = request.body;
    //console.log(userid);
    //console.log(type);
     const subquery = `select * from interests where type = ${type} and subtype = ${subtype}`;
     client.query(subquery,(err,results)=>{
       if(err)throw err
       const interstid = results.rows[0].id;
       const sqlquery = `INSERT INTO userinterest (userid,interestid) VALUES (${userid},${interstid})`;
       client.query( sqlquery,(error, results) => {
         if (error) {
           throw error
         }
         response.status(200).send(`Userinterest added`);
       })
     })
  }
  
  

  const cityinterest = (request, response) => {

  const sql1 ="select * from events where cityid = (SELECT id from cities where cityname = '"+request.query.cityname+"') and category = (SELECT id from interests where type = '"+request.query.interest+"')"
  //console.log("1234"+request.query.cityname + "   " + request.query.interest);
  //console.log(sql1);
  client.query(sql1, (err, results) => {
      if(err) {
          response.send("error: ",err);
      };
      //console.log(results.rows);
      response.send(results.rows);
  });
}






const getregister = (request, response) => {
  //console.log('i am zero');
  const sqlq = 'select * from events where id IN ( select eventid from userevent where userid = 1)';
 client.query(sqlq, (error, results) => {
   if (error) {
     throw error
   }
   response.status(200).json(results.rows)
 })
 
}


const registerevent = (request, response) => {
    console.log('hello');
   
      const sql1 = "insert into userevent (userid, eventid) values(1 , "+request.query.eids+")"
      console.log(sql1);
      client.query(sql1, (err, results) => {
          if(err) {
              response.send("error: ",err);
          };
          response.send(JSON.stringify({"status": 200, "error": null, "response": results}));
      });

}


    



  

module.exports = {getusers, getuserbyid,getcities,getcitiesbyid,getinterest,getinterestbyid,createevent,createuserinterest,getevents,cityinterest,getregister,registerevent};