import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import AgendaModule from './pages/AgendaModule';
import { RoleProvider } from './context/RoleContext';
import { AgendaProvider } from './context/AgendaContext';

function App() {
  return (
    <RoleProvider>
      <AgendaProvider>
        <Router>
          <div className="flex min-h-screen bg-background text-primary">
            <Sidebar />

            <main className="flex-1 lg:ml-72 p-4 md:p-8 lg:p-12 min-w-0 pt-20 lg:pt-12">
              <Routes>
                <Route path="/" element={<AgendaModule />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>
        </Router>
      </AgendaProvider>
    </RoleProvider>
  );
}

export default App;
