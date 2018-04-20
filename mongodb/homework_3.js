// node homework_3.js
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';

const dbName = 'movies';
const collName = 'movies';

//Part A: Update unrated comedies 
function updateUnratedCom(db, ref){
    const collection = db.collection(collName);

    const notRatedType = {
        "genres" : "Comedies",
        "rated" : "NOT RATED"
    };

    const notRatedUpdate = { $set: { rated : "Pending rating" } };

    collection.updateMany(notRatedType, notRatedUpdate, function(err, result) {
        assert.equal(err, null);
        console.log("Updated rating field for " + result.modifiedCount + " documents.");
        ref();
    });
}

//Part B: Create Friends Object
const friendsObj = {
    title : "Friends",
    year : 1994,
    countries : ["USA"],
    genres: [ "Comedy", "Romance"],
    directors: ["David Crane", "Marta Kauffman"],
    imdb : {
        id : 4236751,
        rating : 8.9,
        votes : 587678
    }
};

//Part B: Insert Friends 
function insertFriends(db, ref){

    const collection = db.collection(collName);

    collection.insertOne(friendsObj, function(err, result){
        assert.equal(err, null);
        console.log("Insertion of " + result.result.n + " Friends Object.");
        ref();
    });
}

//Part C: Find total number of movies in Comedies
function countComedies(db, ref){
    const collection = db.collection(collName);

    const pipeline = [ {
        $match: {
            genres: "Comedies"
        }},
        {
            $group: {
                _id: "Comedies",
                count: {
                    $sum: 1
                }
            }
        }];

    collection.aggregate(pipeline, function(err, cursor){
        cursor.toArray(function(error, myArray){
           assert.equal(error, null);
           myArray.forEach(function(element){
               console.log(element);
           });

           ref();
        });
    });
}

//Part D: Count Albanian Movies
function countAlbMovies(db, ref){
    const collection = db.collection(collName);

    const pipeline = [ {
        $match: {
            countries: "Albania",
            rated : "Pending rating"
        }},
        {
            $group: {
                _id: {
                    country: "Albania",
                    rating : "Pending rating"
                },
                count: {
                    $sum: 1
                }
            }
        }];

    collection.aggregate(pipeline, function(err, cursor){
        cursor.toArray(function(error, myArray){
            assert.equal(error, null);
            myArray.forEach(function(element){
                console.log(element);
            });

            ref();
        });
    });
}

//Function for closing connection
function closeConn(client){
    console.log("Closing connection with server...");
    client.close();
}

MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    //Part A Execution
    updateUnratedCom(db, function(){

        // Part B Execution
            insertFriends(db, function(){

                // Part C Execution
                countComedies(db, function(){

		    // Part D Execution 		
                    countAlbMovies(db, function(){
                                 
                            
                    	});    
                    });
                });
            });
    });
});
