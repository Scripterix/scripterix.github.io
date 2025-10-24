const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, '../assets/data');
const dataDir = path.join(__dirname, '../_data');

const ensureDir = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

const stripFrontMatter = (raw) => {
  const match = raw.match(/^---\s*\r?\n[\s\S]*?\r?\n---\s*\r?\n/);
  if (match) {
    return raw.slice(match[0].length);
  }
  return raw;
};

const loadJSON = (p) => {
  if (!fs.existsSync(p)) {
    return [];
  }
  const raw = fs.readFileSync(p, 'utf8');
  if (!raw.trim()) {
    return [];
  }
  try {
    return JSON.parse(stripFrontMatter(raw).trim());
  } catch (err) {
    console.warn(`⚠️  Nie udało się sparsować ${p}. Zwracam pustą tablicę.`, err.message);
    return [];
  }
};

const formatNumber = (value) => {
  const num = Number(value) || 0;
  if (num >= 1_000_000) {
    const scaled = num / 1_000_000;
    return `${scaled >= 10 ? scaled.toFixed(0) : scaled.toFixed(1)}M`;
  }
  if (num >= 1_000) {
    const scaled = num / 1_000;
    return `${scaled >= 10 ? scaled.toFixed(0) : scaled.toFixed(1)}k`;
  }
  return Math.round(num).toString();
};

ensureDir(assetsDir);
ensureDir(dataDir);

const logbook = loadJSON(path.join(assetsDir, 'logbook.json'));
const portfolio = loadJSON(path.join(assetsDir, 'portfolio.json'));
const posts = loadJSON(path.join(assetsDir, 'posts.json'));

const totalHours = logbook.reduce((sum, entry) => {
  const value = Number(entry.hours != null ? entry.hours : entry.hours_spent);
  return sum + (Number.isFinite(value) ? value : 0);
}, 0);
const totalProjects = new Set((portfolio || []).map((item) => item.slug)).size;
const totalPosts = (posts || []).length;
const lastUpdated = new Date().toISOString();

const statColor = '#212529';

const stats = {
  total_hours: totalHours,
  total_projects: totalProjects,
  total_posts: totalPosts,
  last_updated: lastUpdated,
  alert: totalHours > 50_000,
  stat_color: statColor,
  statColor,
  formatted: {
    total_hours: formatNumber(totalHours),
    total_projects: formatNumber(totalProjects),
    total_posts: formatNumber(totalPosts)
  }
};

const assetsOut = path.join(assetsDir, 'stats.json');
fs.writeFileSync(assetsOut, JSON.stringify(stats, null, 2), 'utf8');
console.log('✅ zapisano', assetsOut);

const dataOut = path.join(dataDir, 'stats.json');
fs.writeFileSync(dataOut, JSON.stringify(stats, null, 2), 'utf8');
console.log('✅ zapisano', dataOut);

if (stats.alert) {
  console.warn('⚠️  WARNING: total_hours > 50000 — sprawdź źródło logbook.json');
}
