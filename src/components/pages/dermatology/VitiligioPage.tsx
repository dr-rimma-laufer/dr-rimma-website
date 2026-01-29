'use client';
import React from 'react';
import { DermatologyDiseaseTemplate } from './DermatologyDiseaseTemplate';
import { vitiligioData } from './data/vitiligioData';

interface VitiligioPageProps {
  onNavigate: (page: string) => void;
}

export function VitiligioPage({ onNavigate }: VitiligioPageProps) {
  return <DermatologyDiseaseTemplate data={vitiligioData} onNavigate={onNavigate} />;
}
