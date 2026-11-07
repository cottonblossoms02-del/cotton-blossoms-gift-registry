const json=(data,status=200)=>new Response(JSON.stringify(data),{status,headers:{"Content-Type":"application/json; charset=utf-8","Cache-Control":"no-store"}});
export async function onRequestGet({params,env}){
  if(!env.DB)return json({error:"Database binding DB is not configured."},503);
  const row=await env.DB.prepare("SELECT id,name,title,occasion,location,event_date,created_at FROM registries WHERE id=?").bind(params.id).first();
  return row?json({registry:row}):json({error:"Registry not found."},404);
}