import React, { useState } from 'react';
import Papa from 'papaparse';

const CompanyProblems = () => {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // List of all companies
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

  const getCsvUrl = (companyName) =>
    `https://raw.githubusercontent.com/hxu296/leetcode-company-wise-problems-2022/master/companies/${encodeURIComponent(companyName)}.csv`;

  const handleCompanyClick = (company) => {
    setSelectedCompany(company);
    setLoading(true);
    setData([]);

    const csvUrl = getCsvUrl(company);
    Papa.parse(csvUrl, {
      download: true,
      header: true,
      complete: (results) => {
        setData(
          results.data.filter((row) =>
            Object.values(row).some((val) => val && val.toString().trim() !== '')
          )
        );
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
        return 'bg-green-900/50 text-green-400 border border-green-500/30';
      case 'medium':
        return 'bg-yellow-900/50 text-yellow-400 border border-yellow-500/30';
      case 'hard':
        return 'bg-red-900/50 text-red-400 border border-red-500/30';
      default:
        return 'bg-gray-900/50 text-emerald-400 border border-emerald-500/30';
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
      <div className="max-w-7xl mx-auto p-3 sm:p-4">
        <div className="bg-gray-800/40 border border-emerald-500/20 rounded-lg p-3 sm:p-4 mb-4 backdrop-blur-md shadow-lg shadow-emerald-500/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
            <div className="flex flex-col sm:flex-row sm:items-center">
              <button 
                onClick={handleBackToList}
                className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-1.5 rounded-md hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 sm:mr-4 flex items-center font-medium shadow-md mb-2 sm:mb-0 w-full sm:w-auto justify-center sm:justify-start text-sm hover:shadow-lg transform hover:-translate-y-0.5 hover:shadow-emerald-500/20"
              >
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back
              </button>
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-400 drop-shadow-sm">{selectedCompany}</h2>
                <p className="text-emerald-200/70 mt-0.5 text-xs sm:text-sm">LeetCode Problems</p>
              </div>
            </div>
            {!loading && (
              <div className="text-right">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-3 py-1.5 rounded-md shadow-md inline-block transform hover:scale-105 transition-transform duration-300">
                  <p className="text-xl sm:text-2xl font-bold">{data.length}</p>
                  <p className="text-emerald-100 text-xs">Problems</p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {loading ? (
          <div className="bg-gray-800/40 border border-emerald-500/20 rounded-lg p-6 text-center backdrop-blur-md shadow-lg shadow-emerald-500/10">
            <div className="mx-auto mb-2 w-8 h-8 border-2 border-emerald-500/30 border-t-emerald-400 rounded-full animate-spin"></div>
            <p className="text-emerald-200/70 text-sm font-medium">Loading problems...</p>
          </div>
        ) : (
          <div className="bg-gray-800/40 border border-emerald-500/20 rounded-lg overflow-hidden backdrop-blur-md shadow-lg shadow-emerald-500/10">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-900/50 border-b border-emerald-500/20 sticky top-0">
                    {data.length > 0 &&
                      Object.keys(data[0]).map((key) => (
                        <th className="px-2 sm:px-4 py-3 text-left text-xs font-bold text-emerald-300 uppercase tracking-wider" key={key}>
                          {key === 'ID' ? '#' : key.replace(/([A-Z])/g, ' $1').trim()}
                        </th>
                      ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-emerald-500/10">
                  {data.map((row, i) => (
                    <tr key={i} className="transition-all duration-200 hover:bg-gray-700/30">
                      {Object.entries(row).map(([key, value], j) => (
                        <td className="px-2 sm:px-4 py-3 whitespace-nowrap" key={j}>
                          {key.toLowerCase().includes('title') || key.toLowerCase().includes('name') ? (
                            <button
                              onClick={() => handleProblemClick(value)}
                              className="text-emerald-400 hover:text-emerald-300 font-semibold hover:underline cursor-pointer text-left transition-colors duration-200 text-xs flex items-center"
                              type="button"
                            >
                              <svg className="w-3 h-3 mr-1 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                              {value}
                            </button>
                          ) : key.toLowerCase().includes('difficulty') ? (
                            <span className={`inline-flex px-2 py-0.5 text-xs font-bold rounded-full shadow-sm ${
                              value === 'Easy' ? 'bg-green-900/50 text-green-400 border border-green-500/30' : 
                              value === 'Medium' ? 'bg-yellow-900/50 text-yellow-400 border border-yellow-500/30' : 
                              'bg-red-900/50 text-red-400 border border-red-500/30'
                            }`}>
                              {value}
                            </span>
                          ) : key.toLowerCase().includes('frequency') ? (
                            <div className="flex items-center">
                              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 px-1.5 py-0.5 rounded-full">
                                <span className="text-xs font-bold text-white">{value}</span>
                              </div>
                            </div>
                          ) : (
                            <span className="text-xs text-emerald-100/80 font-medium">
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
    <div className="max-w-7xl mx-auto p-3 sm:p-4">
      <div className="mb-10 animate-fade-in-up">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <h2 className="text-3xl font-bold md:text-left text-center drop-shadow-sm text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-400">Choose a Company</h2>
          
          {/* Stylish Search Input */}
          <div className="bg-gray-800/50 rounded-lg py-3 px-4 shadow-lg border border-emerald-500/20 md:max-w-md w-full hover:shadow-xl transition-shadow duration-300 backdrop-blur-sm shadow-emerald-500/10">
            <div className="relative flex items-center">
              <svg className="h-5 w-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input block w-full pl-3 pr-3 py-2 bg-transparent border-none focus:outline-none text-emerald-100 font-medium placeholder-emerald-200/50 focus:placeholder-emerald-200/30 transition-colors duration-200"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="text-emerald-400 hover:text-emerald-300"
                  type="button"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            {searchTerm && (
              <div className="text-xs text-emerald-200/70 mt-1 text-left">
                Showing {filteredCompanies.length} of {companies.length} companies
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4 mb-8">
        {filteredCompanies.map((company) => (
          <button
            key={company}
            onClick={() => handleCompanyClick(company)}
            className="bg-gray-800/40 border border-emerald-500/20 rounded-lg p-3 text-center group animate-fade-in-up flex flex-col items-center justify-center hover:scale-105 transition-transform duration-300 backdrop-blur-sm shadow-md hover:shadow-lg hover:shadow-emerald-500/10"
            style={{ height: '95px' }}
            type="button"
          >
            <div className="flex flex-col items-center justify-center w-full h-full">
              <div className="text-center overflow-hidden">
                <h3 className="font-bold text-emerald-100 group-hover:text-emerald-300 transition-all duration-300 text-sm leading-tight px-1 truncate max-w-full">
                  {company}
                </h3>
                <div className="w-6 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 mx-auto mt-1.5"></div>
              </div>
            </div>
          </button>
        ))}
      </div>
      
      {filteredCompanies.length === 0 && !searchTerm && (
        <div className="text-center my-12 text-emerald-100/80 max-w-md mx-auto p-6 bg-gray-800/40 rounded-lg shadow-lg border border-emerald-500/20 backdrop-blur-md shadow-emerald-500/10">
          <div className="text-emerald-400 mb-4">
            <svg className="mx-auto h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-emerald-300 mb-2">No Company Selected</h3>
          <p>Search for a company or choose one from the list below to view their problems.</p>
        </div>
      )}
      
      <div className="mt-12 text-center mb-4">
        <div className="bg-gray-800/40 border border-emerald-500/20 rounded-lg py-3 px-6 inline-block shadow-md backdrop-blur-md hover:shadow-lg transition-shadow duration-300 shadow-emerald-500/10">
          <p className="text-emerald-100/80 text-sm flex items-center">
            <svg className="w-4 h-4 mr-2 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-semibold text-emerald-300">Tip:</span>
            <span className="ml-1">Click any company to view LeetCode problems</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompanyProblems;