/* localhost url and token, for localhost stage*/
export const localhostUrl = "http://localhost:1337/api";
/* jwt token from testAli2, id=8 */
export const jwtLocalhost = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiaWF0IjoxNjUyMzYwNDU2LCJleHAiOjE2NTQ5NTI0NTZ9.0p0kJ3Fu0Eyb19T51JRc9NuxpLPIf0jJH7lhboHu2sY";

/* heroku url and token, for state after strapi heroku deployment */
/* test herou */
// export const localhostUrl = "https://wij-chat-backend.herokuapp.com/api";
export const herokuUrl = "https://wij-chat-backend.herokuapp.com/api";
/* jwt token from test1, id=13 */
export const jwtHeroku = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlhdCI6MTY1Mjc4NDEwMiwiZXhwIjoxNjU1Mzc2MTAyfQ.bknYviXgMFS_Wilvn6GRELQmRrOC7BxTZYw5U4MnkOI";
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlhdCI6MTY1Mjc4NDEwMiwiZXhwIjoxNjU1Mzc2MTAyfQ.bknYviXgMFS_Wilvn6GRELQmRrOC7BxTZYw5U4MnkOI"
/* env set up */
export const baseUrl = herokuUrl;
export const jwt = jwtHeroku;