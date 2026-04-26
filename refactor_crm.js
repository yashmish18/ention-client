const fs = require('fs');
const path = require('path');

const filesToUpdate = [
    'app/admin/page.tsx',
    'components/admin/shared.tsx',
    'components/admin/OverviewPanel.tsx',
    'components/admin/AnalyticsPanel.tsx',
    'components/admin/ProductsPanel.tsx',
    'components/admin/InventoryPanel.tsx',
    'components/admin/TransactionsPanel.tsx',
    'components/admin/ReviewsPanel.tsx',
    'components/admin/CouponsPanel.tsx',
    'components/admin/SettingsPanel.tsx',
];

const basePath = process.argv[2] || process.cwd();

filesToUpdate.forEach(file => {
    const fullPath = path.join(basePath, file);
    if (!fs.existsSync(fullPath)) {
        console.warn('Skipping file as it does not exist:', fullPath);
        return;
    }
    let content = fs.readFileSync(fullPath, 'utf8');

    // Headers & Labels
    content = content.replace(/font-mono text-\[.*?\] uppercase tracking-\[.*?\] font-black text-\[#F27D26\]/g, 'text-sm font-semibold text-[#F27D26]');
    content = content.replace(/font-mono text-\[.*?\] uppercase tracking-\[.*?\] font-black text-white\/40/g, 'text-sm font-semibold text-white/40');
    content = content.replace(/font-mono text-\[.*?\] uppercase tracking-\[.*?\] font-black text-blue-400/g, 'text-sm font-semibold text-blue-400');
    content = content.replace(/font-mono text-\[.*?\] uppercase tracking-\[.*?\] font-black text-amber-400/g, 'text-sm font-semibold text-amber-400');
    content = content.replace(/font-mono text-\[.*?\] uppercase tracking-\[.*?\] font-black text-green-400/g, 'text-sm font-semibold text-green-400');
    content = content.replace(/font-mono text-\[.*?\] uppercase tracking-\[.*?\] font-black text-red-400/g, 'text-sm font-semibold text-red-400');
    
    // Specific text styles
    content = content.replace(/font-mono text-\[.*?\] uppercase tracking-widest text-[#F27D26] font-black/g, 'text-sm font-semibold text-[#F27D26]');
    content = content.replace(/text-\[8px\] uppercase tracking-\[0\.5em\] text-white\/20 font-black/g, 'text-xs font-semibold text-white/40 tracking-wider uppercase');
    content = content.replace(/font-mono text-\[10px\] uppercase tracking-widest font-bold/g, 'text-sm font-medium');

    // Table Headers
    content = content.replace(/font-mono text-\[7px\] uppercase tracking-widest font-black/g, 'text-xs font-semibold text-white/50 uppercase tracking-wider');

    // Badges / Tags
    content = content.replace(/text-\[7px\] font-black uppercase tracking-widest px-2 py-1/g, 'text-[11px] font-medium px-2.5 py-0.5');
    content = content.replace(/text-\[8px\] font-black uppercase/g, 'text-xs font-medium px-2.5 py-1 rounded-md');
    
    // Values and Subtext
    content = content.replace(/font-mono text-\[8px\] uppercase tracking-widest opacity-40/g, 'text-xs font-medium text-white/40');
    content = content.replace(/font-mono text-\[9px\] uppercase tracking-widest opacity-40/g, 'text-xs font-medium text-white/40');
    content = content.replace(/font-mono text-\[8px\] uppercase tracking-widest text-white\/30/g, 'text-xs font-medium text-white/50');
    content = content.replace(/font-mono text-\[9px\] uppercase tracking-widest text-white\/30/g, 'text-xs font-medium text-white/50');
    content = content.replace(/font-mono text-\[10px\] uppercase tracking-widest opacity-20/g, 'text-sm text-white/40');
    
    // Clean remaining font mono classes
    content = content.replace(/font-mono text-\[9px\]/g, 'text-sm');
    content = content.replace(/font-mono text-\[10px\]/g, 'text-sm');
    content = content.replace(/font-mono text-\[11px\]/g, 'text-sm');
    content = content.replace(/font-mono text-\[8px\]/g, 'text-xs');
    content = content.replace(/font-mono/g, 'font-sans');

    // Page Title
    content = content.replace(/text-4xl font-serif font-black italic tracking-tighter/g, 'text-3xl font-bold tracking-tight text-white/90');
    content = content.replace(/text-3xl font-serif font-black italic/g, 'text-2xl font-semibold tracking-tight');
    content = content.replace(/text-2xl font-serif font-black italic/g, 'text-xl font-semibold tracking-tight');
    content = content.replace(/font-serif italic text-xl mt-1/g, 'text-lg font-semibold tracking-tight text-white mt-1');
    content = content.replace(/font-serif font-black italic mt-1/g, 'font-semibold tracking-tight mt-1 text-white/90');

    // Stats Values
    content = content.replace(/font-serif font-black italic/g, 'font-semibold tracking-tight');
    
    // Cards & Panels
    content = content.replace(/bg-\[#141414\] border border-white\/5 p-6/g, 'bg-[#18181b] border border-white/5 rounded-xl shadow-sm p-6');
    content = content.replace(/bg-\[#141414\] border border-[#F27D26]\/20 p-8/g, 'bg-[#18181b] border border-[#F27D26]/20 rounded-xl shadow-sm p-8');
    content = content.replace(/bg-\[#141414\] border border-white\/5 p-8/g, 'bg-[#18181b] border border-white/5 rounded-xl shadow-sm p-8');
    content = content.replace(/bg-\[#141414\] border border-white\/5 p-10/g, 'bg-[#18181b] border border-white/5 rounded-xl shadow-sm p-10');
    content = content.replace(/bg-\[#141414\] border border-white\/5 p-4/g, 'bg-[#18181b] border border-white/5 rounded-xl shadow-sm p-4');
    content = content.replace(/bg-\[#141414\]/g, 'bg-[#18181b] rounded-xl');

    // Table Containers & Rows
    content = content.replace(/bg-white\/\[0\.02\] border border-white\/5/g, 'bg-[#27272a] rounded-t-xl border border-white/5');
    content = content.replace(/bg-white\/\[0\.02\]/g, 'bg-[#27272a]');
    
    // Table rows hover and borders
    content = content.replace(/px-5 py-4 hover:border-\[#F27D26\]\/40 transition-all group items-center/g, 'px-5 py-3 border-t border-white/5 hover:bg-white/5 transition-colors items-center');
    content = content.replace(/px-5 py-4 hover:border-\[#F27D26\]\/40 transition-all items-center/g, 'px-5 py-3 border-t border-white/5 hover:bg-white/5 transition-colors items-center');
    content = content.replace(/px-5 py-4 hover:border-\[#F27D26\]\/40 transition-all/g, 'px-5 py-3 border-t border-white/5 hover:bg-white/5 transition-colors');
    content = content.replace(/px-5 py-4 hover:border-blue-500\/30 transition-all/g, 'px-5 py-3 border-t border-white/5 hover:bg-white/5 transition-colors');
    
    // Inputs inside cards
    content = content.replace(/bg-[#18181b] rounded-xl border border-white\/10 pl-12 pr-4 py-3/g, 'bg-[#18181b] border border-white/10 rounded-lg pl-12 pr-4 py-3');
    content = content.replace(/bg-white\/5 border border-white\/10/g, 'bg-[#27272a] border border-white/5 rounded-lg');
    content = content.replace(/border border-white\/10 hover:bg-white\/5/g, 'border border-white/10 hover:bg-white/5 rounded-lg');

    // Secondary text
    content = content.replace(/font-serif italic text-sm/g, 'font-medium text-sm text-white/90');
    content = content.replace(/font-serif italic flex-1/g, 'font-medium text-sm text-white/90 flex-1');
    content = content.replace(/font-serif italic font-bold/g, 'font-semibold text-sm');
    content = content.replace(/font-serif italic/g, 'font-medium text-sm text-white/90');
    
    // Buttons & Inputs
    content = content.replace(/rounded-sm/g, 'rounded-md');

    // Sidebar
    content = content.replace(/bg-\[#0E0E0E\]/g, 'bg-[#09090b]');

    // Replace the specific nav layout
    content = content.replace(/min-h-screen bg-ink/g, 'min-h-screen bg-[#09090b]');

    fs.writeFileSync(fullPath, content, 'utf8');
    console.log('Updated:', file);
});
