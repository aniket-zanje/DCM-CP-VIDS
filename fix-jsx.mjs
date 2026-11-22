import fs from 'fs';
import path from 'path';

function walk(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p);
    else if (ent.name.endsWith('.jsx')) {
      const rel = path.relative('src/pages/topics', p);
      const depth = rel.split(path.sep).length;
      const prefix = '../'.repeat(depth + 1);
      let s = fs.readFileSync(p, 'utf8');
      const next = s.replace(
        /import StubTopicPage from ['"][^'"]+StubTopicPage['"];/,
        `import StubTopicPage from '${prefix}components/StubTopicPage';`
      );
      if (next !== s) {
        fs.writeFileSync(p, next);
        console.log(rel, '->', prefix);
      }
    }
  }
}

walk('src/pages/topics');
