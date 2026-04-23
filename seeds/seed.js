#!/usr/bin/env node
/* eslint-disable no-console */
require('dotenv').config();

const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const connectDB = require('../config/db');
const Book = require('../models/Book');

const args = process.argv.slice(2);
const shouldFresh = args.includes('--fresh');
const shouldClear = args.includes('--clear');
const help = args.includes('--help') || args.includes('-h');

function printHelp() {
  console.log(`Usage: node seeds/seed.js [options]

Options:
  (no flags)   Insert seed books (skips ones already present by title+author).
  --fresh      Delete ALL books, then insert seed data.
  --clear      Delete ALL books and exit (no insert).
  -h, --help   Show this help.
`);
}

function loadSeedData() {
  const file = path.join(__dirname, 'books.json');
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

async function run() {
  if (help) {
    printHelp();
    return;
  }

  await connectDB();

  if (shouldFresh || shouldClear) {
    const { deletedCount } = await Book.deleteMany({});
    console.log(`Removed ${deletedCount} existing book(s).`);
    if (shouldClear) return;
  }

  const data = loadSeedData();
  let inserted = 0;
  let skipped = 0;

  for (const item of data) {
    const exists = await Book.findOne({ title: item.title, author: item.author });
    if (exists) {
      skipped++;
      continue;
    }
    await Book.create(item);
    inserted++;
  }

  console.log(`Seed complete: ${inserted} inserted, ${skipped} skipped (already existed).`);
}

run()
  .catch((err) => {
    console.error('Seed failed:', err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect().catch(() => {});
  });
