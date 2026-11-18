// Read-only HTML metadata and service-menu collector. Used from an isolated browser research session.
// Arguments: start, end (exclusive) indexes in first-occurrence unique URLs from COMPETITORS-ALL-30.csv.
return (async () => {
  const raw = 'https://raw.githubusercontent.com/pkbannutz/bogdan-pascal-portfolio/main/seo-audit/COMPETITORS-ALL-30.csv';
  const csv = await (await fetch(raw)).text();
  function parse(line) {
    let cells=[], cur='', inQ=false;
    for (let i=0;i<line.length;i++) {
      const c=line[i];
      if(c==='"') { if(inQ&&line[i+1]==='"'){cur+='"';i++}else inQ=!inQ; }
      else if(c===','&&!inQ){cells.push(cur);cur='';}
      else cur+=c;
    }
    cells.push(cur); return cells;
  }
  const rows=csv.split(/\r?\n/).slice(1).filter(Boolean).map(parse).filter(a=>a.length>=8)
    .map(a=>({id:a[0],category:a[1],rank:Number(a[5]),title:a[6],url:a[7]}));
  const seen=new Set();
  const unique=rows.filter(x=>{if(seen.has(x.url))return false;seen.add(x.url);return true;});
  const batch=unique.slice(start,end);
  function decode(s){return s.replace(/&(?:amp|quot|apos|nbsp|lt|gt|#39|#x27);/gi,m=>({'&amp;':'&','&quot;':'"','&apos;':"'",'&nbsp;':' ','&lt;':'<','&gt;':'>','&#39;':"'",'&#x27;':"'"}[m.toLowerCase()]||' '));}
  const hint=/parkour|free.?run|acrobat|gymnast|stunt|choreograph|movement|athlet|aerial|cinema|camera|film|director|gimbal|ronin|drone|fpv|videograph|video|production|edit|post.?prod|colou?r|sound|sfx|audio|foley|vfx|visual effects?|motion graphics|photograph|photo|livestream|streaming|animation|virtual|commercial|adverts?|casting|talent|training|creat(?:iv|ion)|events?|marketing|reels|retouch|soundtrack|script|storyboard/i;
  async function scan(item) {
    const obj={...item,host:(item.url.match(/^https?:\/\/([^\/?#]+)/)||[])[1]||'',status:0,final:'',pageTitle:'',meta:'',h1:[],h2:[],serviceLinks:[],navLinks:[],error:null};
    const controller=new AbortController(); const timer=setTimeout(()=>controller.abort(),11000);
    try {
      const r=await fetch(item.url,{signal:controller.signal,redirect:'follow'});obj.status=r.status;obj.final=r.url;
      const h=(await r.text()).slice(0,1800000);obj.htmlLength=h.length;
      obj.pageTitle=decode((h.match(/<title[^>]*>([\s\S]*?)<\/title>/i)||[])[1]||'').replace(/\s+/g,' ').slice(0,170);
      obj.meta=decode((h.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)/i)||[])[1]||'').replace(/\s+/g,' ').slice(0,280);
      const plain=s=>decode(s.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,' ').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,' ').replace(/<[^>]*>/g,' ')).replace(/\s+/g,' ').trim();
      obj.h1=[...h.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].slice(0,6).map(m=>plain(m[1]).slice(0,160));
      obj.h2=[...h.matchAll(/<h2\b[^>]*>([\s\S]*?)<\/h2>/gi)].slice(0,20).map(m=>plain(m[1]).slice(0,130));
      const links=[...h.matchAll(/<a\b[^>]*href\s*=\s*["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)].slice(0,1100)
        .map(m=>({href:decode(m[1]).slice(0,230),label:plain(m[2]).slice(0,120)}))
        .filter(x=>x.label.length>1&&x.label.length<=110&&!/^(home|contact|about|login|sign in|menu|search|portfolio|view more|read more|all projects)$/i.test(x.label));
      obj.navLinks=links.filter(x=>/services?|expertise|what-we-do|we-do|disciplines|solutions|hire|production|capabilit|work-with-us|team|talent|features/i.test(x.href)).slice(0,42);
      obj.serviceLinks=links.filter(x=>hint.test(x.label)&&!/jobs?|news|blogs?|article|post|insights/i.test(x.href)).slice(0,70);
    } catch(e){obj.error=String(e).slice(0,145)}
    finally {clearTimeout(timer)}
    return obj;
  }
  const results=Array(batch.length);let pointer=0;
  await Promise.all(Array.from({length:12},async()=>{while(pointer<batch.length){let i=pointer++;results[i]=await scan(batch[i]);}}));
  return {start,end,total:unique.length,results};
})();