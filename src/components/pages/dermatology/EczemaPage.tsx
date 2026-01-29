'use client';
import React from 'react';
import { DermatologyDiseaseTemplate } from './DermatologyDiseaseTemplate';
import { eczemaData } from './data/eczemaData';

interface EczemaPageProps {
  onNavigate: (page: string) => void;
}

export function EczemaPage({ onNavigate }: EczemaPageProps) {
  return <DermatologyDiseaseTemplate data={eczemaData} onNavigate={onNavigate} />;
}
