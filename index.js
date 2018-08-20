const​​ express​ = ​require​(​'express'​);
const ​​db​ = ​require​(​'./data/db.js'​);
const​​ server​ = ​express​();
server​.​use​(​express​.​json​()); 












const ​​port​ = ​3300​;
server​.​listen​(​port​, ​function​() {​console​.​log​(​`​\n​=== Web API Listening on http://localhost:​${​port​}===​\n​`​);});