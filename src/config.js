/* localhost url and token, for localhost stage*/
export const localhostUrl = "http://localhost:1337/api";
/* jwt token from testAli2, id=8 */
export const jwtLocalhost = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiaWF0IjoxNjUyMzYwNDU2LCJleHAiOjE2NTQ5NTI0NTZ9.0p0kJ3Fu0Eyb19T51JRc9NuxpLPIf0jJH7lhboHu2sY";

/* heroku url and token, for state after strapi heroku deployment */
/* test herou */
// export const localhostUrl = "https://wij-chat-backend.herokuapp.com/api";
export const herokuUrl = "https://wij-chat-backend.herokuapp.com/api";
/* jwt token from postman1, id=2 */
export const jwtHeroku = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjUyNjMyNjA1LCJleHAiOjE2NTUyMjQ2MDV9.-dy29BqP-h4Eb1qBgg-zQI6c4K26O4t5uz-C7hDSOJk";

/* env set up */
export const baseUrl = herokuUrl;
export const jwt = jwtHeroku;