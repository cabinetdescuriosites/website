import React from 'react';
import {
  AbsoluteFill,
  Img,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

const BLUE = '#176aa2';
const NAVY = '#103d60';
const WHITE = '#f8fbfd';

const captions = [
  [26, 65, 'Je m’appelle Delphine'],
  [65, 140, 'Je vous aide dans votre future installation.'],
  [151, 190, 'De retour en France'],
  [190, 218, 'après 30 ans d’expatriation,'],
  [231, 270, 'j’ai moi-même fait l’expérience'],
  [270, 308, 'de tous les blocages.'],
  [310, 346, 'Blocages administratifs,'],
  [346, 381, 'recherche de logement,'],
  [401, 440, 'inscription à l’école des enfants.'],
  [448, 502, 'Chaque situation est très différente.'],
  [504, 555, 'C’est pour ça que l’accompagnement'],
  [555, 608, 'est extrêmement personnalisé.'],
  [623, 680, 'J’accompagne des expatriés,'],
  [680, 737, 'des impatriés et des familles,'],
  [754, 802, 'ainsi que des étudiants,'],
  [802, 862, 'dans leur installation en France.'],
  [862, 910, 'Après notre appel découverte'],
  [910, 954, 'gratuit de 15 minutes,'],
  [973, 1035, 'nous mettons en place un plan d’action'],
  [1035, 1111, 'pour réussir votre installation.'],
];

const pop = (frame, fps) =>
  spring({frame, fps, config: {damping: 16, stiffness: 130, mass: 0.7}});

const Caption = ({text, start}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const entrance = pop(frame - start, fps);
  return (
    <div
      style={{
        position: 'absolute',
        left: 300,
        right: 300,
        bottom: 105,
        display: 'flex',
        justifyContent: 'center',
        opacity: entrance,
        transform: `translateY(${interpolate(entrance, [0, 1], [18, 0])}px)`,
      }}
    >
      <div
        style={{
          background: 'rgba(249,252,254,0.94)',
          color: NAVY,
          borderRadius: 18,
          padding: '16px 28px 18px',
          fontFamily: 'Arial, sans-serif',
          fontSize: 40,
          fontWeight: 650,
          lineHeight: 1.15,
          textAlign: 'center',
          boxShadow: '0 8px 28px rgba(7,35,55,0.16)',
          borderBottom: `5px solid ${BLUE}`,
        }}
      >
        {text}
      </div>
    </div>
  );
};

const Badge = ({children, start, x = 120, y = 170}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = pop(frame - start, fps);
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        opacity: p,
        transform: `translateY(${interpolate(p, [0, 1], [22, 0])}px) scale(${interpolate(p, [0, 1], [0.92, 1])})`,
        background: 'rgba(16,61,96,0.92)',
        color: WHITE,
        padding: '18px 25px',
        borderRadius: 16,
        fontFamily: 'Arial, sans-serif',
        fontSize: 32,
        fontWeight: 700,
        boxShadow: '0 12px 30px rgba(0,0,0,0.18)',
      }}
    >
      {children}
    </div>
  );
};

const ThreeNeeds = () => {
  const items = ['Administratif', 'Logement', 'École'];
  return (
    <div style={{position: 'absolute', left: 105, top: 205}}>
      {items.map((item, index) => (
        <Badge key={item} start={index * 9} x={0} y={index * 76}>
          <span style={{color: '#8fd0f4', marginRight: 12}}>✓</span>{item}
        </Badge>
      ))}
    </div>
  );
};

const LowerThird = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = pop(frame, fps);
  return (
    <div style={{position: 'absolute', left: 90, top: 700, opacity: p, transform: `translateX(${interpolate(p, [0, 1], [-35, 0])}px)`}}>
      <div style={{background: 'rgba(16,61,96,0.94)', borderLeft: '7px solid #8fd0f4', padding: '18px 28px', borderRadius: '0 14px 14px 0', color: WHITE, fontFamily: 'Arial, sans-serif'}}>
        <div style={{fontSize: 38, fontWeight: 750}}>Delphine</div>
        <div style={{fontSize: 24, marginTop: 4, opacity: 0.9}}>Abracamove · Installation en France</div>
      </div>
    </div>
  );
};

const ThirtyYears = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = pop(frame, fps);
  return (
    <div style={{position: 'absolute', left: 110, top: 165, color: WHITE, fontFamily: 'Arial, sans-serif', opacity: p, transform: `scale(${interpolate(p, [0, 1], [0.88, 1])})`, transformOrigin: 'left center'}}>
      <div style={{display: 'flex', alignItems: 'baseline', gap: 12, background: 'rgba(16,61,96,0.93)', borderRadius: 18, padding: '14px 24px', boxShadow: '0 12px 30px rgba(0,0,0,0.18)'}}>
        <span style={{fontSize: 60, fontWeight: 800, color: '#8fd0f4'}}>30</span>
        <span style={{fontSize: 30, fontWeight: 700}}>ans d’expatriation</span>
      </div>
    </div>
  );
};

