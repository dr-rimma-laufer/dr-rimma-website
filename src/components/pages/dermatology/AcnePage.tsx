'use client';
import React from 'react';
import { DermatologyDiseaseTemplate } from './DermatologyDiseaseTemplate';
import { acneData } from './data/acneData';

interface AcnePageProps {
  onNavigate: (page: string) => void;
}

export function AcnePage({ onNavigate }: AcnePageProps) {
  return <DermatologyDiseaseTemplate data={acneData} onNavigate={onNavigate} />;
}
