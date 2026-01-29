'use client';
import React from 'react';
import { DermatologyDiseaseTemplate } from './DermatologyDiseaseTemplate';
import { rosaceaData } from './data/rosaceaData';

interface RosaceaPageProps {
  onNavigate: (page: string) => void;
}

export function RosaceaPage({ onNavigate }: RosaceaPageProps) {
  return (
    <DermatologyDiseaseTemplate
      data={rosaceaData}
      onNavigate={onNavigate}
    />
  );
}
