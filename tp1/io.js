import { promises as fsp } from 'fs';
import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'node:process';

export async function write(content, destination = './agenda.json') {
  await fsp.writeFile(destination, content, 'utf-8');
}

export async function read(path = './agenda.json') {
  try {
    const data = await fsp.readFile(path, 'utf-8');
    return data;
  } catch (error) {
    return '[]';
  }
}

export async function prompt(question = '') {
  const rl = readline.createInterface({ input, output });
  try {
    const answer = await rl.question(question);
    return answer.trim();
  } finally {
    rl.close();
  }
}