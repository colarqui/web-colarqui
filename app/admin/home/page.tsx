"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Plus, Trash2, ChevronDown, ChevronUp, ImagePlus, Star, ArrowRight } from "lucide-react";

const ICONS = ["BookOpen","Heart","Users","Award","Sparkles","MapPin","GraduationCap","School","Clock","DollarSign","Shield","ShoppingBag","HelpCircle","Calendar"];
const COLORS = [{v:"bg-brand-gold",l:"Dorado"},{v:"bg-brand-coral",l:"Coral"},{v:"bg-blue-500",l:"Azul"},{v:"bg-green-500",l:"Verde"},{v:"bg-purple-500",l:"Púrpura"}];

export default function HomeEditorPage() {
  const router = useRouter();
  const [cfg, setCfg] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [open, setOpen] = useState<Record<string,boolean>>({hero:true});

  useEffect(()=>{fetchCfg();},[]);

  async function fetchCfg(){
    try{
      const r=await fetch("/api/admin/home-config",{credentials:"include"});
      if(!r.ok){if(r.status===401)router.push("/admin/login");return;}
      const d=await r.json();
      setCfg({
        heroSlides:JSON.parse(d.heroSlides||"[]"),
        stats:JSON.parse(d.stats||"[]"),
        whyChoose:JSON.parse(d.whyChoose||"[]"),
        alliances:JSON.parse(d.alliances||"[]"),
        testimonials:JSON.parse(d.testimonials||"[]"),
        faq:JSON.parse(d.faq||"[]"),
        ctaTitle:d.ctaTitle||"¿Listo para dar el primer paso?",
        ctaCopy:d.ctaCopy||"Únete a nuestra comunidad de más de 29,000 estudiantes.",
        ctaPrimary:d.ctaPrimary||"/admisiones",
        ctaPrimaryLabel:d.ctaPrimaryLabel||"Ver proceso de admisión",
        ctaSecondary:d.ctaSecondary||"https://runachay.com",
        ctaSecondaryLabel:d.ctaSecondaryLabel||"Inscribir en Runachay",
      });
    }catch{}
    setLoading(false);
  }

  async function handleSave(){
    setSaving(true);
    const r=await fetch("/api/admin/home-config",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(cfg),credentials:"include"});
    if(r.ok){setSaved(true);setTimeout(()=>setSaved(false),2000);}
    setSaving(false);
  }

  function upd(key:string,i:number,field:string,val:any){
    setCfg((p:any)=>{const a=[...p[key]];a[i]={...a[i],[field]:val};return{...p,[key]:a};});
  }
  function add(key:string,t:any){setCfg((p:any)=>({...p,[key]:[...p[key],t]}));}
  function del(key:string,i:number){setCfg((p:any)=>({...p,[key]:p[key].filter((_:any,idx:number)=>idx!==i)}));}
  function mv(key:string,i:number,dir:"up"|"down"){
    setCfg((p:any)=>{const a=[...p[key]];const s=dir==="up"?i-1:i+1;if(s<0||s>=a.length)return p;[a[i],a[s]]=[a[s],a[i]];return{...p,[key]:a};});
  }

  if(loading)return<div className="text-center py-12 text-gray-400">Cargando...</div>;
  if(!cfg)return<div className="text-center py-12 text-red-500">Error cargando configuración</div>;

  const Section=({k,title,icon,children}:{k:string;title:string;icon:React.ReactNode;children:React.ReactNode})=>{
    const isOpen=open[k]||false;
    return<div className="mb-4">
      <button onClick={()=>setOpen(p=>({...p,[k]:!isOpen}))} className="w-full flex items-center justify-between bg-white border border-gray-200 rounded-xl px-5 py-4 hover:shadow-sm">
        <div className="flex items-center gap-3 font-semibold text-brand-dark"><div className="text-brand-gold">{icon}</div>{title}</div>
        {isOpen?<ChevronUp className="h-5 w-5 text-gray-400"/>:<ChevronDown className="h-5 w-5 text-gray-400"/>}
      </button>
      {isOpen&&<div className="mt-3 space-y-3">{children}</div>}
    </div>;
  };

  const Card=({children}:{children:React.ReactNode})=><div className="bg-white rounded-xl border border-gray-200 p-5">{children}</div>;
  const Inp=(p:any)=><input {...p} className={`w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold focus:border-transparent text-sm ${p.className||""}`}/>;
  const Sel=(p:any)=><select {...p} className={`w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold focus:border-transparent text-sm ${p.className||""}`}>{p.children}</select>;
  const Txt=(p:any)=><textarea {...p} className={`w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold focus:border-transparent text-sm ${p.className||""}`}/>;
  const Ctrl=({k,i}:{k:string;i:number})=><div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
    <button onClick={()=>mv(k,i,"up")} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600"><ChevronUp className="h-4 w-4"/></button>
    <button onClick={()=>mv(k,i,"down")} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600"><ChevronDown className="h-4 w-4"/></button>
    <button onClick={()=>del(k,i)} className="p-1.5 hover:bg-red-50 rounded-lg text-red-500 ml-auto"><Trash2 className="h-4 w-4"/></button>
  </div>;
  const Add=({onClick,label}:{onClick:()=>void;label:string})=><button onClick={onClick} className="inline-flex items-center gap-2 text-sm text-brand-dark font-medium hover:text-brand-coral transition-colors"><Plus className="h-4 w-4"/>{label}</button>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="text-2xl font-bold text-brand-dark">Editor del Home</h1><p className="text-gray-500 text-sm mt-1">Personaliza las secciones de inicio</p></div>
        <button onClick={handleSave} disabled={saving} className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold transition-colors ${saved?"bg-green-600 text-white":"bg-brand-gold text-brand-dark hover:bg-brand-gold/90"} disabled:opacity-50`}>
          <Save className="h-4 w-4"/>{saved?"¡Guardado!":saving?"Guardando...":"Guardar cambios"}
        </button>
      </div>

      <Section k="hero" title="Hero Slider" icon={<ImagePlus className="h-5 w-5"/>}>
        {cfg.heroSlides.map((s:any,i:number)=>(
          <Card key={i}>
            <div className="grid md:grid-cols-2 gap-3">
              <Inp placeholder="URL imagen" value={s.imageUrl||""} onChange={(e:any)=>upd("heroSlides",i,"imageUrl",e.target.value)}/>
              <Inp placeholder="Badge" value={s.badge||""} onChange={(e:any)=>upd("heroSlides",i,"badge",e.target.value)}/>
              <Inp placeholder="Título" value={s.title||""} onChange={(e:any)=>upd("heroSlides",i,"title",e.target.value)}/>
              <Inp placeholder="CTA texto" value={s.ctaText||""} onChange={(e:any)=>upd("heroSlides",i,"ctaText",e.target.value)}/>
              <Inp placeholder="CTA URL" value={s.ctaUrl||""} onChange={(e:any)=>upd("heroSlides",i,"ctaUrl",e.target.value)}/>
              <Sel value={s.alignment||"left"} onChange={(e:any)=>upd("heroSlides",i,"alignment",e.target.value)}><option value="left">Izquierda</option><option value="center">Centro</option></Sel>
            </div>
            <Txt placeholder="Copy" value={s.copy||""} onChange={(e:any)=>upd("heroSlides",i,"copy",e.target.value)} rows={2} className="mt-3"/>
            <Ctrl k="heroSlides" i={i}/>
          </Card>
        ))}
        <Add onClick={()=>add("heroSlides",{imageUrl:"",badge:"",title:"",copy:"",ctaText:"",ctaUrl:"",alignment:"left"})} label="Agregar slide"/>
      </Section>

      <Section k="stats" title="Estadísticas" icon={<Star className="h-5 w-5"/>}>
        {cfg.stats.map((s:any,i:number)=>(
          <Card key={i}>
            <div className="grid md:grid-cols-4 gap-3">
              <Sel value={s.icon||"School"} onChange={(e:any)=>upd("stats",i,"icon",e.target.value)}>{ICONS.map((ic)=><option key={ic} value={ic}>{ic}</option>)}</Sel>
              <Inp placeholder="Etiqueta" value={s.label||""} onChange={(e:any)=>upd("stats",i,"label",e.target.value)}/>
              <Inp type="number" placeholder="Valor" value={s.value||0} onChange={(e:any)=>upd("stats",i,"value",Number(e.target.value))}/>
              <Inp placeholder="Sufijo" value={s.suffix||""} onChange={(e:any)=>upd("stats",i,"suffix",e.target.value)}/>
            </div>
            <label className="flex items-center gap-2 mt-3 text-sm"><input type="checkbox" checked={s.isText||false} onChange={(e:any)=>upd("stats",i,"isText",e.target.checked)} className="rounded"/>Es texto</label>
            {s.isText&&<Inp placeholder="Texto (ej: A+)" value={s.text||""} onChange={(e:any)=>upd("stats",i,"text",e.target.value)} className="mt-2"/>}
            <Ctrl k="stats" i={i}/>
          </Card>
        ))}
        <Add onClick={()=>add("stats",{icon:"School",label:"",value:0,suffix:"",isText:false,text:""})} label="Agregar estadística"/>
      </Section>

      <Section k="why" title="¿Por qué elegirnos?" icon={<Star className="h-5 w-5"/>}>
        {cfg.whyChoose.map((w:any,i:number)=>(
          <Card key={i}>
            <div className="grid md:grid-cols-2 gap-3">
              <Inp placeholder="Título" value={w.title||""} onChange={(e:any)=>upd("whyChoose",i,"title",e.target.value)}/>
              <Sel value={w.icon||"BookOpen"} onChange={(e:any)=>upd("whyChoose",i,"icon",e.target.value)}>{ICONS.map((ic)=><option key={ic} value={ic}>{ic}</option>)}</Sel>
              <Sel value={w.color||"bg-brand-gold"} onChange={(e:any)=>upd("whyChoose",i,"color",e.target.value)}>{COLORS.map((c)=><option key={c.v} value={c.v}>{c.l}</option>)}</Sel>
              <Sel value={w.iconClass||"text-brand-dark"} onChange={(e:any)=>upd("whyChoose",i,"iconClass",e.target.value)}><option value="text-brand-dark">Oscuro</option><option value="text-white">Blanco</option></Sel>
            </div>
            <Txt placeholder="Descripción" value={w.description||""} onChange={(e:any)=>upd("whyChoose",i,"description",e.target.value)} rows={2} className="mt-3"/>
            <Ctrl k="whyChoose" i={i}/>
          </Card>
        ))}
        <Add onClick={()=>add("whyChoose",{icon:"BookOpen",title:"",description:"",color:"bg-brand-gold",iconClass:"text-brand-dark"})} label="Agregar item"/>
      </Section>

      <Section k="alliances" title="Alianzas" icon={<Star className="h-5 w-5"/>}>
        {cfg.alliances.map((a:any,i:number)=>(
          <Card key={i}>
            <div className="grid md:grid-cols-2 gap-3">
              <Inp placeholder="Logo URL" value={a.logo||""} onChange={(e:any)=>upd("alliances",i,"logo",e.target.value)}/>
              <Inp placeholder="Nombre" value={a.nombre||""} onChange={(e:any)=>upd("alliances",i,"nombre",e.target.value)}/>
            </div>
            <Txt placeholder="Beneficio" value={a.beneficio||""} onChange={(e:any)=>upd("alliances",i,"beneficio",e.target.value)} rows={2} className="mt-3"/>
            <Ctrl k="alliances" i={i}/>
          </Card>
        ))}
        <Add onClick={()=>add("alliances",{logo:"",nombre:"",beneficio:""})} label="Agregar alianza"/>
      </Section>

      <Section k="testimonials" title="Testimonios" icon={<Star className="h-5 w-5"/>}>
        {cfg.testimonials.map((t:any,i:number)=>(
          <Card key={i}>
            <div className="grid md:grid-cols-3 gap-3">
              <Inp placeholder="Nombre" value={t.nombre||""} onChange={(e:any)=>upd("testimonials",i,"nombre",e.target.value)}/>
              <Inp placeholder="Colegio" value={t.colegio||""} onChange={(e:any)=>upd("testimonials",i,"colegio",e.target.value)}/>
              <Inp placeholder="Iniciales" maxLength={2} value={t.iniciales||""} onChange={(e:any)=>upd("testimonials",i,"iniciales",e.target.value)}/>
            </div>
            <Txt placeholder="Testimonio" value={t.texto||""} onChange={(e:any)=>upd("testimonials",i,"texto",e.target.value)} rows={3} className="mt-3"/>
            <Ctrl k="testimonials" i={i}/>
          </Card>
        ))}
        <Add onClick={()=>add("testimonials",{nombre:"",colegio:"",texto:"",iniciales:""})} label="Agregar testimonio"/>
      </Section>

      <Section k="faq" title="Preguntas Frecuentes" icon={<Star className="h-5 w-5"/>}>
        {cfg.faq.map((f:any,i:number)=>(
          <Card key={i}>
            <div className="grid md:grid-cols-2 gap-3">
              <Sel value={f.icon||"HelpCircle"} onChange={(e:any)=>upd("faq",i,"icon",e.target.value)}>{ICONS.map((ic)=><option key={ic} value={ic}>{ic}</option>)}</Sel>
              <Inp placeholder="Pregunta" value={f.pregunta||""} onChange={(e:any)=>upd("faq",i,"pregunta",e.target.value)}/>
            </div>
            <Txt placeholder="Respuesta" value={f.respuesta||""} onChange={(e:any)=>upd("faq",i,"respuesta",e.target.value)} rows={3} className="mt-3"/>
            <div className="grid md:grid-cols-2 gap-3 mt-3">
              <Inp placeholder="Link URL" value={f.link?.href||""} onChange={(e:any)=>upd("faq",i,"link",{...f.link,href:e.target.value})}/>
              <Inp placeholder="Link texto" value={f.link?.label||""} onChange={(e:any)=>upd("faq",i,"link",{...f.link,label:e.target.value})}/>
            </div>
            <Ctrl k="faq" i={i}/>
          </Card>
        ))}
        <Add onClick={()=>add("faq",{icon:"HelpCircle",pregunta:"",respuesta:"",link:{href:"",label:""}})} label="Agregar pregunta"/>
      </Section>

      <Section k="cta" title="CTA Final" icon={<ArrowRight className="h-5 w-5"/>}>
        <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
          <Inp placeholder="Título CTA" value={cfg.ctaTitle} onChange={(e:any)=>setCfg((p:any)=>({...p,ctaTitle:e.target.value}))}/>
          <Txt placeholder="Copy" value={cfg.ctaCopy} onChange={(e:any)=>setCfg((p:any)=>({...p,ctaCopy:e.target.value}))} rows={2}/>
          <div className="grid md:grid-cols-2 gap-4">
            <div><label className="text-xs text-gray-500 mb-1 block">CTA primario</label><Inp placeholder="Texto" value={cfg.ctaPrimaryLabel} onChange={(e:any)=>setCfg((p:any)=>({...p,ctaPrimaryLabel:e.target.value}))} className="mb-2"/><Inp placeholder="URL" value={cfg.ctaPrimary} onChange={(e:any)=>setCfg((p:any)=>({...p,ctaPrimary:e.target.value}))}/></div>
            <div><label className="text-xs text-gray-500 mb-1 block">CTA secundario</label><Inp placeholder="Texto" value={cfg.ctaSecondaryLabel} onChange={(e:any)=>setCfg((p:any)=>({...p,ctaSecondaryLabel:e.target.value}))} className="mb-2"/><Inp placeholder="URL" value={cfg.ctaSecondary} onChange={(e:any)=>setCfg((p:any)=>({...p,ctaSecondary:e.target.value}))}/></div>
          </div>
        </div>
      </Section>
    </div>
  );
}
