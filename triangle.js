// Triangle → Sink (A) + Source (B) simulation (minimal)

// Create triangle with two special sides (a,b). p1,p2,p3 are points.
function makeTriangle(p1,p2,p3){
  // choose side A as segment p1-p2 (example), side B as p2-p3
  const sideA = { a:p1, b:p2 };
  const sideB = { a:p2, b:p3 };
  // center (geometric centroid)
  const cx = (p1.x + p2.x + p3.x)/3;
  const cy = (p1.y + p2.y + p3.y)/3;
  return { p1,p2,p3, sideA, sideB, center:{x:cx,y:cy} };
}

// Spawn sink at midpoint of sideA
function makeSink(sideA, opts={radius:40,strength:120}){
  const pos = { x:(sideA.a.x+sideA.b.x)/2, y:(sideA.a.y+sideA.b.y)/2 };
  return { id:'A-'+Date.now(), pos, radius:opts.radius, strength:opts.strength, energy:0 };
}

// Spawn source near sideB midpoint
function makeSource(sideB, opts={radius:8, emissionRate:1.0, energy:50}){
  const pos = { x:(sideB.a.x+sideB.b.x)/2 + (Math.random()-0.5)*20, y:(sideB.a.y+sideB.b.y)/2 + (Math.random()-0.5)*20 };
  return { id:'B-'+Date.now(), pos, radius:opts.radius, emissionRate:opts.emissionRate, energy:opts.energy };
}

// Particle model
function spawnParticle(source){
  const angle = Math.random() * Math.PI*2;
  const speed = 0.6 + Math.random()*1.2;
  return {
    pos:{ x: source.pos.x, y: source.pos.y },
    vel:{ x: Math.cos(angle)*speed, y: Math.sin(angle)*speed },
    mass: 1,
    life: 10 + Math.random()*20,
    origin: source.id
  };
}

// Simulation step
function simStep(state, dt){
  // state: { sinks:[], sources:[], particles:[], events:[] }
  // emit
  state.sources.forEach(src => {
    // emission probabilistic
    if(Math.random() < (src.emissionRate * dt)){
      state.particles.push(spawnParticle(src));
      src.energy -= 0.1; // consumption
    }
  });

  // update particles
  const newParticles = [];
  for(const p of state.particles){
    // compute net force from sinks (only A in this model)
    let fx=0, fy=0;
    for(const s of state.sinks){
      const dx = s.pos.x - p.pos.x;
      const dy = s.pos.y - p.pos.y;
      const r2 = dx*dx + dy*dy + 0.001;
      const r = Math.sqrt(r2);
      // inverse square scaled
      const F = s.strength / r2;
      fx += F * (dx/r);
      fy += F * (dy/r);
    }
    // integrate (damped)
    const damping = 0.05;
    p.vel.x += (fx / p.mass) * dt;
    p.vel.y += (fy / p.mass) * dt;
    p.vel.x *= (1 - damping);
    p.vel.y *= (1 - damping);
    p.pos.x += p.vel.x * dt * 60;
    p.pos.y += p.vel.y * dt * 60;
    p.life -= dt;
    // absorption check
    for(const s of state.sinks){
      const dx = s.pos.x - p.pos.x, dy = s.pos.y - p.pos.y;
      const r = Math.sqrt(dx*dx+dy*dy);
      if(r < Math.max(4, s.radius*0.1)){ // absorbed
        s.energy += p.mass;
        // optionally create event or flash
        state.events.push({type:'absorbed', sinkId:s.id, particle:p, time:Date.now()});
        p.life = -1;
        break;
      }
    }
    if(p.life > 0) newParticles.push(p);
  }
  state.particles = newParticles;

  // sink rule: if energy exceed threshold -> spawn new star/node
  for(const s of state.sinks){
    if(s.energy > 20){ // threshold
      s.energy -= 20;
      // spawn a persistent 'star' published by GOLEM
      const star = { id:'star-'+Date.now(), pos:{ x:s.pos.x + (Math.random()-0.5)*80, y:s.pos.y + (Math.random()-0.5)*80 }, energy:10 };
      state.events.push({ type:'spawnStar', sinkId:s.id, star, time:Date.now() });
      // integrate into scene (return to caller)
      if(typeof state.onSpawn === 'function') state.onSpawn(star);
    }
  }
}

// Visualization simple (use ctx)
function renderSim(ctx, state){
  // clear
  ctx.save();
  ctx.fillStyle='#000';
  ctx.fillRect(0,0,ctx.canvas.width, ctx.canvas.height);
  // sinks (black hole)
  for(const s of state.sinks){
    // halo
    const grad = ctx.createRadialGradient(s.pos.x, s.pos.y, s.radius*0

