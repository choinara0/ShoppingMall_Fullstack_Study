const continents = [
    {
        "_id": 1,
        "name": 'Africa'
    },{
        "_id": 2,
        "name": 'Asia'
    },{
        "_id": 3,
        "name": 'Australia'
    },{
        "_id": 4,
        "name": 'Antarctica'
    },{
        "_id": 5,
        "name": 'Europe'
    },{
        "_id": 6,
        "name": 'North America'
    },{
        "_id": 7,
        "name": 'South America'
    },
]
const price = [
    {
        "_id" : 0,
        "name" : "Any",
        "array" : []
    },{
        "_id" : 1,
        "name" : "$0 to $499",
        "array" : [0, 499]
    },{
        "_id" : 2,
        "name" : "$500 to $999",
        "array" : [500, 999]
    },{
        "_id" : 3,
        "name" : "$100 to $1499",
        "array" : [1000, 1499]
    },{
        "_id" : 4,
        "name" : "$1499 to $2000",
        "array" : [1499, 2000]
    },{
        "_id" : 5,
        "name" : "More than $2000",
        "array" : [2000, 999999999999999]
    },
]
export {
    continents,
    price
}