const DiscoveryClock = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = pop(frame, fps);
  return (
    <div style={{position: 'absolute', left: 110, top: 160, display: 'flex', alignItems: 'center', gap: 16, padding: '14px 24px', borderRadius: 18, background: 'rgba(16,61,96,0.93)', color: WHITE, fontFamily: 'Arial, sans-serif', opacity: p}}>
      <div style={{width: 58, height: 58, border: '5px solid #8fd0f4', borderRadius: '50%', position: 'relative'}}>
        <div style={{position: 'absolute', left: 25, top: 8, width: 5, height: 20, borderRadius: 3, background: WHITE, transformOrigin: 'bottom', transform: `rotate(${interpolate(frame, [0, 80], [0, 210], {extrapolateRight: 'clamp'})}deg)`}} />
        <div style={{position: 'absolute', left: 25, top: 25, width: 17, height: 5, borderRadius: 3, background: WHITE}} />
      </div>
      <div><div style={{fontSize: 34, fontWeight: 800}}>15 minutes</div><div style={{fontSize: 22, opacity: 0.9}}>Appel découverte gratuit</div></div>
    </div>
  );
};

const ActionPath = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = pop(frame, fps);
  return (
    <div style={{position: 'absolute', left: 110, top: 175, background: 'rgba(16,61,96,0.93)', color: WHITE, padding: '18px 24px', borderRadius: 18, fontFamily: 'Arial, sans-serif', opacity: p}}>
      <div style={{fontSize: 29, fontWeight: 750, marginBottom: 13}}>Votre plan d’action</div>
      <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
        {[0, 1, 2].map((n) => <React.Fragment key={n}><span style={{width: 15, height: 15, borderRadius: '50%', background: frame > 8 + n * 10 ? '#8fd0f4' : 'rgba(255,255,255,.35)'}} />{n < 2 && <span style={{width: 46, height: 4, borderRadius: 2, background: frame > 15 + n * 10 ? '#8fd0f4' : 'rgba(255,255,255,.25)'}} />}</React.Fragment>)}
        <span style={{fontSize: 28, color: '#8fd0f4', marginLeft: 4}}>→</span>
      </div>
    </div>
  );
};

const EndCard = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = pop(frame, fps);
  return (
    <AbsoluteFill style={{background: `linear-gradient(135deg, ${NAVY}, ${BLUE})`, alignItems: 'center', justifyContent: 'center', fontFamily: 'Arial, sans-serif', color: WHITE}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 54, opacity: p, transform: `translateY(${interpolate(p, [0, 1], [24, 0])}px)`}}>
        <Img src={staticFile('logo-abracamove.jpg')} style={{width: 270, height: 270, borderRadius: 26, boxShadow: '0 16px 45px rgba(0,0,0,.2)'}} />
        <div>
          <div style={{fontSize: 48, lineHeight: 1.12, fontWeight: 780, maxWidth: 720}}>Réussissons votre installation en France</div>
          <div style={{display: 'inline-block', marginTop: 28, background: WHITE, color: NAVY, borderRadius: 15, padding: '15px 24px', fontSize: 28, fontWeight: 750}}>Réserver l’appel découverte →</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const DelphineVideo = () => {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [0, 12], [0, 1], {extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: 'transparent', opacity: fadeIn}}>
      <div style={{position: 'absolute', right: 34, top: 25, width: 130, height: 110, overflow: 'hidden'}}>
        <Img src={staticFile('logo-abracamove.jpg')} style={{position: 'absolute', width: 220, height: 220, left: -45, top: -20}} />
      </div>

      <Sequence from={24} durationInFrames={115}><LowerThird /></Sequence>
      <Sequence from={151} durationInFrames={80}><ThirtyYears /></Sequence>
      <Sequence from={306} durationInFrames={150}><ThreeNeeds /></Sequence>
      <Sequence from={498} durationInFrames={110}><Badge start={0}>Un accompagnement sur mesure</Badge></Sequence>
      <Sequence from={620} durationInFrames={235}><Badge start={0}>Expatriés · Impatriés · Familles · Étudiants</Badge></Sequence>
      <Sequence from={860} durationInFrames={108}><DiscoveryClock /></Sequence>
      <Sequence from={969} durationInFrames={140}><ActionPath /></Sequence>

      {captions.map(([start, end, text]) => (
        <Sequence key={start} from={start} durationInFrames={end - start}>
          <Caption text={text} start={0} />
        </Sequence>
      ))}
      <Sequence from={1115} durationInFrames={66}><EndCard /></Sequence>
    </AbsoluteFill>
  );
};
