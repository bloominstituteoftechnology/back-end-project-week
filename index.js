const​ ​express​ = ​require​(​'express'​);
const​ ​db​ = ​require​(​'./data/db.js'​);
const​ ​server​ = ​express​();

server​.​use​(​express​.​json​());
///endpoints go here
const​ ​port​ = 8000;

server​.​listen​(​port​, ​function​() {
​console​.​log​(​`​\n​=== Web API Listening on http://localhost:​${​port​}===​\n​`​);
});
