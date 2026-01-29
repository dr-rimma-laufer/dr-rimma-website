'use client';
import React from 'react';
import { DermatologyDiseaseTemplate } from './DermatologyDiseaseTemplate';
import { psoriasisData } from './data/psoriasisData';

interface PsoriasisPageProps {
  onNavigate: (page: string) => void;
}

export function PsoriasisPage({ onNavigate }: PsoriasisPageProps) {
  return <DermatologyDiseaseTemplate data={psoriasisData} onNavigate={onNavigate} />;
}
