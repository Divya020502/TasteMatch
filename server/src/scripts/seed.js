// Main seed script - runs all individual seed scripts
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const seedScripts = [
  'seedDishes.js',
  'seedRecipe.js',
  'seedRestaurants.js'
];

console.log('🌱 Starting database seeding...');

try {
  for (const script of seedScripts) {
    const scriptPath = path.join(__dirname, script);
    console.log(`\n📋 Running ${script}...`);
    execSync(`node ${scriptPath}`, { stdio: 'inherit' });
  }

  console.log('\n🎉 All seeding completed successfully!');
} catch (error) {
  console.error('❌ Seeding failed:', error.message);
  process.exit(1);
}