import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Explore } from '../pages/Explore';
import { Project } from '../pages/Project';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/project/:id" element={<Project />} />
    </Routes>
  );
}
