const json=(data,status=200)=>new Response(JSON.stringify(data),{status,headers:{"Content-Type":"application/json; charset=utf-8","Cache-Control":"no-store"}});
export async function onRequestGet({request,env}){
  if(!env.DB) return json({error:"Database binding DB is not configured."},503);
  const q=new URL(request.url).searchParams.get("q")?.trim().slice(0,80)||"";
  const stmt=q
    ? env.DB.prepare("SELECT id,name,title,occasion,location,event_date,created_at FROM registries WHERE name LIKE ? OR title LIKE ? ORDER BY created_at DESC LIMIT 50").bind("%"+q+"%","%"+q+"%")
    : env.DB.prepare("SELECT id,name,title,occasion,location,event_date,created_at FROM registries ORDER BY created_at DESC LIMIT 50");
  const {results=[]}=await stmt.all();
  return json({registries:results});
}
export async function onRequestPost({request,env}){
  if(!env.DB) return json({error:"Database binding DB is not configured."},503);
  let body;try{body=await request.json();}catch{return json({error:"Please submit valid form details."},400);}
  const name=String(body.name||"").trim().slice(0,100);
  const title=String(body.title||"").trim().slice(0,120);
  const occasion=String(body.occasion||"Other").trim().slice(0,40);
  const location=String(body.location||"").trim();
  const eventDate=String(body.event_date||"").trim();
  if(!name||!title||!["Albany","Blakely","Either location"].includes(location)) return json({error:"Name, title and a valid pickup location are required."},400);
  if(eventDate&&!/^\d{4}-\d{2}-\d{2}$/.test(eventDate)) return json({error:"Please enter a valid event date."},400);
  const id=crypto.randomUUID();
  await env.DB.prepare("INSERT INTO registries (id,name,title,occasion,location,event_date,purchase_options) VALUES (?,?,?,?,?,?,?)")
    .bind(id,name,title,occasion,location,eventDate||null,'["online","in_store"]').run();
  return json({registry:{id,name,title,occasion,location,event_date:eventDate||null}},201);
}