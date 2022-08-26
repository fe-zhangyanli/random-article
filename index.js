import { readFile, readFileSync } from 'fs';
import { fileURLToPath } from 'url'; // 将 url 转为文件路径
import { dirname, resolve } from 'path';
import { generate, parseOptions, saveCorpus } from './lib/generator.js';
import { createRandomPicker } from './lib/random.js';

import commandLineArgs from 'command-line-args';


const url = import.meta.url; // 获取当前脚本文件的url
// dirname方法可以获得当前 JS 文件的目录
// resolve方法可以将 JS 文件目录和相对路径corpus/data.json拼在一起，最终获得正确的文件路径
// 将当前脚本文件的 url 地址转化成文件路径，然后再通过 resolve 将相对路径转变成 data.json 文件的绝对路径。
// 这样不论在哪个路径下运行index.js，都能成功读取到data.json文件了。
const __dirname = dirname(fileURLToPath(url));
// const path = resolve(dirname(fileURLToPath(url)), './corpus/data.json');

// ./corpus/data.json 是相对于脚本的运行目录（即，node执行脚本的目录），而不是脚本文件的目录
// const data = readFileSync(path, {encoding: 'utf-8'});

// const corpus = JSON.parse(data);

function loadCorpus(src) {
  const path = resolve(__dirname, src);
  const data = readFileSync(path, {encoding: 'utf-8'});
  return JSON.parse(data);
}

const corpus = loadCorpus('./corpus/data.json');

// 配置我们的命令行参数
const optionDefinitions = [
  {name: 'title', alias: 't', type: String},
  {name: 'min', type: Number},
  {name: 'max', type: Number},
];
// const options = parseOptions();
const options = commandLineArgs(optionDefinitions); // 获取命令行的输入
const title = options.title || createRandomPicker(corpus.title)();
const article = generate(title, {corpus, ...options});
const output = saveCorpus(title, article);

console.log(`生成成功！文章保存于：${output}`);