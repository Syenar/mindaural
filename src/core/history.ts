export class History<T>{
 private past:T[]=[];private present:T;private future:T[]=[];
 constructor(initial:T,private limit=100){this.present=structuredClone(initial);}
 push(next:T){this.past.push(structuredClone(this.present));if(this.past.length>this.limit)this.past.shift();this.present=structuredClone(next);this.future=[];return structuredClone(this.present);}
 undo(){if(!this.past.length)return null;this.future.unshift(structuredClone(this.present));this.present=this.past.pop()!;return structuredClone(this.present);}
 redo(){if(!this.future.length)return null;this.past.push(structuredClone(this.present));this.present=this.future.shift()!;return structuredClone(this.present);}
 replace(next:T){this.present=structuredClone(next);this.past=[];this.future=[];}
 canUndo(){return this.past.length>0;} canRedo(){return this.future.length>0;}
}
