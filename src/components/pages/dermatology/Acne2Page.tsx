'use client';
import React from 'react';
import { DermatologyDiseaseTemplate } from './DermatologyDiseaseTemplate';
import { rosaceaData } from './data/rosaceaData';

interface Acne2PageProps {
  onNavigate: (page: string) => void;
}

export function Acne2Page({ onNavigate }: Acne2PageProps) {
  return <DermatologyDiseaseTemplate data={rosaceaData} onNavigate={onNavigate} />;
}
