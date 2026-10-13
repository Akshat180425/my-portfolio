import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {basePath} from '../src/config/site.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../dist');
if (!fs.existsSync(path.join(root, 'index.html'))) {
 console.error('No built website found. Run npm run build, or use npm start.');
 process.exit(1);
}
const port=Number(process.env.PORT||4173);
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.woff2':'font/woff2','.ttf':'font/ttf','.xml':'application/xml','.txt':'text/plain','.pdf':'application/pdf'};
const server=http.createServer((req,res)=>{
 let pathname;try{pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);}catch{res.writeHead(400);res.end();return;}
 if(basePath){
  if(pathname===basePath){res.writeHead(302,{Location:basePath+'/'});res.end();return;}
  if(!pathname.startsWith(basePath+'/')){res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'});res.end('Not found');return;}
  pathname=pathname.slice(basePath.length);
 }
 let file=path.resolve(root,'.'+pathname);
 if(!file.startsWith(root+path.sep)&&file!==root){res.writeHead(403);res.end();return;}
 try{if(fs.statSync(file).isDirectory())file=path.join(file,'index.html');}catch{}
 let code=200;
 if(!fs.existsSync(file)){file=path.join(root,'404.html');code=404;}
 res.writeHead(code,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-cache'});
 if(req.method==='HEAD'){res.end();return;}fs.createReadStream(file).pipe(res);
});
server.on('error', error => {
 console.error(error.code === 'EADDRINUSE' ? `Port ${port} is already in use. Stop the other preview or set PORT to another number.` : error.message);
 process.exit(1);
});
server.listen(port,'127.0.0.1',()=>console.log(`Local: http://localhost:${port}${basePath}/\nPress Ctrl+C to stop.`));
