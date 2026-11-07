const createForm=document.querySelector("#create-form");
const createMessage=document.querySelector("#create-message");
const results=document.querySelector("#registry-results");
const searchForm=document.querySelector("#search-form");
const escapeHtml=(value)=>String(value??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
async function loadRegistries(term=""){
  results.innerHTML='<p class="empty">Looking for registries…</p>';
  try{
    const response=await fetch("/api/registries?q="+encodeURIComponent(term));
    if(!response.ok) throw new Error("Registry service is not configured yet.");
    const data=await response.json();
    renderResults(data.registries||[]);
  }catch(error){
    results.innerHTML='<p class="empty">Registry search will be available after the free database is connected.</p>';
  }
}
function renderResults(items){
  if(!items.length){results.innerHTML='<p class="empty">No registries found. Try another name or title.</p>';return;}
  results.innerHTML=items.map(item=>'<article class="result-card"><h3>'+escapeHtml(item.title)+'</h3><p>Created by '+escapeHtml(item.name)+'</p><p>'+escapeHtml(item.occasion)+' · Pickup: '+escapeHtml(item.location)+(item.event_date?' · '+escapeHtml(item.event_date):'')+'</p><p><a href="/registry.html?id='+encodeURIComponent(item.id)+'">View registry</a></p></article>').join("");
}
createForm.addEventListener("submit",async event=>{
  event.preventDefault();
  const data=new FormData(createForm);
  const payload={name:String(data.get("name")).trim(),title:String(data.get("title")).trim(),occasion:String(data.get("occasion")),location:String(data.get("location")),event_date:String(data.get("date")||""),purchase_options:["online","in_store"]};
  const button=createForm.querySelector('button[type="submit"]');button.disabled=true;button.textContent="Creating…";
  try{
    const response=await fetch("/api/registries",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});
    const body=await response.json();
    if(!response.ok) throw new Error(body.error||"Could not create registry.");
    createForm.reset();
    createMessage.textContent="Your registry has been created! Save this share link: "+location.origin+"/registry.html?id="+body.registry.id;
    await loadRegistries();
  }catch(error){createMessage.textContent=error.message.includes("Failed to fetch")?"The shared registry database is not connected yet. Please try again after setup.":error.message;}
  finally{button.disabled=false;button.textContent="Create registry";}
});
searchForm.addEventListener("submit",event=>{event.preventDefault();const term=new FormData(searchForm).get("term").toString().trim();loadRegistries(term);});
loadRegistries();