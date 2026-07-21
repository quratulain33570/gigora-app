import React, { useState } from 'react';
import DashboardLayout from '../Components/DashboardLayout';
import DashboardHome from '../Components/DashboardHome';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <DashboardLayout activeTab={activeTab} setActiveTab={setActiveTab} userName="Quratulain">
      {activeTab === 'home' && <DashboardHome setActiveTab={setActiveTab} userName="Quratulain" />}
      {activeTab === 'profile' && (
        <div className="bg-white p-8 rounded-2xl border border-gray-100">
          <h2 className="text-2xl font-bold text-navy mb-2">Profile Analyzer</h2>
          <p className="text-grayText">Analyze your freelance profile strength here soon!</p>
        </div>
      )}
      {activeTab === 'seo' && (
        <div className="bg-white p-8 rounded-2xl border border-gray-100">
          <h2 className="text-2xl font-bold text-navy mb-2">Gig SEO Optimizer</h2>
          <p className="text-grayText">Optimize your gig keywords and titles here soon!</p>
        </div>
      )}
      {activeTab === 'proposal' && (
        <div className="bg-white p-8 rounded-2xl border border-gray-100">
          <h2 className="text-2xl font-bold text-navy mb-2">Proposal Generator</h2>
          <p className="text-grayText">Generate high-converting proposals here soon!</p>
        </div>
      )}
    </DashboardLayout>
  );
}