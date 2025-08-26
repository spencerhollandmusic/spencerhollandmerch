import fs from "fs"; import path from "path";
const [,, slug, name, primary="#2563eb", accent="#14b8a6"] = process.argv;
if (!slug || !name) { console.error("Usage: npm run create:client <slug> \"Display Name\" [primaryHex] [accentHex]"); process.exit(1); }
const dir = path.join("data","clients", slug); fs.mkdirSync(dir,{recursive:true});
const tpl = { brand:{name,logo:"/logos/acme.svg"}, theme:{primary,accent,muted:"#f3f4f6"},
  nav:[{label:"Home",href:"#home"},{label:"Services",href:"#services"},{label:"Contact",href:"#contact"}],
  hero:{headline:`${name}: We do awesome things.`, sub:"Replace this with your elevator pitch.", ctaLabel:"Get started",
        highlights:[{title:"Quality",desc:"Top-notch work."},{title:"Speed",desc:"Fast turnaround."},{title:"Support",desc:"Weâ€™re here to help."},{title:"Value",desc:"Fair pricing."}]},
  services:[{title:"Service One",desc:"Describe the value.",price:""},{title:"Service Two",desc:"Describe the value.",price:""},{title:"Service Three",desc:"Describe the value.",price:""}],
  cta:{title:"Ready to begin?",desc:"Weâ€™d love to work with you.",ctaLabel:"Contact us"},
  contact:{phone:"",email:"",address:"",formspreeId:""}
};
fs.writeFileSync(path.join(dir,"content.json"), JSON.stringify(tpl,null,2), "utf-8");
console.log(`Created data/clients/${slug}/content.json`);

