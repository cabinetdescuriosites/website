import React from 'react';
import {Composition} from 'remotion';
import {DelphineVideo} from './Video';

export const Root = () => (
  <Composition
    id="DelphineAbracamove"
    component={DelphineVideo}
    durationInFrames={1181}
    fps={30}
    width={1920}
    height={1080}
  />
);
