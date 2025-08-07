// components/CompanyProblems.jsx
import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';

const CompanyProblems = () => {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // List of all companies with their CSV URLs
  const companies = [
    'APT Portfolio', 'Accenture', 'Activision', 'Adobe', 'Affirm', 'Airbnb', 
    'Akamai', 'Akuna Capital', 'Alation', 'Alibaba', 'AllinCall', 'Amazon', 
    'American Express', 'Apple', 'Arcesium', 'Arista Networks', 'Asana', 
    'Athenahealth', 'Atlassian', 'Baidu', 'Barclays', 'BlackRock', 'Bloomberg', 
    'Bolt', 'Booking.com', 'Box', 'ByteDance', 'C3 IoT', 'Canonical', 
    'Capital One', 'Cashfree', 'Cisco', 'Citadel', 'Citrix', 'Cohesity', 
    'Commvault', 'Coursera', 'Cruise Automation', 'DE Shaw', 'DJI', 'DRW', 
    'Databricks', 'Dataminr', 'Dell', 'Deutsche Bank', 'Directi', 'Docusign', 
    'DoorDash', 'Drawbridge', 'Dropbox', 'Druva', 'Dunzo', 'Duolingo', 
    'Epic Systems', 'Expedia', 'FPT', 'Facebook', 'FactSet', 'Flipkart', 
    'Gilt Groupe', 'GoDaddy', 'Goldman Sachs', 'Google', 'Grab', 'HBO', 
    'HRT', 'Honeywell', 'Hotstar', 'Huawei', 'Hulu', 'IBM', 'IIT Bombay', 
    'IMC', 'IXL', 'Indeed', 'Info Edge', 'Infosys', 'Intel', 'Intuit', 
    'JPMorgan', 'Jane Street', 'Jeavio', 'Karat', 'Leap Motion', 'LinkedIn', 
    'LiveRamp', 'Lyft', 'MAQ Software', 'MakeMyTrip', 'Mathworks', 'Mercari', 
    'Microsoft', 'MindTickle', 'MindTree', 'Moengage', 'Morgan Stanley', 
    'National Instruments', 'Netflix', 'Netsuite', 'Nuro', 'Nutanix', 
    'Nvidia', 'OT', 'Opendoor', 'Optum', 'Oracle', 'Palantir Technologies', 
    'PayTM', 'Paypal', 'PhonePe', 'Pinterest', 'Pocket Gems', 'Postmates', 
    'Pure Storage', 'Qualcomm', 'Qualtrics', 'Quora', 'Rakuten', 'Reddit', 
    'Redfin', 'Riot Games', 'Robinhood', 'Roblox', 'Rubrik', 'Rupeek', 
    'SAP', 'Salesforce', 'Samsung', 'Sapient', 'ServiceNow', 'Shopee', 
    'Snapchat', 'Softwire', 'Sony', 'Splunk', 'Spotify', 'Sprinklr', 
    'Square', 'Sumologic', 'Swiggy', 'T System', 'TIAA', 'Tencent', 'Tesla', 
    'Thumbtack', 'Tiger Analytics', 'Toptal', 'TripleByte', 'TuSimple', 
    'Twilio', 'Twitch', 'Twitter', 'Two Sigma', 'Uber', 'United Health Group', 
    'VMware', 'Valve', 'Virtu Financial', 'Visa', 'Walmart Global Tech', 
    'Wayfair', 'Wealthfront', 'Wish', 'Works Applications', 'Yahoo', 'Yandex', 
    'Yelp', 'ZScaler', 'Zenefits', 'Zillow', 'Zoho', 'Zomato', 'Zoom', 
    'Zopsmart', 'eBay', 'edabit', 'instacart', 'payu', 'peak6', 
    'persistent systems', 'razorpay', 'tcs', 'tiktok', 'zeta suite'
  ];

  const getCsvUrl = (companyName) => {
    return `https://raw.githubusercontent.com/hxu296/leetcode-company-wise-problems-2022/master/companies/${encodeURIComponent(companyName)}.csv`;
  };

  const handleCompanyClick = (company) => {
    setSelectedCompany(company);
    setLoading(true);
    setData([]);

    const csvUrl = getCsvUrl(company);
    Papa.parse(csvUrl, {
      download: true,
      header: true,
      complete: (results) => {
        setData(results.data.filter(row => Object.values(row).some(val => val && val.toString().trim() !== '')));
        setLoading(false);
      },
      error: (error) => {
        console.error('Error parsing CSV:', error);
        setLoading(false);
      }
    });
  };

  const handleBackToList = () => {
    setSelectedCompany(null);
    setData([]);
  };

  // Filter companies based on search term
  const filteredCompanies = companies.filter(company =>
    company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy':
        return 'text-green-600 bg-green-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'hard':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getLeetCodeUrl = (problemTitle) => {
    // Convert problem title to LeetCode URL format
    const urlTitle = problemTitle
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-');
    return `https://leetcode.com/problems/${urlTitle}/`;
  };

  const handleProblemClick = (problemTitle) => {
    const url = getLeetCodeUrl(problemTitle);
    window.open(url, '_blank');
  };

  if (selectedCompany) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="glass rounded-2xl p-8 mb-8 animate-fade-in-up">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <button 
                onClick={handleBackToList}
                className="btn-modern bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-3 rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 mr-6 flex items-center font-medium shadow-lg"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Companies
              </button>
              <div>
                <h2 className="text-4xl font-bold text-gray-800 gradient-text">{selectedCompany}</h2>
                <p className="text-gray-600 mt-1">LeetCode Problems Collection</p>
              </div>
            </div>
            {!loading && (
              <div className="text-right">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-4 rounded-xl">
                  <p className="text-3xl font-bold">{data.length}</p>
                  <p className="text-indigo-100">Problems</p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {loading ? (
          <div className="glass rounded-2xl p-16 text-center animate-fade-in-up">
            <div className="spinner mx-auto mb-6"></div>
            <p className="text-gray-600 text-xl font-medium">Loading problems...</p>
          </div>
        ) : (
          <div className="glass rounded-2xl overflow-hidden animate-fade-in-up table-modern">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-white/20">
                    {data.length > 0 &&
                      Object.keys(data[0]).map((key, index) => (
                        <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider" key={key}>
                          {key === 'ID' ? '#' : key.replace(/([A-Z])/g, ' $1').trim()}
                        </th>
                      ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {data.map((row, i) => (
                    <tr key={i} className="table-row transition-all duration-200">
                      {Object.entries(row).map(([key, value], j) => (
                        <td className="px-8 py-6 whitespace-nowrap" key={j}>
                          {key.toLowerCase().includes('title') || key.toLowerCase().includes('name') ? (
                            <button
                              onClick={() => handleProblemClick(value)}
                              className="text-indigo-600 hover:text-indigo-800 font-semibold hover:underline cursor-pointer text-left transition-colors duration-200 animate-pulse-hover"
                            >
                              {value}
                            </button>
                          ) : key.toLowerCase().includes('difficulty') ? (
                            <span className={`inline-flex px-4 py-2 text-sm font-bold rounded-full ${getDifficultyColor(value)} shadow-sm`}>
                              {value}
                            </span>
                          ) : key.toLowerCase().includes('frequency') ? (
                            <div className="flex items-center">
                              <div className="bg-gradient-to-r from-indigo-100 to-purple-100 px-3 py-1 rounded-full">
                                <span className="text-sm font-bold text-gray-800">{value}</span>
                              </div>
                            </div>
                          ) : (
                            <span className="text-sm text-gray-700 font-medium">
                              {value}
                            </span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="text-center mb-12 animate-fade-in-up">
        <h2 className="text-5xl font-bold mb-6 gradient-text">Choose a Company</h2>
        <p className="text-gray-700 text-xl mb-8 font-medium">Select from {companies.length} companies to explore their LeetCode problems</p>
        
        {/* Modern Search Input */}
        <div className="max-w-lg mx-auto mb-12">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input block w-full pl-12 pr-4 py-4 rounded-2xl leading-5 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-700 font-medium transition-all duration-200"
            />
          </div>
          {searchTerm && (
            <p className="mt-2 text-sm text-gray-600">
              Showing {filteredCompanies.length} of {companies.length} companies
            </p>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredCompanies.map((company) => (
          <button
            key={company}
            onClick={() => handleCompanyClick(company)}
            className="card-hover glass rounded-2xl p-6 text-left border border-white/20 group animate-fade-in-up"
          >
            <div className="flex items-center justify-between h-full">
              <div className="flex-1">
                <h3 className="font-bold text-gray-800 group-hover:text-indigo-600 transition-all duration-300 text-sm leading-tight mb-2">
                  {company}
                </h3>
                <div className="w-8 h-1 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <svg 
                className="w-5 h-5 text-gray-400 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all duration-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        ))}
      </div>
      
      {filteredCompanies.length === 0 && searchTerm && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.44-1.01-5.879-2.62M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
          <p className="text-gray-500 text-lg">No companies found matching "{searchTerm}"</p>
          <button
            onClick={() => setSearchTerm('')}
            className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
          >
            Clear search
          </button>
        </div>
      )}
      
      <div className="mt-12 text-center">
        <p className="text-gray-500 text-sm">
          Click on any company to view their curated LeetCode problems
        </p>
      </div>
    </div>
  );
};

export default CompanyProblems;
