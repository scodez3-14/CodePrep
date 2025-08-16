import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const TOTAL_PROBLEMS = 1000; 
function calculateStreaks(solvedDates) {
  if (!Array.isArray(solvedDates) || solvedDates.length === 0)
    return { streak: 0, bestStreak: 0, lastSolved: '' };
  // Sort dates descending
  const dates = solvedDates.map(d => new Date(d)).sort((a, b) => b - a);
  let streak = 1, bestStreak = 1;
  let lastSolved = dates[0].toISOString().slice(0, 10);
  let prev = dates[0];
  for (let i = 1; i < dates.length; i++) {
    const diff = (prev - dates[i]) / (1000 * 60 * 60 * 24);
    if (diff === 1) {
      streak++;
      bestStreak = Math.max(bestStreak, streak);
    } else if (diff > 1) {
      streak = 1;
    }
    prev = dates[i];
  }
  return { streak, bestStreak, lastSolved };
}

function getHeatmapValues(solvedDates) {
  const counts = {};
  solvedDates.forEach(date => {
    const d = new Date(date).toISOString().slice(0, 10);
    counts[d] = (counts[d] || 0) + 1;
  });
  return Object.entries(counts).map(([date, count]) => ({ date, count }));
}

const Dashboard = ({ user }) => {
  const [solved, setSolved] = useState([]);
  const [solvedDates, setSolvedDates] = useState([]);
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    if (!user) return;
    const ref = doc(db, 'users', user.uid);
    const unsub = onSnapshot(ref, (snap) => {
      const data = snap.data();
      setSolved(data && data.solved ? data.solved : []);
      setSolvedDates(data && data.solvedDates ? data.solvedDates : []);
      setRecent(data && data.recent ? data.recent.slice(-5).reverse() : []);
    });
    return () => unsub();
  }, [user]);

  // Calculate streaks
  const { streak, bestStreak, lastSolved } = calculateStreaks(solvedDates);
  const progress = TOTAL_PROBLEMS ? Math.round((solved.length / TOTAL_PROBLEMS) * 100) : 0;
  const heatmapValues = getHeatmapValues(solvedDates);
  const today = new Date();
  const yearAgo = new Date();
  yearAgo.setFullYear(today.getFullYear() - 1);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-900/80 rounded-xl shadow-lg border border-emerald-500/20 text-emerald-100">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-800/60 rounded-lg p-5 flex flex-col items-center shadow border border-emerald-500/10">
          <div className="w-28 h-28 mb-2">
            <CircularProgressbar
              value={progress}
              text={`${progress}%`}
              styles={buildStyles({
                pathColor: '#34d399',
                textColor: '#34d399',
                trailColor: '#1f2937',
                backgroundColor: '#111827',
              })}
            />
          </div>
          <div className="text-lg font-bold text-emerald-400">{solved.length} Solved</div>
          <div className="text-xs text-emerald-200/80">Progress</div>
        </div>
        <div className="bg-gray-800/60 rounded-lg p-5 flex flex-col items-center shadow border border-emerald-500/10">
          <div className="text-2xl font-bold text-emerald-300">{streak}</div>
          <div className="text-xs mt-2 text-emerald-200/80">Current Streak</div>
          <div className="text-lg font-bold text-emerald-300 mt-4">{bestStreak}</div>
          <div className="text-xs mt-2 text-emerald-200/80">Best Streak</div>
          <div className="text-sm font-bold text-emerald-200/80 mt-4">Last Solved: <span className="text-emerald-400">{lastSolved || '-'}</span></div>
        </div>
        <div className="bg-gray-800/60 rounded-lg p-5 flex flex-col items-center shadow border border-emerald-500/10">
          <div className="text-lg font-bold text-emerald-300 mb-2">Recent Activity</div>
          <ul className="w-full">
            {recent.length === 0 && <li className="text-xs text-emerald-200/60">No recent activity</li>}
            {recent.map((item, idx) => (
              <li key={idx} className="text-xs text-emerald-100 border-b border-emerald-500/10 py-1 flex justify-between">
                <span>{item.name || item}</span>
                <span className="text-emerald-400 ml-2">{item.date ? new Date(item.date).toLocaleDateString() : ''}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="bg-gray-800/60 rounded-lg p-5 shadow border border-emerald-500/10 mb-8">
        <div className="text-lg font-bold text-emerald-300 mb-2">Yearly Progress</div>
        <div style={{overflowX: 'auto', padding: 0, margin: 0, minWidth: '0'}}>
          <div style={{minWidth: 'max-content'}}>
            <CalendarHeatmap
              startDate={yearAgo}
              endDate={today}
              values={heatmapValues}
              squareSize={14}
              gutterSize={8}
              classForValue={value => {
                if (!value || value.count === 0) return 'color-empty';
                if (value.count >= 4) return 'color-github-4';
                if (value.count === 3) return 'color-github-3';
                if (value.count === 2) return 'color-github-2';
                return 'color-github-1';
              }}
              showWeekdayLabels={true}
            />
          </div>
        </div>
        <style>{`
          .react-calendar-heatmap {
            background: transparent;
            padding: 0 !important;
            margin: 0 auto !important;
            overflow-x: visible;
            width: 100%;
            max-width: 100%;
            min-width: 0;
          }
          .react-calendar-heatmap svg {
            
            width: 100% !important;
            min-width: 0;
            max-width: 100%;
            height: auto;
            display: block;
          }
          .react-calendar-heatmap .color-github-1 {
            fill: #059669;
          }
          .react-calendar-heatmap .color-github-2 {
            fill: #024530ff;
          }
          .react-calendar-heatmap .color-github-3 {
            fill: #012116ff;
          }
          .react-calendar-heatmap .color-github-4 {
            fill: #000000ff;
          }
          .react-calendar-heatmap .color-empty {
            fill: #1f2937;
            stroke: #374151;
            stroke-width: 1.5;
          }
        `}</style>
      </div>    
    </div>
  );
};

export default Dashboard;