'use client';

import React, { Suspense } from 'react';
import OneboxPage from './OneboxPage';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OneboxPage />
    </Suspense>
  );
}